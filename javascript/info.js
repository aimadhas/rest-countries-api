const body = document.body
const dark = document.querySelector(".fa-moon")
const light = document.querySelector(".fa-sun")
const link = document.querySelector(".link")
const contenaire = document.querySelector(".countainer")
let lightmode = JSON.parse(localStorage.getItem("lightmode"))
// const load = document.querySelector(".load")
let history = []
//function modifate mode
let modify = function(none,flex,secondaire,origine,color){
  const header = document.querySelector(".header")
  const bor = document.querySelectorAll(".bor")
  body.style.background = `#${secondaire}`
  body.style.color = `${color}`
  header.style.background =`#${origine}`
  dark.parentElement.style.display = `${none}`
  light.parentElement.style.display = `${flex}`
  link.style.background = `#${origine}`
  link.style.color = `${color}`
  bor.forEach(function(b){
    b.style.background = `#${origine}`
  })
}
if(lightmode == true ){
  modify('flex','none','fafafa','ffffff',"black")
}else{
  modify('none','flex','202d36','2b3743',"white")
}
// ative darkmode
dark.addEventListener("click", () => {
  modify('none','flex','202d36','2b3743',"white")
  lightmode = false
  localStorage.setItem('lightmode',lightmode)
})
// active light mode
light.addEventListener("click", () => {
    modify('flex','none','fafafa','ffffff',"black")
    lightmode = true
    localStorage.setItem('lightmode',lightmode)
  })
let creathmtl = function(data){
  contenaire.innerHTML =''
  let c = `<img src="${data.flags.png}" alt="${data.flags.alt}" style="width: 550px;">
  <div class="info flex flex-col gap-9">
      <h1 class="name text-5xl  font-bold">${data.name.official}</h1>
          <div class="alldetails">
              <p class="mb-2 text-xl"> common Name : <span
                class="population text-lg">${data.name.common}</span></p>
              <p class="mb-2 text-xl">Population : <span class="text-lg">${data.population}</span></p>
              <p class="mb-2 text-xl">Region : <span class="text-lg ">${data.region}</span></p>
              <p class="mb-2 text-xl">Sub Region : <span class="text-lg">${data.subregion}</span></p>
              <p class="mb-2 text-xl">Capital : <span class="text-lg">${data.capital}</span></p>
              <p class="curencies mb-2 text-xl">currencies : </p>
              <p class="language mb-2 text-xl">Languages :</p>
          </div>
      <div class="borders flex gap-5  items-center">
          <p class="text-xl">Border Countries:</p>
      </div>
  </div>`
  contenaire.innerHTML += c
  // add languages 
      let obj = data.languages
    let values1 = [];
    for (let key in obj) {
      values1.push(obj[key]);
    }
    let para1 = document.querySelector(`.language`)
    for (let value of values1) {
      para1.innerHTML += `<span class="text-lg"> ${value} </span>`;
    }
  // add borders
  let para = document.querySelector(`.borders`)
  let values = data.borders
  if(values == undefined){
    para.innerHTML += `<p class="bor">they are no borders</p>`
  }else{
    for(let i = 0; i < values.length;i++){
      if(i == 3){
        break
      }else{
        para.innerHTML += `<p class="border cursor-pointer bor px-6 py-1 rounded shadow ">${values[i]}</p>`
      }
  }
  }
  // add curencies
  let para3 = document.querySelector(".curencies")
  let obj2 = data.currencies
  for (let key in obj2) {
    let obj3 =[]
    obj3.push(obj2[key])
    for(let a of obj3){
        para3.innerHTML += `<span class="text-lg"> ${a.name} </span>`
        para3.innerHTML += ` <span class="text-lg"> ${a.symbol} </span>`
    }
  }
  
}
let  data = JSON.parse(localStorage.getItem("name"))
let historydata = JSON.parse(localStorage.getItem("history"))
if(historydata){
  history = historydata
  data = historydata[historydata.length - 1]
  localStorage.setItem("name", JSON.stringify(historydata[historydata.length - 1]))
}else{
  history.push(data)
  localStorage.setItem("history",JSON.stringify(history))
}
creathmtl(data)



// find the borders
let Findcountries =  async function(name1){
  try{
    let respone = await fetch(`https://restcountries.com/v3.1/alpha/${name1}`)
    let data1 =  await respone.json()
    data = data1[0]
    // localStorage.setItem("name", JSON.stringify(data))
    history.push(data)
    localStorage.setItem("history",JSON.stringify(history))
    creathmtl(data)
    const border = document.querySelectorAll(".border")
      border.forEach(function(b){
        b.addEventListener("click", function(){
          Findcountries(`${b.textContent}`)
        })
})
  }catch(err){
    error("an error occured")
  }
}


// see more deatil about the border of the country
const border = document.querySelectorAll(".border")
border.forEach(function(b){
  b.addEventListener("click", function(){
    Findcountries(`${b.textContent}`)
  })
})

link.addEventListener("click", function(){
  if(history.length > 1){
    history.pop()
    localStorage.setItem("history",JSON.stringify(history))
    let num = history.length - 1
    creathmtl(history[num])
  }else{
    window.location.href= 'index.html'
  }
})
