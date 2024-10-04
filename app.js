const express = require("express");
const connectDB = require("./config/db");
const Customer = require("./models/customerSchema");
const app = express();

// Connect to MongoDB
connectDB();
const port = 5000;
var methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var moment = require("moment");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.render("index", { customers, moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/search.html", (req, res) => {
  res.render("user/search");
});

app.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  Customer.findById(id)
    .then((customer) => {
      res.render("user/edit", { customer, moment });
    })
    .catch((err) => {
      err.message = err.message;
    });
});

app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  Customer.findById(id)
    .then((customer) => {
      res.render("user/view", { customer, moment });
    })
    .catch((err) => {
      err.message = err.message;
    });
});

app.post("/user/add.html", (req, res) => {
  console.log(req.body);
  Customer.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/search", (req, res) => {
  const Name = req.body.searchText;

  Customer.find({ $or: [{ fName: Name }, { lName: Name }] })
    .then((customers) => {
      console.log("customers is ", customers);
      res.render("user/search", { customers });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/edit/:id", (req, res) => {
  let id = req.params.id;
  Customer.updateOne({ _id: id }, req.body)
    .then((customer) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  Customer.deleteOne({ _id: id })
    .then((customer) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
