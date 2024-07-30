const display = document.querySelector(".calc-input")
const keys = document.querySelector(".calc-keys")
const showOpr = document.querySelectorAll(".show")

let displayValue = ""
let operator = null
let firstValue = null
let isWaitingNewValue = false

const updateDisplay = () => {
   let sample = displayValue
   let afterDot;
   const dotIndex = displayValue.indexOf(".")
   // eğer sayı ondalıksa
   if (dotIndex > 0) {
      sample = displayValue.slice(0, dotIndex)
      afterDot = displayValue.slice(dotIndex)
   }
   // diziye çevirme
   sample = sample.split("")
   const start = sample.length % 3 === 0 ? 3 : sample.length % 3

   for (let index = start; index < sample.length; index += 4) {
      sample.splice(index, 0, ",")
   }
   // diziyi stringe dönüştür
   let newStr = sample.join("")
   // varsa ondalık kısmı tekrar ekler
   if (dotIndex > 0) {
      newStr = newStr + afterDot
   }

   display.value = newStr
}
updateDisplay()

keys.addEventListener("click", (e) => {
   const element = e.target
   const value = element.value

   if (!element.matches("button")) return

   switch (value) {
      case "del":
         let val = displayValue.slice(0, -1)
         if (!val) { val = "0" }
         displayValue = val
         isWaitingNewValue = false
         break;
      case "clear":
         displayValue = "0"
         firstValue = null
         operator = null
         break
      case ".":
         displayValue = displayValue.includes(".") ? displayValue : displayValue + "."
         break
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
         handleOperator(value)
         break;
      default:
         inputNumber(value)
         break;
      }
      updateDisplay()

   //* switch case yapısından önce bu şekildeydi
   /*   if (element.classList.contains("del")) {
        let val = displayValue.slice(0, -1)
        if (!val) { val = "0" }
        displayValue = val
        isWaitingNewValue = false
        updateDisplay()
        return
     } */

   /* if (element.classList.contains("clear")) {
      displayValue = "0"
      firstValue = null
      operator = null
      updateDisplay()
      return
   } */
   /* 
      if (element.classList.contains("decimal")) {
         displayValue = displayValue.includes(".") ? displayValue : displayValue + "."
         updateDisplay()
         return
      } */
   /*  if (element.classList.contains("operator")) {
       handleOperator(value)
       updateDisplay()
       return
    } */
   /* 
      inputNumber(value)
      updateDisplay() */

})

const handleOperator = (paramOperator) => {
   const oper = {
      "+": 0, "-": 1, "*": 2, "/": 3
   }
   const value = parseFloat(displayValue)

   if (firstValue === null) {
      firstValue = value
   } else if (operator && !isWaitingNewValue) {
      const res = calculate(firstValue, value, operator)

      firstValue = parseFloat(res.toFixed(6))
      displayValue = String(firstValue)
   }

   operator = paramOperator
   isWaitingNewValue = true

   showOpr.forEach((item, i) => {
      if (i === oper[paramOperator]) {
         item.classList.add("active")
      } else {
         item.classList.remove("active")
      }
   })
}

const calculate = (first, last, op) => {
   console.log(first, last, op)
   switch (op) {
      case "+":
         return first + last
      case "-":
         return first - last
      case "*":
         return first * last
      case "/":
         return first / last
      default:
         return last
   }
}

const inputNumber = (num) => {
   if (displayValue.length >= 12 && !isWaitingNewValue) return
   if (isWaitingNewValue) {
      displayValue = num
      isWaitingNewValue = false
   } else {
      const i = displayValue.indexOf(".")
      const res = displayValue.slice(i)
      if ((res.length < 7)) {
         displayValue = displayValue == "0" ? num : displayValue + num
      }


   }


}