$(function () {

    $("#create-table").on("submit", function () {
        var totalSeats = $("#table-count").val().trim();
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
        }).then(function () {
            console.log("New Table Added!");
            location.reload();
        }
        );

    });

    //*NEW* OFF THE AIRPLANE! this is a easier function since we can link via foreign key. 
    $(".check-in").on("click", function () {
        var tableId = $(this).data("id"); //this grabs the tableId that we will reference which table we are creating a new history for
        var newTable = {
            start_at: moment.format("LTS"), //this sets the start time
            tableColor: blue,
            //   availability: false, <-- left this commented out for now since we dont need availability, but it's here if we do
            DiningroomId: tableId //we will set the foreign key that sequelize generated for us to the table id, so now "tablehistory" and "diningroom" are linked
        }
        $.ajax("/check-in", {
            type: "POST",
            data: newTable
        }).then(function (response) {

            console.log("New customer recieved!")
            location.reload()
        })
    })

    // the class check-in is the appetizer button, this is to guarentee the customer has placed an order and can generate a table id, otherwise if a customer walks out you don't have a "dead" table history.
    // $(".check-in").on("submit",function(event){ 
    //     event.preventDefault();
    //     var id = $(this).data("id");
    //     //this creates a JSON which will turn the table avaibility false and the id is used to tell it which table is now not availible
    //     var availability = { 
    //         availability: false,
    //         id: id
    //     };
    //     $.ajax("/availability", {
    //         type: "PUT",
    //         data: availability
    //     }).then(function(res) {
    //         //time will grab the time from moment and change the table_color to green, so when it renders on a reload it'll be green.
    //         var time = { 
    //             start_at: moment.format('LTS'),
    //             table_color: "blue"
    //         }
    //         $.ajax("/check-in", {
    //             type: 'POST',
    //             data: time
    //         }).then(function(){
    //             location.reload()
    //         })
    //     });
    // })

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

    $(".appetizer").on("click", function (event) {
        alert("hello");
        // event.preventDefault();
        // let tableId = $(this).data("customerId")
        // let tableColor = {
        //     table_color: "green",
        //     id: tableId
        // }
        // $.ajax("/appetizer",{
        //     type: "PUT",
        //     data: tableColor
        // }).then(function(){
        //     console.log("Appetizer has been served!")
        //     location.reload()
        // })
    })

    $(".entree").on("submit", function (event) {
        event.preventDefault();
        let tableId = $(this).data("customerId")
        let tableColor = {
            table_color: "Yellow",
            id: tableId
        }
        $.ajax("/entree", {
            type: "PUT",
            data: tableColor
        }).then(function () {
            console.log("Entree has been served!")
            location.reload()
        })
    })

    $(".dessert").on("submit", function (event) {
        event.preventDefault();
        let tableId = $(this).data("customerId")
        let tableColor = {
            table_color: "Red",
            id: tableId
        }
        $.ajax("/entree", {
            type: "PUT",
            data: tableColor
        }).then(function () {
            console.log("Dessert has been served!")
        })
    })

    $(".clear").on("submit", function (event) {
        event.preventDefault()
        let customerId = $(this).data("customerId");
        // let id = $(this).data("id");
        // let availability = true;
        let clearTable = {
            table_color: white,
            end_at: moment.format('LTS'),
            customerId: customerId
        };
        $.ajax("/clear", {
            type: "PUT",
            data: clearTable
        }).then(function (dbClear) {
            // res.render("Index", dbClear) <-- think render goes in the route folder but either way I think it automatically renders when the page reloads
            location.reload()
        })
    })

    //Select table and change the status of table
    $(".tableBtn").on("click", chosenTable);
    $("#Appetizer").on("click", changeBtnApp);
    $("#Entre").on("click", changeBtnEnt);
    $("#Desert").on("click", changeBtnDes);
    $("#clear").on("click", changeBtnCle);
    $("#submitBtn").on("click", changeToOccupied)
    $("#clearBtn").on("click", changeToNotOccupied)
    var countApp = 0;
    var selectedTable = "";
    function changeBtnApp() {
        $("#btn-app").attr("disabled", true);
        $("#btn-app").removeClass("btn-primary");
        $("#btn-app").addClass("btn-secondary");
        $("#btn-ent").addClass("btn-primary");
        countApp++;
    }
    function changeBtnEnt() {
        if (countApp == 1) {
            $("#btn-ent").attr("disabled", true);
            $("#btn-ent").removeClass("btn-primary");
            $("#btn-ent").addClass("btn-secondary");
            $("#btn-des").addClass("btn-primary");
            countApp++;
        } else {
            return
        }

    }
    function changeBtnDes() {
        if (countApp == 2) {
            $("#btn-des").attr("disabled", true);
            $("#btn-des").removeClass("btn-primary");
            $("#btn-des").addClass("btn-secondary");
            countApp++;
        } else {
            return
        }

    }
    function changeBtnCle() {
        if (countApp == 3) {
            $("#btn-app").attr("disabled", false);
            $("#btn-ent").attr("disabled", false);
            $("#btn-des").attr("disabled", false);
            $("#btn-app").removeClass("btn-secondary");
            $("#btn-app").addClass("btn-primary");
            countApp = 0;
        } else {
            return
        }

    }
    function changeToOccupied() {
        $('#' + selectedTable).removeAttr("isOccupy");
        $('#' + selectedTable).removeAttr("data-target");
        $('#' + selectedTable).attr("isOccupy", "1");
        $('#' + selectedTable).attr("data-target", "#Occupied")
        selectedTable = "";
    }
    function changeToNotOccupied() {
        $('#' + selectedTable).removeAttr("isOccupy");
        $('#' + selectedTable).removeAttr("data-target");
        $('#' + selectedTable).attr("isOccupy", "0");
        $('#' + selectedTable).attr("data-target", "#Not-Occupied")
        selectedTable = "";
    }
    function chosenTable() {
        selectedTable = this.id
        console.log("selectedTable: ", selectedTable)
    }
});


