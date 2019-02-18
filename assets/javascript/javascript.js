$(document).ready(function() {
    var counter = 0;
    var shipID = "";
    var data;
    var xwingUnlocked = false;
    var pelicanUnlocked = false;
    var enterpriseUnlocked = false;
    var hello = -1
    var marginArray = []

    data = localStorage.getItem("data")
    if (data) {
        data = localStorage.getItem("data")
        shipID = localStorage.getItem("shipID");
        xwingUnlocked = localStorage.getItem("xwingUnlocked")
        pelicanUnlocked = localStorage.getItem("pelicanUnlocked")
        enterpriseUnlocked = localStorage.getItem("enterpriseUnlocked")
    }
    else {
        data = 0
        shipID = "assets/images/rocket-up.png"
    }
    var x = 0;

    $("#data-text-box").html("DATA: " + data);
    $("#ship-id").attr("src", shipID)
    $("#rocket").attr("src", shipID)

    var unlockables = {
        ships : [
            {
                name : "SPACE SHUTTLE",
                image: "assets/images/rocket-up.png",
                imageOn: "assets/images/rocket.png",
                unlockAmount: 0,
                },
            {
            name : "X-WING",
            image: "assets/images/x-wing.png",
            imageOn: "assets/images/x-wing-on.png",
            unlockAmount: 100,
            },
            {
            name : "PELICAN",
            image: "assets/images/pelican.png",
            imageOn: "assets/images/pelican-on.png",
            unlockAmount: 150,
            },
            {
            name : "ENTERPRISE",
            image: "assets/images/enterprise.png",
            imageOn: "assets/images/enterprise-on.png",
            unlockAmount: 200,
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
        $(".ship-selection-menu").addClass("is-active");
        unlockScreen();
    });

    $("#mars").on("click", function(event) {
        x=3900;
        $("#rocket").removeClass();
        $("#rocket").addClass("animation-earth-to-mars");
        startTravel();
        setTimeout(function() {
            window.location.href = "planet.html"
        },6000)
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
        localStorage.clear()
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
        if (unlockables.ships[counter].name === "X-WING" && xwingUnlocked == "true") {
            $(".ship-selection-menu").removeClass("is-active");
            $("#rocket").attr("src", unlockables.ships[counter].image)
            counter = 1
            shipID = unlockables.ships[counter].image
            localStorage.setItem("shipID", shipID);
        }
        else if (unlockables.ships[counter].name === "PELICAN" && pelicanUnlocked == "true") {
            $(".ship-selection-menu").removeClass("is-active");
            $("#rocket").attr("src", unlockables.ships[counter].image)
            counter = 2
            shipID = unlockables.ships[counter].image
            localStorage.setItem("shipID", shipID);
        }
        else if (unlockables.ships[counter].name === "ENTERPRISE" && enterpriseUnlocked == "true") {
            $(".ship-selection-menu").removeClass("is-active");
            $("#rocket").attr("src", unlockables.ships[counter].image)
            counter = 3
            shipID = unlockables.ships[counter].image
            localStorage.setItem("shipID", shipID);
        }
        else if (data >= unlockables.ships[counter].unlockAmount) {
            if (unlockables.ships[counter].name === "X-WING") {
                xwingUnlocked = "true";
            }
            else if (unlockables.ships[counter].name === "PELICAN") {
                pelicanUnlocked = "true";
            }
            else if (unlockables.ships[counter].name === "SPACE SHUTTLE") {
                $(".ship-selection-menu").removeClass("is-active");
                $("#rocket").attr("src", unlockables.ships[counter].image)
                counter = 0;
            }
            else if (unlockables.ships[counter].name === "ENTERPRISE") {
                enterpriseUnlocked = "true";
            }
            $(".ship-selection-menu").removeClass("is-active");
            data = data - unlockables.ships[counter].unlockAmount
            $("#rocket").attr("src", unlockables.ships[counter].image)
            shipID = unlockables.ships[counter].image
            localStorage.setItem("shipID", shipID);
        }
        $("#data-text-box").html("DATA: " + data);
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
         
    //function cycles through the upgrade choices

    $("#character-populate").on("click", function() {
        $("#scientist-selected").attr("src", "assets/images/botanist-space.png");
        $(".character-populate").css("opacity", "0.1");
        setTimeout(function(){
            $("#speech-bubble").css("display", "inline-block");
            setTimeout(function(){
                $("#speech-bubble").css("display", "none");
            }, 2500)
            setTimeout(function(){
                $("#speech-bubble").css("display", "inline-block");
                $("#speech-bubble-text").html("Answer some biology questions to help complete my research!");
                setTimeout(function(){
                    $("#speech-bubble").css("display", "none");
                    setTimeout(function(){
                        $("#answer-one-box").css("display", "inline-block");
                        $("#answer-two-box").css("display", "inline-block");
                        $("#answer-div").css("display", "inline-block");
                        $("#speech-bubble").css("display", "inline-block");
                    }, 1000)
                }, 3000)
            }, 3000)
        }, 2000)
    });

    $("#upgrade-populate").on("click", function() {
        var timer = 100;
        kels = 1000
        for (var a = 0; a < 11; a++){
            
            setTimeout(function() {
                hello = hello + 1
                for (var d = 0; d < 34; d++){
                    marginArray = [-3,0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96]
                    console.log(marginArray.length)
                    setTimeout(makeRocks, timer)
                    timer = Math.floor((Math.random() * 1000));
                }
                marginArray = [-3,0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96]
            }, kels)
            kels = kels + 1000
        }
        
    });

    function next () {
        if (counter < 3) {
            counter ++
            unlockScreen();
        }
    }

    //function cycles back through the upgrade choices

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
        if (unlockables.ships[counter].name  === "SPACE SHUTTLE") {
            $("#ship-text").html("BOARD YOUR CLASSIC SHUTTLE!")
            $("#ship").css("opacity", "1")
        }
        else if ((xwingUnlocked == "true" && counter === 1) || (pelicanUnlocked == "true" && counter === 2) ||(enterpriseUnlocked == "true" && counter === 3)) {
            $("#ship-text").html("YOU OWN THIS SHIP! CLICK TO PILOT!")
            $("#ship").css("opacity", "1")
        }
        else if (data >= unlockables.ships[counter].unlockAmount) {
            $("#ship-text").html("PURCHASE " +unlockables.ships[counter].name + " FOR " + unlockables.ships[counter].unlockAmount + " DATA!")
            $("#ship").css("opacity", "0.5")
        }
        else {
            $("#ship-text").html(unlockables.ships[counter].name + ": REQUIRES " + unlockables.ships[counter].unlockAmount + " DATA TO UNLOCK")
            $("#ship").css("opacity", "0.1")
        }
    }

    function startTravel () {
        $("#rocket").attr("src", unlockables.ships[counter].imageOn)
        localStorage.setItem("data", data);
        localStorage.setItem("shipID", shipID);
        localStorage.setItem("xwingUnlocked", xwingUnlocked);
        localStorage.setItem("pelicanUnlocked", pelicanUnlocked);
        localStorage.setItem("enterpriseUnlocked", enterpriseUnlocked);
        setTimeout(function() {
            $("#rocket").attr("src", unlockables.ships[counter].image)
        },x)
    }

    function makeRocks () {
        var pictureArray = ["assets/images/rock.png", "assets/images/rock-two.png", "assets/images/rock-three.png", "assets/images/rock-four.png", "assets/images/rock-five.png"]
        var rocks = $("<img>")
        var number = Math.floor((Math.random() * marginArray.length))
        rocks.attr("src", pictureArray[Math.floor((Math.random() * 5))])
        rocks.addClass("falling-rocks")
        $("body").append(rocks)
        rocks.addClass("rockslide"+hello)
        rocks.css("margin-left", marginArray[number]+"vw")
        rocks.css("z-index", Math.floor((Math.random() * 3)))
        marginArray.splice(number, 1)
    }

  
});