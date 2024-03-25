const Sequelize = require('sequelize')
const sequelize = new Sequelize('exemplo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log("Sequelize ativo!")
}).catch(function(erro){
    console.log("Falha de conexão: "+ erro)
})

const agendamentos = sequelize.define("agendamentos", {
    nome:{
        type: Sequelize.STRING
    },
    telefone:{
        type: Sequelize.STRING
    },
    origem:{
        type: Sequelize.STRING
    },
    dataContato:{
        type: Sequelize.DATEONLY
    },
    observacao:{
        type: Sequelize.STRING
    }
})

module.exports = agendamentos

//agendamentos.sync({force: true})