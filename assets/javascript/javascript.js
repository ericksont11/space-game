$(document).ready(function() {
    var counter = 0;
    var shipID = "";
    var data;
    localStorage.clear()
    data = localStorage.getItem("data")
    console.log(data)
    if (data) {
        data = localStorage.getItem("data")
        shipID = localStorage.getItem("shipID");
        console.log("yes")
    }
    else {
        data = 0
        shipID = "assets/images/rocket-up.png"
        console.log("no")
    }
    console.log(data)
    var x = 0;

    $("#data-text-box").html("DATA: " + data);
    $("#ship-id").attr("src", shipID)
    $("#rocket").attr("src", shipID)

    var unlockables = {
        ships : [
            {
            name : "X-WING",
            image: "assets/images/x-wing.png",
            imageOn: "assets/images/x-wing-powered.png",
            unlockAmount: 100,
            },
            {
            name : "PELICAN",
            image: "assets/images/pelican.png",
            unlockAmount: 150,
            },
            {
            name : "ENTERPRISE",
            image: "assets/images/enterprise.png",
            unlockAmount: 200,
            },
            {
            name : "SPACE SHUTTLE",
            image: "assets/images/rocket-up.png",
            imageOn: "assets/images/rocket.png",
            unlockAmount: 100,
            },
        ],
        characters : [
            {
                name: "BOTANIST",
                unlockAmount : 100,
            }
        ],
        upgrades : [
            {
                name: "BOOSTER"
            }
        ]
    }

    $("#answer-one-box").on("click", function(event) {
        data = parseFloat(data) + 50;
        $("#data-text-box").html("DATA: " + data);
    });

    $("#answer-two-box").on("click", function(event) {
        localStorage.setItem("data", data);
        window.location.href = "index.html"
    });

    $("#ship-selection").on("click", function(event) {
        counter = 0;
        console.log(unlockables.ships[counter].image)
        $(".ship-selection-menu").addClass("is-active");
        unlockScreen();
    });

    $("#mars").on("click", function(event) {
        x=3900;
        $("#rocket").removeClass();
        $("#rocket").addClass("animation-earth-to-mars");
        startTravel();
    });

    $("#earth").on("click", function(event) {
        x=5900
        $("#rocket").removeClass();
        $("#rocket").addClass("animation-mars-to-earth");
        startTravel();
    });

    $("#venus").on("click", function(event) {
        x=4900
        $("#rocket").removeClass();
        $("#rocket").addClass("animation-earth-to-venus");
        startTravel();
    });

    $("#upgrade-selection").on("click", function(event) {
        counter = 0
        $(".upgrade-selection-menu").addClass("is-active");
    });

    $("#character-selection").on("click", function(event) {
        counter = 0
        $(".character-selection-menu").addClass("is-active");
    });

    $(".modal_button").on("click", function(e) {
        $(".modal").removeClass("is-active");
    });

    $(".previous").on("click", function(e) {
        prev()
    });

    $(".next").on("click", function(e) {
        next()
    });

    $("#ship").on("click", function() {
        if (data >= unlockables.ships[counter].unlockAmount) {
            $(".ship-selection-menu").removeClass("is-active");
            data = data - unlockables.ships[counter].unlockAmount
            console.log(data)
            $("#rocket").attr("src", unlockables.ships[counter].image)
            shipID = unlockables.ships[counter].image
            localStorage.setItem("shipID", shipID);
        }
        counter = 0
    });
    

    $(".planetImage").on("mouseenter", function() {
        text = this.id 
        upper = text.toUpperCase();
        $(".popup").css("display", "inline-block");
        $("#popup-text").html(upper);
        if (text === "mars") {
            $("#planet-activities").html("This planet is accessible using a basic rocket! If you bring your botanist here you can start helping "+
            "him grow plants by answering biology questions!");
        }
    });



    $(".planetImage").on("mouseleave", function() {
        $(".popup").css("display", "none");
        $("#planet-activities").html("");
    });
         
    //function cycles through the events

    $("#character-populate").on("click", function() {
        $("#scientist-selected").attr("src", "assets/images/botanist-space.png");
        $(".character-populate").css("opacity", "0.1");
    });

    function next () {
        if (counter < 2) {
            counter ++
            $("#ship").attr("src", unlockables.ships[counter].image)
            $("#ship-text").html(unlockables.ships[counter].name + ": REQUIRES " + unlockables.ships[counter].unlockAmount + " DATA TO UNLOCK")
            unlockScreen();
        }
    }

    //function cycles back through the events

    function prev() {
        if (counter > 0) {
            counter --
            $("#ship").attr("src", unlockables.ships[counter].image)
            $("#ship-text").html(unlockables.ships[counter].name + ": REQUIRES " + unlockables.ships[counter].unlockAmount + " DATA TO UNLOCK")
            unlockScreen();
        }

    }

    function unlockScreen() {
        $("#ship").attr("src", unlockables.ships[counter].image)
        if (data >= unlockables.ships[counter].unlockAmount) {
            $("#ship").css("opacity", "1")
        }
        else {
            $("#ship").css("opacity", "0.5")
        }
    }

    function startTravel () {
        $("#rocket").attr("src", unlockables.ships[3].imageOn)
        localStorage.setItem("data", data);
        localStorage.setItem("shipID", shipID);
        setTimeout(function() {
            $("#rocket").attr("src", unlockables.ships[3].image)
        },x)
        setTimeout(function() {
            window.location.href = "planet.html"
        },6000)
    }



});