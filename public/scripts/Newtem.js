// const { response } = require("express");
let button = document.getElementsByTagName("button");
let cart = [];
let shoppy = document.getElementById('cart');
let liste = document.querySelector('.list');
function wait(ms){
  let now = Date.now()
while(true){
  let end = Date.now()
  console.log("waiting");
  if(end > now+ms){
    break;
  }
}
}
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
async function showCart(){
  console.log("here are the elements");
  let k = {};
  for(i in cart){
    k[cart[i]]=(k[cart[i]]||0)+1;
   }
   let table = document.createElement('table');
   let attr = document.createAttribute('id');
   attr.value = "qtyL";
   table.setAttributeNode(attr);
   let headRow = document.createElement('tr');
   let buttonRow = document.createElement('th');
   let header1 = document.createElement('th');
    let header2 =document.createElement('th');
    let txt  = document.createTextNode('item');
    let txt2 = document.createTextNode('qty');
    let rm = document.createElement("button");
    let rmf = document.createTextNode("-");
        let id = document.createAttribute("id");
        id.value = "qtyl";
        rm.setAttributeNode(id);
        rm.appendChild(rmf);
        buttonRow.appendChild(rm);
    header1.appendChild(txt);
    header2.appendChild(txt2);
    headRow.appendChild(buttonRow);
    headRow.appendChild(header1);
    headRow.appendChild(header2);
    table.appendChild(headRow);
  for(var j in k) {
    console.log(j+" comes -> "+k[j]+" times"); 
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');    //get this
    let cell2 =document.createElement('td');
    //#region glichy region
    let oterm = {"term":j};
    await postServer(oterm,'/inlist');
    wait(20);
    const response = await fetch('/getItem');
    let data = await response.json();
    //console.log(data[0]["name"]);
    let button = document.createElement("button");
        let id = document.createAttribute("id");
        id.value = data[0]["_id"];
        let remove = document.createTextNode("x");
    let text1 = document.createTextNode(data[0]["name"]);
    //#endregion
    let text2 = document.createTextNode(k[j]);
    cell1.appendChild(text1);
    cell2.appendChild(text2);
    button.setAttributeNode(id);
    button.appendChild(remove);
    row.appendChild(button);
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
    button.addEventListener("click",() => {
      let x = document.getElementById('qtyL');
      cart.pop(button.id);
      if(x){
        x.remove();
      }
      showCart();
    });
    rm.addEventListener('click',() => {
      let x = document.getElementById('qtyL');
      let len = cart.length;
      for(let i = 0; i< len;i++){
        cart.pop(i);
      }
      if(x){
        x.remove();
      }
    });
   }
   liste.appendChild(table);
   if(table.rows.length == 1){
     let nothin = document.createTextNode('there\'s nothing here!');
     let init = document.createElement('p');
     let id = document.createAttribute('id');
     let not = 'empty';
     id.value = not;
    init.setAttributeNode(id);
     init.appendChild(nothin);
     liste.appendChild(init);
   }
   let totalNode = document.getElementById('total');
   if(totalNode){
     totalNode.remove();
   }
   let total = document.createElement('h1');
   let attribut = document.createAttribute('id');
   attribut.value = "total";
   total.setAttributeNode(attribut);
   let list = [];
   for(let j in k){
    let oterm = {"term":j};
    await postServer(oterm,'/inlist');
    wait(20);
    const response = await fetch('/getItem');
    let data = await response.json();
    let priceProd = data[0]["price"];            //here is the price and 
    let itemQty = k[j];                        //qty
    list.push(priceProd*itemQty);
   }
   console.log(list);
   let tt = list.reduce((a,b) => a+b ,0);
   let amt = document.createTextNode("Total Amount : "+ tt);
   total.appendChild(amt);
   liste.appendChild(total);
}
shoppy.addEventListener('click',() => {
  let x = document.getElementById('qtyL');
  let y = document.getElementById('empty');
  let table = document.getElementsByTagName('table');
  let tabLen = table.length;
  if(x){
    x.remove();
  }
  if(y){
    y.remove();
  }
  if(tabLen == 3){
    table[tabLen-1].remove()
  }

  showCart();
  liste.classList.toggle('open');
});

