window.addEventListener('DOMContentLoaded', () => {

  const box = document.querySelector('.box');
  const column1 = document.querySelector('.column1');
  const column2 = document.querySelector('.column2');
  let gameRunning = false;
  let top = 50;
  let left = 250;
  // let right = 100;
  // let bottom = 0;

  $(window).keypress(function(e) {
    if(!gameRunning) {
      if(e.which === 13) {
        startGame();
        generateColumns();
        moveColumns();
      } else {
        console.log('Press Enter');
      }
    }
  });
  // startGame();

  function startGame() {
    gameRunning = true;
    window.setInterval(() => {
      top += 1;
      if (box.style.top < '570px') {
        box.style.top = (parseInt(top) + top) + 'px';
      } else {
        return;
      }
      // console.log(box.style.top);

      window.addEventListener('keypress', function() {
        top = 80;
      });
    }, 10);
  }

  function generateColumns() {
    window.setInterval(()=> {
      $('<div>').css({top: 8, left: 700, height: 200, width: 100, backgroundColor: 'green', position: 'fixed' }).appendTo('.columns');
      $('<div>').css({bottom: 41, left: 700, height: 200, width: 100, backgroundColor: 'green', position: 'fixed' }).appendTo('.columns');

    }, 2000);
  }

  function moveColumns() {
    window.setInterval(() => {
      left -= 10;
      column1.style.left = (parseInt(left) + left) + 'px';
      column2.style.left = (parseInt(left) + left) + 'px';
      console.log(column1.style.left);
      if(column1.style.left < `-220px`) {
        column1.style.backgroundColor = 'black';
      }
    },100);
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
