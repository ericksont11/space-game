$(document).ready(function() {

var hello = -1
var marginArray = []
var rightCount = 48;
var layers = 0
var collapse = "notTriggered";

makeCave();

function rocksFall() {
    $("#pop-up").css("display", "inline-block")
    $("p").html("That may have been a mistake...")
    setTimeout(function() {
        $("#pop-up").css("display", "none")
        collapse = "true";
    }, 4000)
    var timer = 100;
    kels = 600
    for (var a = 0; a < 11; a++){
        setTimeout(function() {
            hello = hello + 1
            for (var d = 0; d < 10; d++){
                marginArray = [69,72,75,78,81,84,87,90,93,96]
                setTimeout(makeRocks, timer)
                timer = Math.floor((Math.random() * 500));
            }
            marginArray = [69,72,75,78,81,84,87,90,93,96]
        }, kels)
        kels = kels + 600

    }
}

$("#treasure").click(function(){
    if (collapse === "waiting") {
        openTreasure()
        setTimeout(rocksFall, 1000);
    }
})


function makeCave() {
    for (var a = 0; a < 9; a++) {
        if (a < 9) {
            marginArray = [-3,0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96]
        }
        else {
        marginArray = [-3,0,3,6,9,12,15,18,21,24,69,72,75,78,81,84,87,90,93,96]
        }
        for (var d = 0; d < 34; d++){
            var pictureArray = ["assets/images/rock.png", "assets/images/rock-two.png", "assets/images/rock-three.png", "assets/images/rock-four.png", "assets/images/rock-five.png"]
            var rocks = $("<img>")
            var number = Math.floor((Math.random() * marginArray.length))
            rocks.attr("src", pictureArray[Math.floor((Math.random() * 5))])
            rocks.addClass("falling-rocks")
            $("#rock-div").append(rocks)
            rocks.addClass("rockslide"+hello)
            rocks.css("margin-left", marginArray[number]+"vw")
            rocks.css("z-index", Math.floor((Math.random() * 3)))
            rocks.css("margin-top", layers + "vh")
            marginArray.splice(number, 1)
        }
        layers = layers + 5
    }
}


function makeRocks () {
    var pictureArray = ["assets/images/rock.png", "assets/images/rock-two.png", "assets/images/rock-three.png", "assets/images/rock-four.png", "assets/images/rock-five.png"]
    var rocks = $("<img>")
    var number = Math.floor((Math.random() * marginArray.length))
    rocks.attr("src", pictureArray[Math.floor((Math.random() * 5))])
    rocks.addClass("falling-rocks")
    $("#rock-div").append(rocks)
    rocks.addClass("rockslide"+hello)
    rocks.css("margin-left", marginArray[number]+"vw")
    rocks.css("z-index", Math.floor((Math.random() * 3)+3))
    marginArray.splice(number, 1)
}

function openTreasure () {
    $("#treasure").attr("src", "assets/images/treasure-open.png")
    $("#pop-up").css("display", "none")
}

$(document).keydown(function( event ) {
    if ( event.which == 37 || event.which == 65) {
        if (rightCount > 13 && (collapse === "notTriggered" || collapse === "true")) {
            event.preventDefault();
            rightCount = rightCount - 0.5
            $("#character").css('left', rightCount + "%");
            console.log(rightCount)
        }
        else if  (collapse === "notInCave") {
            event.preventDefault();
            rightCount = rightCount - 0.5
            $("#character").css('left', rightCount + "%");
            console.log(rightCount)
        }
        if (rightCount < 3 && collapse === "notInCave") {
            $("#character").css("left", "98%")
            $("#background").removeClass("outside-floor")
            $("#background").addClass("cave-floor")
            $("#background").attr("src", "assets/images/cave-floor.png")
            $("#rock-div").empty()
            $("#treasure").css("display", "inline-block")
            collapse = "notTriggered"
            rightCount = 98
            layers = 0
            makeCave()
        }
        if (rightCount < 15 && collapse === "notTriggered") {
            collapse = "waiting"
            $("#pop-up").css("display", "inline-block")
        }
    }
    if ( event.which == 39 || event.which == 68 ) {
        if (rightCount < 90 && (collapse === "notTriggered" || collapse === "notInCave")) {
            event.preventDefault();
            rightCount = rightCount + 0.5
            $("#character").css('left', rightCount + "%");
        }
        else if (rightCount < 60 && collapse === "true") {
            event.preventDefault();
            rightCount = rightCount + 0.5
            $("#character").css('left', rightCount + "%");
        }
        else if (rightCount > 85 && collapse === "notTriggered") {
            $("#background").removeClass("cave-floor")
            $("#background").addClass("outside-floor")
            $("#background").attr("src", "assets/images/outside-floor.png")
            $("#rock-div").empty()
            $("#character").css("left", "2%")
            $("#treasure").css("display", "none")
            collapse = "notInCave"
            rightCount = 2
        }
    }
    

});

});