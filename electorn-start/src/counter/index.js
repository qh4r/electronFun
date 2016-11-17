const counter = require('./countdown');
const clickHandler = require('./handler');

window.onload = function(){
    let $counter = document.querySelector('.counter'),
        $start = document.querySelector('.start'),
        $manualCounter = document.querySelector('.manual-counter');


    counter(count => {
        $counter.innerText = count;
    });

    // $start.addEventListener('click', e => {
    //     $manualCounter.innerText = ++$manualCounter.innerText;
    // })

    clickHandler($start, $manualCounter);
};

console.log('counter');
