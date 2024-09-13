module.exports.middleGlobal = (req, res, next)=>{
    res.locals.errors = req.flash('errors'); 
    next();
}
module.exports.CheckErrocsrf=(err,req,res,next)=>{
    if(err && err.code=='EBADCSRFTOKEN'){
        return res.render('404');
     }
}

module.exports.csrfMiddleware = (req, res, next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
}

