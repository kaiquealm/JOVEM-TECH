const {Sequelize, sequelize} = require('./db')
const db = require('./db')

const Comment = db.sequelize.define('comentarios',{
    titulo:{
        type:Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
})
module.export = Comment

//comando para criar a tabela, executar so uma vez 
//Comment.sync({force:true})
