const body = document.body
const dark = document.querySelector(".fa-moon")
const light = document.querySelector(".fa-sun")
const link = document.querySelector(".link")
const contenaire = document.querySelector(".countainer")
    const data = JSON.parse(localStorage.getItem("name"))
    console.log(data)
let c = `<img src="${data.flags.png}" alt="" style="width: 550px;">
<div class="info flex flex-col gap-9">
    <h1 class="text-5xl  font-bold max-[450px]:text-3xl">${data.name.official}</h1>
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
    <div class="borders flex gap-5  items-center max-[400px]:flex-wrap">
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
for(let i = 0; i < values.length;i++){
  console.log(i)
  if(i == 3){
    break
  }else{
    para.innerHTML += `<p class="bor px-6 py-1 rounded shadow bg-origin">${values[i]}</p>`
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
// ative darkmode
dark.addEventListener("click", () => {
    modify('none','flex','202d36','2b3743',"white")
  })
  // active light mode
  light.addEventListener("click", () => {
    modify('flex','none','fafafa','ffffff',"black")
  })