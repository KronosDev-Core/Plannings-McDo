const { exception } = require("console");

let cors = require("cors"),
  helmet = require("helmet"),
  cookieParser = require("cookie-parser"),
  parser = require("body-parser"),
  morgan = require("morgan"),
  express = require("express"),
  app = express(),
  session = require("express-session"),
  path = require("path"),
  fs = require("fs"),
  https = require("https"),
  compression = require('compression'),
  MongoClient = require("mongodb").MongoClient,
  ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

// Configuration Database
const uri = "mongodb://localhost:27017/", client = new MongoClient(uri, { useUnifiedTopology: true, poolSize: 50, loggerLevel: "error", appname: "APIServerMcDoPlannings" });

var privateKey = fs.readFileSync(`kronos.dev-key.pem`, "utf8"),
  certificate = fs.readFileSync(`kronos.dev.pem`, "utf8"),
  credentials = {
    key: privateKey,
    cert: certificate
  };

// Configuration Express Server

app.set("trust proxy", 1);
app.use(
  session({
    secret: "KronosDevPro",
    name: "SessionID",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60000,
    },
  })
);
app.use(morgan("combined"));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use(compression());
app.use(
  parser.urlencoded({
    extended: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "node_modules")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("https://192.168.1.50/", (_req, _res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/Error", (_req, _res) => {
  _res.sendFile(path.join(__dirname + "/Error.html"));
})

async function dev() {
  try {
    await client.connect();
    const db = client.db('PlanningsMcDonalds'), collection = db.collection('plannings');
    await collection.updateMany({}, { $set: {Role: ""} }, { upsert: true });
  } catch (error) {
    console.error("[ Error ] - User Redirect");
    fs.appendFileSync("./LogServer.log", `${new Date().getTime()} - ${error}\n`)
    res.redirect("/Error")
  }
}

// dev()

app.route("/Horaire").post(async (_req, res) => {
  try {
    await client.connect();
    const db = client.db('PlanningsMcDonalds'), collection = db.collection('plannings');
    var body = _req.body;
    console.log("[ Horaire ] (body) - ", body)
  
    if (body.type === "new") {
      delete body.type;
      if (Object.keys(body).indexOf("Absent") !== -1) {
        body.Absent = true;
        body.DayDate = String(new Date(body.DayDate).getTime());
        body.EmployePlanning = Number(body.id);
      } else {
        body.Absent = false;
        body.Role = "";
        body.DayDate = String(new Date(body.DayDate).getTime());
        body.StartHour = body.StartHour.replace(":", ".");
        body.EndHour = body.EndHour.replace(":", ".");
        body.EmployePlanning = Number(body.id);
      }
      delete body.id;
      console.log("[ Horaire (New) ] (body) - ", body)
      await collection.insertOne(body);
      res.redirect("/")
    }
  
    if (body.type === "edit") {
      delete body.type;
      var _id = body._id;
      delete body._id;
      if (Object.keys(body).indexOf("Absent") !== -1) {
        body.Absent = true;
        body.DayDate = String(new Date(body.DayDate).getTime());
        body.EmployePlanning = Number(body.id);
      } else {
        body.Absent = false;
        body.DayDate = String(new Date(body.DayDate).getTime());
        body.StartHour = body.StartHour.replace(":", ".");
        body.EndHour = body.EndHour.replace(":", ".");
        body.EmployePlanning = Number(body.id);
      }

      delete body.id
      console.log("[ Horaire (Edit) ] (body) - ", body)
      await collection.updateOne({"_id" : ObjectId(_id)}, { $set: body }, { upsert: true });
      res.redirect("/")
    }
  
    if (body.type === "get") {
      if (Object.keys(body).indexOf("subtype") !== -1) {
        if (body.subtype === "employe") {
          const cursor = await collection.find({ StartWeek: String(body.week), EmployePlanning: Number(body.id) }).toArray();
          console.log(cursor)

          if (cursor.length === 0) {console.log("No documents found!"); res.send([])}
          else res.send(cursor);
        }
      } else {
        const cursor = await collection.find({ StartWeek: String(body.week) }).toArray();

        if (cursor.length === 0) {console.log("No documents found!"); res.send([])}
        else res.send(cursor);
      }
    }
  
    if (body.type === "getOne") {
      res.send(await collection.findOne({"_id" : ObjectId(body._id)}));
    }
  
    if (body.type === "remove") {
      var result = await collection.deleteOne({"_id" : ObjectId(body._id)});
      if (result.deletedCount === 1) {
        console.dir("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
      res.redirect("/");
    }
  } catch (error) {
    console.error("[ Error ] - User Redirect");
    fs.appendFileSync("./LogServer.log", `${new Date().getTime()} - ${error}\n`)
    res.redirect("/Error")
  }
});

app.route("/Employe").post(async (_req, res) => {
  try {
    await client.connect();

    const db = client.db('PlanningsMcDonalds'), collection = db.collection('employe'), collection2 = db.collection('plannings');
    var body = _req.body;
    console.log("[ Employe ] (body) - ", body)
  
    if (body.type === "new") {
      delete body.type;
      body.id = Number(body.id);
      body.MaxHour = Number(body.MaxHour);
      await collection.insertOne(body);
      res.redirect("/")
    }
  
    if (body.type === "edit") {
      delete body.type;
      var _id = body._id;
      delete body._id;
      body.id = Number(body.id)
      body.MaxHour = Number(body.MaxHour)
      await collection.updateOne({"_id" : ObjectId(_id)}, { $set: body }, { upsert: true });
      res.redirect("/");
    }
  
    if (body.type === "get") {
      const cursor = await collection.find().sort({ id: 1 }).toArray();

      if (cursor.length === 0) {console.log("No documents found!"); res.send([])}
      else res.send(cursor);
    }
  
    if (body.type === "getOne") {
      res.send([await collection.findOne({"_id" : ObjectId(body._id)})]);
    }
  
    if (body.type === "remove") {
      var result = await collection.deleteOne({"_id" : ObjectId(body._id)});
      var result2 = await collection2.deleteMany({ EmployePlanning: Number(body.id) });
      console.log(result2)
      if (result.deletedCount === 1 && result2.deletedCount >= 0) {
        console.dir("Successfully deleted one document and Multiple or none Time Work.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
      res.redirect("/");
    }
  } catch (error) {
    console.error("[ Error ] - User Redirect");
    fs.appendFileSync("./LogServer.log", `${new Date().getTime()} - ${error}\n`)
    res.redirect("/Error")
  }
});

https
  .createServer(credentials, app)
  .listen(process.env.PORT_LISTEN, process.env.HOST_LISTEN);
console.info(`[*] Listen on https://${process.env.HOST_LISTEN}/`);
