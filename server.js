const express = require('express');
const app =express();
const port = 5000;
const apis = require('./apis.js');
app.get('/',(req, res)=>{
    //res.send("Hey there!!!")
})

app.get('/getNextNumber', (req,res)=>{
    var next = apis.getNext();
    //console.log(`Next number: ${next}`);
    res.status(200).send(next.toString());
})

app.get('/getAllTickets', (req,res)=>{
    var listOfSets = apis.getAllTickets();
    //console.log(`List of sets: ${JSON.stringify(listOfSets)}`)
    res.status(200).send(JSON.stringify(listOfSets));
})

app.listen(port, function(){
    console.log(`App listening on port: ${port}`);
})
