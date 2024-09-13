require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();
const helmet = require('helmet');
const csurf = require('csurf');
//mongo
const mongoose = require('mongoose');
const {middleGlobal,CheckErrocsrf,csrfMiddleware} = require(path.resolve(__dirname,'src','middlewares','mymiddleware'));

mongoose.connect(process.env.__connectionString)
.then(() => {
    console.log("conexao feita");
    app.emit('pronto');//emitindo um sinal para que o servidor possar iniciar de fato;
}).catch(e => {
    console.log(e);
});

const session = require('express-session');
const MongoStore = require('connect-mongo');

const Flash = require('connect-flash');
const { options } = require('./router');

const routes = require(path.resolve(__dirname, 'router'));

app.use(express.urlencoded({ extended: true }));

const sessionConfig=session({
    secret:'wqrwtwetqwtqwt',
    store: MongoStore.create(mongoose.connection),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
})
app.use(sessionConfig);
app.use(Flash());
app.use(helmet());
//app.use(middleGlobal);
app.use(csurf());
app.use(middleGlobal);
app.use(csrfMiddleware);
app.use(CheckErrocsrf);

app.use(routes);

app.use(express.static(path.resolve(__dirname, 'public')));//estou informando para o express que conteudo statico fica na pasta public
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.on('pronto', () => {
    app.listen('3000', () => {
        console.log("Server online");
    })
})

