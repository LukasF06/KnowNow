const express = require('express');
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const uri = 'Your Database URL';

const client = new MongoClient(uri);

app.get('/get', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    findData(client);

    async function findData(client) {
        const result = await client
        .db("Lernsets")
        .collection("Lernset")
        .find({}).toArray()

        console.log(result);
        res.send(result);
    }
    
});

app.get('/get/:name', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const name =  req.params.name;

    findData(client);

    async function findData(client) {
        const result = await client
        .db("Lernsets")
        .collection("Lernset")
        .find({name: name}).toArray()

        console.log(result);
        res.send(result);
    }
    
});

app.post('/post', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = req.body;
    data._id = new ObjectId();

    addData(client, data);

    async function addData(client, data) {
        const postresult = await client
        .db("Lernsets")
        .collection("Lernset")
        .insertOne(data)

        console.log(postresult);
        res.send(postresult);
    }
});

app.delete('/delete/:name', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = { name: req.params.name };

    deleteData(client, data);

    async function deleteData(client, data) {
        const deleteresult = await client
        .db("Lernsets")
        .collection("Lernset")
        .deleteOne(data)

        console.log(deleteresult);
        res.send(deleteresult);
    }
});

app.listen(3000, (err) => {

    if(err) {
        console.log(err);
        process.exit(1);
    }

    console.log("Server is running on Port 3000")
});
