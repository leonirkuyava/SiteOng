const db = require('./db')

const usuario = db.sequelize.define('usuarios',{
    nome:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    },
    email:{
        type:db.Sequelize.STRING
    },
    cpf:{
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
    }

})

//Cria tabela - somente uma vez
//usuario.sync({force:true})

module.exports = usuario