const express = require('express');
const router = express.Router();
const path = require('path');
const HojePageControl = require(path.resolve(__dirname,'src','controller','HomePageController'));
const CadControler = require(path.resolve(__dirname,'src','controller','CadastroControler'));

router.get('/',HojePageControl.SetHomePage);
router.get('/cadastro/:id_usuario',CadControler.getPageCadastro);
router.get('/cadastro',CadControler.getPageCadastro);
router.post('/cadastro/register',CadControler.getPageRegister);
router.post('/cadastro/register/:idproduto',CadControler.getPageRegister);
router.get('/codastro/delete/:idproduto',CadControler.deleteProduto)

module.exports=router;

