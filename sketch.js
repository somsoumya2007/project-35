var sadDog , happyDog;
var dog , happydog;
var foodTime,lastFed , feed , addFood;
var feed;



function preload(){
	sadDog = loadImage("dog.png");
  happyDog = loadImage("happydog.png");


}

function setup() {
	 database = firebase.database()

   createCanvas(1000,500);

   foodObj = new Food();

   dog = createSprite (250,250,50,50);
   dog.addImage(sadDog);
   dog.scale=0.15;

   feed=createButton(800,200,150,150);
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood=createButton("Add Food")
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

}


function draw() {  
  background("blue");

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val(); 

  })

  fill(255,255,254);
 
  textSize(15);
  if(lastFed >= 12 ){
    text(" Last Feed: "+ lastFed %12+ "PM",350,30);
  }
 else if(lastFed == 0){
   text(" Last Feed : 12AM " );
 }
 else{
   text(" Last Feed: " + lastFed + "AM",350,30);
 }


  drawSprites();
  //add styles here

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
   Food: foodObj.getFoodStock(),
   FeedTime : hour()

  })
}

function addFoods(){
   foodS++ ;
   database.ref('/').update({
    Food : foodS
  })
}









