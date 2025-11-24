const express = require('express');
const app = express();
const db = require('./Config/db');

require('dotenv').config();
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`the server is running on http://localhost:${PORT}`);
})