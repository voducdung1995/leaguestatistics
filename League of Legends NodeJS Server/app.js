const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();
//const { response } = require('express')

const Accountinformation = require('./helper/accountinformation.js')
const accountinformation = new Accountinformation();

const Rankinformation = require('./helper/rankinformation.js')
const rankinformation = new Rankinformation();

const Matchinformation = require('./helper/matchinformation.js')
const matchinformation = new Matchinformation();



app.listen(port, () => console.log(`Der Server hört auf ${port}`))

app.use ((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
next();
})


// GET für Accountinformationen
app.get('/account', (req,res) => {

    const name = req.query.name;

    accountinformation.get(name).then((response) => {

        res.status(200).send(response.data);

    }).catch((error) => {

        res.status(400).send(error);

    })

})

// Get für Rankinformationen

app.get('/rank', (req, res) => {

const id = req.query.id;

rankinformation.get(id).then((response)=>{
    
    res.status(200).send(response.data);

}).catch((error)=> {

    res.status(400).send(error);

})

})


// Get für MatchId Liste

app.get('/matchlist', (req,res) => {

const accountId = req.query.accid;

matchinformation.getMatchIdList(accountId).then((response)=>{

    res.status(200).send(response.data);

}).catch((error)=>{

    res.status(400).send(error);

})

})


// Get für Match Informationen 

app.get('/match', (req,res) => {

    const matchId = req.query.id;


    matchinformation.getMatchInformation(matchId).then((response) =>{

        console.log(response.data);

        res.status(200).send(response.data);

    }).catch((error) => {

        res.status(400).send(error);


    })





})




