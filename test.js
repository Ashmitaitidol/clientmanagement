// const data = require("express");
const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');  

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "",
    database: "test"   
  });  

//get the particular datalist list
// app.get('/display',(req,res)=>{
//     res.json(displayData)
// })
//add new item
app.post('/add',(req,res)=>{
    console.log("req.body",req.body)
    const display = req.body;
    console.log("display",display.f_name)
    var sql = "INSERT INTO tbl_test (id, f_name,l_name, user_name,password) VALUES ('"+display.id+"','"+display.f_name+"','"+display.l_name+"','"+display.user_name+"','"+display.password+"')";    
        con.query(sql, function (err, result) {  
        if (err) throw err;  
             console.log("1 record inserted");  
        });  
            res.send("Record Add Successfully")
    })

    //delete record
    // app.delete('/display/:id',(req,res)=>{
    app.post('/delete/:id',(req,res)=>{
        const id = req.params.id;
        var sql = "DELETE FROM tbl_test WHERE id = '"+id+"' ";    
            con.query(sql, function (err, result) {  
            if (err) throw err;  
                 console.log("Delete");  
            });  
                res.send("Record Deleted Successfully")
        })

//get alll data
    app.get('/display',(req,res)=>{
        var sql = "SELECT * FROM tbl_test";    
            con.query(sql, function (err, result) {  
                console.log(result);  
                res.send(result)
            }); 
        })

// update 
app.post('/update/:id',(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    var sql = "UPDATE tbl_test SET f_name = '"+data.f_name+"',l_name = '"+data.l_name+"' WHERE id = '"+id+"'";  
        con.query(sql, function (err, result) {  
            console.log(result);  
            res.send("Record Updated Successfully")
            // res.send(result)
        }); 
    })
    
        
    // const result = con.query(sql);
    // console.log("result",result)
   // return res.json(result);
// })
// return res.json(d)

//search item id wise
// app.get('/display/:id',(req,res)=>{
//     const id = req.params.id;
//     console.log(id)
//     for(let data of displayData)
//     {
//         if(data.id === id)
//         {
//             res.json(data)
//             return
//         }
//     }
//     res.status(404).send("not foundddd")

// })
// //delete movie
// app.delete('/display/:id',(req,res)=>{
//     const id = req.params.id;
//     displayData = displayData.filter((i)=>{
//             if(i.id !== id)
//             { 
//                 return true
//             }
//             return false
            
//     })
//     res.status(404).send("delete")
// })
app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
