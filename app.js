window.addEventListener('DOMContentLoaded', () => {

  const box = document.querySelector('.box');
  let gameRunning = false;
  let top = 50;
  // let left = 0;
  // let right = 0;
  // let bottom = 0;

  $(window).keypress(function(e) {
    if(!gameRunning) {
      if(e.which === 13) {
        startGame();
        generateColumns();
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
      console.log(box.style.top);

      window.addEventListener('keypress', function() {
        top = 80;
      });
    }, 10);
  }

  function generateColumns() {
    window.setInterval(()=> {
      $('<div>').css({top: 8, left: 700, height: 200, width: 100, backgroundColor: 'green', position: 'fixed' }).appendTo('.game-container');
      $('<div>').css({bottom: 41, left: 700, height: 200, width: 100, backgroundColor: 'green', position: 'fixed' }).appendTo('.game-container');

    }, 2000);
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
