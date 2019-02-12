$(document).ready(function() {
    var counter = 0;
    var shipArray = ["assets/images/x-wing.png", "assets/images/pelican.png", "assets/images/enterprise.png"];

    $("#ship-selection").on("click", function(event) {
        $(".ship-selection-menu").addClass("is-active");
        console.log("hello")
    });
    $("#upgrade-selection").on("click", function(event) {
        $(".upgrade-selection-menu").addClass("is-active");
    });
    $("#character-selection").on("click", function(event) {
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
            $("#ship").attr("src", shipArray[counter])
            console.log(counter)
            console.log(shipArray[counter])
        }
    }

    //function cycles back through the events

    function prev() {
        if (counter > 0) {
            counter --
            $("#ship").attr("src", shipArray[counter])
            console.log(counter)
            console.log(shipArray[counter])
        }
    }
});