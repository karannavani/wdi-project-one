window.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box');
  const player2 = document.querySelector('.player2');
  const charLeft = box.offsetLeft;
  const charRight = parseInt(charLeft) + 60 + 'px';
  const player2Left = player2.offsetLeft;
  const player2Right = parseInt(player2Left) + 60 + 'px';
  const countdownDiv = $('.countdown');
  const gravity = 0.8;
  const scoreSpan = document.querySelector('#score-holder');
  const resetButton = document.querySelector('#reset-button');
  let gameRunning = false;
  let topColArr;
  let bottomColArr;
  let columnArr;
  let randomTop;
  let randomBottom;
  let topColCheck = 0;
  let left0 = 500;
  let index = 0;
  let p2index = 0;
  let time = 2;
  let yVelocity = 0;
  let yPos = 280;
  let colGenInterval;
  let collisionInterval;
  let speed = 500;
  let columnSpeed = 25;
  let collision1 = false;
  let collision2 = false;
  let moveInterval;
  let gravityInterval;
  box.style.top = 280 + 'px';
  player2.style.top = 280 + 'px';
  //multiplayer stuff
  const singlePlayer = document.querySelector('#single');
  const multiPlayer = document.querySelector('#multi');
  let yVelocity2 = 0;
  let yPos2 = 280;
  let selection;
  // for additional characters
  const charArray =
  [
    {name: 'Han Solo', src: 'images/solo.gif'},
    {name: 'Chewbacca', src: 'images/chewie.gif'},
    {name: 'Luke Skywalker', src: 'images/luke.png'},
    {name: 'Darth Vader', src: 'images/vader.png'},
    {name: 'Darth Maul', src: 'images/maul.png'},
    {name: 'Kylo Ren', src: 'images/kylo.png'}
  ];
  const charName = document.querySelector('.char-name');
  const charImage = document.querySelector('.char-image');
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  const begin = document.querySelector('#begin');
  let charIndex = 0;

  charName.innerHTML = charArray[0].name;
  charImage.style.backgroundImage = `url('${charArray[0].src}')`;

  window.addEventListener('click',function(e) {
    if (e.target === previous && charIndex > 0) {
      charIndex--;
      charName.innerHTML = charArray[charIndex].name;
      charImage.style.backgroundImage = `url('${charArray[charIndex].src}')`;
      console.log(charIndex);
    } else if (e.target === next && charIndex < 5) {
      charIndex++;
      charName.innerHTML = charArray[charIndex].name;
      charImage.style.backgroundImage = `url('${charArray[charIndex].src}')`;
      console.log(charIndex);
    }
  });

  //scoreBoard stuff

  const highScoreForm = document.querySelector('form');
  const ul = document.querySelector('ul');

  const input = document.getElementById('score');
  const highScores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];

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

  // clearHighScores.addEventListener('click', function () {
  //   localStorage.clear();
  //   while (ul.firstChild) {
  //     ul.removeChild(ul.firstChild);
  //   }
  // });

  viewScore.addEventListener('click', function () {
    // generateHighScoreTable();
    $('.game-container').toggleClass('hidden');
    $('.start-screen').toggleClass('hidden');
  });

  //generate random heights for columns
  function heightGenerator() {
    randomTop = Math.floor(Math.random()*600);
    randomBottom = Math.floor(Math.random()*600);

    if (randomBottom > 120 && randomTop > 120 && (randomTop + randomBottom) > 500 && (randomTop + randomBottom) < 520) {
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
      left0 = left0 + 300;
      topColArr[topColCheck-1].classList.toggle('hidden');
      bottomColArr[topColCheck-1].classList.toggle('hidden');
    }
  }

  //generates columns and appends them to 'columns' class
  function generateColumns() {

    colGenInterval = window.setInterval(()=> {
      heightGenerator();
      $('<div>').addClass('topColumn column pipe-top hidden').css({backgroundColor: '#85144b', height: randomTop, width: 100, position: 'absolute', top: 0 }).appendTo('.columns');
      $('<div>').addClass('bottomColumn column hidden').css({backgroundColor: '#85144b', height: randomBottom, width: 100, position: 'absolute', bottom: 0 }).appendTo('.columns');
      topColArr = document.querySelectorAll('.topColumn');
      bottomColArr = document.querySelectorAll('.bottomColumn');
      columnArr = document.querySelectorAll('.column');
      topColCheck++;
      leftGenerator();

      if (selection === 'single' && collision1) {
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
      if (selection === 'single' && collision1) {
        clearInterval(moveInterval);
      } else if (selection === 'multi' && collision1 && collision2) {
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
    //player2
    if(yPos2 < 620) {
      yPos2 -= yVelocity2;
      yVelocity2 -= gravity;
    }
  }

  function drawCharacter() {
    box.style.top = `${parseInt(yPos)}px`;
    player2.style.top = `${parseInt(yPos2)}px`;

  }
  function assignKeys() {
    if (selection === 'single') {
      console.log(selection);
      window.addEventListener('keydown', e => {
        if (e.which === 32) {
          e.preventDefault();
          $('#oneTime').attr('src','sounds/jump.wav');
          $('#oneTime')[0].play();
          yVelocity = 9;
        }
      });
    } else if (selection === 'multi') {
      console.log(selection);
      window.addEventListener('keydown', event => {
        if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
          event.preventDefault();
          $('#oneTime').attr('src','sounds/jump.wav');
          $('#oneTime')[0].play();
          yVelocity = 9;
        }
        if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
          event.preventDefault();
          $('#oneTime').attr('src','sounds/jump.wav');
          $('#oneTime')[0].play();
          yVelocity2 = 9;
        }
      });
    }
  }


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
    p2index = 0;
    const scoreDiv = document.querySelector('.score');
    const score2Div = document.querySelector('.score2');
    scoreDiv.textContent = index;
    score2Div.textContent = index;
    collisionInterval = setInterval(function(){
      topColArr = document.querySelectorAll('.topColumn');
      const divRight = parseInt(topColArr[index].style.left + 100 + 'px');
      const charBottom = parseInt(box.style.top) + 65 + 'px';
      const player2Bottom = parseInt(player2.style.top) + 60 + 'px';

      // console.log(box.style.top);

      //player 1 logic

      if ((box.style.top <= topColArr[index].style.height || parseInt(charBottom) >= bottomColArr[index].offsetTop)
      && (charRight >= topColArr[index].style.left && charLeft <= divRight)) {

        if (!collision1) {

          console.log('Player 1 collision!!!');
          box.style.transform = 'rotate(70deg)';
          collision1 = true;
          $('#oneTime').attr('src','sounds/dying.wav');
          $('#oneTime')[0].play();
          if (selection === 'single' && collision1) {
            $('.end-screen').toggleClass('hidden');
            gameRunning = false;

          } else if (selection === 'multi' && collision1) {
            setTimeout(function() {
              // $('.box').remove();
              $('.box').toggleClass('hidden');
            },100);
          }
        }

        scoreSpan.innerHTML = index;
        return;

      } else if ((parseInt(divRight) + 65) < charLeft){
        // console.log('crossed');
        index = index + 1;
        scoreDiv.textContent = index;
        return false;
      }

      //player 2 logic
      if (selection === 'multi' && !collision2) {

        if ((player2.style.top <= topColArr[index].style.height || parseInt(player2Bottom) >= bottomColArr[index].offsetTop)
        && (player2Right >= topColArr[index].style.left && player2Left <= divRight)) {
          $('#oneTime').attr('src','sounds/dying.wav');
          $('#oneTime')[0].play();
          console.log('Player 2 collision!!!');
          player2.style.transform = 'rotate(70deg)';
          collision2 = true;

          setTimeout(function() {
            $('.player2').toggleClass('hidden');
            // $('.player2').remove();
          },100);

          scoreSpan.innerHTML = index;
          return;

        } else if ((parseInt(divRight) + 65) < player2Left){
          if (!collision2) {

            p2index = index + 1;
          }
          if (collision1) {
            index = p2index;
          }
          score2Div.textContent = p2index;
          return false;
        }
      }

      if (collision1 && collision2) {
        $('.end-screen').toggleClass('hidden');
        gameRunning = false;
        clearInterval(collisionInterval);
        clearInterval(gravityInterval);
        clearInterval(colGenInterval);
        clearInterval(moveInterval);
        $('#score-holder').css('font-size', '25px');
        scoreSpan.innerHTML = `Player 1 – ${scoreDiv.textContent}

        Player 2 – ${score2Div.textContent}`;
      }

      increaseSpeed();
    }, 50);
  }

  // speed toggle
  function increaseSpeed() {
    switch (index) {
      case 10:
        columnSpeed = 22;
        clearInterval(moveInterval);
        moveColumns();
        break;
      case 20: // foo is 0 so criteria met here so this block will run
        columnSpeed = 19;
        clearInterval(moveInterval);
        moveColumns();
        break;
      case 30: // foo is 0 so criteria met here so this block will run
        columnSpeed = 16;
        clearInterval(moveInterval);
        moveColumns();
        break;
      case 50: // foo is 0 so criteria met here so this block will run
        columnSpeed = 13;
        clearInterval(moveInterval);
        moveColumns();
        break;
      case 70: // foo is 0 so criteria met here so this block will run
        columnSpeed = 10;
        clearInterval(moveInterval);
        moveColumns();
        break;
      case 95: // foo is 0 so criteria met here so this block will run
        columnSpeed = 7;
        clearInterval(moveInterval);
        moveColumns();
        break;
      default:
        columnSpeed = 25;
    }
  }


  //controls all functions from start screen
  function startScreen() {
    $('.start-screen').toggleClass('hidden');
    if (selection === 'single') {
      $('.select-char').toggleClass('hidden');
      window.addEventListener('click', function(e) {
        if (e.target === begin) {
          console.log('clicked');
          $('.p1').attr('src', charArray[charIndex].src);
          $('.select-char').toggleClass('hidden');
          $('.game-container').toggleClass('hidden');
          startCountdown();
        }
      });
    } else if (selection === 'multi') {
      $('.multi-pick').html('Player 1 Character Selection');
      $('#begin').html('Player 2');
      $('.select-char').toggleClass('hidden');
      let char1 = false;
      let char2 = false;
      window.addEventListener('click', function(e) {
        if (e.target === begin && char1 && char2) {
          // char2 = true;
          $('.p2').attr('src', charArray[charIndex].src);
          $('.select-char').toggleClass('hidden');
          $('.game-container').toggleClass('hidden');
          startCountdown();
        }
        if (e.target === begin && !char2) {
          const p1Selection = charArray[charIndex].src;
          $('.p1').attr('src', p1Selection);
          console.log(p1Selection);
          $('.multi-pick').html('Player 2 Character Selection');
          char1 = true;
        }
        // const p2Selection = charArray[charIndex].src;
        if (e.target === begin && !char2) {
          $('#begin').html('Begin');
          char2 = true;
        }

      });
    }
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
    document.location.reload(true);
    // if (selection === 'multi') {
    //   $('.box').toggleClass('hidden');
    //   $('.player2').toggleClass('hidden');
    // }
    //
    // clearInterval(collisionInterval);
    // clearInterval(moveInterval);
    // clearInterval(gravityInterval);
    // clearInterval(colGenInterval);
    //
    // gameRunning = false;
    // topColCheck = 0;
    // left0 = 500;
    // index = 0;
    // p2index = 0;
    // box.style.top = 280 + 'px';
    // player2.style.top = 280 + 'px';
    // speed = 250;
    // columnSpeed = 25;
    // collision1 = false;
    // collision2 = false;
    // yVelocity = 0;
    // yPos = 280;
    // yVelocity2 = 0;
    // yPos2 = 280;
    // box.style.transform = 'rotate(0deg)';
    // player2.style.transform = 'rotate(0deg)';
    // time = 2;
    // charIndex = 0;
    // charName.innerHTML = charArray[0].name;
    // charImage.style.backgroundImage = `url('${charArray[0].src}')`;
    // selection = '';
    // $('.columns').empty();
    // $('.end-screen').toggleClass('hidden');
    // // $('.select-char').toggleClass('hidden');
    // // $('.game-container').toggleClass('hidden');
    // generateColumns(randomTop,randomBottom);
    // //maybe speed needs to change before columns are generated
    // speed = 1500;
    // $('.countdown').html(3);
    // $('.countdown').toggleClass('hidden');
    // $('.score').html(0);
    // $('.score2').html(0);
    // startCountdown();
  }

  // listens for the enter key and then starts the game
  if(!gameRunning) {
    generateHighScoreTable();
    generateColumns(randomTop,randomBottom);


    $(window).click(function(e) {

      if (e.target === singlePlayer) {
        $('#oneTime').attr('src','sounds/fx4.wav');
        $('#oneTime')[0].play();
        selection = 'single';
        startScreen();
        speed = 1500;
        assignKeys();
        $('#backgroundAudio').attr('src','sounds/cantina.mp3');
        $('#backgroundAudio')[0].play();
        return true;
      } else if (e.target === multiPlayer) {
        $('#oneTime').attr('src','sounds/fx4.wav');
        $('#oneTime')[0].play();
        selection = 'multi';
        $('.score').css('left','420px');
        $('.score2').toggleClass('hidden');
        $('.player2').toggleClass('hidden');
        startScreen();
        speed = 1500;
        assignKeys();
        $('#backgroundAudio').attr('src','sounds/cantina.mp3');
        $('#backgroundAudio')[0].play();
        return true;
      }
    });
  }

  resetButton.addEventListener('click', function () {
    resetGame();
  });
}); //closes DOM listener
