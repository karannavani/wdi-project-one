window.addEventListener('DOMContentLoaded', () => {

  const box = document.querySelector('.box');
  let topColArr;
  let bottomColArr;
  let columnArr;
  let randomTop;
  let randomBottom;
  let topColCheck = 0;
  let left0 = 500;
  let gameRunning = false;
  let charTop = 280;
  const charLeft = box.offsetLeft;
  const charRight = parseInt(charLeft) + 70 + 'px';
  box.style.top = (parseInt(charTop)) + 'px';
  // let right = 100;
  // let bottom = 0;

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

  //moves the columns from right to left
  function moveColumns() {

    columnArr.forEach(function(item) {
      window.setInterval(() => {
        item.style.left = parseInt(item.style.left) - 20 + 'px';
      }, 100);

    });
  }

  //generates left gap for each newly generated column
  function leftGenerator() {
    // console.log(topColArr.length);
    // console.log(topColCheck);
    if (topColArr.length === topColCheck ) {
      topColArr[topColCheck-1].style.left = left0  + 'px';
      bottomColArr[topColCheck-1].style.left = left0 + 'px';
      left0 = left0 + 310;
      topColArr[topColCheck-1].classList.toggle('hidden');
      bottomColArr[topColCheck-1].classList.toggle('hidden');
    }
  }

  //generates columns and appends them to 'columns' class
  function generateColumns() {
    const columnInterval =  window.setInterval(()=> {

      heightGenerator();
      $('<div>').addClass('topColumn column hidden').css({backgroundColor: 'green', height: randomTop, width: 100, position: 'absolute', top: 0 }).appendTo('.columns');
      $('<div>').addClass('bottomColumn column hidden').css({backgroundColor: 'green', height: randomBottom, width: 100, position: 'absolute', bottom: 0 }).appendTo('.columns');
      topColArr = document.querySelectorAll('.topColumn');
      bottomColArr = document.querySelectorAll('.bottomColumn');
      columnArr = document.querySelectorAll('.column');

      topColCheck++;
      leftGenerator();

    }, 50);

    $(window).click(function() {
      clearInterval(columnInterval);
      moveColumns();
    });
  }

  function controlChar() {
    $(window).keypress(function(e) {
      if(e.which === 32) {
        charTop = charTop - 35;
        box.style.top = (parseInt(charTop)) + 'px';
      }
    });


    setInterval(function(){
      charTop += 10;
      box.style.top = (parseInt(charTop)) + 'px';
      // console.log('Solo bottom is '+ parseInt(box.style.top + 70) + 'px');
    },100);

  }

  function isDead() {
    setInterval(function(){
      topColArr = document.querySelectorAll('.topColumn');
      let index = 0;
      const divRight = parseInt(topColArr[index].style.left + 100 + 'px');
      let keyCol = topColArr[index];
      const charBottom = parseInt(box.style.top) + 70 + 'px';
      // console.log(charRight, topColArr[0].style.left, charRight >= topColArr[0].style.left);
      // console.log(charLeft, divRight, charLeft <= divRight);
      // console.log(charBottom, bottomColArr[0].style.height, charBottom >= bottomColArr[0].style.top);
      // console.log(charRight >= topColArr[0].style.left && charLeft <= divRight);
      if ((box.style.top <= topColArr[0].style.height || parseInt(charBottom) >= bottomColArr[0].offsetTop)
      &&
      (charRight >= topColArr[0].style.left && charLeft <= divRight)) {
        console.log('collision!!!');
        // index++;
        // keyCol = topColArr[index];
      }
      // console.log(charRight, topColArr[0].style.left, charRight <= topColArr[0].style.left);
      // console.log(box.offsetLeft, divRight, box.offsetLeft <= divRight);
    }, 100);
  }


  function startGame() {
    gameRunning = true;
    if (box.style.top !== 'abc') {
      controlChar();
    } else {
      gameRunning = false;
      return;
    }
  }


  // listens for the enter key and then starts the game
  $(window).keypress(function(e) {
    if(!gameRunning) {
      if(e.which === 13) {
        startGame();
        generateColumns(randomTop,randomBottom);
        isDead();
      } else {
        console.log('Press Enter');
      }
    }
  });

}); //closes DOM listener
