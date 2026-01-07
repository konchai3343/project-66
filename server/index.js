var express = require('express');
var app = express();
const mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const secret = 'login';
const bcrypt = require('bcrypt');
const saltRounds = 10
const session = require('express-session');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "",
    host: "",
    password: "",
    database: ""
});

app.get('/stock', (req, res) => {
    
    db.query("SELECT * FROM bottle_stock", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/produc', (req, res) => {
    
    db.query("SELECT * FROM manu", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/sale', (req, res) => {
    db.query("SELECT * FROM sale", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.get('/employ', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})






    app.post('/login', (req, res) => {
        db.query("SELECT * FROM user WHERE id=? AND password = ?",
        [req.body.id, req.body.password],
        
        function(err, result){
            if(err){
                res.json({status: 'error', message: err });
                return 
            }
            if(result.length == 0){ 
                res.json({status: 'err', message: 'no user'}); 
                return 
            }else{
                if(result[0].status == 'ผู้จัดการ'){
                    res.json({status: 'ผู้จัดการ', message: 'success'});
                    return
                }
                if(result[0].status == 'พนักงานผลิต'){
                    res.json({status: 'พนักงานผลิต', message: 'success'});
                    return
                }
                if(result[0].statu == 'พนักงานส่งน้ำ'){
                    res.json({status: 'พนักงานส่งน้ำ', message: 'success'});
                    return
                }
                 
            }
        })
    })

    
    app.post('/date', (req, res) => {
        db.query("SELECT name, number, tank, bottle, pet FROM sale WHERE date=?",
        [req.body.date],(err, result) => {
            if(err){
                console.log('no date');
            }else{
                res.send(result);
            }
        })
    })
//----------------------------------------------- all stock ---------------------------------------------------//
//------------------------------------------ admin order produc------------------------------------------------// 
    app.post('/new',(req,res) => {
        const S = req.body.S;       const OS = req.body.OS;     const GS = req.body.GS;
        const FS = req.body.FS;     const DFS = req.body.DFS;   const CS = req.body.CS;     const DCS = req.body.DCS;

        const M = req.body.M;       const OM = req.body.OM;     const GM = req.body.GM;
        const FM = req.body.FM;     const DFM = req.body.DFM;   const CM = req.body.CM;     const DCM = req.body.DCM;

        const L = req.body.L;       const OL = req.body.OL;     const GL = req.body.GL;
        const FL = req.body.FL;     const DFL = req.body.DFL;   const CL = req.body.CL;     const DCL = req.body.DCL; 
        const date =  req.body.date;
        db.query("INSERT INTO produc_stock(L_bot, OL_bot, GL_bot, FL_bot, DFL_bot, CL_bot, DCL_bot, M_bot, OM_bot, GM_bot, FM_bot, DFM_bot, CM_bot, DCM_bot, S_bot, OS_bot, GS_bot, FS_bot, DFS_bot, CS_bot, DCS_bot, date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                           [L,     OL,     GL,     FL,     DFL,     CL,     DCL,     M,     OM,     GM,     FM,     DFM,     CM,     DCM,     S,     OS,     GS,     FS,     DFS,     CS,     DCS,    date   ], 
            (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("INSERT PRODUC");
            }
        })
    })
//------------------------------------------ admin searsh produc ------------------------------------------------// 
    app.post('/check', (req, res) => {
        db.query("SELECT date FROM produc_stock WHERE date=?",
        [req.body.date],(err, result) => {
            if(err){
                console.log('no date');
            }else{
                res.send(result);
            }
        })
    })
    app.post('/allstock', (req, res) => {
        db.query("SELECT * FROM produc_stock WHERE date=?",
        [req.body.date],(err, result) => {
            if(err){
                console.log('no date');
            }else{
                res.send(result);
            }
        })
    })
//------------------------------------------ admin update produc ------------------------------------------------//
    app.put('/update', (req, res) => {
        const S = req.body.S;       const OS = req.body.OS;    
        const M = req.body.M;       const OM = req.body.OM;     
        const L = req.body.L;       const OL = req.body.OL;     
        const date =  req.body.date;
        db.query("UPDATE produc_stock SET L_bot=?,OL_bot=?,M_bot=?,OM_bot=?,S_bot=?,OS_bot=? WHERE date = ? ", 
                                         [L,      OL,      M,      OM,      S,      OS,            date   ],
        ),(err, result) => {
            if(err){
                console.log('no date');
            }else{
                res.send(result);
            }
        }
    })
    

//----------------------------------------------- for sale ---------------------------------------------------//

app.post('/add_sale', (req, res) => {
    const Name = req.body.Name;
    const Number = req.body.Number;
    const Tank = req.body.Tank;
    const Bottle = req.body.Bottle;
    const Pet = req.body.Pet;
    const date = req.body.date;
    db.query("INSERT INTO sale (name, number, tank, bottle, pet, date) VALUES(?,?,?,?,?,?)",
    [Name, Number, Tank, Bottle, Pet, date], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("add sale");
        }
    })
})

app.post('/CheckNumber', (req, res) => {
    const Number = req.body.Number;
    const date = req.body.date;
    db.query("SELECT number FROM sale WHERE number = ? AND date = ?",[Number, date], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put('/EditSale', (req, res) => {
    const Number = req.body.Number;
    const Tank = req.body.Tank;
    const Bottle = req.body.Bottle;
    const Pet = req.body.Pet; 
    const date = req.body.date;
    db.query("UPDATE sale SET tank = ?, bottle = ?, pet = ? WHERE number = ? AND date = ?", [Tank, Bottle, Pet, Number, date]
    ,(err, result) => {
        if(err){
            console.log(err);
        }else{
            
            res.send(result);
        }
    })
})


//-------------------------------------------------------------------------------------------------------------//


//--------------------------------------------- for manufactor ------------------------------------------------//
//----------------------------------------------- add Stock ---------------------------------------------------//
app.put('/Mupdate', (req, res) => {
    const FS = req.body.FS;     
    const DFS = req.body.DFS; 
    const FM = req.body.FM;     
    const DFM = req.body.DFM;   
    const FL = req.body.FL;     
    const DFL = req.body.DFL;    
    const date =  req.body.date;
    db.query("UPDATE produc_stock SET FL_bot=?, DFL_bot =?, FS_bot =?, DFS_bot =?, FM_bot =?, DFM_bot =?  WHERE date =?  ", 
                                     [FL,DFL,FM,DFM,FS,DFS,date],
        (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
//----------------------------------------------- add manu ---------------------------------------------------//
app.post('/o_bot',(req, res) => {
    const date =  req.body.date;
    db.query("SELECT OL_bot,OM_bot,OS_bot FROM produc_stock WHERE date = ?",[date],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.put('/add_manu', (req, res) => {
    const GL = req.body.GL;     
    const GM = req.body.GM;     
    const GS = req.body.GS;     
    const date =  req.body.date;
    db.query("UPDATE produc_stock SET GL_bot=?,GM_bot=?,GS_bot=?  WHERE date =?  ", 
                                     [GL,GM,GS,date],
        (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})





//---------------------------------------------- for deliver --------------------------------------------------//
//----------------------------------------------- add Stock ---------------------------------------------------//
app.put('/Dupdate', (req, res) => {
    const FS = req.body.FS;     
    const DFS = req.body.DFS; 
    const FM = req.body.FM;     
    const DFM = req.body.DFM;   
    const FL = req.body.FL;     
    const DFL = req.body.DFL;    
    const date =  req.body.date;

    db.query("UPDATE produc_stock SET CL_bot=?, DCL_bot =?, CS_bot =?, DCS_bot =?, CM_bot =?, DCM_bot =?  WHERE date =?  ", 
                                     [FL,DFL,FM,DFM,FS,DFS,date],
        (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
//-------------------------------------------------------------------------------------------------------------//



//---------------------------------------------- for order ----------------------------------------------------//
app.post('/porder', (req, res) => {
    const Name = req.body.Name;
    const Tell = req.body.Tell;
    const Address = req.body.Address;
    const TB = req.body.TB;
    const Country = req.body.Country;
    const Tank = req.body.Tank;
    const Bottle = req.body.Bottle;
    const Pet = req.body.Pet;
    
    db.query("INSERT INTO shop(name,tell,address,city,cunty,L_bot,M_bot,S_bot) VALUES(?,?,?,?,?,?,?,?)",
                                [Name, Tell, Address, TB, Country,Tank, Bottle, Pet], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("add sale");
        }
    })
})

app.get('/order', (req, res) => {
    db.query("SELECT * FROM shop",(err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/deletep/:name', (req, res) => {
    const name = req.params.name;
    db.query("DELETE FROM shop WHERE name = ?", name, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.delete('/delete/:number', (req, res) => {
    const number = req.params.number;
    db.query("DELETE FROM sale WHERE number = ?", number, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


//---------------------------------------------- for Edit Page ----------------------------------------------------//
app.get('/user', (req, res) => {
    db.query("SELECT * FROM user",(err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.put('/EditU', (req, res) => {
    const Name = req.body.Name;
    const Status = req.body.Status;
    const ID = req.body.ID;
    const Password = req.body.Password; 
    db.query("UPDATE user SET name = ?, status = ?, id = ?, password = ? WHERE name = ?", [Name, Status, ID, Password, Name],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            
            res.send(result);
        }
    })
})

app.post('/regis', (req, res) => {
    const Name = req.body.Name;
    const Status = req.body.Status;
    const ID = req.body.ID;
    const Password = req.body.Password; 
    db.query("INSERT INTO user (name,status,id,password) VALUES (?, ?,?,?)",[Name, Status, ID, Password],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/deleteU/:Name', (req, res) => {
    const name = req.params.Name;
    db.query("DELETE FROM user WHERE name = ?", name, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.listen('3001', () => {
    console.log("server is runnin");
})
