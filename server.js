
const express = require ("express")
const app = express()

const multer = require ("multer")

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const usuario = require("./models/usuario")
const ong = require("./models/ong")
const { removeData } = require("jquery")

//Configurar handlebar para
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

//Configurar o motor de tamplate handlebar
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', function (req,res){
    res.render ('paginaInicial')

})

app.get('/doeAgora', function(req,res){
    res.render ('doeAgora')
})

app.get('/login', function(req,res){
    res.render ('login')
})

app.get('/cadastro',function(req,res){
    res.render ('cadastro')
})

app.use('/static', express.static(__dirname + '/public'));

app.get('/cadastroDoacao', function (req,res){
    res.render ('cadastroDoacao')

})

//vamo criar mais uma rota e ela dara para um formulário
app.get('/update/:id', function(req,res){
    usuario.findAll({where:{'id' : req.params.id}}).then(function(doadores){
        res.render('atualiza',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
})

//depois vamos criar essa rota que envia para o banco e depois chama o formulario
app.post('/updateUsuario',function(req,res){
    usuario.update({nome:req.body.nome,senha:req.body.senha},{
        where:{id:req.body.codigo}}
    ).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('formulario',{doador:doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })
})

//esse bloco é disparado pelo enviar do formulário
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


//criar tabela ong

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


app.get('/delete/:id',function(req,res){
    usuario.destroy({
        where:{'id': req.params.id}
    }).then(function(){
        usuario.findAll().then(function(doadores){
            res.render('formulario',{doador: doadores.map(
                pagamento => pagamento.toJSON())})
        })

      .catch(function(){res.send("não deu certo")
        })
    })
});

app.listen(3000);