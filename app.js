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
    $('<div>').addClass('topColumn column').css({backgroundColor: 'green', height: 200, width: 100, position: 'absolute', top: 0 }).appendTo('.columns');
    $('<div>').addClass('bottomColumn column').css({backgroundColor: 'green', height: 200, width: 100, position: 'absolute', bottom: 0 }).appendTo('.columns');
    $('<div>').addClass('topColumn column').css({backgroundColor: 'green', height: 250, width: 100, position: 'absolute', top: 0 }).appendTo('.columns');
    $('<div>').addClass('bottomColumn column').css({backgroundColor: 'green', height: 220, width: 100, position: 'absolute', bottom: 0 }).appendTo('.columns');
    column = document.querySelectorAll('.column');
    column.forEach(function(item) {
      let left0 = 500;
      let left1 = 500;
      let left2 = 700;
      let left3 = 700;

      console.log('hi');
      console.log(item.style.left);

      column[0].style.left = left0 + 'px';
      column[1].style.left = left1 + 'px';
      column[2].style.left = left2 + 'px';
      column[3].style.left = left3 + 'px';

      moveColumns(); // sort out scope issues later

      function moveColumns() {
        // console.log(column);
        window.setInterval(() => {
          left0 -= 30;
          left1 -= 30;
          left2 -= 30;
          left3 -= 30;
          column[0].style.left = left0 + 'px';
          column[1].style.left = left1 + 'px';
          column[2].style.left = left2 + 'px';
          column[3].style.left = left3 + 'px';
          // console.log(column[0].style.left);
          // statement to drag columns bag on conveyor belt

          if (column[0].style.left === '-10px') {
            left0 += 1000;
            column[0].style.left = left0 + 'px';
          }
          if (column[1].style.left === '-10px') {
            left1 += 1000;
            column[1].style.left = left1 + 'px';
          }
          if (column[2].style.left === '-10px') {
            left2 += 1000;
            column[2].style.left = left2 + 'px';
          }
          if (column[3].style.left === '-10px') {
            left3 += 1000;
            column[3].style.left = left3 + 'px';
          }


        },500);
      }

    });

    // console.log(column);
    // }, 20);
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
