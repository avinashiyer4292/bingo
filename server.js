const express = require('express');
const app =express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const apis = require('./apis.js');


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'react-client/build')));
    // app.get('*', function(req, res) {
    //   res.sendFile(path.join(__dirname, 'react-client/build', 'index.html'));
    // });
  }


app.use(bodyParser.urlencoded({
    extended : false
 }));
app.use(bodyParser.json());

app.get('/getNextNumber', (req,res)=>{
    var next = apis.getNext();
    console.log(`In server response: next number : ${next.toString()}`)
    res.send(next.toString());
})


app.get('/getAllTickets', (req,res)=>{
    var listOfSets = apis.getAllTickets();
    console.log(`In server response: list of sets: ${listOfSets} , ${JSON.stringify(listOfSets)}`)
    res.send(JSON.stringify(listOfSets));
})

app.post('/claimBingo', (req, res)=>{
    var list = req.body.data;
    var isClaimTrue = apis.checkBingoClaim(list);
    console.log(`In server response: is claim true: ${isClaimTrue}`)
    res.send(isClaimTrue.toString());
})

app.listen(port, function(){
    console.log(`App listening on port: ${port}`);
})
