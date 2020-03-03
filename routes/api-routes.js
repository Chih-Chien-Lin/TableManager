var db = require("../models");

module.exports = function(app) {
  app.post("/", function(req, res) {
    db.Diningroom.create({
      seats: req.body
    }).then(function(dbDiningroom) {
        res.render("index", dbDiningroom);
    });
  });


  app.post("/check-in", function(req, res) {
    db.Tablehistory.create(req.body);
  });

  app.put("/availbility", function(req, res) {
    db.Diningroom.update(req.body.availability, {
        where: {
          id: req.body.id
        }
    }).then(function(dbDiningroom) {
        res.render("index", dbDiningroom);
    });
  });

  app.put("/entree", function(req,res){
    db.Diningroom.update(req.body.table_color,{
      where: {
        id: req.body.id
      }
    }).then(function(dbEntree){
      res.render("index", dbEntree);
    })
  })

  app.put("/dessert", function(req,res){
    db.Diningroom.update(req.body.table_color,{
      where: {
        id: req.body.id
      }
    }).then(function(dbDessert){
      res.render("index", dbDessert);
    })
  })
};

