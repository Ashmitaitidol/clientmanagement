const express = require("express");
const app = express();
const port = 3000;
var mysql = require("mysql");

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clientmanagement",
});

//register
app.post("/register", (req, res) => {
  console.log("req.body", req.body);
  const display = req.body;
  const emaiPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneno = /^\d{10}$/;
  const passw=  /^[A-Za-z]\w{7,14}$/;

  if(display.userName == '')
  {
     res.json({ message: "User Name can not be null", status: 404 });
  }
  if(display.email == '')
  {
     res.json({ message: "Email Address can not be null", status: 404 });
  }
  if(!display.email.match(emaiPattern))
  {
    res.json({ message: "Please Enter Valid Email Address", status: 404 });
  }
  if(display.phoneNo == '')
  {
     res.json({ message: "Mobile number Can not be null", status: 404 });
  }
  if(!display.phoneNo.match(phoneno))
  {
    res.json({ message: "Please Enter 10 Digit Mobile Number", status: 404 });
  }
  if(display.password == '')
  {
     res.json({ message: "Password can not be null", status: 404 });
  }
  if(!display.password.match(passw))
  {
    res.json({ message: "Please Enter Strong Password", status: 404 });
  }
  if(display.companyName == '')
  {
     res.json({ message: "Company can not be null", status: 404 });
  }
else
{
  var sql =
    "INSERT INTO user (userName,email, phoneNo,password,companyName,role,isActive,regDate,isActiveChangeDate) VALUES ('" +
    display.userName +
    "','" +
    display.email +
    "','" +
    display.phoneNo +
    "','" +
    display.password +
    "','" +
    display.companyName +
    "','Admin','true','28-02-2022','28-02-2022')";

  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log("1 record inserted");
    // console.log('result',result);
  });
  res.json({ message: "Register Successfully", status: 200 });
}
});

//login
app.post("/login", (req, res) => {
  console.log("req.body", req.body);
//   const display = req.body;

  if(req.body.email == '')
  {
     res.json({ message: "Email Address can not be null", status: 404 });
  }
  if(req.body.email.match(emaiPattern))
  {
    res.json({ message: "Please Enter Valid Email Address", status: 404 });
  }
  if(req.body.password == '')
  {
      res.json({ message: "Password can not be null", status: 404 });
  }
  if(!display.password.match(passw))
  {
    res.json({ message: "Please Enter Password Between 7 to 15", status: 404 });
  }
else
{
  var sql =
    "SELECT * FROM user WHERE email='" +
    req.body.email +
    "' AND password = '" +
    req.body.password +
    "' AND isActive='true' LIMIT 1";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length === 0) {
      res.json({ message: "Invalid User", status: 404 });
    } else {
        // var roledata = result.map(function(value) {
        //     console.log(value)
        //     return value.role;
        //   });
        //  console.log(result.RowDataPacket.role)

      res.json({
        message: "Login Successfully",
        status: 200,
        // role: RowDataPacket.role
      });
      // res.send("Login Successfully")
    }
  });
}
});

//delete user
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  var sql = "DELETE FROM user WHERE id = '" + id + "' ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Delete");
  });

  res.json({ message: "Record Deleted Successfully", status: 200 });
  // res.send("Record Deleted Successfully")
});
//display all
app.get("/display", (req, res) => {
  var sql = "SELECT * FROM user";
  con.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

//update data
// update
app.post('/update/:id',(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    console.log(req.body)
    var sql = "UPDATE user SET userName = '"+data.userName+"',email = '"+data.email+"',phoneNo = '"+data.phoneNo+"',password = '"+data.password+"' WHERE id = '"+id+"'";
       console.log(sql)
    con.query(sql, function (err, result) {
            console.log(result);
            res.send("Record Updated Successfully")
            // res.send(result)
        });
    })

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
