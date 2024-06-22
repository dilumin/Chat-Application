const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const corsOptions = require('./middleware/cors');
const Credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const {router} = require('./routes/index');

const PORT = process.env.PORT ;

app.use(Credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/', router);




app.get('/*', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


