$(function() {

    $("#create-table-modal").on("click", function() {
        //display of model DOM === "block"
    });

    $("#create-table").on("click", function() { 
        var totalSeats =  $("#table-count").val().trim();
        totalSeats = parseInt(totalSeats);
        let seats = {
            seats: totalSeats
        }

        // let twoSeat = `<div class="class-container">
        // <div class="container m-5 text-center">
        //     <div class="row">
        //         <div class="col-sm-5"></div>
        //         <div class="col-sm-2 check seat rounded-pill table-color"></div>
        //         <div class="col-sm-5"></div>
        //     </div>
        //     <br>
        //     <div class="row">
        //         <div class="col-sm-2"></div>
        //         <div class="col-sm-8 check table table-color"></div>
        //         <div class="col-sm-2"></div>
        //     </div>
        //     <br>
        //     <div class="row">
        //         <div class="col-sm-5"></div>
        //         <div class="col-sm-2 check seat rounded-pill table-color"></div>
        //         <div class="col-sm-5"></div>
        //     </div>
        // </div>
        // </div>`;

        // document.body.appendChild(twoSeat);

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

    // the class check-in is the appetizer button, this is to guarentee the customer has placed an order and can generate a table id, otherwise if a customer walks out you don't have a "dead" table history.
    $(".check-in").on("submit",function(event){ 
        event.preventDefault();
        var id = $(this).data("id");
        //this creates a JSON which will turn the table avaibility false and the id is used to tell it which table is now not availible
        var availability = { 
            availability: false,
            id: id
        };
        $.ajax("/availability", {
            type: "PUT",
            data: availability
        }).then(function(res) {
            //time will grab the time from moment and change the table_color to green, so when it renders on a reload it'll be green.
            var time = { 
                start_at: moment.format('LTS'),
                table_color: "green"
            }
            $.ajax("/check-in", {
                type: 'POST',
                data: time
            }).then(function(){
                location.reload()
            })
        });
    })

    // $(".check-in").on("submit", function(event) {  <--- same function as above but reversed the order
    //     event.preventDefault();
    //     var id = $(this).data("id");
    //     var time = {
    //         start_at: moment.format('LTS'),
    //         table_color: "green"
    //     }
    //     $.ajax("/check-in", {
    //         type: 'POST',
    //         data: time
    //     }).then(function(response) {
    //         if (response !== null) {
    //             var availability = {
    //                 availability: false,
    //                 id: id
    //             };

    //             $.ajax("/availability", {
    //                 type: "PUT",
    //                 data: availability
    //             }).then(function(res) {
    //                 location.reload();
    //             });
    //         }
    //     });
    // });

    $(".entree").on("submit", function(event){
        event.preventDefault();
        let tableId = $(this).data("tableId")
        let tableColor = {
            table_color: "Yellow",
            id: tableId
        }
        $.ajax("/entree",{
            type: "PUT",
            data: tableColor
        }).then(function(){
            console.log("Entree has been served!")
            location.reload()
        })
    })

    $(".dessert").on("submit", function(event){
        event.preventDefault();
        let tableId = $(this).data("tableId")
        let tableColor = {
            table_color: "Red",
            id: tableId
        }
        $.ajax("/entree",{
            type: "PUT",
            data: tableColor
        }).then(function(){
            console.log("Dessert has been served!")
        })
    })

    $(".clear").on("submit", function(event){
        event.preventDefault()
        let tableId =$(this).data("tableId");
        let id = $(this).data("id");
        let availability = true;

        let update = {
            availability: availability,
            id: id
        }
        $.ajax("/availability", {
            type: "PUT",
            data: update
        }).then(function(){
            let clearTable = {
                table_color: white,
                end_at: moment.format('LTS'),
                id: tableId
            };
            $.ajax("/clear",{
                type: "PUT",
                data: clearTable
            }).then(function(dbClear){
                // res.render("Index", dbClear) <-- think render goes in the route folder but either way I think it automatically renders when the page reloads
                location.reload()
            })
        })
    })
});