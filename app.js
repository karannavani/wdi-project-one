window.addEventListener('DOMContentLoaded', () => {

  let top = 50;
  let left = 0;
  // let right = 0;
  // let bottom = 0;
  const box = document.querySelector('.box');

  $(window).keypress(function(e) {
    if(e.which === 13) {
      startGame();
    } else {
      console.log('Press Enter');
    }
  });

  function startGame() {
    window.setInterval(() => {
      top += 1;
      left +=1;
      // right +=1;
      if (box.style.top < '550px') {
        box.style.top = (parseInt(top) + top) + 'px';
      } else {
        return;
      }
      console.log(box.style.top);
      box.style.left = (parseInt(left) + left) + 'px';
      // box.style.right = (parseInt(right) + right) + 'px';
      window.addEventListener('keypress', function() {
        top = 120;
        box.style.top = (parseInt(top) + top) + 'px';
      });
    }, 10);

  }
});




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
// });
