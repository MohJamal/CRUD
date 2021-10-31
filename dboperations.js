
const config = require('./dbconfig');
const sql = require('mssql');


async function getOrders() {

    let pool = await sql.connect(config);
    let orders = await pool.request().query(" SELECT * FROM ORDERS ")

    return orders.recordsets;
}


async function getOrderById(id) {

    let pool = await sql.connect(config);
    let orders = await pool.request()
        .input('orderId', sql.Int, id)
        .query(" SELECT * FROM ORDERS where id = @orderId");

    return orders.recordsets;
}


async function addOrder(order) {

    let pool = await sql.connect(config);
    let orders = await pool.request()
        .input('Title', sql.NVarChar, order.Title)
        .input('Message', sql.NVarChar, order.Message)
        .input('Quantity', sql.Int, order.Quantity)
        .input('City', sql.NVarChar, order.City)

        .query(" insert into orders values ( @Title , @Quantity  , @Message , @City ) ");

    return orders.recordsets;
}

async function deleteOrderById(id) {

    let pool = await sql.connect(config);
    let orders = await pool.request()
        .input('orderId', sql.Int, id)
        .query(" DELETE FROM ORDERS where id = @orderId");

    return orders.recordsets;
}

async function updateOrder(order) {



    let pool = await sql.connect(config);
    let orders = await pool.request()
        .input('Id', sql.Int, order.Id)
        .input('Title', sql.NVarChar, order.Title)
        .input('Message', sql.NVarChar, order.Message)
        .input('Quantity', sql.Int, order.Quantity)
        .input('City', sql.NVarChar, order.City)
        .query(" update orders set  Title =  @Title , Quantity = @Quantity  , Message=  @Message , City =  @City where id = @Id ");

        console.log(orders.recordsets);
    return orders.recordsets;
}

module.exports = {

    getOrders: getOrders,
    getOrderById: getOrderById,
    addOrder: addOrder,
    deleteOrderById: deleteOrderById,
    updateOrder: updateOrder
}