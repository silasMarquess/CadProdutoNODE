const path = require('path');
const HomeModelo = require(path.resolve('src','models','HomeModel'));

module.exports.SetHomePage = (req,res,next)=>{
    res.render('index');
    next();
}

module.exports.SetPost=(req,res,next)=>{
console.log(req.nome);
 res.send(res.nome);
 next();
}


