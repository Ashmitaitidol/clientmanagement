// const data = require("express");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

let displayData = [
    {
    id:"1",
    name:"abc",
    description:"fdsfdg"
    },
    {
        id:"2",
        name:"abc",
        description:"fdsfdg"
    },
];

//get the particular datalist list
app.get('/display',(req,res)=>{
    res.json(displayData)
})
//add new item
app.post('/add',(req,res)=>{
    console.log("req.body",req.body)
    const display = req.body;
    displayData.push(display)
    res.send("adddd")
})
//search item id wise
app.get('/display/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    for(let data of displayData)
    {
        if(data.id === id)
        {
            res.json(data)
            return
        }
    }
    res.status(404).send("not foundddd")

})
//delete movie
app.delete('/display/:id',(req,res)=>{
    const id = req.params.id;
    displayData = displayData.filter((i)=>{
            if(i.id !== id)
            { 
                return true
            }
            return false
            
    })
    res.status(404).send("delete")
})
app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
