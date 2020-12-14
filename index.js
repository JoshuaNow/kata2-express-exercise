const http = require("http");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = morgan("tiny");

const app = express();
const server = http.createServer(app);

app.use(logger);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const host = "localhost";

app.use(express.static("public"));

// Needed for Templates
const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

const arrEmploy = [
  {
    firstName: "Elsie",
    lastName: "Orn",
    jobTitle: "Chief Communications Officer",
    jobArea: "Intranet",
    prefix: "Miss",
    suffix: "II",
    birthDate: "2013-02-19T13:58:22.372Z",
    startDate: "2015-12-20T17:25:49.141Z",
  },
  {
    firstName: "Caroline",
    lastName: "Trantow",
    jobTitle: "International Directives Designer",
    jobArea: "Integration",
    prefix: "Mr.",
    suffix: "Sr.",
    birthDate: "2011-10-06T20:51:25.167Z",
    startDate: "2012-12-03T17:18:37.858Z",
  },
  {
    firstName: "Josh",
    lastName: "Ritchie",
    jobTitle: "Internal Brand Consultant",
    jobArea: "Quality",
    prefix: "Dr.",
    suffix: "PhD",
    birthDate: "1995-01-07T14:36:20.664Z",
    startDate: "2011-02-09T15:15:46.525Z",
  },
  {
    firstName: "Leopold",
    lastName: "Hahn",
    jobTitle: "Forward Marketing Coordinator",
    jobArea: "Communications",
    prefix: "Miss",
    suffix: "I",
    birthDate: "2007-06-07T18:42:04.474Z",
    startDate: "2020-08-24T02:37:21.032Z",
  },
  {
    firstName: "Yoshiko",
    lastName: "Gaylord",
    jobTitle: "Corporate Identity Associate",
    jobArea: "Mobility",
    prefix: "Dr.",
    suffix: "II",
    birthDate: "2004-10-23T18:40:12.004Z",
    startDate: "2013-10-13T17:08:59.341Z",
  },
];

const db = [];

// app.get("/", (req, res) => {
//   res.send("hello express");
// });

// Needed for templates rendering
app.get("/", (req, res) => {
  res.render("home", {
    locals: {
      message: "this is how I can call Javascript on to HTML",
    },
  });
});
// this is the create page
app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const { Note } = req.body;
  db.push(Note);
  res.redirect("thankYou");
  // res.send("thank for you answer");
});

app.get("/thankYou", (req, res) => {
  res.render("thankYou", {
    locals: {
      db,
    },
  });
});

app.get("/items", (req, res) => {
  // res.json(arrEmploy);
  res.render("items", {
    locals: {
      arrEmploy,
    },
  });
});
// this is the create page

app.get("/items/:lastName", (req, res) => {
  const { lastName } = req.params;
  const info = arrEmploy.find((z) => z.lastName === lastName);

  // res.json(arrEmploy);
  res.render("info", {
    locals: {
      message: "your param works",
      info,
    },
  });
});

//catch all if website doesn't
app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

server.listen(port, host, () => {
  console.log(`Running on host: port`);
});
