// const { response } = require("express");

function tabledatthing(name,code,p1,p2,gst){
    let table = document.getElementById('table');
        let row = document.createElement("tr");
        let atr = document.createAttribute("class");
        atr.value = "dynaData";
        row.setAttributeNode(atr);
        let cell = document.createElement("td");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let txt = document.createTextNode(name);
        let txt1 = document.createTextNode(code);
        let txt2 = document.createTextNode(p1);
        let txt3 = document.createTextNode(p2);
        let txt4 = document.createTextNode(gst);
        cell.appendChild(txt);
        cell1.appendChild(txt1);
        cell2.appendChild(txt2);
        cell3.appendChild(txt3);
        cell4.appendChild(txt4);
        row.appendChild(cell);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        table.appendChild(row);
}
async function getdata(){
    const response = await fetch('/dat');
    const data = await response.json();
    let parse = JSON.stringify(data);
    console.log(JSON.stringify(data));
    remPrev();
    for(let i = 0;i < data.length;i++){
      let name = data[i]["name"];
      let code = data[i]["Code"];
      let price = data[i]["price"];
      let retail = data[i]["retail"];
      let gst = data[i]["gst"];
      console.log(data[i]["name"]);
      tabledatthing(name,code,price,retail,gst);
    }
} 
async function postServer(data,dest){
let options = {
    method:'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
};
fetch(dest,options);
}
document.addEventListener('keydown',()=>{

  if(event.key == "Enter"){
    findKey();
    remPrev();
  }
})
async function findKey(){
  let term = document.getElementById('search').value;
 let Oterm = {"term":term};
  console.log(term);
  postServer(Oterm,'/find');
  findData();
}
async function findData(){
    const response = await fetch('/getb');
    const data = await response.json();
    console.log(data);
    for(let i = 0;i < data.length;i++){
      let name = data[i]["name"];
      let code = data[i]["Code"];
      let price = data[i]["price"];
      let retail = data[i]["retail"];
      let gst = data[i]["gst"];
      tabledatthing(name,code,price,retail,gst);
    }
} 
function remPrev(){
  let x = document.getElementsByClassName("dynaData");
  if(x.length > 0){
  do{q = 0;x[q].remove();q++;}while(q<x.length+1);
  }else{
    console.log("allgood");
  }
}