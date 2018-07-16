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
  let charTop = -160;
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
        console.log(item.style.left);
        item.style.left = parseInt(item.style.left) - 80 + 'px';
      }, 400);

    });
  }

  //generates left gap for each newly generated column
  function leftGenerator() {
    console.log(topColArr.length);
    console.log(topColCheck);
    if (topColArr.length === topColCheck ) {
      topColArr[topColCheck-1].style.left = left0  + 'px';
      bottomColArr[topColCheck-1].style.left = left0 + 'px';
      left0 = left0 + 260;
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

  function startGame() {
    gameRunning = true;
    // window.setInterval(() => {
    charTop += 1;
    if (box.style.top !== '0px') {
      box.style.top = (parseInt(charTop) + charTop) + 'px';
    } else {
      gameRunning = false;
      return;
    }
    // console.log(box.style.top);


    window.addEventListener('keyup', function() {
      console.log('hi');
      charTop += 70;
    });
    // }, 10);
  }


  // listens for the enter key and then starts the game
  $(window).keypress(function(e) {
    if(!gameRunning) {
      if(e.which === 13) {
        startGame();
        generateColumns(randomTop,randomBottom);
      } else {
        console.log('Press Enter');
      }
    }
  });





}); //closes DOM listener



//     // statement to drag columns bag on conveyor belt
//
//     if (column[0].style.left === '-10px') {
//       left0 += 1000;
//       column[0].style.left = left0 + 'px';
//     }
//     if (column[1].style.left === '-10px') {
//       left1 += 1000;
//       column[1].style.left = left1 + 'px';
//     }
//     if (column[2].style.left === '-10px') {
//       left2 += 1000;
//       column[2].style.left = left2 + 'px';
//     }
//     if (column[3].style.left === '-10px') {
//       left3 += 1000;
//       column[3].style.left = left3 + 'px';
//     }

//

//with left working
// function startGame() {
//   window.setInterval(() => {
//     top += 1;
//     left +=1;
//     // right +=1;
//     if (box.style.top < '550px') {
//       box.style.top = (parseInt(top) + top) + 'px';
//     } else {
//       return;
//     }
//     console.log(box.style.top);
//     box.style.left = (parseInt(left) + left) + 'px';
//     // box.style.right = (parseInt(right) + right) + 'px';
//     window.addEventListener('keypress', function() {
//       top = 120;
//       box.style.top = (parseInt(top) + top) + 'px';
//     });
//   }, 10);
//
// }
