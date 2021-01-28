//Create variables here

var dog, HappyDog,HungryDog;
var Database,FoodStock,FoodS;
function preload()
{
  //load images here
  HappyDog=loadImage("dogImg1.png")
  HungryDog=loadImage("dogImg.png")
  
}

function setup() {
  createCanvas(600,500);
 
  dog=createSprite(250,250,2,2);
  dog.addImage(HungryDog);
  dog.scale=0.3;
  Database=firebase.database();
  FoodStock=Database.ref("Food")
  FoodStock.on("value",ReadStock)
  FoodS=FoodStock
  
  
}


function draw() { 
  
  background(46, 139, 87)
  
  drawSprites();
  function ReadStock(data){
    FoodS=data.val();
  }
  function WriteStock(x){
    if(x<=0){
      x=0
    }
    else{
      x=x-1
    }
    database.ref('/').update({
      Food:x
    })
    
  }
  ReadStock()
  WriteStock()
  if(keyWentDown(UP_ARROW)&&frameCount%400===0){
    dog.addImage(HappyDog)
    WriteStock(FoodS)
  }
  //add styles here
  textSize(16.5);
  textFont("Baskerville")
  fill("Brown")
  text("NOTE- Every day(400 Frames), your Dog must be fed. Press the UP Arrow Key to feed",10,100)
  text("Food:"+FoodS, 250,200)
}



