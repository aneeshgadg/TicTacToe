let timer;
window.currentPlayer = '';

function reset(){
  var tiles = document.querySelectorAll('.board > div');
  tiles.forEach(function (tile){
    tile.innerHTML = '';
    tile.classList.remove('champ');
  });
   document.getElementById('PlayerCounter').innerHTML = '';
  document.getElementById('player1score').innerHTML = '0 pts'; document.getElementById('player2score').innerHTML = '0 pts';
 clearInterval(timer);
  }

function full(){
  var tiles = document.querySelectorAll('.board > div');
  for(var i = 0; i < tiles.length; i++){
    if(tiles[i].innerHTML == ''){
      return false;
    }
  }
  return true;
}


function hasWinner() {
  var diagonal1 = false;
  var diagonal2 = false;
  var horizontal1 = false;
  var horizontal2 = false;
  var horizontal3 = false;
  var vertical1 = false;
  var vertical2 = false;
  var vertical3 = false;
  
  
  if (
    document.getElementById('sq1').innerHTML !== '' &&
    document.getElementById('sq1').innerHTML === document.getElementById('sq5').innerHTML &&
    document.getElementById('sq5').innerHTML === document.getElementById('sq9').innerHTML
  ) {
    diagonal1 = true;
     document.getElementById('sq1').classList.add('champ');
    document.getElementById('sq5').classList.add('champ');
    document.getElementById('sq9').classList.add('champ');
  }

  else if (
    document.getElementById('sq3').innerHTML !== '' &&
    document.getElementById('sq3').innerHTML === document.getElementById('sq5').innerHTML &&
    document.getElementById('sq5').innerHTML === document.getElementById('sq7').innerHTML
  ) {
    diagonal2 = true;
    document.getElementById('sq3').classList.add('champ');
    document.getElementById('sq5').classList.add('champ');
    document.getElementById('sq7').classList.add('champ');
  }

  else if (
    document.getElementById('sq2').innerHTML !== '' &&
    document.getElementById('sq1').innerHTML === document.getElementById('sq2').innerHTML &&
    document.getElementById('sq2').innerHTML === document.getElementById('sq3').innerHTML
  ) {
    horizontal1 = true;
    document.getElementById('sq1').classList.add('champ');
    document.getElementById('sq2').classList.add('champ');
    document.getElementById('sq3').classList.add('champ');
  }

  else if (
    document.getElementById('sq4').innerHTML !== '' &&
    document.getElementById('sq4').innerHTML === document.getElementById('sq5').innerHTML &&
    document.getElementById('sq5').innerHTML === document.getElementById('sq6').innerHTML
  ) {
    horizontal2 = true;
    document.getElementById('sq4').classList.add('champ');
    document.getElementById('sq5').classList.add('champ');
    document.getElementById('sq6').classList.add('champ');
  }

  else if (
    document.getElementById('sq7').innerHTML !== '' &&
    document.getElementById('sq7').innerHTML === document.getElementById('sq8').innerHTML &&
    document.getElementById('sq8').innerHTML === document.getElementById('sq9').innerHTML
  ) {
    horizontal3 = true;
    document.getElementById('sq7').classList.add('champ');
    document.getElementById('sq8').classList.add('champ');
    document.getElementById('sq9').classList.add('champ');
  }

  else if (
    document.getElementById('sq1').innerHTML !== '' &&
    document.getElementById('sq1').innerHTML === document.getElementById('sq4').innerHTML &&
    document.getElementById('sq4').innerHTML === document.getElementById('sq7').innerHTML
  ) {
    vertical1 = true;
    document.getElementById('sq1').classList.add('champ');
    document.getElementById('sq4').classList.add('champ');
    document.getElementById('sq7').classList.add('champ');
  }

  else if (
    document.getElementById('sq2').innerHTML !== '' &&
    document.getElementById('sq2').innerHTML === document.getElementById('sq5').innerHTML &&
    document.getElementById('sq5').innerHTML === document.getElementById('sq8').innerHTML
  ) {
    vertical2 = true;
    document.getElementById('sq2').classList.add('champ');
    document.getElementById('sq5').classList.add('champ');
    document.getElementById('sq8').classList.add('champ');
  }

  else if (
    document.getElementById('sq3').innerHTML !== '' &&
    document.getElementById('sq3').innerHTML === document.getElementById('sq6').innerHTML &&
    document.getElementById('sq6').innerHTML === document.getElementById('sq9').innerHTML
  ) {
    vertical3 = true;
    document.getElementById('sq3').classList.add('champ');
    document.getElementById('sq6').classList.add('champ');
    document.getElementById('sq9').classList.add('champ');
  }

  return (
    diagonal1 || diagonal2 ||
    horizontal1 ||
    horizontal2 ||
    horizontal3 ||
    vertical1 ||
    vertical2 ||
    vertical3
  );
}





 function openDialog() {
        document.getElementById("dialog-overlay").style.display = "block";
        document.getElementById("dialog-box").style.display = "block";
      }

      function closeDialog() {
        document.getElementById("dialog-overlay").style.display = "none";
        document.getElementById("dialog-box").style.display = "none";
      }

function setPlayers(){
 
  if(document.getElementById('p1').value == ''){
    document.getElementById('p1').classList.add('has-error');
  }
  
   if(document.getElementById('p2').value == ''){
     document.getElementById('p2').classList.add('has-error');
  }
  
  if(!document.getElementById('p1').classList.contains('has-error') && !document.getElementById('p2').classList.contains('has-error')){
    document.getElementById('player1title').innerHTML = document.getElementById('p1').value;
   document.getElementById('player1score').innerHTML = '0 pts';
  
  document.getElementById('player2title').innerHTML = document.getElementById('p2').value;
  
   document.getElementById('player2score').innerHTML = '0 pts';
  
  document.getElementById('p1').value = '';
  document.getElementById('p2').value = '';
  closeDialog();
  playGame();
  }
  document.getElementById('p1').classList.remove('has-error');
  document.getElementById('p2').classList.remove('has-error');
  
}

function playGame() {
  const pl1 = 'X';
  const pl2 = 'O';
  const numMatches = numberofGames();
  window.currentPlayer = Math.random() < 0.5 ? pl1 : pl2;
  
  
  if (window.currentPlayer === pl1) {
    document.getElementById('PlayerCounter').innerHTML = document.getElementById('player1title').innerHTML + " is up first";
  } else {
    document.getElementById('PlayerCounter').innerHTML = document.getElementById('player2title').innerHTML + " is up first";
  }
  
  startTimer();
  
  const tiles = document.querySelectorAll('.board > div');
  
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      if (tile.innerHTML === '') {
        tile.innerHTML = window.currentPlayer;
        window.currentPlayer = window.currentPlayer === pl1 ? pl2 : pl1; 
        if (hasWinner()) { 
          clearInterval(timer);
          setTimeout(() => {
            if(window.currentPlayer === pl1){
              incrementScore(pl2);
              if((parseInt(document.getElementById('player2score').innerText) == winsRequired())){
                alert('Winner is ' + document.getElementById('player2title').innerHTML + '! Game Over!');
                reset();
              }
              else{
               alert('Winner is ' + document.getElementById('player2title').innerHTML + '!');
               newRound();
              }
            }
            
            else{
              incrementScore(pl1);
              if((parseInt(document.getElementById('player1score').innerText) == winsRequired())){
                alert('Winner is ' + document.getElementById('player1title').innerHTML + '! Game Over!');
                reset();
              }
              else{
                alert('Winner is ' + document.getElementById('player1title').innerHTML + '!');
                newRound();
              }
             
            }
          }, 1000);
        }
        if(!hasWinner() && full()){
          clearInterval(timer);
          setTimeout(() => {
            alert('Tie!');
            newRound();
          }, 1000);
        }
         if (window.currentPlayer === 'X') {
           PlayerCounter.innerHTML = document.getElementById('player1title').innerHTML + "'s turn";
         } 
        else {
          PlayerCounter.innerHTML = document.getElementById('player2title').innerHTML + "'s turn";
        }
        clearInterval(timer);
        startTimer();
      }
    });
  });
}

function numberofGames(){
  var num = document.getElementsByName("games");
  for(let a = 0; a < num.length; a++){
    if (num[a].checked){
      selected = num[a].value;
      break;
    }
  }
  return selected;
}

function winsRequired(){
  if(numberofGames() == '1'){
    return 1;
  }
  else if(numberofGames() == '3'){
    return 2;
  }
  else{
    return 3;
  }
}

function incrementScore(p){
  const score = p == 'X' ? 'player1score' : 'player2score';
  const curr_score = parseInt(document.getElementById(score).innerText);
  document.getElementById(score).innerText = (curr_score + 1) + ' pts';
}

function newRound(){
  var tiles = document.querySelectorAll('.board > div');
  tiles.forEach(function (tile){
    tile.innerHTML = '';
    tile.classList.remove('champ');
  });
  endTimer();
  }



function startTimer() {
  const pl1 = 'X';
  const pl2 = 'O';
  const numMatches = numberofGames();
  var sec = 3;
  const time = document.getElementById('timekeeper');
  
  time.innerHTML = 'Time 00:0' + sec;

  timer = setInterval(() => {
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      let tiles = document.querySelectorAll('.board > div');
      let emptyTiles = [];
      tiles.forEach(tile => {
        if (tile.innerHTML == '') {
          emptyTiles.push(tile)
        }
      });
      const newTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      newTile.innerText = window.currentPlayer;

      if (hasWinner()) {
        clearInterval(timer);
        setTimeout(() => {
          if (window.currentPlayer === pl1) {
            incrementScore(pl2);
            if ((parseInt(document.getElementById('player2score').innerText) == winsRequired())) {
              alert('Winner is ' + document.getElementById('player2title').innerHTML + '! Game Over!');
              reset();
            } else {
              alert('Winner is ' + document.getElementById('player2title').innerHTML + '!');
              newRound();
            }
          } else {
            incrementScore(pl1);
            if ((parseInt(document.getElementById('player1score').innerText) == winsRequired())) {
              alert('Winner is ' + document.getElementById('player1title').innerHTML + '! Game Over!');
              reset();
            } else {
              alert('Winner is ' + document.getElementById('player1title').innerHTML + '!');
              newRound();
            }

          }
        }, 1000);
      }
      if (!hasWinner() && full()) {
        clearInterval(timer);
        setTimeout(() => {
          alert('Tie!');
          newRound();
        }, 1000);
      }

      window.currentPlayer = window.currentPlayer == 'X' ? 'O' : 'X';
      if (window.currentPlayer === 'X') {
        PlayerCounter.innerHTML = document.getElementById('player1title').innerHTML + "'s turn";
      } 
      else {
        PlayerCounter.innerHTML = document.getElementById('player2title').innerHTML + "'s turn";
      }
      startTimer();
    } 
    else {
      time.innerHTML = 'Time 00:0' + sec;
    }
  }, 1000);
}

function endTimer(){
  let time = document.getElementById('timekeeper');
  time.innerHTML = '00:00';
}


function compPlayed(ans){
  return ans;
}