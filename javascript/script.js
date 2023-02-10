const body = document.body
const dark = document.querySelector(".fa-moon")
const light = document.querySelector(".fa-sun")
const search = document.querySelector("#search")
const country  = document.querySelector(".country")
const select = document.querySelector(".select")
const selectors = document.querySelector(".selectors")
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
// ative darkmode
dark.addEventListener("click", () => {
  modify('none','flex','white','2b3743','202d36')
})
// active light mode
light.addEventListener("click", () => {
  modify('flex','none','black','fafafa','ffffff')
})
// display 50 country from the word randomly
let displayall = async function(){
  try{
    let respone = await fetch(`data.json`)
    let data = await respone.json()
    for(let i =0; i < 48; i++){
      let num1 = Math.floor(Math.random() * (250 - 0 + 1)) + 0;
      let c = `<div class="dives w-[250px] bg-text-origin mb-7 shadow dark:bg-text-origin1 dark:text-white">
            <div class="img w-full h-36 bg-black mb-2" style="background-image: url(${data[num1].flags.svg}); background-size: cover; background-position: center;"></div>
            <div class="px-6 py-2">
                <h1 class="mb-3 text-xl uppercase font-medium">${data[num1].name}</h1>
                <p class="mb-2">Population : <span class="population">${data[num1].population}</span></p>
                <p class="mb-2">Region : <span class="region">${data[num1].region}</span></p>
                <p class="mb-2">Capital : <span class="capital">${data[num1].capital}</span></p>
            </div>
        </div>
            `
         country.innerHTML += c
    }
  }catch(error){
      console.error('Error fetching data:', error);
    }
  }
  let Findcountries =  async function(way,name){
    try{
      let respone = await fetch(`https://restcountries.com/v3.1/${way}/${name}`)
      let data =  await respone.json()
      data.forEach(function(data){
        let c = `<div class="dives w-[250px] bg-text-origin mb-7 shadow dark:bg-text-origin1 dark:text-white">
                <div class="img w-full h-36 bg-black mb-2" style="background-image: url(${data.flags.svg?data.flags.svg:data.flags.png}); background-size: cover; background-position: center;"></div>
                <div class="px-6 py-2">
                    <h1 class="mb-3 text-xl uppercase font-medium">${data.name.common}</h1>
                    <p class="mb-2">Population : <span class="population">${data.population}</span></p>
                    <p class="mb-2">Region : <span class="region">${data.region}</span></p>
                    <p class="mb-2">Capital : <span class="capital">${data.capital}</span></p>
                </div>
            </div>
                `
             country.innerHTML += c
      })
    }catch(error){
      console.error('Error fetching data:', error);
    }
  }
displayall()

select.addEventListener("click", () => {
  const arrowdown = document.querySelector(".fa-down-long")
  const arrowup = document.querySelector(".fa-up-long")
  const p = document.querySelector(".show")
  if(selectors.classList.contains("opacity-0")){
    selectors.classList.replace("opacity-0","opacity-1")
    arrowdown.style.display = "none"
    arrowup.style.display = "block"
  }else{
    selectors.classList.replace("opacity-1","opacity-0")
    arrowdown.style.display = "block"
    arrowup.style.display = "none"
  }
  selectors.addEventListener("click", (e) => {
    p.textContent = e.target.textContent
    country.innerHTML = ""
    Findcountries('region',`${e.target.textContent}`)
    selectors.classList.replace("opacity-1","opacity-0")
    arrowdown.style.display = "block"
    arrowup.style.display = "none"
  })
})
search.addEventListener("keydown", (e) => {
  if(e.key == "Enter"){
    country.innerHTML = ""
    Findcountries('name',`${search.value}`)
    search.value = ""
  }
})