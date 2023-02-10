const body = document.body
const dark = document.querySelector(".fa-moon")
const light = document.querySelector(".fa-sun")
const link = document.querySelector(".link")
//function modifate mode
let modify = function(none,flex,secondaire,origine,color){
    const header = document.querySelector(".header")
        body.style.background = `#${secondaire}`
        body.style.color = `${color}`
        header.style.background =`#${origine}`
        dark.parentElement.style.display = `${none}`
        light.parentElement.style.display = `${flex}`
        link.style.background = `#${origine}`
        link.style.color = `${color}`
  }
  // ative darkmode
  dark.addEventListener("click", () => {
      modify('none','flex','202d36','2b3743',"white")
    })
    // active light mode
    light.addEventListener("click", () => {
      modify('flex','none','fafafa','ffffff',"black")
    })
let c = localStorage.getItem("name")
console.log(c)
let find = async function(){
    try{
        let respone = await fetch(`https://restcountries.com/v3.1/name/${c}`)
        let data =  await respone.json()
        data.forEach(function(data){
          const contenaire = document.querySelector(".countainer")
          let c = `<img src="${data.flags.png}" alt="" style="width: 550px;">
          <div class="info flex flex-col gap-9">
              <h1 class="text-5xl  font-bold">${data.name.official}</h1>
                  <div>
                      <p class="mb-2 text-xl"> common Name : <span
                              class="population text-lg text-gray-300 ">${data.name.common}</span></p>
                      <p class="mb-2 text-xl">Population : <span class="text-lg text-gray-300 ">${data.population}</span></p>
                      <p class="mb-2 text-xl">Region : <span class="text-lg text-gray-300">${data.region}</span></p>
                      <p class="mb-2 text-xl">Sub Region : <span class="text-lg text-gray-300">${data.subregion}</span></p>
                      <p class="mb-2 text-xl">Capital : <span class="text-lg text-gray-300">${data.capital}</span></p>
                      <p class="mb-2 text-xl">currencies : <span class="text-lg text-gray-300">${data.currencies[0]}</span></p>
                      <p class="mb-2 text-xl">Languages : <span class="text-lg text-gray-300">${data.languages}</span></p>
                  </div>
              <div class="flex gap-5  items-center">
                  <p class="text-xl">Border Countries:</p>
                
                  <p class="px-6 py-1 rounded shadow bg-origin">France</p>
                  <p class="px-6 py-1 rounded shadow bg-origin">France</p>
                  <p class="px-6 py-1 rounded shadow bg-origin">France</p>
              </div>
          </div>`
          contenaire.innerHTML += c
          console.log(data)
        })
      }catch(error){
        console.error('Error fetching data:', error);
      }
}
find()