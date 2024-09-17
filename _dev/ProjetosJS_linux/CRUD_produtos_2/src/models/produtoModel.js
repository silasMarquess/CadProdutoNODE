const mongoose = require('mongoose');

//como o nosso mongoDB é um SGBD noSQL, então devemos passar para ele como ele deve salvar os dados 
//na base. Neste caso devemos passar um Shema
const produtoModel = new mongoose.Schema({
    nome: { type: 'String', require: true },
    descricao:{type:'String', require:false},
    preco: { type: 'Number', require: true },
    estoque: { type: 'Number', require: true},
})

const ProdutoModel = mongoose.model('produto', produtoModel);

class Produto {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.produto = null;
    }

     async Register() {
        this.Valida();
         await this.ProdutoExists();
        if (this.errors.length > 0) return;
         await ProdutoModel.create(this.body);
    }

    async Update(id) {
        this.Valida();
        if (this.errors.length > 0) return;
        this.produto = await ProdutoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async Delete(id){
        const contato = ProdutoModel.findByIdAndDelete(id);
        return contato;
    }

    Valida() {
        this.cleanUp();
        if (this.body.nome == '')this.errors.push('Nome não pode ser vazio');
        if(this.body.nome !== '' && !(Number.isNaN(Number(this.body.nome)))) this.errors.push('Campo de Nome não pode ser numérico');
        if (this.body.preco == '') this.errors.push('preço não pode ser vazio');
        if (this.body.estoque == '') this.errors.push('estoque não pode ser vazio');
        //o valor do estoque não pode ser negativo
        if (this.body.estoque < 0) this.errors.push('Estoque nao pode ser negativo')
        //o valor do preco deve positivo
        if (this.body.preco < 0) this.errors.push('Preço nao pode ser Negativo')
    }

    async ProdutoExists() {
        const obj =  await ProdutoModel.findOne({nome:this.body.nome});
        if (obj)this.errors.push('Erro:Produto Já Cadastrado: Informe um nome diferente');
    }

   static async getProdutoForId(id){
        const obj = await ProdutoModel.findById({_id:id});
        return obj;
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            nome: this.body.nome_produto,
            descricao: this.body.descricao_produto,
            preco: this.body.preco_produto,
            estoque: this.body.estoque_produto
        }
    }

    static async buscaProdutos(){
        const contatos = await ProdutoModel.find();
        return contatos;
    }

}

module.exports = Produto;