let firstNum = 0
let operatorSign = ""
let secondNum = 0

let afterOperatorPut = false
let firstTimeEqual = true;

const currentText = document.querySelector(".current");
const previousText = document.querySelector(".previous");

const add = (first,second)=> first + second
const subtract = (first,second)=> first - second
const multiply = (first,second)=> first * second
const divide = (first,second)=> first / second
const percent = (first,second)=> (first*second)/100

const oneDivideX = (num) => 1/num

const xPowerOf2 = (num)=> Math.pow(num,2)

const xSquareRoot = (num)=> Math.sqrt(num)

const changeSign = (num) => num * -1

const doAction = function (sign,first,second){
    switch (sign){
        case "+":
            return add(first,second)
        case "-":
            return subtract(first,second)
        case "*":
            return multiply(first,second)
        case "/":
            return divide(first,second)
        case "%":
            return percent(first,second)
        case "1/x":
            return oneDivideX(first)
        case "x²":
            return xPowerOf2(first)
        case "√2":
            return xSquareRoot(first)
        case "+/-":
            return changeSign(first)
    }
}

const doComplexActions = function (button){
    if(button.textContent === "%"){
        if(operatorSign === "") {
            currentText.textContent = "0"
            previousText.textContent = "0"
        }
        else{
            secondNum = doAction(button.textContent,firstNum,Number(currentText.textContent))
            previousText.textContent = firstNum + " "+operatorSign+" "+secondNum
            currentText.textContent = secondNum
            afterOperatorPut = false;
        }
    }
    else{
        if(operatorSign === "")
            currentText.textContent = doAction(button.textContent,Number(currentText.textContent))
        else{
            secondNum = doAction(button.textContent,Number(currentText.textContent))
            previousText.textContent = firstNum + " "+operatorSign+" "+secondNum
            currentText.textContent = secondNum
            afterOperatorPut = false;
    }

    }
}
const doClassicActions = function (button){
    if(previousText.textContent.includes("="))
        operatorSign = ""
    if(operatorSign === ""){
        operatorSign = button.textContent
        firstNum = Number(currentText.textContent)
        afterOperatorPut = true
        previousText.textContent = firstNum + " " + operatorSign
        secondNum = 0
    }
    else if(afterOperatorPut){
        operatorSign = button.textContent;
        previousText.textContent = firstNum + " " + operatorSign
    }

    else if(!afterOperatorPut){
        secondNum = Number(currentText.textContent)
        firstNum = doAction(operatorSign,firstNum,secondNum)
        operatorSign = button.textContent;
        currentText.textContent = firstNum
        afterOperatorPut = true
        secondNum = 0
        previousText.textContent = firstNum + " " + operatorSign
    }
}
const doNumberActions = function (button){
    if(currentText.textContent === "0" || afterOperatorPut){
        currentText.textContent = button.textContent;
        afterOperatorPut = false
    }
    else
        currentText.textContent += button.textContent;

}
const doOperatorActions = function (button){
    switch (button.textContent){
        case "CE" : {
            if(previousText.textContent.includes("=")){
                firstNum = 0
                secondNum = 0
                operatorSign = ""
                currentText.textContent = "0"
                previousText.textContent = ""
                afterOperatorPut = false
                firstTimeEqual = true

            }
            else{
                if(operatorSign === "")
                    firstNum =0
                else
                    secondNum = 0
                currentText.textContent = "0"
            }
        }
            break;
        case "C" :  {
            firstNum = 0
            secondNum = 0
            operatorSign = ""
            currentText.textContent = "0"
            previousText.textContent = ""
            afterOperatorPut = false
            firstTimeEqual = true
        }
            break;
        case "backspace": {
            if(currentText.textContent!=="0"){
                if(currentText.textContent.length === 1)
                    currentText.textContent = "0";
                else
                    currentText.textContent =
                        currentText.textContent.substring(0,currentText.textContent.length-1)
            }
        }
            break;
        case "." : if (!currentText.textContent.includes(".")) currentText.textContent += ".";
            break
        case "=": {
            if(operatorSign !== ""){
                if(firstTimeEqual){
                    if(afterOperatorPut){
                        secondNum = firstNum
                        afterOperatorPut = false
                        firstTimeEqual = false
                    }
                    else
                    {
                        secondNum = Number(currentText.textContent)
                        afterOperatorPut = false
                        firstTimeEqual = false
                    }

                }


                currentText.textContent = doAction(operatorSign,firstNum,secondNum)
                previousText.textContent = firstNum +" " +operatorSign + " "+secondNum+" ="
                firstNum = Number(currentText.textContent)
            }
        }
            break
    }
    if(button.textContent !== "="){
        firstTimeEqual = true
    }
}

function start(){
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            if(button.classList.contains("number"))
                doNumberActions(button)
            else if(button.classList.contains("classic"))
                doClassicActions(button)
            else if(button.classList.contains("complex"))
                doComplexActions(button)
            if(button.classList.contains("operator"))
                doOperatorActions(button)
        })
        button.addEventListener("mouseenter",()=>{
            button.classList.add("mouseOn");
        })
        button.addEventListener("mouseleave",()=>{
            button.classList.remove("mouseOn");
        })
        button.addEventListener("mousedown",()=>{
            button.classList.add("mouseClick");
        })
        button.addEventListener("mouseup",()=>{
            button.classList.remove("mouseClick");
        })
    })
    document.addEventListener("keydown",(e)=>{
        let operators = {
            "*":"multiply",
            "/":"divide",
            "+":"sum",
            "-":"subtract",
            "Escape":"reset"
        }

        console.log(e.key)


        if(["/","-","*","+","Escape"].includes(e.key)){
            document.querySelector("#"+operators[e.key]).click()
        }
    })
}

start()