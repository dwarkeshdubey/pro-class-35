var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,700);

  balloon=createSprite(650,150,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.3;

  //textSize(20); 
  var balloonPosition=database.ref('balloon/height')
  balloonPosition.on("value",readHeight,showError)
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10,0)
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
   
    //balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updateHeight(0,10)
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/height').set({
    x: height.x + x,
    y: height.y + y
  })
  //balloon.x = balloon.x + x;
   // balloon.y = balloon.y + y;
}

function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}
function showError(){
  console.log("Error");
}






