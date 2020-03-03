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
            app_time: true
        }
        

        $.ajax("/check-in", {
            type: 'POST',
            data: time
        }).then(function(response) {
            if (res !== null) {
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

    // $(".entree")

});