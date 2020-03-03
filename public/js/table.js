$(function() {

    $("#create-table-modal").on("click", function() {
        //display of model DOM === "block"
    });

    $("#create-table").on("submit", function(event) {
        event.preventDefault();
        var totalSeats = $("#table-count").val().trim();
        totalSeats = parseInt(tableCount);

        $.ajax("/", {
            type: "POST",
            data: totalSeats
          }).then(function() {
              console.log("New Table Added!");
              location.reload();
            }
          );

    });

    $(".in-table-modal").on("click", function() {
        //display of modal DOM === "block"
        //display of occupied DOM == "block"
        //display of entree DOM == "none"
        //display of dessert DOM == "none"
        //display of pay DOM = "none"
    });

    $(".occupy-table").on("submit", function(event) {
        event.preventDefault();
    });

    $(".order-app").on("submit", function(event) {
        event.preventDefault();

        var appetizerOrdered = true;
        $.ajax("/appetizer", {
            type: "PUT",
            data: appetizerOrdered
        }).then(function() {
            console.log("Appetizer Ordered!'");
            location.reload();                      //Kenny - do we need this here?
        });
    });

});