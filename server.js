
const express = require ("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const usuario = require("./models/usuario")
const { removeData } = require("jquery")

//Configurar handlebar para
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

//Configurar o motor de tamplate handlebar
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/login',function(req,res){
    usuario.findAll().then(function(doadores){
        res.render('formulario',{doador:doadores.map(pagamento => pagamento.toJSON())})
    })
})
app.get('/', function (req,res){
    res.render ('paginaInicial')

})

app.get('/doeAgora', function(req,res){
    res.render ('doeAgora')
})

app.get('/cadastro',function(req,res){
    res.render ('cadastro')
})

app.use('/static', express.static(__dirname + '/public'));

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
        senha:req.body.senha    
    }).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('formulario', {doador: doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro"+erro)
    })

})

//flaito


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