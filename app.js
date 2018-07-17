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
  let charTop = 280;
  const charLeft = box.offsetLeft;
  const charRight = parseInt(charLeft) + 60 + 'px';
  box.style.top = (parseInt(charTop)) + 'px';
  let speed = 250;

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

    const columnInterval =  window.setInterval(()=> {

      heightGenerator();
      $('<div>').addClass('topColumn column hidden').css({backgroundColor: '#85144b', height: randomTop, width: 100, position: 'absolute', top: 0 }).appendTo('.columns');
      $('<div>').addClass('bottomColumn column hidden').css({backgroundColor: '#85144b', height: randomBottom, width: 100, position: 'absolute', bottom: 0 }).appendTo('.columns');
      topColArr = document.querySelectorAll('.topColumn');
      bottomColArr = document.querySelectorAll('.bottomColumn');
      columnArr = document.querySelectorAll('.column');
      topColCheck++;
      leftGenerator();
    }, speed);

    // $(window).click(function() {
    //   clearInterval(columnInterval);
    //   moveColumns();
    //
    // });
  }
  //moves the columns from right to left
  function moveColumns() {
    window.setInterval(() => {
      columnArr = document.querySelectorAll('.column');
      columnArr.forEach(function(item) {
        item.style.left = parseInt(item.style.left) - 5 + 'px';
      });
    }, 25);
  }

  function controlChar() {
    $(window).keypress(function(e) {
      if(e.which === 32) {
        charTop = charTop - 35;
        box.style.top = (parseInt(charTop)) + 'px';
      }
    });


    setInterval(function(){
      charTop += 12;
      box.style.top = (parseInt(charTop)) + 'px';
    },100);

  }

  function isDead() {
    let index = 0;
    const scoreDiv = document.querySelector('.score');
    scoreDiv.textContent = index;
    setInterval(function(){
      console.log(speed);
      topColArr = document.querySelectorAll('.topColumn');
      const divRight = parseInt(topColArr[index].style.left + 100 + 'px');

      const charBottom = parseInt(box.style.top) + 60 + 'px';

      if ((box.style.top <= topColArr[index].style.height || parseInt(charBottom) >= bottomColArr[index].offsetTop)
      && (charRight >= topColArr[index].style.left && charLeft <= divRight)) {
        console.log('collision!!!');
        // gameRunning = false;
        return;
      } else if ((parseInt(divRight) + 85) < charLeft){
        console.log('crossed');
        index = index + 1;
        scoreDiv.textContent = index;
        return false;
      }
    }, 100);
  }


  function startGame() {
    controlChar();

  }

  function startScreen() {
    $('.start-screen').toggleClass('hidden');
    $('.game-container').toggleClass('hidden');

    if(!gameRunning) {
      gameRunning = true;
      startGame();
      moveColumns();
      isDead();

    }
  }


  // listens for the enter key and then starts the game
  if(!gameRunning) {
    generateColumns(randomTop,randomBottom);
    $(window).keypress(function(e) {
      if(e.which === 13) {
        startScreen();
        speed = 1500;
        console.log(gameRunning);
        return true;
      } else {
        console.log('Press Enter');
      }
    });
  }

}); //closes DOM listener
