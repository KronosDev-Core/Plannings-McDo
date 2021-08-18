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
  compression = require('compression');
require("dotenv").config();

// Configuration Database
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("PlanningsMcDo.sqlite3");

//db.run("PRAGMA foreign_keys = ON;");
db.run(`
CREATE TABLE IF NOT EXISTS employe(
  id        INTEGER PRIMARY KEY, 
  name      TEXT, 
  MaxHour   TEXT
);
`);
db.run(`
CREATE TABLE IF NOT EXISTS plannings(
  id        INTEGER PRIMARY KEY NOT NULL, 
  DayDate   INTEGER, 
  StartHour TEXT, 
  EndHour   TEXT, 
  StartWeek TEXT, 
  Absent    BOOL,
  EmployePlanning INTEGER REFERENCES employe
);
`);
db.run(`
CREATE INDEX IF NOT EXISTS planningindex ON plannings(EmployePlanning);
`);

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

app.route("/Horaire").post((_req, res) => {
  var body = _req.body;
  console.log("Horaire : ", body)

  if (body.type === "new") {
    if (Object.keys(body).indexOf("Absent") !== -1) {
      body.Absent = true;
      var ListValueName = "DayDate, StartWeek, Absent, EmployePlanning",
        ListValue = `${new Date(body.DayDate).getTime()}, "${
          body.StartWeek
        }", ${body.Absent}, ${body.id}`;
    } else {
      body.Absent = false;
      var ListValueName =
          "DayDate, StartHour, EndHour, StartWeek, Absent, EmployePlanning",
        ListValue = `${new Date(
          body.DayDate
        ).getTime()}, "${body.StartHour.replace(
          ":",
          "."
        )}", "${body.EndHour.replace(":", ".")}", "${body.StartWeek}", ${
          body.Absent
        }, ${body.id}`;
    }

    db.run(`INSERT INTO Plannings (${ListValueName}) VALUES(${ListValue});`);

    if (body.type === "new") {
      if (body.Multiple !== 'on') res.redirect("/");
      else res.send("Good");
    } else {
      res.redirect("/");
    }
  }

  if (body.type === "edit") {
    var EditColumn = "";
    db.get(
      `SELECT * FROM employe WHERE id=${Number(body.DefaultId)}`,
      (err, rows) => {
        console.log(rows, err);
        for (const property in rows) {
          console.log(
            String(rows[property]) !== String(body[property]),
            String(body[property]),
            String(rows[property])
          );
          if (String(rows[property]) !== String(body[property])) {
            if (property === "id" || property === "MaxHour") {
              EditColumn += `${property} = ${Number(body[property])},`;
            } else {
              EditColumn += `${property} = '${body[property]}',`;
            }
          }
        }
        EditColumn = EditColumn.replace(new RegExp(",$"), "");
        console.log(EditColumn);
        db.run(
          `
      UPDATE employe
      SET ${EditColumn}
      WHERE id = ${Number(body.DefaultId)};
      `,
          (err) => {
            res.redirect("/");
          }
        );
      }
    );
  }

  if (body.type === "get") {
    if (Object.keys(body).indexOf("subtype") !== -1) {
      if (body.subtype === "employe") {
        db.all(
          `SELECT * FROM plannings WHERE startWeek=${new Date(body.week).getTime()} AND EmployePlanning=${Number(body.id)}`,
          (err, rows) => {
            console.log(rows, err);
            res.send(rows);
          }
        );
      }
    } else {
      db.all(`SELECT * FROM plannings WHERE startWeek=${new Date(body.week).getTime()};`, (err, rows) => {
        console.log(rows, err);
        res.send(rows);
      })
    }
  }

  if (body.type === "getOne") {
    db.get(`SELECT * FROM plannings WHERE id=${Number(body.id)};`, (err, row) => {
      res.send(row)
    })
  }

  if (body.type === "remove") {
    db.run(`DELETE FROM plannings WHERE id=${Number(body.id)}`);
  }
});

app.route("/Employe").post((_req, res) => {
  var body = _req.body;
  console.log("Employe : ", body);
  if (body.type === "new") {
    db.run(`
      INSERT INTO Employe (id, name, MaxHour) VALUES(
        ${Number(body.id)},
        "${body.name}",
        ${Number(body.MaxHour)}
      );
    `);
    res.redirect("/");
  }

  if (body.type === "edit") {
    var EditColumn = "";
    db.get(
      `SELECT * FROM employe WHERE id=${Number(body.DefaultId)}`,
      (err, rows) => {
        console.log(rows, err);
        for (const property in rows) {
          console.log(
            String(rows[property]) !== String(body[property]),
            String(body[property]),
            String(rows[property])
          );
          if (String(rows[property]) !== String(body[property])) {
            if (property === "id" || property === "MaxHour") {
              EditColumn += `${property} = ${Number(body[property])},`;
            } else {
              EditColumn += `${property} = '${body[property]}',`;
            }
          }
        }
        EditColumn = EditColumn.replace(new RegExp(",$"), "");
        console.log(EditColumn);
        db.run(
          `
      UPDATE employe
      SET ${EditColumn}
      WHERE id = ${Number(body.DefaultId)};
      `,
          (err) => {
            res.redirect("/");
          }
        );
      }
    );
  }

  if (body.type === "get") {
    db.all("SELECT * FROM employe;", (err, rows) => {
      res.send(rows);
    })
  }

  if (body.type === "getOne") {
    db.get(`SELECT * FROM employe WHERE id=${Number(body.id)};`, (err, row) => {
      res.send(row)
    })
  }

  if (body.type === "remove") {
    db.run(`DELETE FROM employe WHERE id=${Number(body.id)}`);
  }
});

https
  .createServer(credentials, app)
  .listen(process.env.PORT_LISTEN, process.env.HOST_LISTEN);
console.info(`[*] Listen on https://${process.env.HOST_LISTEN}/`);
