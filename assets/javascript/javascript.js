$(document).ready(function() {
    var counter = 0;
    var data = 150

    var unlockables = {
        ships : [
            {
            name : "X-WING",
            image: "assets/images/x-wing.png",
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
            }
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


});