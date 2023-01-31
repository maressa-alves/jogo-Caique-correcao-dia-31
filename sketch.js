var gary, crey;
var ataque, ataque2 , ataqueImgDireita, ataqueImgEsquerda;
var garyImgParado, lalauInimigo;
var chao, chaoIMG;
var garyAtaqueD, garyAtaqueE;
//var mal , mal1 , mal2
var corridaDireita, corridaEsquerda;
var pulo;
var bolaFogo, bolaFogoIMG 
var ataqueESP = 0;
var vida = 3
var garyColisao, creyColisao;

function preload(){
  ataqueImgDireita = loadImage("assets/imported piskel (3).gif");
  ataqueImgEsquerda = loadImage("assets/imported piskel (4).gif");
  garyImgParado = loadImage("assets/Gparada.png");
  lalauInimigo = loadImage("assets/ini1.gif");
  chaoIMG = loadImage("assets/começo.gif");
  garyAtaqueD  = loadImage("assets/Gataque.png");
  garyAtaqueE  = loadImage("assets/GataqueE.png");
  corridaDireita = loadAnimation("assets/GA1.png","assets/GA3.png","assets/GA2.png","assets/GA4.png","assets/GA6.png","assets/GA5.png");
  corridaEsquerda = loadAnimation("assets/GA1-esquerda.png","assets/GA3-esquerda.png","assets/GA2-esquerda.png","assets/GA4-esquerda.png","assets/GA6-esquerda.png","assets/GA5-esquerda.png");
  pulo  = loadImage("assets/Gpulo.png");
  bolaFogoIMG = loadImage("assets/bolaDeFogo.gif");
} 


function setup(){
  createCanvas(1365,650);
  gary = createSprite(100,450,50,50);
  garyColisao = createSprite(gary.x, gary.y-70,70,100);

  //ADD TODAS AS IMAGENS AO GARY
  gary.addImage("parado", garyImgParado);
  gary.addAnimation("runing",corridaDireita);
  gary.addAnimation("runingEsquerda",corridaEsquerda);
  gary.addAnimation("ataque-direita", garyAtaqueD);
  gary.addAnimation("ataque-esquerda", garyAtaqueE);
  gary.addImage("pulo", pulo);


  crey = createSprite(500,440,50,50);
  crey.addImage(lalauInimigo);
  crey.scale = 1.5;
  creyColisao = createSprite(crey.x, crey.y-50, 70, 70);
  ataque = createSprite(1, 1, 1, 1);
  ataque.addImage("faca",ataqueImgDireita);
  ataque.visible = false ;
  ataque.scale = 0.2;

  ataque2 = createSprite(1, 1, 1, 1);
  ataque2.addImage("faca", ataqueImgEsquerda);
  ataque2.visible = false ;
  ataque2.scale = 0.2;

  chao = createSprite(300,450,650,50);

  gary.debug = true;
  crey.debug = true;
  ataque.debug = false;
  chao.visible = false; 

  gary.setCollider("rectangle",0, -30, 80,90);
  crey.setCollider("rectangle",0,0, 50, 50);
  garyColisao.visible = false;
  creyColisao.visible = false;
}

function draw() {
  background(chaoIMG);
  
 // camera.position.y = gary.y;
  //dgary.x = camera.position.x-600;
 
  if(keyDown("space") && gary.y >= 300) {
    gary.velocityY = -8;
    gary.changeImage("pulo", pulo);

  }
  
  if(garyColisao.isTouching(crey) && vida >= 1){
    vida -= 1;
  }
  
  if(garyColisao.isTouching(crey) && vida === 0){
    gary.destroy();
    garyColisao.destroy();
  }

  if(keyDown("d")){
    gary.changeAnimation("runing",corridaDireita);
    gary.x=gary.x+7 ;
    gary.scale = 1.2;
    gary.position = garyColisao.position;
   
  }else if(keyDown("a")){
    //TIRAR O FUNDO BRANCO DAS IMAGENS GA1-ESQUERDA etc...
    gary.changeAnimation("runingEsquerda",corridaEsquerda);
    gary.scale = 1.2;
    gary.x=gary.x-7 ;
  }else{
    keyReleased();
  }


  if (ataque.isTouching(crey)) {
    crey.destroy();
    ataqueESP += 10;
  }
  if(ataqueESP >= 10 && keyDown("r")){
    bolaFogo = createSprite(gary.x,gary.y-20,20,20);
    bolaFogo.velocityX = 10
    bolaFogo.addImage(bolaFogoIMG);
    ataqueESP -= 10;
  }
  gary.velocityY = gary.velocityY + 0.8;
  crey.velocityY = 8;
  gary.collide(chao);
  crey.collide(chao);
  //gary.collide(crey);
  
 
  ataquePraEsquerda();
  ataquePraDireita();
  drawSprites();

}



function keyReleased(){
  gary.changeImage("parado", garyImgParado);
  ataque.visible = false;
  ataque2.visible = false;
}

function ataquePraEsquerda(){

  if(keyDown(LEFT_ARROW)){
    gary.changeImage("ataque-esquerda", garyAtaqueE);
    ataque2.visible = true
    ataque2.x = gary.x - 30;
    ataque2.y = gary.y;
  }
}

function ataquePraDireita(){
  if(keyDown(RIGHT_ARROW)){
    gary.changeImage("ataque-direita", garyAtaqueD);
    ataque.visible = true
    ataque.x = gary.x + 30;
    ataque.y = gary.y;
  }
}


