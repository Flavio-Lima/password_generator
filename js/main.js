const inputEl = document.querySelector('#password')
const upperCaseCheckEl = document.querySelector('#uppercase_check')
const numberCheckEl = document.querySelector('#number_check')
const symbolCheckEl = document.querySelector('#symbol_check')
const securityIndicatorBarEl = document.querySelector('#security_indicator_bar')
let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjkmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if(upperCaseCheckEl.checked){
        chars += upperCaseChars
    }

    if(numberCheckEl.checked){
        chars += numberChars
    }

    if(symbolCheckEl.checked){
        chars += symbolChars
    }


    let password = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    
    inputEl.value = password

    calculeteQuality()
    calculateFontSize()
}

function calculeteQuality() {
    const percent = Math.round(
        (passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCheckEl.checked ? 25 : 0) +
        (symbolCheckEl.checked ? 35 : 0) 
        
    )

    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent > 69)
    {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    }
    else if (percent > 50)
    {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
    }
    else
    {
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
    }

    if (percent >= 100)
    {
        securityIndicatorBarEl.classList.add('completed')
    }
    else
    {
        securityIndicatorBarEl.classList.remove('completed')
    }
}

function calculateFontSize() {
    if (passwordLength > 45)
    {
        inputEl.classList.remove("font_sm")
        inputEl.classList.remove("font_xs")
        inputEl.classList.add("font_xxs")
    }
    else if (passwordLength > 30)
    {
        inputEl.classList.remove("font_sm")
        inputEl.classList.add("font_xs")
        inputEl.classList.remove("font_xxs")
    }
    else if (passwordLength > 20)
    {
        inputEl.classList.add("font_sm")
        inputEl.classList.remove("font_xs")
        inputEl.classList.remove("font_xxs")
    }
    else
    {
        inputEl.classList.remove("font_sm")
        inputEl.classList.remove("font_xs")
        inputEl.classList.remove("font_xxs")
    }
}


function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password_length")
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
    document.querySelector('#password_length_text').innerText = passwordLength
    generatePassword()
})

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy_1").addEventListener("click", copy)
document.querySelector("#copy_2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword()