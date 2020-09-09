const { response } = require("express");

function tabledatthing(name,code,p1,p2,gst){
    let table = document.getElementById('table');
        let row = document.createElement("tr");
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
let addObk = {};
let n = 1;
function additem(){
let myObj = {};
let name = document.getElementById('itemName').value;
let Code = document.getElementById('uniqCode').value;
let price1 = document.getElementById('price1').value;
let retail = document.getElementById('price2').value;
let gst = document.getElementById('GST').value;

myObj["name"] = name;
myObj["Code"] = Code;
myObj["price"] = price1;
myObj["retail"] = retail;
myObj["gst"] = gst;
console.log(myObj);
n = n++;
addObk[n] = myObj;
tabledatthing(myObj.name,myObj.Code,myObj.price,myObj.retail,myObj.gst);

let options = {
    method:'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(myObj)
};

fetch('/api',options)
//console.log(name+Code+price1+retail+gst);
}
async function getdata(){
    const resp = await fetch('/api');
    const data = await resp.json();
    console.log(data);
} 
