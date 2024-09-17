const path = require('path');
const Produto = require(path.resolve('src','models','produtoModel'));

module.exports.getPageCadastro = async (req,res,next)=>{
    const obj = req.params.id_usuario;
    let p = {nome:'',preco:'',estoque:''};
    try{
        if(obj){
            p = await Produto.getProdutoForId(obj);
        }
        res.render('cadastro',{p});
        next();
    }catch(e){
        console.log(e);
        res.render('404');;
    }

}

module.exports.deleteProduto = async function(req,res,next){
    try{
        const id = req.params.idproduto;
        const produto = Produto.Delete(id);
        if(!produto) return res.render('404');
        req.session.save(function(){
            return res.redirect('/');
        })
    }catch(e){
        console.log(e);
    }
}

module.exports.getPageRegister = async function(req, res, next){
    try{
        const id = req.params.idproduto;
        const p = new Produto(req.body);
        let msg = '';
        let rotaEscape=`/cadastro`;

                if(!id){
                    await p.Register();
                    msg = 'Dados Salvos com sucesso'
                }else{
                    await p.Update(id);
                    rotaEscape = `/cadastro/${id}`;
                    msg = 'Dados editados com sucesso'
                }

        if(p.errors.length>0){
            req.flash('errors',p.errors);
            req.session.save(function(){
                return res.redirect(rotaEscape);
            })
            return;
        }
        res.render('register',{msg});
        next();
        
    }catch(e){
        console.log(e);
        res.render('404');
    }
}