const db = require('./db')

const doacao = db.sequelize.define('doacao',{
    categoria:{
        type:db.Sequelize.STRING
    },
    descricao:{
        type:db.Sequelize.STRING
    },
    nivel:{
        type:db.Sequelize.STRING
    }

})

//Cria tabela - somente uma vez
//doacao.sync({force:true})

module.exports = doacao
