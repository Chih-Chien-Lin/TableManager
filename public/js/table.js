$(function () {
    let appCount = document.querySelectorAll(".app-order")
    let entreeCount = document.querySelectorAll(".entree-order")
    let dessertCount = document.querySelectorAll(".dessert-order")

    $("#create-table").on("click", function () {
        let count = 0;
        var totalSeats = $("#table-count").val();
        totalSeats = parseInt(totalSeats);
        let seats = {
            seats: totalSeats
        }
        console.log(seats);

        let twoSeat = `<div class="table-container check">
        <div class="container m-5 text-center">
            <div class="row">
                <div class="col-sm-5"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-5"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8 check table table-color"></div>
                <div class="col-sm-2"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-5"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-5"></div>
            </div>
        </div>
        </div>`;

        let fourSeat = `<div class="table-container check">
        <div class="container m-5">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-2"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-3"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8 check table table-color"></div>
                <div class="col-sm-2"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-2"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-3"></div>
            </div>
        </div>
        </div>`;

        let sixSeat = `<div class="table-container check">
        <div class="container m-5">
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-2"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8 check table table-color"></div>
                <div class="col-sm-2"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-2 check seat rounded-pill"></div>
                <div class="col-sm-2"></div>
            </div>
        </div>
        </div>`;



        $.ajax("/tables", {
            type: "POST",
            data: seats
        }).then(function () {
            console.log("New Table Added!");
            location.reload();
        });

    });

    $("#ViewMenu").on("click",function(){
        var status = $(this).attr("isoccupy")
        console.log("check occupy: ",status)
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "/order/" + status
        }).then(function (response) {
            // console.log(response)
            console.log("Show ordering sys and order info!")
            // location.reload()
        })
    })

    $("#submitAddDish").on("click", function () {

        console.log("press the add dish button!")
        var newDish = {
            item: $("#AddDishName").val().trim(),
            category: $("#AddCategory").val().trim(),
            price: parseFloat($("#AddPrice").val().trim()),
            cook_time: parseInt($("#AddCookTime").val().trim())
        }
        console.log("newDish: ", newDish)
        $.ajax("/menu", {
            type: "POST",
            data: newDish
        }).then(function (response) {
            console.log("New dish added!")
            location.reload();
        })
    })

    var deletedDishID = "";

    $("#submitDelete").on("click", function () {

        console.log("press the delete dish button:(")
        deletedDishID = parseInt($("#delete-dish").children(":selected").attr("id"));

        console.log("Deleted Dish ID: ", deletedDishID)
        console.log("url: ", "/menu/", deletedDishID)
        $.ajax({
            type: "DELETE",
            url: "/menu/delete/" + deletedDishID
        }).then(function (response) {
            console.log("Dish deleted!")
            location.reload();
        })
    })

    //*NEW* OFF THE AIRPLANE! this is a easier function since we can link via foreign key. 
    $("#submitOrderBtn").on("click", function (event) {
        event.preventDefault();
        console.log("This is how many app we have" + appCount.length);
        console.log("This is how many entrees we have" + entreeCount.length);
        console.log("This is how many desserts we have" + dessertCount.length);
        let order = [];
        let count = [];
        appCount.forEach(function(appetizer){
            if(appetizer.value != "" || appetizer.value != 0){
                let appQuantity = appetizer.value;
                let appId = appetizer.dataset.menu;
                // count =+ appQuantity
                // order =+ appId
                order.push(appId);
                count.push(appQuantity);
            };            
        });
        entreeCount.forEach(function(entree){
            if(entree.value != "" || entree.value != 0){
                let entreeQuantity = entree.value;
                let entreeId = entree.dataset.menu;
                // count =+ entreeQuantity
                // order =+ entreeId
                order.push(entreeId);
                count.push(entreeQuantity);
            }       
        })
        dessertCount.forEach(function(dessert){
            if(dessert.value != "" || dessert.value != 0){
                let dessertQuantity = dessert.value;
                let dessertId = dessert.dataset.menu;
                // order =+ dessertId
                // count =+ dessertQuantity
                order.push(dessertId);
                count.push(dessertQuantity);
            }       
        })
        console.log(order);
        console.log(count);
        let orderString = order.toString();
        let countString = count.toString();
        var newTable = {
            // start_at: moment.format("LTS"), //this sets the start time
            table_color: "danger",
            //   availability: false, <-- left this commented out for now since we dont need availability, but it's here if we do
            DiningroomId: selectedTable, //we will set the foreign key that sequelize generated for us to the table id, so now "tablehistory" and "diningroom" are linked
            order: orderString,
            order_quantity: countString
        }
        changeToOccupied();
        $.ajax("/check-in", {
            type: "POST",
            data: newTable
        }).then(function (response) {
            console.log(response)
            console.log("New customer recieved!")
            location.reload()
        })
    })

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

    //3/8/20 new function that on click will get the id from the button and retrieve the tablehistory
    $(".tableBtn").on("click", function(){
        let id = $(this).data("id")
        $.ajax("/api/order/" + id, {
            type: "GET"
        }).then(function(data){
            console.log(data)
        })
    })

    //Select table and change the status of table
    $(".tableBtn").on("click", chosenTable);
    $("#Appetizer").on("click", changeBtnApp);
    $("#Entre").on("click", changeBtnEnt);
    $("#Desert").on("click", changeBtnDes);
    $("#clear").on("click", changeBtnCle);
    // $("#submitBtn").on("click", changeToOccupied)
    $("#clearBtn").on("click", changeToNotOccupied)
    var countApp = 0;
    var selectedTable = "";
    function changeBtnApp() {
        $("#btn-app").attr("disabled", true);
        $("#btn-app").removeClass("btn-primary");
        $("#btn-app").addClass("btn-secondary");
        $("#btn-ent").addClass("btn-primary");
        $('#' + selectedTable).removeClass("btn-danger");
        $('#' + selectedTable).addClass("btn-warning")
        countApp++;
    }
    function changeBtnEnt() {
        if (countApp == 1) {
            $("#btn-ent").attr("disabled", true);
            $("#btn-ent").removeClass("btn-primary");
            $("#btn-ent").addClass("btn-secondary");
            $("#btn-des").addClass("btn-primary");
            $('#' + selectedTable).removeClass("btn-warning");
            $('#' + selectedTable).addClass("btn-success")
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
            $('#' + selectedTable).removeClass("btn-success");
            $('#' + selectedTable).addClass("btn-AB2567")
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
        $('#' + selectedTable).removeClass("btn-info");
        $('#' + selectedTable).addClass("btn-danger")
        selectedTable = "";
    }
    function changeToNotOccupied() {
        $('#' + selectedTable).removeAttr("isOccupy");
        $('#' + selectedTable).removeAttr("data-target");
        $('#' + selectedTable).attr("isOccupy", "0");
        $('#' + selectedTable).attr("data-target", "#Not-Occupied")
        $('#' + selectedTable).removeClass("btn-AB2567");
        $('#' + selectedTable).addClass("btn-info")
        selectedTable = "";
    }
    function chosenTable() {
        selectedTable = this.id
        console.log("selectedTable: ", selectedTable)
        
    }
});


