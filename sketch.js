//Animation
//Fielder move
//Bat swing
//Batsmen run for a run

var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;

var batsmen1,batsmen2;
var bowler;
var fielder1, fielder2, fielder3, fielder4, fielder5, fielder6, fielder7, fielder8, fielder9;
var bat, ball;
var Swicket, NSwicket;
var StraightBoundary, OffBoundary, LegBoundary;

var runs = 0;

function preload(){

}

function setup(){
    createCanvas(800,800);

    batsmen1 = createSprite(400,700,20,20);
    batsmen2 = createSprite(350,350,20,20);
    bowler = createSprite(425,350,20,20);
    fielder1 = createSprite(250,100,20,20);
    fielder2 = createSprite(150,300,20,20);
    fielder3 = createSprite(200,450,20,20);
    fielder4 = createSprite(200,600,20,20);
    fielder5 = createSprite(450,700,20,20);
    fielder6 = createSprite(650,650,20,20);
    fielder7 = createSprite(525,500,20,20);
    fielder8 = createSprite(650,300,20,20);
    fielder9 = createSprite(550,100,20,20);
    bat = createSprite(400,675,10,25);
    ball = createSprite(425,360,10,10);
    Swicket = createSprite(400,710,25,10);
    NSwicket = createSprite(400,340,25,10);
    STRBoundary = createSprite(400,10,800,20);
    OFFBoundary = createSprite(790,400,20,800);
    LEGBoundary = createSprite(10,400,20,800);
    BEBoundary = createSprite(400,790,800,20);
}

function draw(){
    background("black");
    bat.debug = true;

    //Colors
    batsmen1.shapeColor = "blue"
    batsmen2.shapeColor = "blue"
    bowler.shapeColor = "green"
    fielder1.shapeColor = "red"
    fielder2.shapeColor = "red"
    fielder3.shapeColor = "red"
    fielder4.shapeColor = "red"
    fielder5.shapeColor = "red"
    fielder6.shapeColor = "red"
    fielder7.shapeColor = "red"
    fielder8.shapeColor = "red"
    fielder9.shapeColor = "red"
    bat.shapeColor = "yellow"
    ball.shapeColor = "orange"

    //Ball is Bowled
    var randx = random(395,410);
    var randy = random(550,700);
    //var randVX = random(5,15);
    var randVY = random(5,15);
    if(keyDown("space")&& gameState === START){
    ball.x = randx;
    ball.y = randy;
    //ball.velocityX = randVX;
    ball.velocityY = randVY;
    gameState = PLAY;
    }

    //Ball is hit
    var rand1 = random(3,10);
    var rand2 = random(-10,10);
    var rand3 = random(-10,-3);
    var rand4 = random(-10,10);
    
    if(bat.isTouching(ball) && gameState === PLAY){
        ///console.log("hi")
        if(ball.x > 400){
            ball.velocityX = rand1;
            ball.velocityY = rand2;
        }
        if(ball.x < 400){
            ball.velocityX = rand3;
            ball.velocityY = rand4;
        }
    }

    //Runs
    runCounter();
    ballReturn();
    textSize(30);
    text("Runs: "+ runs,400,100);

    //Reset Function
    if(ball.isTouching(Swicket)){
        reset();
    }
    
    drawSprites();
}

function ballReturn() {
    //Ball collection - Fielder 1
    if(gameState === PLAY && ball.x>200 && ball.x<300 && ball.y>50 && ball.y<150){
        fielder1.x = ball.x;
        fielder1.y = ball.y;
    }

    //Ball collection - Fielder 2
    if(gameState === PLAY && ball.x>100 && ball.x<200 && ball.y>250 && ball.y<350){
        fielder2.x = ball.x;
        fielder2.y = ball.y;
    }

    //Ball collection - Fielder 3
    if(gameState === PLAY && ball.x>150 && ball.x<250 && ball.y>400 && ball.y<500){
        fielder3.x = ball.x;
        fielder3.y = ball.y;
    }

    //Ball collection - Fielder 4
    if(gameState === PLAY && ball.x>150 && ball.x<250 && ball.y>550 && ball.y<650){
        fielder4.x = ball.x;
        fielder4.y = ball.y;
    }

    //Ball collection - Fielder 5
    if(gameState === PLAY && ball.x>400 && ball.x<500 && ball.y>650 && ball.y<750){
        fielder5.position = ball.position;
    }

    //Ball collection - Fielder 6
    if(gameState === PLAY && ball.x>600 && ball.x<700 && ball.y>600 && ball.y<700){
        fielder6.position = ball.position;
    }

    //Ball collection - Fielder 7
    if(gameState === PLAY && ball.x>475 && ball.x<575 && ball.y>450 && ball.y<550){
        fielder7.position = ball.position;
    }

    //Ball collection - Fielder 8
    if(gameState === PLAY && ball.x>600 && ball.x<700 && ball.y>250 && ball.y<350){
        fielder8.position = ball.position;
    }

    //Ball collection - Fielder 9
    if(gameState === PLAY && ball.x>500 && ball.x<600 && ball.y>50 && ball.y<150){
        fielder9.position = ball.position;
    }

    if(ball.isTouching(fielder1)||ball.isTouching(fielder2)||ball.isTouching(fielder3)||ball.isTouching(fielder4)||ball.isTouching(fielder5)||ball.isTouching(fielder6)||ball.isTouching(fielder7)||ball.isTouching(fielder8)||ball.isTouching(fielder9) || ball.isTouching(STRBoundary)||ball.isTouching(OFFBoundary)||ball.isTouching(LEGBoundary)||ball.isTouching(BEBoundary)){
        ball.velocityX = 0;
        ball.velocityY = 0;
        ball.x = 425;
        ball.y = 360;
        gameState = START;
    }

    //Resteting Fielders
    if(gameState === START){
    fielder1.x = 250;
    fielder1.y = 100;
    fielder2.x = 150;
    fielder2.y = 300;
    fielder3.x = 200;
    fielder3.y = 450;
    fielder4.x = 200;
    fielder4.y = 600;
    fielder5.x = 450;
    fielder5.y = 700;
    fielder6.x = 650;
    fielder6.y = 650;
    fielder7.x = 525;
    fielder7.y = 500;
    fielder8.x = 650;
    fielder8.y = 300;
    fielder9.x = 550;
    fielder9.y = 100;
    }
}

function runCounter (){
    if(ball.isTouching(fielder1)){
        runs = runs+3;
    }

    if(ball.isTouching(fielder2)){
        runs = runs+2;
    }

    if(ball.isTouching(fielder3)){
        runs = runs+1;
    }

    if(ball.isTouching(fielder4)){
        runs = runs+1;
    }

    if(ball.isTouching(fielder5)){
        runs = runs+0;
    }

    if(ball.isTouching(fielder6)){
        runs = runs+2;
    }

    if(ball.isTouching(fielder7)){
        runs = runs+1;
    }

    if(ball.isTouching(fielder8)){
        runs = runs+2;
    }

    if(ball.isTouching(fielder9)){
        runs = runs+3;
    }

    if(ball.isTouching(STRBoundary)){
        runs = runs+4;
    }

    if(ball.isTouching(OFFBoundary)){
        runs = runs+4;
    }

    if(ball.isTouching(LEGBoundary)){
        runs = runs+4;
    }

    if(ball.isTouching(BEBoundary)){
        runs = runs+4;
    }
}

function reset(){
    batsmen1.hide();
    batsmen2.hide();
    bowler.hide();
    fielder1.hide();
    fielder2.hide();
    fielder3.hide();
    fielder4.hide();
    fielder5.hide();
    fielder6.hide();
    fielder7.hide();
    fielder8.hide();
    fielder9.hide();
    bat.hide();
    ball.hide();
    Swicket.hide();
    NSwicket.hide();
    STRBoundary.hide();
    OFFBoundary.hide();
    LEGBoundary.hide();
    BEBoundary.hide();

    textSize(40);
    text("Total Runs: ",+ runs,250,400);
}

function restart(){

}