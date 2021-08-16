const Table = document.querySelector("tbody");
const btn = document.querySelector(".resetBtn")
const Start = document.querySelector(".StartPrice")
const Finish = document.querySelector(".FinishPrice")
const TableHead = document.querySelector("thead")

const URL = "http://exercise.develop.maximaster.ru/service/products/"

let DB;

const ShowTable = (data, StartPrice = 0, FinishPrice = Math.max() * (-1)) => {
    Table.innerHTML = "";
    
    data.forEach((Element, i) => {
        if(Number(Element.price) >= StartPrice && Number(Element.price) <= FinishPrice){
            const TableString = document.createElement("tr")
            const ID = document.createElement("td");
            const Name = document.createElement("td");
            const Price = document.createElement("td");
            const Quantity = document.createElement("td");
            const Sum = document.createElement("td");
            ID.innerHTML = i + 1;
            Name.innerHTML = Element.name;
            Price.innerHTML = Element.price;
            Quantity.innerHTML = Element.quantity;
            Sum.innerHTML = Number(Element.price * Element.quantity)
            TableString.appendChild(ID)
            TableString.appendChild(Name)
            TableString.appendChild(Quantity)
            TableString.appendChild(Price)
            TableString.appendChild(Sum)
            Table.appendChild(TableString)
        }
    })
    if(Table.innerHTML == ""){
        TableHead.classList.add("hide")
        Table.innerHTML = "Нет данных, попадающих под условие фильтра"
    }
    else{
        TableHead.classList.remove("hide")
    }
}


fetch(URL).then(data => data.json()).then(data => {
    DB = data 
    ShowTable(data)
})

btn.addEventListener('click', () => {
    const StartValue = Number(Start.value);
    const FinishValue = Number(Finish.value);
    if(StartValue == 0 && FinishValue == 0){
        ShowTable(DB)
    }
    else if(StartValue <= FinishValue && !isNaN(StartValue) && !isNaN(FinishValue)){
        ShowTable(DB, Number(Start.value), Number(Finish.value))
    }
    else{
        console.log("Error")
    }   
})