const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var button2,button3
var bunny;
var blink,eat,sad;
var blower
var mutebutton
var bgsound,sadsound,cutsound,eatsound,airsound
var rope2,rope3
var fruit_con2
var fruit_con3
var starImg,star2, star1;
var bubble, bubbleImg
var emptymeter,onestarmeter,fullmeter
var starscore=0
var starImage
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  starImg=loadImage("star.png")
  bubbleImg=loadImage("bubble.png")
  
  emptymeter=loadImage("empty.png")
  onestarmeter=loadImage("one_star.png")
  fullmeter=loadImage("stars.png")
  bgsound=loadSound("sound1.mp3")
  cutsound=loadSound("rope_cut.mp3")
  sadsound = loadSound("sad.wav");
  eatsound = loadSound("eating_sound.mp3");
  airsound = loadSound("air.wav");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  bgsound.play()
  bgsound.setVolume(0.2)
  engine = Engine.create();
  world = engine.world;
  
  //bubble=createSprite(320,300)
  //bubble.addImage(bubbleImg)
  //bubble.scale=0.15
  
  star1=createSprite(150,430)
  star1.addImage(starImg)
  star1.scale=0.02

  star2=createSprite(250,80)
  star2.addImage(starImg)
  star2.scale=0.02
  

  blower=createImg("balloon2.png")
  blower.position(170,350)
  blower.size(100,150)
  blower.mouseClicked(moveUp)
  
  button = createImg('cut_btn.png');
  button.position(180,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  button2= createImg("cut_btn.png")
  button2.position(40,40)
  button2.size(50,50)
  button2.mouseClicked(drop2)
  
  button3=createImg("cut_btn.png")
  button3.position(370,180)
  button3.size(50,50)
  button3.mouseClicked(drop3)
  
  mutebutton=createImg("mute.png")
  mutebutton.position(400,20)
  mutebutton.size(50,50)
  mutebutton.mouseClicked(mute)
  
  rope = new Rope(7,{x:200,y:30});
  rope2= new Rope(8,{x:50,y:40})
  rope3= new Rope(8,{x:400,y:180})
  
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(150,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(197,258,20);
  Matter.Composite.add(rope2.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2= new Link(rope2,fruit)
  fruit_con3= new Link(rope3,fruit)
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
  console.log(starscore)
  //console.log(fruit.position.x, fruit.position.y)
  
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show()
  rope3.show()
  
  if(starscore===0){
    starImage=emptymeter
  }
  else if(starscore===1){
    starImage=onestarmeter
  }
  else if(starscore===2){
    starImage=fullmeter
  }
  image(starImage,70,25,120,45)
  
  Engine.update(engine);
  ground.show();

  
  
  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    eatsound.play()
    World.remove(engine.world,fruit);
    fruit = null;
  }
   
  if(collide(fruit,ground.body,80)==true )
  {
     bunny.changeAnimation('crying');
     bgsound.stop()
     sadsound.play()
     sadsound.setVolume(0.3)
   }
   if(collide(fruit,star2,50)){
    star2.x=800
    starscore++
   }
   if(collide(fruit,star1,50)){
    star1.x=900
    starscore++
   }
  //if(collide(fruit,bubble,40)==true){
   // engine.world.gravity.y=-0.001
   // bubble.x=fruit.position.x
   // bubble.y=fruit.position.y
  //}

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutsound.play()
}

function drop2(){
  rope2.break()
  fruit_con2.dettach()
  fruit_con2=null
  cutsound.play()
}

function drop3(){
  rope3.break()
  fruit_con3.dettach()
  fruit_con3=null
  cutsound.play()
}

function collide(body,sprite, x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
             
               return true; 
            }
            else{
              return false;
            }
         }
}

function moveUp(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03})
  airsound.play()
  airsound.setVolume(0.1)
}

function mute(){
  if(bgsound.isPlaying()){
    bgsound.stop()
  }
  else{
    bgsound.play()
  }

}