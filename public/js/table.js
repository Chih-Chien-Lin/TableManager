$(function() {

    $("#create-table-modal").on("click", function() {
        //display of model DOM === "block"
    });

    $("#create-table").on("submit", function(event) {
        event.preventDefault();
        var totalSeats = $("#table-count").val().trim();
        totalSeats = parseInt(tableCount);
        let seats = {
            seats: totalSeats
        }

        $.ajax("/", {
            type: "POST",
            data: seats
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

    $(".check-in").on("submit", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        var time = {
            start_at: moment.format('LTS'),
            table_color: "green"
        }
        $.ajax("/check-in", {
            type: 'POST',
            data: time
        }).then(function(response) {
            if (response !== null) {
                var availability = {
                    availability: false,
                    id: id
                };

                $.ajax("/availability", {
                    type: "PUT",
                    data: availability
                }).then(function(res) {
                    location.reload();
                });
            }
        });
    });

    $(".entree").on("submit", function(event){
        event.preventDefault();
        let tableColor = {
            table_color: "Yellow"
        }
        $.ajax("/entree",{
            type: "PUT",
            data: tableColor
        }).then(function(){
            console.log("Entree has been served!")
        })
    })

    $(".dessert").on("submit", function(event){
        event.preventDefault();
        let tableColor = {
            table_color: "Red"
        }
        $.ajax("/entree",{
            type: "PUT",
            data: tableColor
        }).then(function(){
            console.log("Dessert has been served!")
        })
    })
    // $(".entree")
    $(".clear").on("submit", function(event){
        event.preventDefault()
        let id = $(this).data("id");
        let availability = true;

        let update = {
            availability: availability,
            id: id
        }
        $.ajax("/availability", {
            type: "PUT",
            data: availability
        }).then(function(){
            let clearTable = {
                table_color: white,
                end_at: moment.format('LTS')
            };
            $.ajax("/clear",{
                type: "PUT",
                data: clearTable
            }).then(function(dbClear){
                res.render("Index", dbClear)
            })
        })
    })
});