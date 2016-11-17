module.exports = function countdown(cb) {
    let count = 10;

    let timer = setInterval(_ => {
        if(cb){
            cb(count);
        }
        count--;
        if(count == 0){
            clearInterval(timer);
        }
    }, 1000);
    return timer;
};