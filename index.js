const express = require("express");
const app= express();
const handlebars = require ('express-handlebars')
const bodyParser = require('body-parser')
const Comment = require('./models/comment')

//config
//Template Engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.search('view engine', 'handlebars');
//body Parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
//Rotas Inicial
app.get('/',function(req,res){
    Comment.findAll({order:[['id','DESC']]}).then(function(comments){
        res.render('home',{comments:comments})
    })
})
//Rota do formulario
        app.get('/form',function(req,res){
            res.render('formulario.handlebars')
        })
//rotas "post" só pode ser acessada quando alguem faz uma requisição 
    app.post('/add',function(req,res){
        Comment.create({
            titulo:req.body.titulo,
            conteudo:req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).cath(function(erro){
            res.send("Comentario não pode ser ser criado" + erro)
        })
            })
//Rota para deletar comentarios
    app.get('/deletar/:id',function(req,res){
        Comment.destroy({where: {'id' :req.params.id}}).then(function(){
            res.send("Comentario deletado com sucesso")
        }).cath(function(erro){
            res.send('Ocorreu um erro')
        })
    })
app.listen(8081,function(){
    console.log("Servidor rodado na porta http://localhost:8081/");
});