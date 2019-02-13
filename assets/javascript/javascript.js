$(document).ready(function() {
    var counter = 0;
    var data = 150
    var x =0

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

    $("#ship-selection").on("click", function(event) {
        counter = 0;
        $(".ship-selection-menu").addClass("is-active");
        unlockScreen();
    });

    $("#mars").on("click", function(event) {
        x=3900
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
    

    $(".planetImage").on("mouseenter", function() {
        var text = this.id
        console.log(text)
        var upper = text.toUpperCase();
        $(".popup").css("display", "inline-block");
        $("#popup-text").html(upper);
    });

    $(".planetImage").on("mouseleave", function() {
        $(".popup").css("display", "none");
    });
         
    //function cycles through the events

    function next () {
        if (counter < 2) {
            counter ++
            console.log(unlockables.ships[counter].image)
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
        if (data >= unlockables.ships[counter].unlockAmount) {
            $("#ship").css("opacity", "1")
        }
        else {
            $("#ship").css("opacity", "0.5")
        }
    }

    function startTravel () {
        $("#rocket").attr("src", unlockables.ships[3].imageOn)
        setTimeout(function() {
            $("#rocket").attr("src", unlockables.ships[3].image)
        },x)
    }

});