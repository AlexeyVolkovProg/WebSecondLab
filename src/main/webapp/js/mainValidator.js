const form = document.querySelector(".user-form");
document.getElementById("hideDate").value = new Date().getTimezoneOffset();
let rValue;
let xValue;
let yValue;
let lastValueR;
const canvasPrinter = new PrinterGraph();
const xButtonList = document.querySelectorAll(".x_button")
console.log(xButtonList)


window.onload = function () {
    canvasPrinter.drawStartImage()
}

xButtonList.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        removeDuplicatesAndSetCurButton(xButtonList, button)
    })
})

function removeDuplicatesAndSetCurButton(xButtonList, button) {
    xButtonList.forEach((btn) => {
        btn.classList.remove("x-button-active")
    })
    button.classList.add("x-button-active")
    xValue = +button.textContent
    document.getElementById("hideX").value = xValue;
    console.log(xValue)
}

const yField = document.querySelector("#selector_y");
console.log(yField)
yField.addEventListener('input', (event) => {
    yField.value = yField.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    yValue = yField.value
    console.log(yField.value)
})

const rField = document.querySelector("#selector_r");
console.log(rField)
rField.addEventListener('input', (event) => {
    rField.value = rField.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    rValue = rField.value
    window.lastValueR = lastValueR;
    updateLastValueR(rValue)
    canvasPrinter.redrawAll(rValue)
    console.log(rField.value)
})

function updateLastValueR(rValue) {
    window.lastValueR = rValue;
    const event = new CustomEvent('lastValueRUpdated', { detail: window.lastValueR });
    window.dispatchEvent(event);
}


function checkValueX() {
    console.log(xValue)
    if (xValue) {
        console.log("Xnorm")
        return true;
    }else if(xValue === 0){
        return true;
        console.log("Xnorm")
    } else {
        console.log("noXnorm")
        return false
    }
}

function checkValueY() {
    console.log(xValue)
    if (yValue) {
        console.log("Ynorm")
        return true;
    } else {
        console.log("noYnorm")
        return false
    }
}

function checkValueR() {
    if (rValue) {
        console.log("Rnorm")
        return true;
    } else {
        console.log("noRnorm")
        return false
    }
}

canvasPrinter.canvas.addEventListener('click', function(event) {
    canvasPrinter.parseClick(event)
});

form.addEventListener("submit", function (e) {
    document.getElementById("hideX").value = xValue;
    document.getElementById("selector_y").value = yValue;
    canvasPrinter.redrawAll();
    if (!checkValueY() ||!checkValueX() ||  !checkValueR()){
        e.preventDefault()
    } else{
        updateLastValueR(rValue)
    }
});







