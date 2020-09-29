// const { response } = require("express");
let button = document.getElementsByTagName("button");
let cart = [];
let list = [];
let shoppy = document.getElementById('cart');
let liste = document.querySelector('.list');
function tabledatthing(name,code,p1,p2,gst,qid){
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
        let button = document.createElement("button");
        let id = document.createAttribute("id");
        id.value = qid;
        let txt = document.createTextNode(name);
        let txt1 = document.createTextNode(code);
        let txt2 = document.createTextNode(p1);
        let txt3 = document.createTextNode(p2);
        let txt4 = document.createTextNode(gst);
        let add = document.createTextNode("+");
        cell.appendChild(txt);
        cell1.appendChild(txt1);
        cell2.appendChild(txt2);
        cell3.appendChild(txt3);
        cell4.appendChild(txt4);
        button.setAttributeNode(id);
        button.append(add);
        row.appendChild(cell);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(button);
        button.style.position = "relative";
        button.style.float = "right";
        table.appendChild(row);
        // console.log(id);
        // test.push(id);
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
      let qid = data[i]._id;
      // console.log("here is the id : "+qid);
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
      let qid = data[i]["_id"]
      tabledatthing(name,code,price,retail,gst,qid);
        button[i].addEventListener('click',() => {
          id = button[i].id;
          console.log("clicked");
          addToCart(id);
    });
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
function addToCart(id){
  console.log(id+"added to cart");
   cart.push(id); 
}
function showCart(){
  console.log("here are the elements");
  let k = {};
  for(i in cart){
    k[cart[i]]=(k[cart[i]]||0)+1;
   }
   let table = document.createElement('table');
   let attr = document.createAttribute('id');
   attr.value = "qtyL";
   table.setAttributeNode(attr);
  for(var j in k) {
    console.log(j+" comes -> "+k[j]+" times"); 
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');    //get this
    let cell2 =document.createElement('td');
    let text1 = document.createTextNode(j);
    let text2 = document.createTextNode(k[j]);
    cell1.appendChild(text1);
    cell2.appendChild(text2);
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
   }
   liste.appendChild(table);
}
shoppy.addEventListener('click',() => {
  let x = document.getElementById('qtyL');
  if(x){
    x.remove();
  }
  showCart();
  liste.classList.toggle('open');
});

