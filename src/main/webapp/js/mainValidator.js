const form = document.querySelector(".user-form");
document.getElementById("hideDate").value = new Date().getTimezoneOffset();
let rValue;
let xValue;
let yValue;
const xButtonList = document.querySelectorAll(".x_button")
console.log(xButtonList)




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
    console.log(rField.value)
})


function checkValueX() {
    if (xValue) {
        return true;
    } else {
        return false
    }
}

function checkValueY() {
    if (yValue) {
        return true;
    } else {
        return false
    }
}

function checkValueR() {
    if (rValue) {
        return true;
    } else {
        return false
    }
}

form.addEventListener("submit", function (e) {
    if (!checkValueX() || !checkValueY() || !checkValueR()) e.preventDefault();
});



