var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");
var handlebars = require("express-handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"))

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes")(app);

db.sequelize.sync({ force: true }).then(function() { //change to 'force: false' when we're done or we can't seed later
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});                      