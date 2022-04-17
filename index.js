const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.7;


canvas.width = 1024;
canvas.height=576;

c.fillRect(0, 0, canvas.width, canvas.height) // x, y pozition, wigth, height;



const background = new Sprite({
  position:{
    x:0,
    y:0
  },
  imageSrc: './assets/background.png',
  scale: 1,
  framesMax:1
});


const shop = new Sprite({
  position:{
    x:615,
    y:133
  },
  imageSrc: './assets/shop.png',
  scale: 2.7,
  framesMax:6
})

const playerOne = new Fighter({
  position:{
    x:0,
    y:0
  },
  velocity:{
    x:0,
    y:10
  },
  offset:{
    x: 0,
    y :0
  },
  imageSrc: './assets/samuraiMack/idle.png',
  scale: 2.7,
  framesMax:8,
  
  offset:{
    x: 215,
    y: 180
  },
  sprites:{
    idle:{
      imageSrc: './assets/samuraiMack/Idle.png',
      framesMax:8,
    },
    run:{
      imageSrc: './assets/samuraiMack/Run.png',
      framesMax:8,
    },
    jump:{
      imageSrc: './assets/samuraiMack/Jump.png',
      framesMax:2,
    },
    fall:{
      imageSrc: './assets/samuraiMack/Fall.png',
      framesMax:2,
    },
    attack1:{
      imageSrc: './assets/samuraiMack/Attack1.png',
      framesMax:6,
    },
    takeHit:{
      imageSrc: './assets/samuraiMack/Take Hit.png',
      framesMax:4,
    },
    death:{
      imageSrc: './assets/samuraiMack/Death.png',
      framesMax:6,
    }
  },
  attackBox:{
    offset:{
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})
playerOne.draw()

const playerTwo = new Fighter({
  position: {
    x:400,
    y:100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset:{
    x:-53,
    y:0
  },
  imageSrc: './assets/kenji/idle.png',
  scale: 2.7,
  framesMax:4,
  
  offset:{
    x: 220,
    y: 190
  },
  sprites:{
    idle:{
      imageSrc: './assets/kenji/Idle.png',
      framesMax:4,
    },
    run:{
      imageSrc: './assets/kenji/Run.png',
      framesMax:8,
    },
    jump:{
      imageSrc: './assets/kenji/Jump.png',
      framesMax:2,
    },
    fall:{
      imageSrc: './assets/kenji/Fall.png',
      framesMax:2,
    },
    attack1:{
      imageSrc: './assets/kenji/Attack1.png',
      framesMax:4,
    },
    takeHit:{
      imageSrc: './assets/kenji/Take hit.png',
      framesMax:3,
    },
    death:{
      imageSrc: './assets/kenji/Death.png',
      framesMax:7,
    }
  },
  attackBox:{
    offset:{
      x: -170,
      y: 50
    },
    width: 175,
    height: 50
  }
})
playerTwo.draw()

const keys = {

  a:{
    pressed: false
  },
  d:{
    pressed: false
  },
  w:{
    pressed: false
  },

  ArrowLeft:{
    pressed: false
  },
  ArrowRight:{
    pressed: false
  },
  ArrowUp:{
    pressed: false
  }

  
}




let timer = 90;
let timerId
function decreaseTimer(){

  if(timer > 0){
   timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  } 
  if(timer === 0) {
    determineWinner({playerOne, playerTwo, timerId})
  }

}

decreaseTimer() 

function animate(){
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black'
  c.fillRect(0,0, canvas.width, canvas.height);
  c.fillStyle= 'rgba(255,255,255,0.5)'
  c.fillRect(0,0, canvas.width, canvas.height);
  background.update();
  shop.update();
  playerOne.update();
  playerTwo.update();

  playerOne.velocity.x = 0

  
  if(keys.a.pressed && playerOne.lastKey === 'a'){
    playerOne.switchSprite('run')
    playerOne.velocity.x = -5
  }else if (keys.d.pressed && playerOne.lastKey === 'd'){
    playerOne.switchSprite('run')
    playerOne.velocity.x = 5;
  }else{
    playerOne.switchSprite('idle')
  }

  if(playerOne.velocity.y < 0){
    playerOne.switchSprite('jump')


  }else if(playerOne.velocity.y>0){
    playerOne.switchSprite('fall')
  }


  playerTwo.velocity.x = 0
  if(keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft'){
    playerTwo.velocity.x = -5;
    playerTwo.switchSprite('run');
  }else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight'){
    playerTwo.velocity.x = 5;
    playerTwo.switchSprite('run');
  }else{
    playerTwo.switchSprite('idle')
  }

  if(playerTwo.velocity.y < 0){
    playerTwo.switchSprite('jump')


  }else if(playerTwo.velocity.y>0){
    playerTwo.switchSprite('fall')
  }



  if (
    rectengularCollision({
      rectangle1: playerOne,
      rectangle2: playerTwo
    }) && 
    playerOne.isAttacking && playerOne.frameCurrent === 4
    ){ 
      playerTwo.takeHit()
      playerOne.isAttacking = false;
      
      gsap.to('#player-two-helth',{
        width: playerTwo.helth + "%"
      })
  }

  if(playerOne.isAttacking && playerOne.frameCurrent === 4){
    playerOne.isAttacking = false
  }

  if (
    rectengularCollision({
      rectangle1: playerTwo,
      rectangle2: playerOne
    }) && 
    playerTwo.isAttacking && playerTwo.frameCurrent === 2
    ){
      playerOne.takeHit()
      playerTwo.isAttacking = false
      

      gsap.to('#player-one-helth',{
        width: playerOne.helth + "%"
      })
  }

  if(playerTwo.isAttacking && playerTwo.frameCurrent === 2){
    playerTwo.isAttacking = false
  }


  if(playerOne.helth <=0 || playerTwo.helth <=0){
    determineWinner({playerOne, playerTwo,timerId})
  }
  
}

animate()


window.addEventListener('keydown', (event)=>{

  if(!playerOne.dead){

    switch(event.key){
      // player One
      case 'd':
        keys.d.pressed = true;
        playerOne.lastKey = "d"
        break
  
      case 'a':
        keys.a.pressed = true;
        playerOne.lastKey = "a"
        break
  
      case 'w':
        playerOne.velocity.y = -20
        break
  
      case ' ':
        playerOne.attack();
        break
  }
    
  }

  if(!playerTwo.dead){

    switch(event.key){
      case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        playerTwo.lastKey = "ArrowRight"
        break
      
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        playerTwo.lastKey = "ArrowLeft"
        break
      
      case 'ArrowUp':
        playerTwo.velocity.y = -20
        break
  
      case 'Enter':
        playerTwo.attack()
        break
    }
  }
  

  console.log(event.key)
})


window.addEventListener('keyup', (event)=>{
  switch(event.key){
    case 'd':
      keys.d.pressed = false
      break

    case 'a':
      keys.a.pressed = false
      break

    case 'w':
      keys.w.pressed = false;
      break
    
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break
  }
})