// const express=require('express');
// const cors=require('cors');
// const bodyParser=require('body-parser');

// const app=express();
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/',(req,res)=>{
//     res.send('Meu servidor backend!');
// });

// let port=process.env.PORT || 3000;
// app.listen(port, (req,res)=>{
//     console.log('Servidor Rodando');
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User } = require('./models'); // Importa o modelo User

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Permite trabalhar com JSON

// Testar o backend
app.get('/', (req, res) => {
  res.send('Meu servidor backend!');
});

// Obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Criar um novo usuário
app.post('/users', async (req, res) => {
  try {
    const { name, age, address } = req.body;
    const user = await User.create({ name, age, address });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Atualizar um usuário
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, address } = req.body;
    const user = await User.findByPk(id);

    if (user) {
      await user.update({ name, age, address });
      res.json(user);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Excluir um usuário
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Iniciar o servidor
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Servidor Rodando na porta', port);
});
