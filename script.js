const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate
const calculate={
    "/":(firstNumber,secondNumber)=>secondNumber !=0 ? firstNumber/secondNumber: "error",
    "*":(firstNumber,secondNumber)=> firstNumber * secondNumber,
    "+":(firstNumber,secondNumber)=> firstNumber + secondNumber,
    "-":(firstNumber,secondNumber)=> firstNumber - secondNumber,
    "=":(firstNumber,secondNumber)=> secondNumber,
}

let firsValue = 0; 
let operatorValue = ''; 
let waitForNext = false; 


function setNumberValue(number){
    if(waitForNext){
        calculatorDisplay.textContent=number;
        waitForNext=false;
    }else{
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number;
    }
}

function callOperator(operator){
   const currentValue = Number(calculatorDisplay.textContent);    
    if(operatorValue && waitForNext){
        operatorValue=operator;
        return;
    }
   if(!firsValue){
       firsValue=currentValue; 
   }else{
       const result = calculate[operatorValue](firsValue,currentValue)
        calculatorDisplay.textContent=result;
        firsValue=result;
        if(firsValue === 'error'){
            resetAll();
        }
    }
   operatorValue=operator;
   waitForNext=true;
}


function addDecimal(){
    if(waitForNext)return;
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}
}

inputBtn.forEach((input) =>{
    //button 0-9
   if(input.classList.length === 0){
       input.addEventListener('click',()=>setNumberValue(input.value));
   }else if(input.classList.contains("operator")){
    input.addEventListener('click',()=>callOperator(input.value))
   }else if(input.classList.contains("decimal")){
       input.addEventListener('click',()=>addDecimal());
   }
});
// Clear Btn
function resetAll(){
    calculatorDisplay.textContent='0';
}
clearBtn.addEventListener('click',()=>resetAll());

