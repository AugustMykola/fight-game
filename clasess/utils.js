function rectengularCollision({rectangle1, rectangle2}){
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.width >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({playerOne,playerTwo, timerId}){
  clearTimeout(timerId)
  const resultBlock =  document.querySelector('#result');
  resultBlock.style.display = "flex";
  if(playerOne.helth === playerTwo.helth){
    resultBlock.innerHTML = "Draw";
    
  } else if(playerOne.helth >= playerTwo.helth){
    resultBlock.innerHTML = "Player One wins";
    
  }else if(playerOne.helth <= playerTwo.helth){
    resultBlock.innerHTML = "Player Two wins";
    
  }
}