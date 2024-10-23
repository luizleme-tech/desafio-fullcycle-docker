const express = require('express');
const mysql = require('mysql2'); // Atualizado para usar mysql2
const app = express();
const port = process.env.APP_PORT || 3000;

// Configuração da conexão com o MySQL
const config = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'nodedb',
};


const connection = mysql.createConnection(config);

// Verifica a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL.');
});

// Rota principal para inserir e listar nomes
app.get('/', (req, res) => {
  const sqlInsert = "INSERT INTO people (nome) VALUES ('Full Cycle Rocks')";
  connection.query(sqlInsert, (err) => {
    if (err) {
      console.error('Erro ao inserir nome:', err);
      return res.status(500).send('Erro ao inserir nome no banco de dados.');
    }

    // Consulta para listar os nomes
    const sqlSelect = 'SELECT nome FROM people';
    connection.query(sqlSelect, (err, results) => {
      if (err) {
        console.error('Erro ao buscar nomes:', err);
        return res.status(500).send('Erro ao buscar nomes no banco de dados.');
      }

      let namesList = results.map((row) => `<li>${row.nome}</li>`).join('');
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log('Aplicação rodando na porta:', port);
});
