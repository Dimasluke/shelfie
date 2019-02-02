const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const app = express();
const controller = require('./controller')
require('dotenv').config();
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING)
    .then(db => {
        console.log("Connected to database.")       
        app.set("db", db);   
        db.init();
  })
    .catch((err) =>{
        console.log(err)
    });

app.get('/api/inventory', controller.allProducts)
app.get('/api/inventory/:id', controller.getProduct)
app.post('/api/product', controller.addProduct)
app.delete('/api/inventory/:id', controller.deleteProduct)
app.put('/api/inventory/:id', controller.updateProduct)


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})