const debounce = (fun, delay = 500, immediate = true) => {
    return (...args) => {
        clearTimeout(fun.timer);
        if (immediate) {
            if (!fun.timer) fun(...args);
            fun.timer = setTimeout(() => {
                fun.timer = null
            }, delay);
        } else {
            fun.timer = setTimeout(() => {
                fun(...args);
            }, delay);
        }
    }
}


let input = document.getElementById('input')
let debounceShotCat = debounce(shotCat, 500 ,false) 

function shotCat (content) {
    console.log(content)
  }
input.addEventListener('keyup', function (e) {
        debounceShotCat(e.target.value)
})



