
const express = require ("express")
const app = express()

const multer = require ("multer")

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const usuario = require("./models/usuario")
const ong = require("./models/ong")
const doacao = require("./models/doacao")
const { removeData } = require("jquery")

//Configurar handlebar para
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

//Configurar o motor de tamplate handlebar
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/static', express.static(__dirname + '/public'));

//chamando ao modeulo express-session 
var session = require ('express-session');

//configuração da sessão
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', function (req,res){
    res.render ('paginaInicial')

})

app.get('/doeAgora', function(req,res){
  if(req.session.nome){

    res.render ('doeAgora')

    }else{
    res.render('login')
}
})

app.get('/destruir', function(req,res){
   req.session.destroy(function(){
    res.render ('login')
});
})

app.get('/cadastro',function(req,res){
    res.render ('cadastro')
})

app.get('/cadastroDoacao', function (req,res){
    if(req.session.nome){
    
    res.render ('cadastroDoacao')

}else{
    res.render('login')
}

})

app.get('/cadastroGeral', function(req,res){
    res.render ('cadastroGeral')
})

app.get('/login', function(req,res){
    res.render ('login')
})

app.post('/login',function (req,res){
//essas duas linhas abaixo vão vir do banco de dados
//    req.session.nome = 'andre';
//    req.session.senha = 'repolho123'
//
//    if(req.session.nome == req.body.nome && req.body.senha == 'repolho123'){
//        res.send ("usuario logado")
//    }else{
//        res.send ("usuario não existe")
//    }

    req.session.nome = req.body.nome;
    usuario.count({where: { nome: req.session.nome }}).then(function(dados){
        if(dados >= 1){
            res.render('paginaInicial')
        }else{
            res.send("Usuário não cadastrado" + dados)
        }
    })
    req.session.senha = req.body.senha;
    usuario.count({where: { senha: req.session.senha }}).then(function(dados){
        if(dados >= 1){
            res.render('login')
        }else{
            res.send("Usuário não cadastrado" + dados)
        }
    })






})

//criar cadastro usuario

app.post('/cadUsuario',function(req,res){
    usuario.create({
        nome:req.body.nome,
        senha:req.body.senha,
        email:req.body.email,
        cpf:req.body.cpf,
        endereco:req.body.endereco,
        complemento:req.body.complemento,
        cidade:req.body.cidade,
        estado:req.body.estado,
        cep:req.body.cep,
        telefoneParaContato:req.body.telefoneParaContato,
        confirmarDados:req.body.confirmarDados

    }).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('cadastro', {doador: doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })

})
app.get('/cadastro',function(req,res){
    usuario.findAll().then(function(doadores){
        res.render('cadastro',{doador:doadores.map(pagamento => pagamento.toJSON())})
    })
})

//vamo criar mais uma rota e ela dara para um formulário
app.get('/update/:id', function(req,res){
    usuario.findAll({where:{'id' : req.params.id}}).then(function(doadores){
        res.render('atualizaUsuario',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
})

//depois vamos criar essa rota que envia para o banco e depois chama o formulario
app.post('/updateUsuario',function(req,res){
    usuario.update({
            nome:req.body.nome,
            senha:req.body.senha,
            email:req.body.email,
            cpf:req.body.cpf,
            endereco:req.body.endereco,
            complemento:req.body.complemento,
            cidade:req.body.cidade,
            estado:req.body.estado,
            cep:req.body.cep,
            telefoneParaContato:req.body.telefoneParaContato,
            confirmarDados:req.body.confirmarDados},

            {where:{id:req.body.id}}
    ).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('cadastro',{doador:doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })
})

//update ong
app.get('/update/:id', function(req,res){
    usuario.findAll({where:{'id' : req.params.id}}).then(function(doadores){
        res.render('atualizaOng',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
})

//depois vamos criar essa rota que envia para o banco e depois chama o formulario
app.post('/updateOng',function(req,res){
    ong.update({nome:req.body.nome,senha:req.body.senha},{
        where:{id:req.body.codigo}}
    ).then(function(){
        ong.findAll().then(function(ongs){
        res.render('formulario',{ong: ongs.map(cadastramento => cadastramento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })
})


//criar cadastro doações

app.post('/cadDoacao',function(req,res){
    doacao.create({
        categoria:req.body.categoria,
        descricao:req.body.descricao,
        nivel:req.body.nivel
       
    }).then(function(){
        doacao.findAll().then(function(doacoes){
        res.render('cadastroDoacao', {doacao: doacoes.map(cadastramento => cadastramento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })

})
app.get('/cadDoacao',function(req,res){
    doacao.findAll().then(function(doacoes){
        res.render('cadastroDoacao',{doacao:doacoes.map(cadastramento=> cadastramento.toJSON())})
    })
})

//criar cadastro ong

app.post('/cadOng',function(req,res){
    ong.create({
        razaoSocial:req.body.nome,
        senha:req.body.senha,
        email:req.body.email,
        cnpj:req.body.cpf,
        endereco:req.body.endereco,
        complemento:req.body.complemento,
        cidade:req.body.cidade,
        estado:req.body.estado,
        cep:req.body.cep,
        telefoneParaContato:req.body.telefoneParaContato,
        confirmarDados:req.body.confirmarDados


    }).then(function(){
        ong.findAll().then(function(ongs){
        res.render('cadastroOng', {ong:ongs.map(cadastramento => cadastramento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })

})
app.get('/cadastroOng',function(req,res){
    ong.findAll().then(function(ongs){
        res.render('cadastroOng',{ong:ongs.map(cadastramento => cadastramento.toJSON())})
    })
})

//Deletar informações

app.get('/delete/:id',function(req,res){
    usuario.destroy({
        where:{'id': req.params.id}
    }).then(function(){
        usuario.findAll().then(function(doadores){
            res.render('cadastro',{doador: doadores.map(
                pagamento => pagamento.toJSON())})
        })

      .catch(function(){res.send("não deu certo")
        })
    })
});

app.listen(3000);