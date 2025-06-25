const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Supabase
const supabaseUrl = 'https://ydsdbsellhxobduillkk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkc2Ric2VsbGh4b2JkdWlsbGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NzU0NzgsImV4cCI6MjA1NzM1MTQ3OH0.jc6qWqF7zNtsihvm62yFBoTOvtN8KxEQ9c8bF1r0q8Y'; 
const supabase = createClient(supabaseUrl, supabaseKey);



app.post('/api/cadastro', async (req, res) => {
  const { nome, sobrenome, email, senha } = req.body;

  if (!nome || !sobrenome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase
      .from('cliente')
      .insert([{ nome, sobrenome, email, senha }]);

    if (error) {
      return res.status(500).json({ message: 'Erro ao cadastrar cliente.', error });
    }

    return res.status(200).json({ message: 'Cliente cadastrado com sucesso!', data });
  } catch (err) {
    return res.status(500).json({ message: 'Erro inesperado no servidor.', error: err.message });
  }
});



app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  console.log('Dados recebidos no login:', req.body);

  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
  }

  try {

    const { data, error } = await supabase
      .from('cliente')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error('Erro no Supabase:', error);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (!data || data.length === 0) {
      return res.status(401).json({ message: 'Falha no login. Usuário não encontrado.' });
    }

    const usuario = data[0];


    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'Falha no login. Senha incorreta.' });
    }

    return res.status(200).json({ message: 'Login efetuado com sucesso!', data: usuario });

  } catch (err) {
    console.error('Erro inesperado no login:', err);
    return res.status(500).json({ message: 'Erro inesperado no login.', error: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});