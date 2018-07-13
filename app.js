console.log('JS');
window.addEventListener('DOMContentLoaded', () => {

  let top = 0;
  let left = 10;
  let right = -100;
  const box = document.querySelector('.box');

  window.setInterval(() => {
    window.addEventListener('keypress', function() {
      top = 70;
      box.style.top = (parseInt(top) + top) + 'px';
    });
    top += 1;
    left +=1;
    right +=1;
    // box.style.top = (parseInt(top) + top) + 'px';
    box.style.top = (parseInt(top) + top) + 'px';
    box.style.left = (parseInt(left) + left) + 'px';
    box.style.right = (parseInt(right) + right) + 'px';
  }, 10);

  // document.addEventListener('keypress', (event) => {
  //   const keyName = event.key;
  //
  //   alert('keypress event\n\n' + 'key: ' + keyName);
  // });


});
