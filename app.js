const express = require('express')
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require('body-parser')
var agendamentos = require('./banco.js')

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("index")
})

app.post("/cadastrar", function(req, res){
    agendamentos.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        dataContato: req.body.dataContato,
        observacao: req.body.observacao,
    }).then(function(){
        res.redirect('/consultar')
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

app.get("/consultar", function(req, res){
    agendamentos.findAll().then(function(listar){
        const listarTudo = listar.map(function(agendamento) {
            return {
                id: agendamento.id,
                nome: agendamento.nome,
                telefone: agendamento.telefone,
                origem: agendamento.origem,
                dataContato: agendamento.dataContato,
                observacao: agendamento.observacao
            }
        })
        res.render("consultar", { lista: listarTudo })
    }).catch(function(error) {
        res.send("Houve um erro: "+ erro)
    })
})

app.get("/atualizar/:id", function(req, res){
    const id = req.params.id;
    agendamentos.findByPk(id).then((agendamento) => {
        const dadosAgendamento = {
            id: agendamento.id,
            nome: agendamento.nome,
            telefone: agendamento.telefone,
            origem: agendamento.origem,
            dataContato: agendamento.dataContato,
            observacao: agendamento.observacao
        }; 
        res.render("atualizar", {registro: dadosAgendamento})
    }).catch(function(erro){
        res.send("Houve um erro: "+ erro)
    })
})

app.post("/atualizar/editar", function(req, res){
    const id = req.body.id;
    agendamentos.findByPk(id).then((agendamentos) => {
        agendamentos.nome = req.body.nome,
        agendamentos.telefone = req.body.telefone,
        agendamentos.origem = req.body.origem,
        agendamentos.dataContato = req.body.dataContato,
        agendamentos.observacao = req.body.observacao,

        agendamentos.save().then(function(){
            res.redirect('/consultar')
        }).catch(function(erro){
            res.send("Houve um erro: "+ erro)
        })
    }).catch(function(erro){
        res.send("Houve um erro: "+ erro)
    })
})

app.listen(8081, function(){
    console.log("Servidor Rodando na porta 8081")
})