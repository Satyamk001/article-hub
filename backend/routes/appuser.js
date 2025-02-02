const express = require("express");
const db = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();
const app = express();

const auth = require("../services/authentication");

router.post("/adduser", auth.authenticateToken, (req, res) => {
  const user = req.body;
  const query = `select email, password , status from appuser where email = ?`;
  db.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length === 0) {
        const query = `INSERT INTO appuser (name, email, password,status , isDeletable) values (?,?,?,'false','true')`;
        db.query(
          query,
          [user.name, user.email, user.password],
          (err, result) => {
            if (!err) {
              res.status(200).send({ message: "user added succefully" });
            } else {
              res.status(500).send({ err });
            }
          }
        );
      } else {
        res.status(400).send({ message: "user already exists" });
      }
    } else {
      res.status(500).send({ err });
    }
  });
});

router.post("/login", (req, res) => {
  
  const user = req.body;
  const query = `select email, password , status, isDeletable  from appuser where email = ?`;
  db.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length === 0 || result[0].password != user.password) {
        res.status(400).send({ message: "invalid username or password" });
      } else if (result[0].status === "false") {
        res.status(400).send({ message: "waiting for approval" });
      } else if (result[0].password === user.password) {
        const payload = {
          email: result[0].email,
          isDeletable: result[0].isDeletable,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        res.status(200).send({ token: accessToken });
      } else {
        res.status(500).send({ message: " something went wrong" });
      }
    } else {
      res.status(500).send({ err });
    }
  });
});

//app.use();

module.exports = router;
