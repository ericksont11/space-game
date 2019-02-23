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
var onBlock = false
var leftEdge = false
var rightEdge = false
var drop = 0;
var distance = 0
var dropping = false
var baseBlock = false
var bounce = 0
var onTop = false
var treasureClicked = false;
var isFiring = false
var isLeft = true;
var isRight = false;
var enemyKilled = false;
var enemyLocation = 40;
var fireballLocation = rightCount;

// dynamically create the cave
makeCave();
enemyMovement();


//makes it so that when the treasure clicked it opens and either the cave collapses or not
$("#treasure").click(function(){

    //stops players from triggering rockslide more than once with multiple clicks
    if (treasureClicked === false) {
        treasureClicked = true;
        //if the player does not have the torch triggers the rocksFall function
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

        //if the player does have the torch triggers a pop-up and changes collapse to avoided
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
    }
})

// changes to the image holding a torch when one is clicked on and sets torch = true
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


//functions to make the enemy move
function enemyMovement () {
    timer = 100
    for (x=0; x < 1000; x++) {
        if (x % 2 === 0) {
            enemyRight()
        }
        else {
            enemyLeft()
        }
    }
}

function enemyRight () {
    for (y = 0; y < 100; y++) {
        timer = timer + 10
        setTimeout(function() {
            enemyLocation = enemyLocation + 0.1
            $("#enemy").css('left', enemyLocation + "%");
        }, timer)
    }
}

function enemyLeft() {
    for (y = 0; y < 100; y++) {
        timer = timer + 10
        setTimeout(function() {
            enemyLocation = enemyLocation - 0.1
            $("#enemy").css('left', enemyLocation + "%");
        }, timer)
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

//function that changes what elements are on the page when the user walks out of the cave
function changePage() {
    $("#background").removeClass("cave-floor")
    $("#background").addClass("outside-floor")
    $("#background").attr("src", "assets/images/outside-floor.png")
    $("#rock-div").empty()
    $("#character").css("left", "2%")
    $("#treasure").css("display", "none")
    $(".torch").css("display", "none")
    $("#boulder").css("display", "none")
    $("#outside-boulder-base1").css("display", "inline-block")
    $("#outside-boulder-base2").css("display", "inline-block")
    $("#outside-boulder-top").css("display", "inline-block")
    $("#enemy").css("display", "none")
    collapse = "notInCave"
    rightCount = 2
}

//animation for the rockslide
function rocksFall() {

    //hides the torch under the rockslide and shows a pop-up
    $("#torch4").css("display", "none")
    $("#pop-up").css("display", "inline-block")
    $("p").html("That may have been a mistake...")
    setTimeout(function() {
        $("#pop-up").css("display", "none")
        collapse = "true";
    }, 4000)
    var timer = 100;
    kels = 600

    //randomly selects which rocks fall when for flavor
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

//changes the treasure chest from closed to open
function openTreasure () {
    $("#pop-up").css("display", "none")
    $("#treasure").attr("src", "assets/images/treasure-open.png")
}


//function that makes the user move to the right
function goRight () {
    //these variables are set to false because if the user moves right they're no longer blocked by and edge or rock
    leftEdge = false
    leftBlock = false;

    //checks if the character is already moving
    if (moving === false) {

        //sets an interval that moves the character 0.05 vw every ms until triggered to stop (by keyup / block / edge)
        moveRight = setInterval(function(){
            rightCount = rightCount + 0.05
            $("#character").css('left', rightCount + "%");

            //if the character reaches the right edge stops the movement
            if (rightCount > 92 && collapse === "notInCave" ) {
                clearInterval(moveRight);
                rightEdge= true;
            }

            //stops the movement if the character is not in the cave and runs into a block
            else if (rightCount > 43 && rightCount < 45 && collapse === "notInCave" ) {
                clearInterval(moveRight);
                rightBlock = true;
            }

            //stops the movement and changes the page if the cave has not collapsed and the user moves to the entrance
            else if (rightCount > 85 && (collapse === "notTriggered" || collapse === "waiting" || collapse === "avoided")) {
                clearInterval(moveRight);
                changePage();
            }

            //stops the movement if the user is in the cave and runs into the block
            else if (rightCount > 12 && rightCount < 14 && (collapse === "notTriggered" || collapse === "avoided" || collapse === "waiting" || collapse === "true")) {
                clearInterval(moveRight);
                rightBlock = true;
            }

            //stops the movement if the user is in the cave and runs into the collapsed rocks
            else if (rightCount > 60 && collapse === "true") {
                clearInterval(moveRight);
                rightEdge = true;
            }

            //stops the movement if running into the top block outside
            else if (rightCount > 54 && rightCount < 56 && collapse === "notInCave") {
                clearInterval(moveRight);
                rightBlock = true;
                baseBlock = true;
            }

            //causes the character to fall if they are on top of the block in the cave and reach its edge
            else if (rightCount > 37 && (collapse === "notTriggered" || collapse === "avoided" || collapse === "waiting" || collapse === "true") && onBlock === true) {
                distance = -0.1
                dropDown()
            }
            
            //causes the character to fall if they are on top of the block outside the cave and reach its edge
            else if (rightCount > 87 && collapse === "notInCave" && onBlock === true && onTop === false) {
                distance = -0.1
                dropDown();
            }

            //causes the character to fall if they are on top of the top block outside the cave and reach its edge
            else if (rightCount > 77 && collapse === "notInCave" && onBlock === true && onTop === true) {
                distance = -0.1
                dropDown();
            }
        },1)
        moving = true;
    }
}


function fireball() {
    if (isFiring === false && isLeft === true) {
        isFiring = true
        $("#fireball").css("display", "inline-block")
        fireballLocation = rightCount + 5
        fireballMoving = setInterval(function(){
            fireballLocation = fireballLocation + 0.3
            console.log(fireballLocation)
            console.log(rightCount)
            $("#fireball").css('left', fireballLocation + "%");
            if (fireballLocation > enemyLocation && enemyKilled === false && rightCount < enemyLocation) {
                $("#enemy").css("display", "none")
                $("#fireball").css("display", "none")
                clearInterval(fireballMoving)
                isFiring = false
                enemyKilled = true
            }
            else if (fireballLocation > 100)
            {
                $("#fireball").css("display", "none")
                clearInterval(fireballMoving)
                isFiring = false
            }
        },10)
    }
    if (isFiring === false && isRight === true) {
        isFiring = true
        $("#fireball").css("display", "inline-block")
        fireballLocation = rightCount 
        fireballMoving = setInterval(function(){
            fireballLocation = fireballLocation - 0.3
            console.log(fireballLocation)
            console.log(rightCount)
            $("#fireball").css('left', fireballLocation + "%");
            if (fireballLocation < (enemyLocation+5) && enemyKilled === false && rightCount > enemyLocation) {
                $("#enemy").css("display", "none")
                $("#fireball").css("display", "none")
                clearInterval(fireballMoving)
                isFiring = false
                enemyKilled = true
            }
            else if (fireballLocation < 0)
            {
                $("#fireball").css("display", "none")
                clearInterval(fireballMoving)
                isFiring = false
            }
        },10)
    }

}

//function that makes the user move to the left
function goLeft () {

    //these variables are set to false because if the user moves right they're no longer blocked by and edge or rock
    rightEdge = false
    rightBlock = false

    //checks if the user is already moving
    if (moving === false) {

        //sets an interval that moves the character 0.05 vw every ms until triggered to stop (by keyup / block / edge)
        moveLeft = setInterval(function(){
            rightCount = rightCount - 0.05
            $("#character").css('left', rightCount + "%");

            //stops the movement if the user is inside the cave and runs into the block
            if (rightCount < 39 && rightCount > 37 && (collapse === "notTriggered" || collapse === "true" || collapse === "waiting" || collapse === "avoided")) {
                clearInterval(moveLeft);
                leftBlock = true;
            }

            //stops the movement if the user is inside the cave and runs into the block
            else if (rightCount < 89 && rightCount > 87 && collapse === "notInCave" && onBlock === false) {
                clearInterval(moveLeft);
                leftBlock = true;
            }
            
            else if (rightCount < 79 && rightCount > 77 && collapse === "notInCave" && onBlock === true) {
                clearInterval(moveLeft);
                leftBlock = true;
                baseBlock = true;
            }

            //stops the movement if the user is in the cave and reaches the edge
            else if (rightCount < 3 && (collapse === "notTriggered" || collapse === "true" || collapse === "waiting" || collapse === "avoided")) {
                clearInterval(moveLeft);
                leftEdge = true;
            }
            //causes the character to fall back down if they are on the block and reach the edge
            else if (rightCount < 14 && (collapse === "notTriggered" || collapse === "avoided" || collapse === "waiting" || collapse === "true") && onBlock === true) {
                distance = 0.1
                dropDown();
            }

            //causes the character to fall back down if the are on the block outside and reach the edge
            else if (rightCount < 45 && collapse === "notInCave" && onBlock === true && onTop === false) {
                distance = 0.1
                dropDown();
            }

            //causes the character to fall back down if the are on top the block outside and reach the edge
            else if (rightCount < 56 && collapse === "notInCave" && onBlock === true && onTop === true) {
                distance = 0.1
                dropDown();
            }

        },1)
        moving = true;
    }
}

function jumping () {
    jump = true;
    timer = 0
    topCount = 8
    var counter = 0
    for (i=0; i < drop; i++) {
        if (i < 10) {
            counter ++
            timer = timer + 20
            setTimeout(function() {
                up = (bounce + 16) - topCount
                rightCount -= distance;
                $("#character").css('bottom', up + "%");
                $("#character").css('left', rightCount + "%");
                topCount = topCount /2
            },timer)
        }
        else {
            timer = timer + 20
            setTimeout(function() {
                counter++
                topCount = topCount * 2
                up = (bounce+ 16) - topCount
                rightCount -= distance;
                $("#character").css('bottom', up + "%");
                $("#character").css('left', rightCount + "%");
                if (i === counter) {
                    setTimeout(function() {
                        jump = false;
                    },200)  
                }
            },timer)
        }
    }
}

function dropDown () {
    var counter2 = 0
    if (dropping === false) {
        up = 10
        topCount = .15625
        timer = 10
        for (i=0; i < 7; i++) {
            dropping = true
            timer = timer + 10
            setTimeout(function() {
                counter2++
                up = (bounce + 10) - topCount
                rightCount -= distance;
                $("#character").css('bottom', up + "%");
                $("#character").css('left', rightCount + "%");
                topCount = topCount * 2
                if (counter2 === 7 && onTop=== true) {
                    setTimeout(function() {
                        dropping = false;
                        jump = false
                        baseBlock = false
                        onTop = false
                        bounce = 0
                    },200)  
                }
                else if (counter2 === 7) {
                    setTimeout(function() {
                        dropping = false;
                        jump = false
                        baseBlock = false
                        onBlock = false
                        onTop = false
                        bounce = 0
                    },200)  
                }
            },timer)
        }
    }
}

//checks to see if an arrow key is pressed (or AWSD)
$(document).keydown(function(e) {
    
    //if one of these keys it changes the value of it the keys array to true
    if (e.keyCode in keys) {
        keys[e.keyCode] = true;

        //checks if both the left and up keys are currently pressed (has to be simultaneously to trigger)
        if (keys[38] && keys[37]) {

            if (jump === false && leftBlock === false && leftEdge === false && onBlock === false)  {
                drop = 21
                distance = 0.1
                jumping()
            }
            else if (jump === false && leftBlock === true && baseBlock === false)  {
                drop = 18
                distance = 0.3
                jumping()
                leftBlock = false
                onBlock = true;
            }
            else if (jump === false && leftBlock === true  && baseBlock === true) {
                drop = 18
                bounce = 14
                distance = 0.3
                jumping()
                leftBlock = false
                onBlock = true;
                onTop = true;
            }
        }

         //checks if both the right and up keys are currently pressed (has to be simultaneously to trigger)
        else if (keys[38] && keys[39]) {

            if (jump === false && rightBlock === false && rightEdge === false  && onBlock === false) {
                drop = 21
                distance = -0.1
                jumping()
            }
            else if (jump === false && rightBlock === true && baseBlock === false) {
                drop = 18
                distance = -0.3
                jumping()
                rightBlock = false
                onBlock = true;
            }
            else if (jump === false && rightBlock === true  && baseBlock === true) {
                drop = 18
                bounce = 14
                distance = -0.3
                jumping()
                rightBlock = false
                onBlock = true;
                onTop = true;
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
        isRight = true;
        isLeft = false;
        if (leftBlock === false && leftEdge === false) {
            goLeft();
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
            $("#boulder").css("display", "inline-block")
            $("#outside-boulder-base1").css("display", "none")
            $("#outside-boulder-base2").css("display", "none")
            $("#outside-boulder-top").css("display", "none")
            if (enemyKilled === false) {
                $("#enemy").css("display", "inline-block")
            }
            collapse = "notTriggered"
            rightCount = 85
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
        isRight = false;
        isLeft = true;
        if (rightBlock === false && rightEdge === false) {
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


    }

    

});


$(document).keydown(function( event ) {
    if ( event.which === 32) {
        fireball()
    }
})

});