const dboperations = require('./dboperations');
var express = require("express");
const { Router } = require('express');
var bodyParser = require('body-parser');


var app = express();
var router = express.Router();

app.use(bodyParser.json());

app.use('/api',router);


router.route('/orders').get((req,res)=>{

dboperations.getOrders().then(result =>{

    res.json(result[0]);
})

})

router.route('/orders/:id').get((req,res)=>{

    dboperations.getOrderById(req.params.id).then(result =>{
    
        res.json(result[0]);
    })

})


router.route('/orders').post((req,res)=>{

    let order = {...req.body}

    dboperations.addOrder(order).then(result =>{
    
        res.json(result[0]);
    })

})


router.route('/orders/:id').delete((req,res)=>{

    dboperations.deleteOrderById(req.params.id).then(result =>{
    
        res.json(result[0]);
    })

})

router.route('/orders').put((req,res)=>{

    let order = {...req.body}
    dboperations.updateOrder(order).then(result =>{
    
        res.json(result[0]);
    })

})



var port = process.env.port || 8877;
app.listen( port);
console.log('listen to port : ' + port);
