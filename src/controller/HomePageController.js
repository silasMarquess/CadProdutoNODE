const path = require('path');
const Produto= require(path.resolve('src','models','produtoModel'));
const HomeModelo = require(path.resolve('src','models','HomeModel'));

module.exports.SetHomePage =async(req,res,next)=>{
    const produtos = await Produto.buscaProdutos();
    res.render('index',{produtos});
    next();
}

module.exports.SetPost=(req,res,next)=>{
console.log(req.nome);
 res.send(res.nome);
 next();
}


