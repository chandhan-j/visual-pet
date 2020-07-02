var dog,dog_is_happy,database,foodS,foodStock,dog_normal
var database;


function preload(){
  dog_normal = loadImage("dogImg.png");
  dog_is_happy = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();


  dog = createSprite(250,250,10,10);
  dog.addImage("dog",dog_normal);
  dog.addImage("dog is happy",dog_is_happy);

  foodStock = database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  
  if(keyWentDown(UP_ARROW)){
    console.log("up");
    writeStock(foodS);
    dog.changeImage("dog is happy",dog_is_happy);
  }



  drawSprites();
  
  fill("black");
  textSize(15);
  text("press up arrow to feed the dog some milk",130,50);
  text("food remaining: " + foodS,200,150);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    food:x
  })
}



