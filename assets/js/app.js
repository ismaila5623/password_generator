let btnMain = document.querySelector('.btn-main')
let passwordDisplay = document.querySelector('.password-display')
let copyIcon = document.querySelector('.copy-icon')

let password = ''
let passwordLength = 15;
let alphaNumeric = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','/','!','@','#','$','%','^','&','*','(',')','{','}','[',']']

btnMain.addEventListener('click', (e)=>{
    generatePassword()
    passwordDisplay.textContent = password;
    password = ''
})

function generatePassword(){
    for(let i = 0; i<passwordLength; i++){
        password += alphaNumeric[getRandom()]
    }
}

copyIcon.addEventListener('click', async (e)=>{
    await navigator.clipboard.writeText(passwordDisplay.textContent)
})

function getRandom(){
    return Math.floor(Math.random()*alphaNumeric.length)
}