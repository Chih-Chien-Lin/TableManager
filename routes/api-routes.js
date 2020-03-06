var db = require("../models");

module.exports = function(app) {
  app.post("/", function(req, res) {
    db.Diningroom.create({
      seats: req.body
    }).then(function(dbDiningroom) {
        res.json(dbDiningroom);
    });
  });


  app.post("/check-in", function(req, res) {
    db.TableHistory.create(req.body);
    res.json({ customerId: results.insertId}) //this should make a "tableId" where the id of the table history is used sort of like an order number so in the handlebar we need an {{ id }} which is to identify the total amount of tables available in the restuarant and {{ tableId }} is the current party occupying the table, like an order order. We will set a data-id = {{ id }} and a data-tableId = {{ tableId }} in the handlebar we can use the value of data-tableId to pull from the tablehistory.
  });//changed the name from "tableId" to "customerId" too many tables being thrown or flipped


  //this is used to change the availbility of the table when you click on appetizer or clear
  app.put("/availbility", function(req, res) { 
    db.Diningroom.update(req.body.availability, {
        where: {
          id: req.body.id
        }
    }).then(function(dbDiningroom) {
        // res.render("index", dbDiningroom); <--- I commented this out for now because I think app.post up top will repopulate the html and don't need to tell it to render
    });
  });

  app.put("/appetizer", function(req,res){
    db.Tablehistory.update(req.body.table_color,{
      where: {
        id: req.body.tableId
      }
    }).then(function(dbAppetizer){

    });
  });

  //this entree and dessert (below) put will change the color stored in the TableHistory table and render it out to the handlebar
  app.put("/entree", function(req,res){
    db.Tablehistory.update(req.body.table_color,{
      where: {
        id: req.body.tableId
      }
    }).then(function(dbEntree){
      // res.render("index", dbEntree); <--- I commented this out for now because I think app.post up top will repopulate the html and don't need to tell it to render
    });
  });

  app.put("/dessert", function(req,res){
    db.TableHistory.update(req.body.table_color,{
      where: {
        id: req.body.id
      }
    }).then(function(dbDessert){
      // res.render("index", dbDessert); <--- I commented this out for now because I think app.post up top will repopulate the table and don't need to tell it to render
    });
  });


  //first time updating 2 things at once with 1 update, I am pretty sure it will work since all the updates are in one curly brackets.
  app.put("/clear", function(req,res){
    db.TableHistory.update({ 
      table_color: req.body.table_color, 
      end_at: req.body.end_at
      },
      {
        where: {
          customerId: req.body.customerId
        }
      }).then(function(){
        // res.json({ tableId: ""}) // don't think we need this //hoping this will clear the table ID so when you click on the table, nothing will show up 
      })
  })
};

