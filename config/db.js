import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Claudia1',
  database: 'adote_pet'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});


