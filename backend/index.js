import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getClientes, saveClientes } from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listar clientes
app.get('/api/clientes', (req, res) => {
  const clientes = getClientes();
  res.json(clientes);
});

// Adicionar cliente
app.post('/api/clientes', (req, res) => {
  const clientes = getClientes();
  const c = req.body;
  clientes.push(c);
  saveClientes(clientes);
  res.json({ ok: true });
});

// Atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  let clientes = getClientes();
  const idx = clientes.findIndex(x => x.id === req.params.id);
  if (idx >= 0) {
    clientes[idx] = req.body;
    saveClientes(clientes);
    res.json({ ok: true });
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Remover cliente
app.delete('/api/clientes/:id', (req, res) => {
  let clientes = getClientes();
  clientes = clientes.filter(x => x.id !== req.params.id);
  saveClientes(clientes);
  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});
