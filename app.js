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
  let index = 0;
  let time = 2;
  let yVelocity = 0;
  let yPos = 280;
  const gravity = 0.8;
  // let charTop = 280;
  const charLeft = box.offsetLeft;
  const charRight = parseInt(charLeft) + 60 + 'px';
  const countdownDiv = $('.countdown');
  box.style.top = 280 + 'px';
  let speed = 250;
  let columnSpeed = 25;
  let collision = false;
  let moveInterval;
  const scoreSpan = document.querySelector('#score-holder');
  const resetButton = document.querySelector('#reset-button');
  let gravityInterval;
  //multiplayer stuff
  const singlePlayer = document.querySelector('#single');
  const multiPlayer = document.querySelector('#multi');

  //scoreBoard stuff
  // *******************************************
  const highScoreForm = document.querySelector('form');
  const ul = document.querySelector('ul');
  const clearHighScores = document.querySelector('#clear-storage');
  const input = document.getElementById('score');
  const highScores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
  // localStorage.setItem('scores', JSON.stringify(itemsArray));
  // const data = JSON.parse(localStorage.getItem('scores'));
  const viewScore = document.querySelector('#view-score');

  const highScoreElements = (score) => {
    const li = document.createElement('li');
    li.textContent = `${score.name} - ${score.value}`;
    ul.appendChild(li);
  };

  highScoreForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const score = { name: input.value, value: index };
    highScores.push(score);
    localStorage.setItem('scores', JSON.stringify(highScores));
    input.value = '';
    generateHighScoreTable();
  });

  function generateHighScoreTable() {
    ul.innerHTML = '';

    highScores.sort(function (a, b) {
      return b.value - a.value;
    });
    highScores.forEach(score => {
      highScoreElements(score);
    });
  }

  clearHighScores.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  });

  viewScore.addEventListener('click', function () {
    // generateHighScoreTable();
    $('.game-container').toggleClass('hidden');
    $('.start-screen').toggleClass('hidden');
  });



  // // *******************************************


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
      left0 = left0 + 290;
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
    moveInterval = window.setInterval(() => {
      columnArr = document.querySelectorAll('.column');
      columnArr.forEach(function(item) {
        item.style.left = parseInt(item.style.left) - 5 + 'px';
      });
      if (collision) {
        clearInterval(moveInterval);
      }
    }, columnSpeed);
  }

  //gravity

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
      yVelocity = 10;
    }
  });

  function dropChar() {
    gravityInterval = setInterval( function(){
      if(gameRunning) {
        calculateY();
        drawCharacter();
      }
    }, 1000/30);
  }

  //checks if character is dead
  function isDead() {
    index = 0;
    const scoreDiv = document.querySelector('.score');
    scoreDiv.textContent = index;
    const collisionInterval = setInterval(function(){
      topColArr = document.querySelectorAll('.topColumn');
      const divRight = parseInt(topColArr[index].style.left + 100 + 'px');

      const charBottom = parseInt(box.style.top) + 68 + 'px';
      // console.log(box.style.top);

      if ((box.style.top <= topColArr[index].style.height || parseInt(charBottom) >= bottomColArr[index].offsetTop)
      && (charRight >= topColArr[index].style.left && charLeft <= divRight)) {
        // console.log('collision!!!');
        box.style.transform = 'rotate(70deg)';
        collision = true;
        clearInterval(collisionInterval);
        scoreSpan.innerHTML = index;
        $('.end-screen').toggleClass('hidden');

        return;
      } else if ((parseInt(divRight) + 65) < charLeft){
        // console.log('crossed');
        index = index + 1;
        scoreDiv.textContent = index;
        // console.log(columnArr);

        // if (parseInt(divRight) < 200) {
        //   console.log(divRight);
        //   document.querySelectorAll('.columns').removeChild(index);
        //   // columnArr.splice(index,1);
        // }
        // speed toggle
        switch (index) {
          case 10:
            columnSpeed = 20;
            clearInterval(moveInterval);
            moveColumns();
            break;
          case 20: // foo is 0 so criteria met here so this block will run
            columnSpeed = 17;
            clearInterval(moveInterval);
            moveColumns();
            break;
          case 30: // foo is 0 so criteria met here so this block will run
            columnSpeed = 14;
            clearInterval(moveInterval);
            moveColumns();
            break;
          case 50: // foo is 0 so criteria met here so this block will run
            columnSpeed = 11;
            clearInterval(moveInterval);
            moveColumns();
            break;
          case 70: // foo is 0 so criteria met here so this block will run
            columnSpeed = 9;
            clearInterval(moveInterval);
            moveColumns();
            break;
          default:
            columnSpeed = 25;
        }
        return false;
      }
    }, 50);
  }

  //controls all functions from start screen
  function startScreen() {
    $('.start-screen').toggleClass('hidden');
    $('.game-container').toggleClass('hidden');

    startCountdown();

  }

  function startCountdown() {

    const countdownInterval = setInterval(function() {
      countdownDiv.html(time);
      time = time - 1;
    },1000);

    setTimeout(function() {
      clearInterval(countdownInterval);
      $('.countdown').toggleClass('hidden');
      if(!gameRunning) {
        gameRunning = true;

        moveColumns();
        dropChar();
        isDead();
      }
    }, 3000);
  }

  function resetGame() {
    gameRunning = false;
    topColCheck = 0;
    left0 = 500;
    index = 0;
    box.style.top = 280 + 'px';
    speed = 250;
    columnSpeed = 25;
    collision = false;
    yVelocity = 0;
    yPos = 280;
    box.style.transform = 'rotate(0deg)';
    time = 2;
    clearInterval(gravityInterval);
    $('.columns').empty();
    $('.end-screen').toggleClass('hidden');
    generateColumns(randomTop,randomBottom);
    //maybe speed needs to change before columns are generated
    speed = 1500;
    $('.countdown').html(3);
    $('.countdown').toggleClass('hidden');
    $('.score').html(0);
    startCountdown();
  }

  // listens for the enter key and then starts the game
  if(!gameRunning) {
    generateHighScoreTable();
    generateColumns(randomTop,randomBottom);


    $(window).click(function(e) {
      if (e.target === singlePlayer) {
        startScreen();
        speed = 1500;
        return true;
      } else if (e.target === multiPlayer) {
        $('.player2').toggleClass('hidden');
        startScreen();
        speed = 1500;
        return true;
      }
    });
    // $(window).keypress(function(e) {
    //   if(e.which === 13) {
    //     startScreen();
    //     speed = 1500;
    //     return true;
    //   }
    // });
  }

  resetButton.addEventListener('click', function () {
    resetGame();
  });
}); //closes DOM listener
