var player;
var playerImg,playerjumpImg,playerrunImg,door1Img;
var door1;
var START= 0;
var LEVEL1= 1;
var LEVEL2= 2;
var END=3;
var WIN=4;
var gameState = START;
var ground;
var obstacle1, obstacle1Img;
var obstacle2, obstacle2img;
var obstacle1Group,obstacle2Group;
var door2
function preload(){
playerImg= loadImage("assets/player.png");
playerjumpImg = loadAnimation("assets/player-jumping.png","assets/player-jumping_2.png")
playerrunImg = loadAnimation("assets/player-running 1.png","assets/player-running 2.png")
doorImg = loadImage("assets/door.png")
obstacle1Img = loadImage("assets/image-removebg-preview (5).png")
obstacle2img1= loadImage("assets/vampire1.png")
obstacle2img2= loadImage("assets/zombie1.png")
}

function setup(){
  createCanvas(2500,400)
 player = createSprite(25,300,50,10);
 player.addImage("jump",playerImg);

 //player.addAnimation("jumping",playerjumpImg)
 player.scale = 0.5

 obstacle1Group = createGroup();

 ground = createSprite(1250,360,2500,20);
 /*player.visible=true;
 door1.visible=true;
 ground.visible=true;*/

 player.debug=true;
 door1 = createSprite(2450,300,50,10);
 door1.addImage(doorImg);
 door1.scale=0.3
 
 door2 = createSprite(2450,300,50,10);
 door2.addImage(doorImg);
 door2.scale=0.3
}

function draw() {
  background("black");
  
  if(gameState===START){
    text("YOU TRAPPED IN A HAUNTED HOUSE. REACH THE door1 TO ESCAPE",300,50);
    text("PRESS SPACE TO START",450,100);
    if(keyDown("space")){
      gameState=LEVEL1;

      /*player.visible=true;
      door1.visible=true;
      ground.visible=true;*/
    }
  }
  if(gameState===LEVEL1){
   
  if(keyDown("w")) {
    player.addAnimation("jump",playerjumpImg)
    player.y=player.y-20;
  }
  if(keyDown("d")) {
    player.addAnimation("run",playerrunImg)
    player.x += 12;
  
 }
  if(player.isTouching(door1)){
    gameState=LEVEL2;
    obstacle1Group.destroyEach();
    door1.destroy();
  }
  if(player.isTouching(obstacle1Group)){
    gameState=END;
  }
  spawnObstacleslevel1()
 
  }

  if(gameState===LEVEL2){
    fill("red")
    text("REACH THE NEXT DOOR TO ESCAPE",300,50)
    
  
   
    door2.velocityX=-5
     player.x=25;
     player.y=300;
  
    ground.velocityX=-5
    
    if(keyDown("w")) {
      player.addAnimation("jump",playerjumpImg)
      player.y = player.y-12;
    }

    if(keyDown("d")) {
      player.changeAnimation("run",playerrunImg)
      player.x += 12;
    
      if(player.isTouching(door2)){
        gameState=WIN;
      }
   }
  }
  
  else if(gameState===END){
    fill("white")
    text("you lost better luck next time",300,50)

  

    /*player.visible=false;
    door.visible=false;
    ground.visible=false;*/
   
   

  }
  else if(gameState===WIN){
    player.destroy()
    door2.destroy()
    ground.destroy()
    obstacle2Group.destroyEach()
    obstacle1Group.destroyEach()

    fill("white")
    text("you own the game ")
  }
  player.velocityY+=0.8;
  player.collide(ground);
  drawSprites();
}

function spawnObstacleslevel1() {
  if(frameCount % 100 === 0){
    obstacle1=createSprite(25,300,20,20)
   // obstacle1.y = Math.round(random(400,2540))
   obstacle1.x= player.x+250
    obstacle1.addImage(obstacle1Img);
    obstacle1.scale=0.2;
    obstacle1Group.add(obstacle1)
  }
  //obstacle1.debug=true

}

function spawnObstacleslevel2() {
  if(frameCount % 100 === 0){
    obstacle2=createSprite(25,300,20,20)
   // obstacle1.y = Math.round(random(400,2540))
   obstacle2.x= player.x+250

   var rand = Math.round(random(1,3));
   switch(rand) {
    case 1: obstacle2.addImage(obstacle1);
            break;
    case 2: obstacle2.addImage(obstacle2img1);
            break;
    case 3: obstacle2.addImage(obstacle2img2);
            break;
    default: break;
  }

    obstacle2.scale=0.2;
  }
 obstacle2.debug=true
}