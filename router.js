const express = require('express');
const router = express.Router();
const path = require('path');
const HojePageControl = require(path.resolve(__dirname,'src','controller','HomePageController'));
const CadControler = require(path.resolve(__dirname,'src','controller','CadastroControler'));

router.get('/',HojePageControl.SetHomePage);
router.get('/cadastro',CadControler.getPageCadastro);

module.exports=router;

