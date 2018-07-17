window.addEventListener('DOMContentLoaded', () => {
  let gameRunning = false;
  const box = document.querySelector('.box');
  let topColArr;
  let bottomColArr;
  let columnArr;
  let randomTop;
  let randomBottom;
  let topColCheck = 0;
  let left0 = 500;
  // let charTop = 280;
  const charLeft = box.offsetLeft;
  const charRight = parseInt(charLeft) + 60 + 'px';
  box.style.top = 280 + 'px';
  let speed = 250;
  let collision = false;

  //generate random heights for columns
  function heightGenerator() {
    randomTop = Math.floor(Math.random()*600);
    randomBottom = Math.floor(Math.random()*600);

    if (randomBottom > 150 && randomTop > 150 && (randomTop + randomBottom) > 500 && (randomTop + randomBottom) < 520) {
      return;
    } else {
      heightGenerator();
    }
  }

  //generates left gap for each newly generated column
  function leftGenerator() {
    if (topColArr.length === topColCheck ) {
      topColArr[topColCheck-1].style.left = left0  + 'px';
      bottomColArr[topColCheck-1].style.left = left0 + 'px';
      left0 = left0 + 325;
      topColArr[topColCheck-1].classList.toggle('hidden');
      bottomColArr[topColCheck-1].classList.toggle('hidden');
    }
  }

  //generates columns and appends them to 'columns' class
  function generateColumns() {

    const colGenInterval = window.setInterval(()=> {
      heightGenerator();
      $('<div>').addClass('topColumn column hidden').css({backgroundColor: '#85144b', height: randomTop, width: 100, position: 'absolute', top: 0 }).appendTo('.columns');
      $('<div>').addClass('bottomColumn column hidden').css({backgroundColor: '#85144b', height: randomBottom, width: 100, position: 'absolute', bottom: 0 }).appendTo('.columns');
      topColArr = document.querySelectorAll('.topColumn');
      bottomColArr = document.querySelectorAll('.bottomColumn');
      columnArr = document.querySelectorAll('.column');
      topColCheck++;
      leftGenerator();

      if (collision) {
        clearInterval(colGenInterval);
      }
    }, speed);
  }

  //moves the columns from right to left
  function moveColumns() {
    const moveInterval =   window.setInterval(() => {
      columnArr = document.querySelectorAll('.column');
      columnArr.forEach(function(item) {
        item.style.left = parseInt(item.style.left) - 5 + 'px';
      });
      if (collision) {
        clearInterval(moveInterval);
      }
    }, 25);
  }
  
  //gravity
  let yVelocity = 0;
  let yPos = 280;
  const gravity = 0.5;

  function calculateY() {
    if(yPos < 620) {
      yPos -= yVelocity;
      yVelocity -= gravity;
    }
  }

  function drawCharacter() {
    box.style.top = `${parseInt(yPos)}px`;
  }

  window.addEventListener('keydown', e => {
    if (e.which === 32) {
      e.preventDefault();
      yVelocity = 5;
    }

  });

  setInterval( function(){
    if(gameRunning) {
      calculateY();
      drawCharacter();
    }
  }, 1000/30);

  //checks if character is dead
  function isDead() {
    let index = 0;
    const scoreDiv = document.querySelector('.score');
    scoreDiv.textContent = index;
    const collisionInterval = setInterval(function(){
      topColArr = document.querySelectorAll('.topColumn');
      const divRight = parseInt(topColArr[index].style.left + 100 + 'px');

      const charBottom = parseInt(box.style.top) + 60 + 'px';

      if ((box.style.top <= topColArr[index].style.height || parseInt(charBottom) >= bottomColArr[index].offsetTop)
      && (charRight >= topColArr[index].style.left && charLeft <= divRight)) {
        console.log('collision!!!');
        box.style.transform = 'rotate(70deg)';
        collision = true;
        clearInterval(collisionInterval);

        return;
      } else if ((parseInt(divRight) + 85) < charLeft){
        // console.log('crossed');
        index = index + 1;
        scoreDiv.textContent = index;
        return false;
      }
    }, 100);
  }

  //controls all functions from start screen
  function startScreen() {
    $('.start-screen').toggleClass('hidden');
    $('.game-container').toggleClass('hidden');
    const countdownDiv = $('.countdown');
    let time = 2;
    const countdownInterval = setInterval(function() {
      console.log(time);
      console.log();
      countdownDiv.html(time);
      time = time - 1;
    },1000);

    setTimeout(function() {
      clearInterval(countdownInterval);
      $('.countdown').toggleClass('hidden');
      if(!gameRunning) {
        gameRunning = true;
        // controlChar();
        moveColumns();
        isDead();
      }
    }, 3000);
  }

  // listens for the enter key and then starts the game
  if(!gameRunning) {
    generateColumns(randomTop,randomBottom);
    $(window).keypress(function(e) {
      if(e.which === 13) {
        startScreen();
        speed = 1500;
        return true;
      }
    });
  }

}); //closes DOM listener
