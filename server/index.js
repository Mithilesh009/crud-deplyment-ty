const express = require('express');
const app= express();
const bodyParser = require('body-parser')
const mysql = require('mysql2') 
const cors = require("cors")
const port = process.env.port
const path = require('path')

// const mysql = require('mysql2');


const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'mithilesh09',
    database:'electronicStore'
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const middlware = (req,res,next)=>{
    console.log(`Hello My Middlware`)
    return next();
}


app.post("/create" ,(req,res)=>{
    console.log(req.body)
    const productName = req.body.productName;
    const seller = req.body.seller;
    const price = req.body.price;
    
    db.query('INSERT INTO sellerItems (ProductName,seller,price) VALUES(?,?,?)',[productName,seller,price], (err,result)=>{
        if(err){
            console.log("error : ",err)
            
        }else{
            console.log("result : ",result)
            res.send("Values inserted")
        }
    })

})

app.get("/read" , (req,res)=>{
    const sqlGet= "SELECT * FROM sellerItems";
    db.query(sqlGet,(err,result)=>{
        if(err){
            console.log('error : ',err)
        }else{
            console.log('result : ',result)
            res.send(result)
        }
    }) 


})


app.put('/update',(req,res)=>{
    const id= req.body.id;
    const productName= req.body.productName;
    const seller = req.body.seller;
    const price = req.body.price;
    db.query("UPDATE sellerItems SET  ProductName = ? WHERE id = ? ", [productName,id],
    (err,result)=>{
        console.log("error :" ,err)
        // console.log("result :" ,result)
    }
    )
    db.query("UPDATE sellerItems SET  seller = ? WHERE id = ? ", [seller,id],
    (err,result)=>{
        console.log("error :" ,err)
        // console.log("result :" ,result)
    }
    )
    db.query("UPDATE sellerItems SET  price = ? WHERE id = ? ", [price,id],
    (err,result)=>{
        console.log("error :" ,err)
        // console.log("result :" ,result)
    }
    )
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM sellerItems WHERE id=?",id,(err,result)=>{
        console.log("error :",err)
        console.log("result :",result)
    })
})



app.delete('/deleteAll',(req,res)=>{
    db.query("TRUNCATE TABLE sellerItems ",(err,result)=>{
        console.log("error :",err)
        console.log("result :",result)
    })
})


app.use(express.static(path.join(__dirname, './client/build')))

app.get('*' , (req,res)=>{
    res.sendFile(path.join(__dirname , './client/build/index.html'))
});

app.listen(port , ()=>{
    console.log("Server is runing on port 3000")
})

