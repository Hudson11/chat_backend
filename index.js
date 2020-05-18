require('dotenv').config();
const userRouter        = require('./src/routers/userRouter');
const authRouter        = require('./src/routers/authRouter');
const express           = require('express');
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const app               = express();
const morgan            = require('morgan');

//cors
app.use(cors());

//morgan
app.use(morgan('dev'));

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Mongoose
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.SECRET_URL_DATABASE).then(() => {
    console.log('Conectado ao Mongo');
}).catch((err) => {
    console.log('Erro ao Conectar ao mongo' + err);
});

// Routers
app.use('/user', userRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (args) => {
    console.log('http://localhost:'+PORT);
});

