const resultElement = document.getElementById("result");
const lengthInput = document.getElementById("length");
const includeUppercaseInput = document.getElementById("uppercase");
const includeLowercaseInput = document.getElementById("lowercase");
const includeNumbersInput = document.getElementById("numbers");
const includeSymbolsInput = document.getElementById("symbols"); 
const generateButton = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");


const randomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
 
const randomUpper = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const randomNumber = () =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);

const randomSymbol = () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
    lower: randomLower,
    upper: randomUpper,
    number: randomNumber,
    symbol: randomSymbol
};

const createNotification = (message) => {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() =>  notification.remove(), 1000);
};

clipboardElement.addEventListener("click", () => {
    const password = resultElement.innerText;
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
        createNotification("Password copied to clipboard!");
        resultElement.innerText = ''; // Clear the displayed password
    });
});
    
generateButton.addEventListener("click", () => {
    const length = lengthInput.value;
    const includeUppercase = includeUppercaseInput.checked;
    const includeLowercase = includeLowercaseInput.checked;
    const includeNumbers = includeNumbersInput.checked;
    const includeSymbols = includeSymbolsInput.checked;

   resultElement.innerText = generatePassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        length
    );
});

const generatePassword = (length, upper, lower, number, symbol) => {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    
    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
};