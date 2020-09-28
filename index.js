const express = require('express');
const dataStore = require('nedb');
let currentSearch = [];
const { request, response } = require('express');
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
})
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
