var dog, happyDog, database, foodS, foodStock
var dogImg, dog1Img;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dog1Img = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
 
}


function draw() {  
  background("lightgreen")

  textSize(16)
  fill(0)
  text("NOTE:PRESS UP_ARROW TO FEED TRIXY FOOD",100,100)
  text("FOOD Remaining:"+foodS,180,350);
  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog1Img);

  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }
}

if(foodS == 0){
  foodS = 20;
}

  drawSprites();
  
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

