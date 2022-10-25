let btnMain = document.querySelector('.btn-main')
let btnDefault = document.querySelector('.btn-default')
let passwordDisplay = document.querySelector('.password-display')
let copyIcon = document.querySelector('.copy-icon')
let inputs = document.querySelectorAll('.input')

//let password = ''
let passwordLength = 15;
let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let numbers = ['1','2','3','4','5','6','7','8','9','0']
let symbols = ['/','!','@','#','$','%','^','&','*','(',')','{','}','[',']']
//let alphaNumeric = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','/','!','@','#','$','%','^','&','*','(',')','{','}','[',']']

let selectedOps = []
let tempPassword = [];
let finalPassword = '';


btnDefault.addEventListener('click',(e)=>{
    inputs.forEach(input=>{
        if(input.type != "checkbox"){
            input.value = 15;
        }else{
            input.checked = true;
        }
    })
    inputs[3].checked = false
})
btnMain.addEventListener('click', (e)=>{
    getSelectedProperties()
    generatePassword()
    passwordDisplay.textContent = finalPassword;
    finalPassword = ''
})
inputs.forEach(input=>{
    input.addEventListener('change', setConstraints)
})
function getSelectedProperties(){
    selectedOps = []
    inputs.forEach(input => {
        if(input.type != "checkbox"){
            passwordLength = parseInt(input.value);
        }else{
            if(input.checked == true){
            selectedOps.push(input.value)
            }
        }
    })
    return selectedOps;
}

function setConstraints(e){
    if(e.target.type == "checkbox"){
        count = 0;
        inputs.forEach(input =>{
            if(input.type == "checkbox" && input.checked == true){
                count++;
            }
        })
        if(count < 1){
            e.target.checked = !e.target.checked
        }
    }
    else{
        let value = parseInt(e.target.value);
        if(value < 10){
            e.target.value = 10;
        }else if(value > 30){
            e.target.value = 30;
        }
    }
}
function generatePassword(){
    return generateFinalPassword()
    // for(let i = 0; i<passwordLength; i++){
    //     password += alphaNumeric[getRandom()]
    // }
}

copyIcon.addEventListener('click', async (e)=>{
    await navigator.clipboard.writeText(passwordDisplay.textContent)
})

function generateType(type){
    if(type == 'letters'){
        return letters[getRandom(letters)]
    }else if(type == 'numbers'){
        return numbers[getRandom(numbers)]
    }
    else{
        return symbols[getRandom(symbols)]
    }
}
function getRandom(type){
        return Math.floor(Math.random()*type.length)
}

function generateFinalPassword(){
    generateTempPassword()
    return shuffle()
}
function shuffle(){
    if(!tempPassword){
        return;
    }else{
        for(i = 0; i<tempPassword.length; i++){
            finalPassword += tempPassword[getRandom(tempPassword)]
        }
        tempPassword = []
        return finalPassword;
    }
}
function generateTempPassword(){
    let equalLength = Math.round(passwordLength / selectedOps.length);
    for(i = 0; i<passwordLength; i++){
        if(i < equalLength){
            tempPassword.push(generateType(selectedOps[0]))
        }else if(i < equalLength * 2){
            tempPassword.push(generateType(selectedOps[1]))
        }else{
            tempPassword.push(generateType(selectedOps[2]))
        }
    }
}
