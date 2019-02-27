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
var keys = {38: false, 37: false, 39: false, 32: false};
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
var isLeft = true;
var isRight = false;
var enemyKilled = false;
var enemyLocation = 55;
var batLocation = 20;
var firedLocation;
var fireHeight = 6;
var fireballLocation = 0;
var fireCounter = -1;
var fireArray = []
var gameOver = false;
var batKilled = false;


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
    for (var x=0; x < 100; x++) {
        if (x % 2 === 0) {
            enemyRight()
        }
        else {
            enemyLeft()
        }
    }
}

function enemyRight () {
    for (var y = 0; y < 200; y++) {
        timer = timer + 15
        if (collapse === "true" || collapse === "notInCave") {
                maxId = setTimeout(function() {
                checkLife()
                batLocation = batLocation + 0.3
                $("#bat").css('bottom', batLocation + "%")
            }, timer) 
        }
        else {
                maxId = setTimeout(function() {
                checkLife()
                enemyLocation = enemyLocation + 0.1
                $("#enemy").css('left', enemyLocation + "%")
            }, timer)
        }
    }
}

function enemyLeft() {
    for (var y = 0; y < 200; y++) {
        timer = timer + 15
        if (collapse === "true" || collapse === "notInCave") {
                maxId = setTimeout(function() {
                checkLife()
                batLocation = batLocation - 0.3
                $("#bat").css('bottom', batLocation + "%")
            }, timer) 
        }
        else {
                maxId = setTimeout(function() {
                checkLife()
                enemyLocation = enemyLocation - 0.1
                $("#enemy").css('left', enemyLocation + "%")
            }, timer)
        }
    }
}



function checkLife () {

    if ((enemyKilled === false && enemyLocation < (rightCount + 7) && rightCount < (enemyLocation + 7)) || gameOver === true) {
        $("#pop-up").css("display", "inline-block")
        $("p").html("GAME OVER!")
        $('#character').attr('src','assets/images/skeleton.png')
        gameOver = true
    }
    if ((batKilled === false && batLocation < 25 && rightCount > 33 && rightCount < 50.2 && (collapse === "notInCave" || collapse === "true")) || gameOver === true) {
        $("#pop-up").css("display", "inline-block")
        $("p").html("GAME OVER!")
        $('#character').attr('src','assets/images/skeleton.png')
        gameOver = true
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
    timer = 100
    collapse = "notInCave"
    rightCount = 10

    $("#background").removeClass("cave-floor")
    $("#background").addClass("outside-floor")
    $("#background").attr("src", "assets/images/outside-floor.png")
    $("#rock-div").empty()
    $("#character").css("left", "10%")
    $("#treasure").css("display", "none")
    $(".torch").css("display", "none")
    $("#boulder").css("display", "none")
    $("#outside-boulder-base1").css("display", "inline-block")
    $("#outside-boulder-base2").css("display", "inline-block")
    $("#outside-boulder-top").css("display", "inline-block")
    $("#enemy").css("display", "none")

    if (batKilled === false) {
        $('body').append('<img id="bat" src="assets/images/bat.png" />')
        batLocation = 20
    }

    for(var i=0; i < maxId; i++) { 
        clearTimeout(i);
    }
    
    enemyMovement()

}

function cavePage () {
   
    $("#character").css("left", "85%")
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
    $('#bat').remove()
    if (enemyKilled === false) {
        $("#enemy").css("display", "inline-block")
    }
    timer = 100
    collapse = "notTriggered"
    rightCount = 85
    batLocation = 20
    layers = 0
    for(var i=0; i < maxId; i++) { 
        clearTimeout(i);
    }
    
    makeCave()

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
            else if (rightCount > 90 && (collapse === "notTriggered" || collapse === "waiting" || collapse === "avoided")) {
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

    clearInterval(interval)
    fireCounter++
    fireArray.push(fireCounter)

    if (isLeft === true ){
   
            $('body').append('<img class="fireball" id ="fireball'+fireCounter+'" src="assets/images/fireball.png" />')

            firedLocation = rightCount + 6

            var interval = setInterval(function () {

                p = $( "#fireball"+fireArray[0]);
                position = p.position();
                fireballLocation = (position.left / window.innerWidth) * 100
                if (fireballLocation > enemyLocation && enemyKilled === false && rightCount < enemyLocation) {
                    $("#enemy").remove()
                    $("#fireball"+fireArray[0]).remove()
                    enemyKilled = true
                    clearInterval(interval)
                    fireArray.shift()
                    for(var i=0; i < maxId; i++) { 
                        clearTimeout(i);
                    }
                }
                if (fireballLocation > 40 && batKilled === false && rightCount < 40 && ((fireHeight === 20 && batLocation < 2) || (fireHeight === 34 && batLocation < 35 && batLocation > 30)) && (collapse === "true" || collapse === "notInCave")) {
                    $("#bat").remove()
                    $("#fireball"+fireArray[0]).remove()
                    batKilled = true
                    clearInterval(interval)
                    fireArray.shift()
                    for(var i=0; i < maxId; i++) { 
                        clearTimeout(i);
                    }
                }
                else if ((fireballLocation > (firedLocation + 20))|| fireballLocation > 89.9) {
                    clearInterval(interval)
                    $("#fireball"+fireArray[0]).remove()
                    fireArray.shift()
                }

            },10)
            

            $("#fireball"+fireCounter).css('left', firedLocation + "%");
            $("#fireball"+fireCounter).css('bottom', fireHeight + "%");
            $("#fireball"+fireCounter).addClass('fireRight');
            $("#fireball"+fireCounter).css('left', firedLocation + "%");
        
    
    }
    
    if (isRight === true ){
    
            $('body').append('<img class="fireball" id ="fireball'+fireCounter+'" src="assets/images/fireball.png" />')

            firedLocation = rightCount - 1

            var interval = setInterval(function () {

                p = $( "#fireball"+fireArray[0] );
                position = p.position();
                fireballLocation = (position.left / window.innerWidth) * 100
                if (fireballLocation < enemyLocation && enemyKilled === false && rightCount > enemyLocation) {
                    $("#enemy").remove()
                    $("#fireball"+fireArray[0] ).remove()
                    enemyKilled = true
                    clearInterval(interval)
                    fireArray.shift()
                    for(var i=0; i < maxId; i++) { 
                        clearTimeout(i);
                    }
                }
                if (fireballLocation < 49 && batKilled === false && rightCount > 49 && fireHeight > 19 && (collapse === "true" || collapse === "notInCave")) {
                    $("#bat").remove()
                    $("#fireball"+fireArray[0] ).remove()
                    batKilled = true
                    clearInterval(interval)
                    fireArray.shift()
                    for(var i=0; i < maxId; i++) { 
                        clearTimeout(i);
                    }
                }
                else if ((fireballLocation < (firedLocation - 20))|| fireballLocation < 3) {
                    clearInterval(interval)
                    $("#fireball"+fireArray[0]).remove()
                    fireArray.shift()
                }

            },10)
            

            $("#fireball"+fireCounter).css('left', firedLocation + "%");
            $("#fireball"+fireCounter).css('bottom', fireHeight + "%");
            $("#fireball"+fireCounter).addClass('fireLeft');
            $("#fireball"+fireCounter).css('left', firedLocation + "%");
        

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
            else if (rightCount < 3 && (collapse === "notInCave" || collapse === "true")) {
                clearInterval(moveLeft);
                cavePage()
            }

        },1)
        moving = true;
    }
}

function jumping () {
    fireHeight = fireHeight + 8
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
                        fireHeight = 20

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
                        fireHeight = 6

                    },200)  
                }
            },timer)
        }
    }
}

//checks to see if an arrow key is pressed (or AWSD)
$(document).keydown(function(e) {
    if (gameOver === false) {
        //if one of these keys it changes the value of it the keys array to true
        if (e.keyCode in keys) {
            keys[e.keyCode] = true;

            //checks if both the left and up keys are currently pressed (has to be simultaneously to trigger)
            if (keys[38] && keys[37]) {

                if (jump === false && leftBlock === false && leftEdge === false && onBlock === false)  {
                    drop = 21
                    distance = 0.1
                    jumping()
                    setTimeout(function() {
                        fireHeight = 6
                    },200)
                }
                else if (jump === false && leftBlock === true && baseBlock === false)  {
                    drop = 18
                    distance = 0.3
                    leftBlock = false
                    onBlock = true;
                    jumping()
                    fireHeight = 20
                }
                else if (jump === false && leftBlock === true  && baseBlock === true) {
                    drop = 18
                    bounce = 14
                    distance = 0.3
                    leftBlock = false
                    onBlock = true;
                    onTop = true;
                    jumping()
                    fireHeight = 34
                }
            }

            //checks if both the right and up keys are currently pressed (has to be simultaneously to trigger)
            if (keys[38] && keys[39] && keys[32]) {
                    fireball()
            }

                


            else if (keys[38] && keys[39]) {
                console.log("left")
                if (jump === false && rightBlock === false && rightEdge === false  && onBlock === false) {
                    drop = 21
                    distance = -0.1
                    jumping()
                    setTimeout(function() {
                        fireHeight = 6
                    },200)
                
                }
                else if (jump === false && rightBlock === true && baseBlock === false) {
                    drop = 18
                    distance = -0.3
                    rightBlock = false
                    onBlock = true;
                    jumping()
                    fireHeight = 20;
                
                }
                else if (jump === false && rightBlock === true  && baseBlock === true) {
                    drop = 18
                    bounce = 14
                    distance = -0.3
                    rightBlock = false
                    onBlock = true;
                    onTop = true;
                    jumping()
                    fireHeight = 34
                
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
    if (gameOver === false) {
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

    }

});


$(document).keydown(function( event ) {
    if ( event.keyCode === 32) {
        fireball()
    }
})

});