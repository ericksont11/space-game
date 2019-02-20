$(document).ready(function() {

var hello = -1
var marginArray = []
var rightCount = 48;
var layers = 0
var collapse = "notTriggered";
var torch = false;
var torchPicked;
var money = false;
var topCount = 0;
var timer = 0;
var up = 0;
var jump = false;
var moving = false;
var moveLeft;
var moveRight;
var keys = {38: false, 37: false, 39: false};
var leftBlock = false
var rightBlock = false

// dynamically create the cave
makeCave();

//animation for the cave collapsing
function rocksFall() {

    $("#torch4").css("display", "none")
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

//makes it so that when the treasure clicked it opens and either the cave collapses or not
$("#treasure").click(function(){

    if (collapse === "waiting" && torch === false) {
        openTreasure()
        setTimeout(rocksFall, 1000);
        setTimeout(function (){
            $("#character").attr("src", "assets/images/botanist-facing-right.png")
            setTimeout(function (){
                $("#character").attr("src", "assets/images/botanist-facing-left.png")
                setTimeout(function (){
                    $("#character").attr("src", "assets/images/botanist-facing-right.png")
                },700)
            },700)
        },2400)
    }

    else if (collapse === "waiting" && torch === true) {
        $("#pop-up").css("display", "inline-block")
        $("p").html("Wait! With your torch you can see the chest is booby-trapped!")
        setTimeout(function (){
            $("p").html("You disable the trap!")
            setTimeout(function (){
                openTreasure()
            },2000)
        },3000)
        collapse = "avoided";
        money = true;
    }
})

// picks up a torch when clicked on
$(".torch").click(function(){

    if (torch === false){
        torchPicked = this.id
        $("#"+ torchPicked).css("display", "none")
        $("#character").attr("src", "assets/images/botanist-facing-left-torch.png")
        torch = true;
    }
})

//function that makes the cave layout
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

//function that positions the rocks to fall
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


//changes the treasure chest from closed to open
function openTreasure () {
    $("#pop-up").css("display", "none")
    $("#treasure").attr("src", "assets/images/treasure-open.png")
}

function goRight () {
    leftBlock = false;
    if (moving === false) {
        moveRight = setInterval(function(){
            rightCount = rightCount + 0.05
            $("#character").css('left', rightCount + "%");
            if (rightCount > 92 && (collapse === "notTriggered" ||collapse === "notInCave" || collapse === "avoided")) {
                clearInterval(moveRight);
                rightBlock = true;
            }
        },1)
        moving = true;
    }
}

function goLeft () {
    rightBlock = false
    if (moving === false) {
        moveLeft = setInterval(function(){
            rightCount = rightCount - 0.05
            $("#character").css('left', rightCount + "%");
            if (rightCount < 39 && rightCount > 38 && (collapse === "notTriggered" || collapse === "true")) {
                    clearInterval(moveLeft);
                    leftBlock = true;
            }
        },1)
        moving = true;
    }
}



$(document).keydown(function(e) {
    if (e.keyCode in keys) {
        keys[e.keyCode] = true;
        if (keys[38] && keys[37]) {
            if (jump === false && leftBlock === false)  {
                jump = true;
                timer = 0
                topCount = 8
                for (i=0; i < 21; i++) {
                    if (i < 10) {
                        timer = timer + 20
                        setTimeout(function() {
                            up = 16 - topCount
                            rightCount -= .1;
                            $("#character").css('bottom', up + "%");
                            $("#character").css('left', rightCount + "%");
                            topCount = topCount /2
                        },timer)
                    }
                    else {
                        timer = timer + 20
                        setTimeout(function() {
                            topCount = topCount * 2
                            up = 16 - topCount
                            rightCount -= .1;
                            $("#character").css('bottom', up + "%");
                            $("#character").css('left', rightCount + "%");
                            if (up === 0) {
                                setTimeout(function() {
                                    jump = false;
                                },200)  
                            }
                        },timer)
                    }
                }
            }
            if (jump === false && leftBlock === true)  {
                jump = true;
                timer = 0
                topCount = 8
                for (i=0; i < 17; i++) {
                    if (i < 10) {
                        timer = timer + 20
                        setTimeout(function() {
                            up = 16 - topCount
                            rightCount -= .1;
                            $("#character").css('bottom', up + "%");
                            $("#character").css('left', rightCount + "%");
                            topCount = topCount /2
                        },timer)
                    }
                    else {
                        timer = timer + 20
                        setTimeout(function() {
                            topCount = topCount * 2
                            up = 16 - topCount
                            rightCount -= .1;
                            $("#character").css('bottom', up + "%");
                            $("#character").css('left', rightCount + "%");
                            if (up === 0) {
                                setTimeout(function() {
                                    jump = false;
                                },200)  
                            }
                        },timer)
                    }
                    leftBlock = false
                }
            }
        }
        if (keys[38] && keys[39]) {
            if (jump === false)  {
                jump = true;
                timer = 0
                topCount = 8
                for (i=0; i < 21; i++) {
                    if (i < 10) {
                        timer = timer + 20
                        setTimeout(function() {
                            up = 16 - topCount
                            rightCount += .1;
                            $("#character").css('bottom', up + "%");
                            $("#character").css('left', rightCount + "%");
                            topCount = topCount /2
                        },timer)
                    }
                    else {
                        timer = timer + 20
                        setTimeout(function() {
                            topCount = topCount * 2
                            up = 16 - topCount
                            rightCount += .1;
                            $("#character").css('bottom', up + "%");
                            $("#character").css('left', rightCount + "%");
                            if (up === 0) {
                                setTimeout(function() {
                                    jump = false;
                                },200)  
                            }
                        },timer)
                    }
                }
            }
        }
    }
})

$(document).keyup(function(e) {
    if (e.keyCode in keys) {
        keys[e.keyCode] = false;
        if (!keys[37]) {
            clearInterval(moveLeft);
        }
        if (!keys[39]) {
            clearInterval(moveRight);
        }
        if (!keys[39] && !keys[37]) {
            moving = false
        }
        
        
    }
});


//moves the character and detects what image should be shown based on what the user has done
$(document).keydown(function( event ) {

    //checks if 'A' or the left arrow are pressed and moves accordingly
    if ( event.which === 37 || event.which === 65) {
        if (leftBlock === false) {
            goLeft();
            console.log(leftBlock)
        }
        if (torch === false){
            $("#character").attr("src", "assets/images/botanist-facing-left.png")
        }
        else if (collapse === "avoided" || money === true) {
            $("#character").attr("src", "assets/images/botanist-facing-left-money.png")
        }
        else if (money === false) {
            $("#character").attr("src", "assets/images/botanist-facing-left-torch.png")
        }



        if (rightCount < 3 && collapse === "notInCave") {
            $("#character").css("left", "98%")
            $("#background").removeClass("outside-floor")
            $("#background").addClass("cave-floor")
            $("#background").attr("src", "assets/images/cave-floor.png")
            $("#rock-div").empty()
            $("#treasure").css("display", "inline-block")
            $(".torch").css("display", "inline-block")
            $("#"+ torchPicked).css("display", "none")
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
    
    //checks if 'D' or the right arrow are pressed and moves accordingly
    if ( event.which == 39 || event.which == 68 ) {
        if (rightBlock === false) {
            goRight();
        }
        if (torch === false){
            $("#character").attr("src", "assets/images/botanist-facing-right.png")
        }
        else if (collapse === "avoided" || money === true) {
            $("#character").attr("src", "assets/images/botanist-facing-right-money.png")
        }
        else if (money === false) {
            $("#character").attr("src", "assets/images/botanist-facing-right-torch.png")
        }

        if (rightCount > 85 && (collapse === "notTriggered" || collapse === "avoided")) {
            $("#background").removeClass("cave-floor")
            $("#background").addClass("outside-floor")
            $("#background").attr("src", "assets/images/outside-floor.png")
            $("#rock-div").empty()
            $("#character").css("left", "2%")
            $("#treasure").css("display", "none")
            $(".torch").css("display", "none")
            collapse = "notInCave"
            rightCount = 2
        }

    }

    

});

});