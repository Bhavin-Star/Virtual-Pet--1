var dog1, dog, happydog, database, foodstock, foodS;

function preload()
{
  dog1 = loadImage('images/dogImg.png');
  happydog = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage('sadDog',dog1);
  dog.addImage('happyDog',happydog);
  dog.scale = 0.4;

  database = firebase.database();
  foodstock = database.ref('Food');
  foodstock.on('value',readStock);
}


function draw() {  
 
  background('white');

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage('happyDog',happydog);
  }

  drawSprites();
  
  text(foodS,20,20);

}

function readStock(data){

  foodS = data.val();
}

function writeStock(food){

  
  if(food<=0){
    food = 0;
  }
  
  else{
    food = food - 1;
  }


  database.ref('/').update({
    Food: food
  })
}
