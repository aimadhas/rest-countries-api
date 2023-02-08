let alldiv = document.querySelectorAll(".backg")
let allpoint = document.querySelectorAll(".point")
let icons = document.querySelectorAll(".bxs-error-circle")
let vision = document.querySelectorAll(".fa-solid")
let alertMessage = document.querySelectorAll(".alert")
let i = 0
let intervalId;
function startInterval() {
    intervalId = setInterval(function () {
        i++
        if(i > alldiv.length - 1){
            i = 0
        }
        alldiv.forEach(function(div,id){
            div.style.opacity = "0"
            div.style.transition = '0.3s ease-in'
            if(id == i){
                div.style.opacity = "1"
            }
        })
        allpoint.forEach(function(point){
            point.style.background ="#b9b9b9b4"
        })
        allpoint[i].style.background = "white"
    },3000)
}
startInterval()
allpoint.forEach(function(point){
point.addEventListener("click", function(){
    let num = point.dataset.set
        allpoint.forEach(function(point){
        point.style.background ="#b9b9b9b4"
    })
    point.style.background = "white"
    alldiv.forEach(function(div){
                div.style.opacity = "0"
                div.style.transition = '0.3s ease-in'
            })
    alldiv[num].style.opacity = "1"
    i = num
    // controle setiterval time
    clearInterval(intervalId)
    setTimeout(startInterval,100)
})
})
icons.forEach((icon,id) => {
    icon.addEventListener("mouseover", function(){
       alertMessage[id].classList.remove('hidden')
        alertMessage[id].classList.add('flex')
    })
    icon.addEventListener("mouseout", function(){
       alertMessage[id].classList.add('hidden')
        alertMessage[id].classList.remove('flex')
    })
})
vision.forEach(function(v){
    v.addEventListener("click", function(){
        let t = v.previousElementSibling
        if(t.type == "password"){
            t.type = "text"
            v.classList.replace("fa-eye","fa-eye-slash")
        }else{
           t.type = "password"
            v.classList.replace("fa-eye-slash","fa-eye")
        }
    })
})
