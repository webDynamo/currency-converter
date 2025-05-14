const URL = "https://restcountries.com/v3.1/all?fields=name,flags,cca3,currencies";
const optionValue = document.getElementById("amount_currency");
const ConvertedAmount=document.getElementById("convertedAmount");
const AmountValue=document.getElementById("amountValue");
const ConvertedValue=document.getElementById("convertedValue");
const toggleDiv=document.getElementById("toggleDiv")
const IMG1=document.getElementById("amountImage");
const IMG2=document.getElementById("convertedImg");
const fetchData=async () =>{
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching data:", error);
    return null
  }

}

const getData = async (val,id,currenyID) => {
    const data= await fetchData()
    data.forEach((item) => {
      const optionTag = document.createElement("option");
      optionTag.setAttribute("value", item.cca3);
      optionTag.innerText =item.cca3;
      val.appendChild(optionTag);
      const IMG=document.getElementById(id)
      IMG.src = item.flags.png;
      const keys = Object.keys(item.currencies); 
      const currencySyb = document.getElementById(currenyID);
      currencySyb.innerHTML=keys
    });
};

getData(optionValue,"amountImage","inr")
getData(ConvertedAmount,"convertedImg","USD")

const onChangeSelected=(val,id,currenyID)=>{
  val.addEventListener('change', async() => {
    const data=await fetchData()
    const ele=data.find((item)=> item.cca3===val.value)
    console.log(ele);
    const IMG=document.getElementById(id)
    IMG.src = ele.flags.png;
    const keys = Object.keys(ele.currencies); 
    const currencySyb = document.getElementById(currenyID);
    currencySyb.innerHTML=keys;
   
});
}
onChangeSelected(optionValue,"amountImage","inr");
onChangeSelected(ConvertedAmount,"convertedImg","USD")



toggleDiv.addEventListener("click",()=>{
   let value1= optionValue.value;
   let value2=ConvertedAmount.value;
   optionValue.value = value2;
   ConvertedAmount.value = value1;
   let imgSrc1=IMG1.src;
   let imgSrc2=IMG2.src;
   IMG1.src=imgSrc2;
   IMG2.src=imgSrc1
   let initialVal = document.getElementById("inr").innerText;
   let convertedValue = document.getElementById("USD").innerText;
   document.getElementById("inr").innerText=convertedValue;
   document.getElementById("USD").innerText=initialVal;
   AmountValue.value="";
   ConvertedValue.value=""
})

const finalResult= async ()=>{
   const initialVal=document.getElementById("inr").innerText;
   const convertedVal=document.getElementById("USD").innerText;
   const initialAmount=AmountValue.value
   console.log("initial value", initialAmount)

  try{
    const response= await fetch(`https://api.exchangerate-api.com/v4/latest/${initialVal}`)
    const data= await response.json();
    const rate= data.rates[convertedVal]
    const finalAmount=initialAmount*rate;
    ConvertedValue.value=finalAmount;
    ConvertedValue.innerHTML=finalAmount;
    const resultShow = document.getElementsByClassName("result_show");
    if (resultShow.length > 0) {
      resultShow[0].innerHTML = `<p>Conversion Rate: 1 <span>${initialVal}</span> = <span>${rate} ${convertedVal}</span></p>`;
    }
  }catch(error){
    console.error("Error fetching data:", error);
  }
   
}

document.getElementById("ExchangeBtn").addEventListener("click",finalResult)
