const mongoose = require('mongoose');

//como o nosso mongoDB é um SGBD noSQL, então devemos passar para ele como ele deve salvar os dados 
//na base. Neste caso devemos passar um Shema
const HomeShema = new mongoose.Schema({
    titulo:{type:String, require:true},
    descricao:String
})

const HomeModel = mongoose.model('Home',HomeShema);

module.exports=HomeModel;