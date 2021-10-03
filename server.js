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
  ObjectId = require("mongodb").ObjectId,
  execSync = require('child_process').execSync,
  passport = require("passport")
  LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

var finishFile = false;

execSync('gulp', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
  if (stdout.includes("Finished")) finishFile = true
})

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
//app.use(passport.initialize());
//app.use(passport.session());

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/index.html"));
});

app.get("https://192.168.1.50/", (_req, _res) => {
  res.sendFile(path.join(__dirname + "/public/html/index.html"));
});

app.get("/Error", (_req, _res) => {
  _res.sendFile(path.join(__dirname + "/public/html/Error.html"));
});

app.get("/plannings", (_req, _res) => {
  _res.sendFile(path.join(__dirname + "/public/html/plannings.html"))
});

function ErrorLogs(error, res) {
  console.error("[ Error ] - User Redirect");
  fs.appendFileSync("./LogServer.log", `${new Date().getTime()} - ${error}\n`);
  res.redirect("/Error");
}

async function dev() {
  try {
    await client.connect();
    const db = client.db('PlanningsMcDonalds'), collection = db.collection('employe');
    await collection.updateMany({}, { $set: {pays: "fr", restaurant: 0} }, { upsert: true });
  } catch (error) {
    ErrorLogs(error, res);
  }
}

//dev()

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
        body.Line = body.Line || "";
      } else {
        body.Absent = false;
        body.Line = "";
        body.Role = "";
        body.DayDate = String(new Date(body.DayDate).getTime());
        body.StartHour = body.StartHour.replace(":", ".");
        body.EndHour = body.EndHour.replace(":", ".");
        body.EmployePlanning = Number(body.id);
      }
      delete body.id;
      console.log("[ Horaire (New) ] (body) - ", body)
      await collection.insertOne(body);
      res.redirect("/plannings")
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
      res.redirect("/plannings")
    }
  
    if (body.type === "get") {
      if (Object.keys(body).indexOf("subtype") !== -1) {
        if (body.subtype === "employe") {
          const cursor = await collection.find({ StartWeek: String(body.week), EmployePlanning: Number(body.id) }).toArray();

          if (cursor.length === 0) {console.log("No documents found!"); res.send([])}
          else res.send(cursor);
        }
      } else {
        var FullData = [], end = false;
        await (body.Employe).forEach(async (elem, index) => {
          const cursor = await collection.find({ StartWeek: String(body.week), EmployePlanning: Number(elem) }).toArray();
          cursor.forEach(elem => FullData.push(elem));

          if ((body.Employe.length-1) === index) {
            if (FullData.length === 0) {console.log("No documents found!"); res.send([])}
            else res.send(FullData);
          }
        });
        
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
      res.redirect("/plannings");
    }
  } catch (error) {
    ErrorLogs(error, res);
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
      body.restaurant = Number(body.restaurant);
      body.MaxHour = Number(body.MaxHour);
      await collection.insertOne(body);
      res.redirect("/plannings")
    }
  
    if (body.type === "edit") {
      delete body.type;
      var _id = body._id;
      delete body._id;
      body.id = Number(body.id);
      body.restaurant = Number(body.restaurant);
      body.MaxHour = Number(body.MaxHour);
      await collection.updateOne({"_id" : ObjectId(_id)}, { $set: body }, { upsert: true });
      res.redirect("/plannings");
    }
  
    if (body.type === "get") {
      const cursor = await collection.find({ pays: body.pays, restaurant: Number(body.restaurant) }).sort({ id: 1 }).toArray();

      if (cursor.length === 0) {console.log("No documents found!"); res.send([])}
      else res.send(cursor);
    }
  
    if (body.type === "getOne") {
      res.send([await collection.findOne({"_id" : ObjectId(body._id)})]);
    }
  
    if (body.type === "remove") {
      var result = await collection.deleteOne({"_id" : ObjectId(body._id)});
      var result2 = await collection2.deleteMany({ EmployePlanning: Number(body.id) });
      if (result.deletedCount === 1 && result2.deletedCount >= 0) {
        console.dir("Successfully deleted one document and Multiple or none Time Work.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
      res.redirect("/plannings");
    }
  } catch (error) {
    ErrorLogs(error, res);
  }
});

app.route("/Geo").post(async (_req, res) => {
  try {
    await client.connect();

    const db = client.db('PlanningsMcDonalds'), collection = db.collection('World'), collection2 = db.collection('Departement'), collection3 = db.collection('Restaurant');
    var body = _req.body;
    console.log("[ Geo ] (body) - ", body)

    if (body.type === "get") {
      if (Object.keys(body).indexOf("subtype") !== -1) {
        if (body.subtype === "Restaurant") {
          const cursor3 = await collection3.find({pays: body.pays, departement: Number(body.departement)}).sort({ville: 1 }).toArray();

          if (cursor3.length === 0) {console.log("No documents found!"); res.send([])}
          else res.send({Restaurant: cursor3});
        }
      } else {
        const cursor = await collection.find().sort({ id: 1 }).toArray();
        const cursor2 = await collection2.find().sort({code: 1 }).toArray();
  
        if (cursor.length === 0 && cursor2.length === 0 ) {console.log("No documents found!"); res.send([])}
        else res.send({Pays: cursor, Departement: cursor2});
      }
    }
  } catch (error) {
    ErrorLogs(error, res);
  }
});

app.route("/Connection").post(async (_req, res) => {
  try {
    await client.connect();

    const db = client.db('PlanningsMcDonalds'), collection = db.collection('user');
    var body = _req.body;
    console.log("[ User ] (body) - ", body)
    const cursor = await collection.findOne({ username: String(body.username) });

    if (cursor === null) {console.log("No documents found!"); res.send(["Error Connection"])}
    else if (cursor !== null) {
      if (cursor.password === String(body.password) && cursor.permission === String(body.permission)) res.send([cursor])
    };
  } catch (error) {
    ErrorLogs(error, res);
  }
});

app.all(/.*/, (_req, _res) => {
  console.log("[ Warning URL ] (_req) - ", _req.url);
  _res.redirect("/Error");
});

https
  .createServer(credentials, app)
  .listen(process.env.PORT_LISTEN, process.env.HOST_LISTEN);
console.info(`[*] Listen on https://${process.env.HOST_LISTEN}/`);