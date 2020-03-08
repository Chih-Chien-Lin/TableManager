var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res){
    db.Diningroom.findAll({
    }).then(function(dbtables){
      db.Menu.findAll({        
      }).then(function(dbmenu){
        let allTables = []
        dbtables.forEach(element => {
          let newData = element.dataValues
          allTables.push(newData)
        });
        var appe = [];
        var entr = [];
        var dese = [];
        dbmenu.forEach(element => {
          let temp = element.dataValues;
          if (temp.category === "Appetizer"){
            appe.push(temp)
          }else if(temp.category === "Entre"){
            entr.push(temp)
          }else{
            dese.push(temp)
          }
        });
        var newobject = {
          tables: allTables,
          Appetizers: appe,
          Entres: entr,
          Deserts: dese
        }
        // // console.log("stored appe: ",appRend)
        // console.log("stored entr: ",entreeRend)
        // console.log("stored dese: ",dessertRend)
        console.log(newobject)
        return res.render("index", newobject)
      })
    })
  })


  //3/8 new get that I was trying to retrieve the tablehistory
  app.get("/api/order/:id", function(req, res){
    console.log("find the table info")
    db.TableHistory.findOne({
      where: {
        DiningroomId : req.params.id
      }
    }).then(function(tableHistory){
      // if(!tableHistory){
      //   return;
      // }
      // else{
        res.json(tableHistory);
      // }
    });
  });

  app.post("/tables", function(req, res) {
    db.Diningroom.create(req.body).then(function(dbDiningroom) {
        res.json(dbDiningroom);
    });
  });

  app.post("/menu",function(req,res){
    db.Menu.create(req.body).then(function(dbmenu){
      res.json(dbmenu)
    })

  });
  
  app.delete("/menu/delete/:id", function(req, res) {
    console.log("start delete")
    db.Menu.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });

  app.get("/api/menu",function(req,res){
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Menu.findAll({}).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });

  app.post("/check-in", function(req, res) {
    db.TableHistory.create(req.body);
    // res.json({ customerId: results.insertId}) //this should make a "tableId" where the id of the table history is used sort of like an order number so in the handlebar we need an {{ id }} which is to identify the total amount of tables available in the restuarant and {{ tableId }} is the current party occupying the table, like an order order. We will set a data-id = {{ id }} and a data-tableId = {{ tableId }} in the handlebar we can use the value of data-tableId to pull from the tablehistory.
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

