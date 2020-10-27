//#region db stuff
const express = require('express');
const dataStore = require('nedb');
const csv = require('csv-parser');
const fs = require('fs');
let currentSearch = [];
let billnumNdate = [];
let list = [];
const { request, response } = require('express');
const { Console } = require('console');
const { runInThisContext } = require('vm');
const app = express();
const database = new dataStore('database.db');
database.loadDatabase();
app.listen(3000, () => {console.log('running at port 3000')});
app.use(express.static('public'));
app.use(express.json({limit:'5mb'}))
app.post('/api',(request,response) => {
    console.log(request.body);
    database.insert(request.body);
    console.log("incoming request!")
});
app.get('/dat',(request,response) => {
    console.log("database call");
    database.find({},(err,data) => {
      if (err) {
        console.log(err);
        response.end();
        return;
      }
      response.json(data);
    });
});
app.post('/find',(request,response) => {
    console.log("return request!");
    console.log(request.body["term"]);
    let word = request.body["term"];
    dataGo(word);
    //request.end();
});
app.get('/getb',(req,resp)=>{
  let len = currentSearch.length - 1;
  resp.json(currentSearch[len]);
  resp.end();
});
 function dataGo(word){
  const pased =  new RegExp(word, "i");
  database.find({ "Code": { "$regex": pased } }, (err, doc) => {
      if(err){
        console.log(err);
      }
      console.log(doc);
      currentSearch.push(doc);
    });
}
//#endregion
//#region this stuff is pretty glitchy
async function getdetails(word,dir){
  database.find({ "_id": word }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log(doc);
    list.push(doc);
  });
}
app.post('/inlist',(request,response) => {
  console.log("return request!");
  console.log(request.body["term"]);
  let word = request.body["term"];
  getdetails(word,"_id");
  //request.end();
  response.end();
});
app.get('/getItem',(req,resp)=>{
  let len = list.length - 1;
  resp.json(list[len]);
  resp.end();
});
//#endregion
//#region save server 
let currentEntry = [];
app.post('/saveit',(request,response) => {
  console.log("save request indicated!");
  let data = request.body;
  for(let i = 0; i < data.length; i++){
    let joined = data[i].join(",");
    //writeTocsv(joined + "\n");
    currentEntry.push(joined);
  }
  readFromcsv()
  response.end();
});
async function writeTocsv(text,billname){
  fs.appendFile("previous/"+`${billname}.csv`,text,function (err,data) {
    if(err){
      console.log(err);
    }
   // console.log(data);
  }) ;
 }
async function readFromcsv(){
    fs.createReadStream('bill.csv')
      .pipe(csv())
        .on('data',(row) => {
          //console.log(row);
          billnumNdate.push(row);
        })
          .on('end',() => {
            console.log("csv file read")
            let bill = parseInt(billnumNdate[billnumNdate.length-1]["billnum"])+1;
            currentEntry.map((elem) => {
              writeTocsv(elem+"\n",bill);
            })
            updateBillcount(bill);
          })
  }
  async function updateBillcount(num){
    let date = new Date();
    let dfor = date.toISOString()
    let format = "\n"+num+","+dfor
    fs.appendFile('bill.csv',format,function (err,data) {
      if(err){
        console.log(err);
      }
    })
    console.log(format);
  }