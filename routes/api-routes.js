// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function(app) {
  app.post("/", function(req, res) {
    db.Diningroom.create({
      seats: req.body.totalSeats,
    }).then(function(dbDiningroom) {
        res.render("index", dbDiningroom);
    });
  });

  app.put("/appetizer", function(req, res) {
    db.tablehistory.update({
        app_time: req.body.appetizerOrdered,
    }, {
        where: {

        }
    }).then(function(dbTableHistory) {
        res.render("index", dbTableHistory);
    });
  });
};


// app.put("/api/todos", function(req, res) {
//     // Update takes in an object describing the properties we want to update, and
//     // we use where to describe which objects we want to update
//     db.Todo.update({
//       text: req.body.text,
//       complete: req.body.complete
//     }, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(dbTodo) {
//       res.json(dbTodo);
//     });
//   });