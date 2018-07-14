window.addEventListener('DOMContentLoaded', () => {

  const box = document.querySelector('.box');
  let column;
  let gameRunning = false;
  let columnTop = 50;
  let columnLeft;
  let charTop = -100;
  // let right = 100;
  // let bottom = 0;

  $(window).keypress(function(e) {
    if(!gameRunning) {
      if(e.which === 13) {
        // startGame();
        generateColumns();
        // moveColumns();
      } else {
        console.log('Press Enter');
      }
    }
  });
  // startGame();

  function startGame() {
    gameRunning = true;
    window.setInterval(() => {
      charTop += 1;
      if (box.style.top !== '570px') {
        box.style.top = (parseInt(charTop) + charTop) + 'px';
      } else {
        gameRunning = false;
        return;
      }
      // console.log(box.style.top);

      window.addEventListener('keyup', function() {
        charTop = -70;
      });
    }, 10);
  }

  function generateColumns() {
    // window.setInterval(()=> {
    $('<div>').addClass('topColumn').css({backgroundColor: 'green', height: 200, width: 100, position: 'absolute', top: 0, left: 500}).appendTo('.columns');
    $('<div>').addClass('bottomColumn').css({backgroundColor: 'green', height: 200, width: 100, position: 'absolute', bottom: 0, left: 500}).appendTo('.columns');
    $('<div>').addClass('topColumn').css({backgroundColor: 'green', height: 250, width: 100, position: 'absolute', top: 0, left: 700}).appendTo('.columns');
    $('<div>').addClass('bottomColumn').css({backgroundColor: 'green', height: 200, width: 100, position: 'absolute', bottom: 0, left: 700}).appendTo('.columns');
    column = document.querySelectorAll('.column');
    // console.log(column);
    // }, 20);
  }

  function moveColumns() {
    column.forEach(function(item) {
      window.setInterval(() => {
        columnLeft -= 10;
        item.style.left = (parseInt(columnLeft) + columnLeft) + 'px';
        // console.log(column1.style.left);
        if(item.style.left === '-500px') {
          columnLeft = 1000;
        }
      },500);
    });
  }




}); //closes DOM listener

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
