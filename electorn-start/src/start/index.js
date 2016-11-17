console.log('dziala');

window.onload = function() {
    console.log('asd');
    let other = window.document.createElement('h1');
    other.innerText = "Dodane";
    document.querySelector('.container').appendChild(other);
};
