const db = require('./db')

const ong = db.sequelize.define('ong',{
    nomeRazaoSocial:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    },
    email:{
        type:db.Sequelize.STRING
    },
    cpfCnpj:{
        type:db.Sequelize.STRING
    },
    endereco:{
        type:db.Sequelize.STRING
    },
    complemento:{
        type:db.Sequelize.STRING
    },
    cidade:{
        type:db.Sequelize.STRING
    },
    estado:{
        type:db.Sequelize.STRING
    },
    cep:{
        type:db.Sequelize.STRING
    },
    telefoneParaContato:{
        type:db.Sequelize.STRING
    },
    confirmarDados:{
        type:db.Sequelize.STRING
    },
    foto:{
        type:db.Sequelize.STRING
    },
    descricaoOng:{
        type:db.Sequelize.STRING
    }

})

//Cria tabela - somente uma vez
//ong.sync({force:true})

module.exports = ong