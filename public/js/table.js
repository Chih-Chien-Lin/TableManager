$(function () {
    let appCount = document.querySelectorAll(".app-order");
    let entreeCount = document.querySelectorAll(".entree-order");
    let dessertCount = document.querySelectorAll(".dessert-order");

    function getTime() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://world-clock.p.rapidapi.com/json/est/now",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "world-clock.p.rapidapi.com",
                "x-rapidapi-key": "c7f1f5fdffmshcee1368c768e093p12f85bjsn6265db3f7717"
            }
        }

        $.ajax(settings).done(function (response) {
            let weekday = response.dayOfTheWeek;
            let motivTxt;

            if (weekday == "Monday") {
                motivTxt = "The week has just started. Get hustling!";
            } else if (weekday == "Tuesday") {
                motivTxt = "Hey, at least it's not Monday!";
            } else if (weekday == "Wednesday") {
                motivTxt = "Today, you get over the hump!";
            } else if (weekday == "Thursday") {
                motivTxt = "We're almost to the weekend!";
            } else if (weekday = "Friday") {
                motivTxt = "Woohoo! We made it!";
            } else {
                motivTxt = "It's the weekend. Go home and rest!";
            }

            $("#time").text(`It's currently ${weekday}. ${motivTxt}`);
        });

    }

    getTime();

    $("#create-table").on("click", function () {
        var totalSeats = $("#table-count").val();
        totalSeats = parseInt(totalSeats);
        let seats;

        if (totalSeats == 2) {
            seats = {
                seats: totalSeats,
                twoSeat: true
            }
        } else if (totalSeats == 4) {
            seats = {
                seats: totalSeats,
                fourSeat: true
            }
        } else if (totalSeats == 6) {
            seats = {
                seats: totalSeats,
                sixSeat: true
            }
        }

        console.log(seats);

        $.ajax("/tables", {
            type: "POST",
            data: seats
        }).then(function () {
            console.log("New Table Added!");
            location.reload();
        });

    });

    $("#ViewMenu").on("click", function () {
        var status = $(this).attr("isoccupy")
        console.log("check occupy: ", status)
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "/api/order/" + status
        }).then(function (response) {
            console.log("Show ordering sys and order info!")
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
    $(".submitOrderBtn").on("click", function (event) {
        event.preventDefault();
        console.log("This is how many app we have" + appCount.length);
        console.log("This is how many entrees we have" + entreeCount.length);
        console.log("This is how many desserts we have" + dessertCount.length);
        let order = [];
        let count = [];
        let price = [];
        appCount.forEach(function (appetizer) {
            if (appetizer.value != "" || appetizer.value != 0) {
                let appQuantity = appetizer.value;
                let appId = appetizer.dataset.menu;
                let appPrice = appetizer.dataset.price;
                let newAppPrice = parseFloat(appPrice) * parseFloat(appQuantity)
                newAppPrice = newAppPrice.toFixed(2);

                order.push(appId);
                count.push(appQuantity);
                price.push(newAppPrice);
                appetizer.value = "";
            };
        });
        entreeCount.forEach(function (entree) {
            if (entree.value != "" || entree.value != 0) {
                let entreeQuantity = entree.value;
                let entreeId = entree.dataset.menu;
                let entreePrice = entree.dataset.price;
                let newEntreePrice = parseFloat(entreePrice)*parseFloat(entreeQuantity);
                newEntreePrice = newEntreePrice.toFixed(2);

                order.push(entreeId);
                count.push(entreeQuantity);
                price.push(newEntreePrice);
                entree.value = "";
            }
        })
        dessertCount.forEach(function (dessert) {
            if (dessert.value != "" || dessert.value != 0) {
                let dessertQuantity = dessert.value;
                let dessertId = dessert.dataset.menu;
                let dessertPrice = dessert.dataset.price;
                let newDessertPrice = parseFloat(dessertPrice)*parseFloat(dessertQuantity);
                newDessertPrice = newDessertPrice.toFixed(2)

                order.push(dessertId);
                count.push(dessertQuantity);
                price.push(newDessertPrice);
                dessert.value = "";
            }
        })
        console.log(order);
        console.log(count);
        console.log(price);
        var totalPrice = 0;
        var orderPrice = ".totalPrice" + selectedTable;
        for (i = 0; i < order.length; i++) {
            var orderedItem = order[i];
            var orderedCount = count[i];
            var orderedPrice = price[i];
            var orderid = ".order" + selectedTable;
            
            $(orderid).append(`
            <li> ${orderedItem} : ${orderedCount} -- ${orderedPrice} $
            `)
            totalPrice+= parseFloat(orderedPrice);
        }
        $(orderPrice).append(`Total Price: ${totalPrice.toFixed(2)} $`)
        
        let orderString = order.toString();
        let countString = count.toString();
        let thisTable = selectedTable;
        var newTable = {
            // start_at: moment.format("LTS"), //this sets the start time
            table_color: "danger",
            //   availability: false, <-- left this commented out for now since we dont need availability, but it's here if we do
            DiningroomId: selectedTable, //we will set the foreign key that sequelize generated for us to the table id, so now "tablehistory" and "diningroom" are linked
            order: orderString,
            order_quantity: countString,
        }
        changeToOccupied();
        $.ajax("/check-in", {
            type: "POST",
            data: newTable
        }).then(function (response) {
            let tableAvail = {
                availability: true,
                id: thisTable
            }
            $.ajax("/availability", {
                type: "PUT",
                data: tableAvail
            }).then(function (response) {
                console.log(response)
                console.log("New customer recieved!")
                location.reload()
            })
        })
    })


    //3/8/20 new function that on click will get the id from the button and retrieve the tablehistory
    $(".tableBtn").on("click", function () {
        let id = $(this).data("id")
        $.ajax("/api/order/" + id, {
            type: "GET"
        }).then(function (data) {
            console.log(data)
        })
    })

    //Select table and change the status of table
    $(".tableBtn").on("click", chosenTable);
    $(".Appetizer").on("click", changeBtnApp);
    $(".Entre").on("click", changeBtnEnt);
    $(".Desert").on("click", changeBtnDes);
    $(".clear").on("click", changeToNotOccupied)
    var countApp = 0;
    var selectedTable = "";
    function changeBtnApp() {
        var appBtn = "#btn-app"+selectedTable;
        var entBtn = "#btn-ent"+selectedTable;
        $(appBtn).attr("disabled", true);
        $(appBtn).removeClass("btn-primary");
        $(appBtn).addClass("btn-secondary");
        $(entBtn).addClass("btn-primary");
        $('#' + selectedTable).removeClass("btn-danger");
        $('#' + selectedTable).addClass("btn-warning")
        countApp++;
    }
    function changeBtnEnt() {
        if (countApp == 1) {
            var entBtn = "#btn-ent"+selectedTable;
            var desBtn = "#btn-des"+selectedTable;
            $(entBtn).attr("disabled", true);
            $(entBtn).removeClass("btn-primary");
            $(entBtn).addClass("btn-secondary");
            $(desBtn).addClass("btn-primary");
            $('#' + selectedTable).removeClass("btn-warning");
            $('#' + selectedTable).addClass("btn-success")
            countApp++;
        } else {
            return
        }

    }
    function changeBtnDes() {
        if (countApp == 2) {
            var desBtn = "#btn-des"+selectedTable;
            $(desBtn).attr("disabled", true);
            $(desBtn).removeClass("btn-primary");
            $(desBtn).addClass("btn-secondary");
            $('#' + selectedTable).removeClass("btn-success");
            $('#' + selectedTable).addClass("btn-AB2567")
            countApp++;
        } else {
            return
        }

    }
    function changeToOccupied() {
        var targetTable = "#Occupied-Table" + selectedTable;
        $('#' + selectedTable).removeAttr("isOccupy");
        $('#' + selectedTable).removeAttr("data-target");
        $('#' + selectedTable).attr("isOccupy", "1");
        $('#' + selectedTable).attr("data-target", targetTable)
        $('#' + selectedTable).removeClass("btn-info");
        $('#' + selectedTable).addClass("btn-danger")
        selectedTable = "";
    }
    //1234
    function changeToNotOccupied() {
        if (countApp == 3) {
            var appBtn = "#btn-app"+selectedTable;
            var entBtn = "#btn-ent"+selectedTable;
            var desBtn = "#btn-des"+selectedTable;
            var targetTable = "#Not-Occupied-Table" + selectedTable;
            $('#' + selectedTable).removeAttr("isOccupy");
            $('#' + selectedTable).removeAttr("data-target");
            $('#' + selectedTable).attr("isOccupy", "0");
            $('#' + selectedTable).attr("data-target", targetTable)
            $('#' + selectedTable).removeClass("btn-AB2567");
            $('#' + selectedTable).addClass("btn-info")
            $(appBtn).attr("disabled", false);
            $(entBtn).attr("disabled", false);
            $(desBtn).attr("disabled", false);
            $(appBtn).removeClass("btn-secondary");
            $(appBtn).addClass("btn-primary");
            let chosenTable = ".order" + selectedTable;
            let chosenPrice = ".totalPrice" + selectedTable;
            $(chosenTable).empty();
            $(chosenPrice).empty();
            countApp = 0;
        } else {
            return
        }
        selectedTable = "";
    }
    function chosenTable() {
        selectedTable = this.id
        console.log("selectedTable: ", selectedTable)

    }
});


