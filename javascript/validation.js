let form1 = document.querySelector(".form1")
let form2 = document.querySelector(".form2")
let ALLaccounts = [];
// creat class of user account
class users {
    constructor(fullname,username,email,password,){
      this.fullname = fullname 
      this.username = username 
      this.email = email
      this.password = password
    }
}
// get data from local storage
let data = JSON.parse(localStorage.getItem("accounts"))
if(data){
    ALLaccounts = data
    console.log(ALLaccounts)
}
// validation of th register form
if(form1 != null){
    form1.addEventListener("submit",function(e){
        e.preventDefault()
        let isformvalid = true
        let Fullname = document.querySelector("#name")
        let username = document.querySelector("#user-name")
        let email = document.querySelector("#email")
        let phone = document.querySelector("#tel")
        let password = document.querySelector("#password")
        let confpassword = document.querySelector("#con-password")
        // function for valid input
        let Valid = function(elements){
            elements.style.border = '1px solid green'
            if(!elements.nextElementSibling.classList.contains("hidden")){
                elements.nextElementSibling.classList.add("hidden")
            }
        }
        // function for invalid input
        let invalid = function(elements,message1){
            let  p = elements.parentElement.querySelector(".alert")
            elements.value.length >0 ? p.textContent = `${message1}`:p.textContent = `Please fill out this field.`
            elements.nextElementSibling.classList.remove("hidden")
            elements.style.border = '1px solid red'
           isformvalid = false
        }
        // function for valid password
        let validPASSWORD  = function(elements){
            let vision = elements.nextElementSibling
            elements.style.border = '1px solid green'
             if(!vision.nextElementSibling.classList.contains("hidden")){
            vision.nextElementSibling.classList.add("hidden")
             }
            vision.style.right = "8px"
        }
        // function for invalid password
        let invalidPASSWORD = function(elements,message1){
            let  p = elements.parentElement.querySelector(".alert")
            let vision = elements.nextElementSibling
        elements.value.length >0 ? p.textContent = `${message1}`:p.textContent = "Please fill out this field."
        vision.style.right = "32px"
        vision.nextElementSibling.classList.remove("hidden")
           elements.style.border = '1px solid red'
           isformvalid = false
        }

        if(Fullname.value.match(/^[a-zA-Z]([a-zA-Z\s\-\_]+)$/)){
            Valid(Fullname)
        }else{
            invalid(Fullname,"Please don't use numbers or specific characters")
        }
        
        if(username.value.match(/^[A-Z a-z][a-z A-Z 0-9 \S @ \-\_]*$/) && username.value.length >= 4){
            Valid(username)
        }
        else{
            invalid(username,"please use more than 4 characters  and star whit letters")
        }
           
        if(email.value.match(/(^[a-zA-Z0-9]+[\- \_]*[a-zA-Z0-9]*)@[a-z A-Z 0-9]+(\.[A-Z a-z]{2,})$/)){
         Valid(email)
        }else{
            invalid(email,"please enter a valid email address",)
        }
        if(password.value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            validPASSWORD(password)
    }else{
        invalidPASSWORD(password,`Please use a password of at least 8 characters, with one uppercase letter, one number, and one special symbol (@, -, etc.)`)
        }

        if(confpassword.value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) && confpassword.value == password.value){
            validPASSWORD(confpassword)
        }else{
           invalidPASSWORD(confpassword,"Password and confirm password do not match, please try again.")
        }
        // check if the email and username already exist 
        ALLaccounts.forEach(function(user){
            if(user.username == username.value){
            invalid(username,"this username is already exists please choose another username")
            }if(user.email == email.value){
        invalid(email,"this email is already exists please choose another email address")
            }
        })
        // creat object and add it to localStorage
        if(isformvalid == true){
            let user = new users(Fullname.value,username.value,email.value,password.value)
            ALLaccounts.push(user)
            localStorage.setItem("accounts",JSON.stringify(ALLaccounts))
            window.location.assign("login.html")
        }
    })
}

// login to your account
if(form2 != null){
    form2.addEventListener("submit",function(e){
        e.preventDefault();
        let username = document.getElementById("user")
        let password = document.getElementById("user-password")
        let formisvalid = true
        let usernameexists = false
       let c =  ALLaccounts.find(function(user){
            return user.username == username.value
        })
        if(c !== undefined){
            username.style.border = '1px solid green'
            usernameexists = true
            if(!username.nextElementSibling.classList.contains("hidden")){
                username.nextElementSibling.classList.add("hidden")
            }
        }else{
                   let p = username.nextElementSibling
                username.style.border = '1px solid red'
                p.classList.remove("hidden")
                username.value.length >0 ? p.textContent = "this username doesn't exist":p.textContent = "Please fill out this field."
                formisvalid = false
        }
        if(usernameexists){
            if(password.value == c.password){
                password.style.border = '1px solid green'
                if(!password.nextElementSibling.nextElementSibling.classList.contains("hidden")){
                    password.nextElementSibling.nextElementSibling.classList.add("hidden")
                }
            }else{
                let p = password.nextElementSibling.nextElementSibling
                password.style.border = '1px solid red'
                p.classList.remove("hidden")
                password.value.length >0 ? p.textContent = "password is incorect":p.textContent = "Please fill out this field."
                formisvalid = false
            }
    
        }
        if(formisvalid){
            window.location.replace("./user.html")
        }
    })
}
