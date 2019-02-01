const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})