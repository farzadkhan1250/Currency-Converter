const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown  select");

const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".exchange-rate");


for(let selector of dropdowns)
{
    for(currcode in countryList)
    {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(selector.name === "from" && currcode === "USD")
        {
            newoption.selected = "selected";
        }
        else if(selector.name === "to" && currcode === "PKR")
            {
                newoption.selected = "selected";
            }
        selector.append(newoption);
    }
    selector.addEventListener("change",(evt) =>{
        updateflag(evt.target);
    })
}

const updateflag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newsrc;
}

btn.addEventListener("click",async (evt) =>
{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if(amval === " " || amval < 0)
    {
        amval = 1;
        amount.value = "1"; 
    }

    let URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json` ;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = amVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})