// Western Sahara
const body = document.body
const dark = document.querySelector(".fa-moon")
const light = document.querySelector(".fa-sun")
const search = document.querySelector("#search")
const country  = document.querySelector(".country")
const select = document.querySelector(".select")
const selectors = document.querySelector(".selectors")
const alert = document.querySelector(".alert")
const load = document.querySelector(".load")
// array to stock data to avoid duplicte country
let countrydata = []
//function modifate mode
let modify = function(none,flex,mode,origine,secondaire){
  const header = document.querySelector(".header")
  const dives = document.querySelectorAll(".dives")
  const sharp = document.querySelector(".fa-sharp")
      body.style.background = `#${secondaire}`
      body.style.color = `${mode}`
      header.style.background =`#${origine}`
      dark.parentElement.style.display = `${none}`
      light.parentElement.style.display = `${flex}`
      sharp.style.color = `${mode}`
      search.style.background = `#${origine}`
      select.style.background = `#${origine}`
      search.style.color = `${mode}`
      selectors.style.background = `#${origine}`
      dives.forEach(function(div){
        div.style.background =`#${origine}`
        div.style.color = `${mode}`
      })
      select.style.color = `${mode}`
      selectors.style.color = `${mode}`
      search.style.color = `${mode}`
      header.style.color = `${mode}`
}
let lightmode = false
// ative darkmode
dark.addEventListener("click", () => {
  modify('none','flex','white','2b3743','202d36')
  lightmode = false
  localStorage.setItem('lightmode',lightmode)
})
let c = JSON.parse(localStorage.getItem('lightmode'))
if(c == true ){
  modify('flex','none','black','fafafa','ffffff')
}else{
  modify('none','flex','white','2b3743','202d36')
}
// active light mode
light.addEventListener("click", () => {
  modify('flex','none','black','fafafa','ffffff')
  lightmode = true
  localStorage.setItem('lightmode',lightmode)
})


// creat the country card
let cardcountry = function(data,one,two,three,four,five){
  let c = `
  <div class="dives w-[250px]  mb-7 shadow cursor-pointer" data-id="${data}">
      <div class="img w-full h-36 mb-2" style="background-image: url(${one}); background-size: cover; background-position: center;"></div>
      <div class="px-6 py-2">
          <h1 class="name mb-3 text-xl uppercase font-medium">${two}</h1>
          <p class="mb-2">Population : <span class="population">${three}</span></p>
          <p class="mb-2">Region : <span class="region">${four}</span></p>
          <p class="mb-2">Capital : <span class="capital">${five}</span></p>
          <a href="#" class="link" >More information</a>
      </div>
</div>
  `
  country.innerHTML += c
}



// display errore message
let error = function(mess){
  const message = document.querySelector(".message")
  const mark = document.querySelector(".fa-xmark")
  const load = document.querySelector(".load")
  message.textContent = `${mess}` 
  alert.classList.replace("hidden","flex")
  load.classList.add("hidden")
  mark.addEventListener("click", () => {
    alert.classList.replace("flex","hidden")
    location.reload();
  })
}



// display 50 country from the word randomly
let displayall = async function(){
  try{
    let respone = await fetch(`https://restcountries.com/v3.1/all`)
    let data = await respone.json()
    load.classList.add("hidden")
    for(let i =0; i < 48; i++){
      let num1 = Math.floor(Math.random() * (250 - 0 + 1)) + 0;
      countrydata.push(data[num1])
      if(data[num1].name.common =="Western Sahara"){
        continue;
      }
      cardcountry(data[num1].area,data[num1].flags.svg,data[num1].name.common,data[num1].population,data[num1].region,data[num1].capital)  
      }
  }catch(error){
      console.error('an Error happened');
    }
  }



  // function to find a country from the word
  let Findcountries =  async function(way,name){
    try{
      let respone = await fetch(`https://restcountries.com/v3.1/${way}/${name}`)
      if(name.length == 0){
        throw new Error('Please fill out this field.')
      }
      if(respone.status ==404 || name == "Western Sahara" || name == "Sahrawi Arab Democratic Republic"){
        throw new Error('We were unable to find a country matching your search. Please make sure you have entered the correct name and try again')
      }
      let data =  await respone.json()
      load.classList.add("hidden")
      countrydata = data
      let newdata = data.filter(function(data){
                return data.name.common !== "Western Sahara"
              })
              newdata.forEach(function(data){
                cardcountry(data.area,data.flags.svg,data.name.common,data.population,data.region,data.capital)
              })
    }catch(err){
      error(err.message)
    }
  }

displayall()


// // select a spicify  region
select.addEventListener("click", () => {
  const arrowdown = document.querySelector(".fa-down-long")
  const arrowup = document.querySelector(".fa-up-long")
  const p = document.querySelector(".show")
  if(alert.classList.contains("flex")){
    alert.classList.replace("flex","hidden")
  }
  if(selectors.classList.contains("hidden")){
    selectors.classList.replace("hidden","block")
    arrowdown.style.display = "none"
    arrowup.style.display = "block"
  }else{
    selectors.classList.replace("block","hidden")
    arrowdown.style.display = "block"
    arrowup.style.display = "none"
  }
  selectors.addEventListener("click", (e) => {
    p.textContent = e.target.textContent
    country.innerHTML = ""
    load.classList.remove("hidden")
    Findcountries('region',`${e.target.textContent}`)
    selectors.classList.replace("block","hidden")
    arrowdown.style.display = "block"
    arrowup.style.display = "none"
  })
})

// search for country by the name
search.addEventListener("keydown", (e) => {
  if(e.key == "Enter"){
    country.innerHTML = ""
    load.classList.remove("hidden")
    if(alert.classList.contains("flex")){
      alert.classList.replace("flex","hidden")
    }
    Findcountries('name',`${search.value}`)
    search.value = ""
  }
})



// give more information about the country
country.addEventListener("click", (e) => {
  if(e.target.classList.contains("link")){
    e.preventDefault()
    let id = e.target.parentNode.parentElement.dataset.id
    countrydata.forEach(function(country){
      if(country.area == id){
        localStorage.setItem("name", JSON.stringify(country))
        window.location.href ="information.html"
      }
    })
  }
})
localStorage.removeItem("history")