const express = require("express");
const db = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

const auth = require("../services/authentication");

router.post("/addNewCategory", auth.authenticateToken, (req, res,next) => {
  const category = req.body;
  const query = `insert into category (name) values (?)`;
  db.query(query, [category.name], (err, result) => {
    if (!err)
         res.status(200).send({ message: "category added succefully" });
    else {
        res.status(500).send({ err });
    }
  });
});


router.get("/allCategory", auth.authenticateToken, (req, res,next) => {
    const category = req.body;
    const query = `select * from category `;
    db.query(query,  (err, result) => {
      if (!err)
           res.status(200).json(result);
      else {
          res.status(500).send({ err });
      }
    });
  });

  router.put("/updateCategory", auth.authenticateToken, (req, res,next) => {
    const category = req.body;
    const query = `update category set name = ? where id = ?`;
    db.query(query, [category.name, category.id] ,(err, result) => {
      if (!err)
        
          if(result.affectedRows === 0 ){
            res.status(400).send({message:"invalid category"});
          }
          else  res.status(200).json({message:"successfully updated"});
      else {
          res.status(500).send({ err });
      }
    });
  });

  

// router.post("/login", (req, res) => {
//   const user = req.body;
//   const query = `select email, password , status, isDeletable  from appuser where email = ?`;
//   db.query(query, [user.email], (err, result) => {
//     if (!err) {
//       if (result.length === 0 || result[0].password != user.password) {
//         res.status(400).send({ message: "invalid username or password" });
//       } else if (result[0].status === "false") {
//         res.status(400).send({ message: "waiting for approval" });
//       } else if (result[0].password === user.password) {
//         const payload = {
//           email: result[0].email,
//           isDeletable: result[0].isDeletable,
//         };
//         const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
//           expiresIn: "8h",
//         });
//         res.status(200).send({ token: accessToken });
//       } else {
//         res.status(500).send({ message: " something went wrong" });
//       }
//     } else {
//       res.status(500).send({ err });
//     }
//   });
// });


module.exports = router;
