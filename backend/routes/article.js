const express = require("express");
const db = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

const auth = require("../services/authentication");

router.post("/addNewArticle", auth.authenticateToken, (req, res,next) => {
    const article = req.body;
    const query = `insert into article (title, content, publication_date, categoryId,status) values (?,?,?,?,?)`;
    db.query(query, [article.title,article.content, article.publication_date, article.categoryId, article.status], (err, result) => {
      if (!err)
           res.status(200).send({ message: "article added succefully" });
      else {
          res.status(500).send({ err });
      }
    });
  });


  router.get("/allArticles", auth.authenticateToken, (req, res,next) => {
    const category = req.body;
    const query = `select a.id, a.title, a.content, a.status, a.publication_date, c.id as categoryId , c.name as categoryName from article as a
                    inner join  category as  c where a.categoryId = c.id`;
    db.query(query,(err, result) => {
      if (!err)
        
        res.status(200).json({result});
      else {
          res.status(500).send({ err });
      }
    });
  });

  router.put("/updateArticle", auth.authenticateToken, (req, res,next) => {
    const article = req.body;
    const query = `update article  set title = ?, content=?, publication_date=?, categoryId=?,status=?  where id = ?`;
    db.query(query, [article.title,article.content, new Date(), article.categoryId, article.status, article.id], (err, result) => {
      if (!err){
        if(result.affectedRows === 0){
            res.status(403).send({message: " id not found "});
        }
           res.status(200).send({ message: "article updated succefully" });
        }
      else {
          res.status(500).send({ err });
      }
    });
  });

  router.delete("/deleteArticle/:id", auth.authenticateToken, (req, res,next) => {
    const {id} = req.params;
    const query = `delete from article   where id = ?`;
    db.query(query,id , (err, result) => {
      if (!err){
        if(result.affectedRows === 0){
            res.status(403).send({message: " id not found "});
        }
           res.status(200).send({ message: "article deleted succefully" });
        }
      else {
          res.status(500).send({ err });
      }
    });
  });
  
  module.exports = router;