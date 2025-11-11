import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../database/assistec.db');
const backupPath = path.join(__dirname, '../backup_os_2025-06-28.json');

async function importBackup() {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  const data = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  for (const c of data) {
    await db.run(`INSERT OR IGNORE INTO clientes (id, os, nome, telefone, aparelho, marca, problema, observacao, status, valor, exibirValor, dataEntrada, dataSaida)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [c.id || '', c.os || '', c.nome || '', c.telefone || '', c.aparelho || c.modelo || '', c.marca || '', c.problema || c.defeito || '', c.observacao || c.observacoes || '', c.status || '', c.valor || 0, c.exibirValor ? 1 : 0, c.dataEntrada || '', c.dataSaida || '']);
  }
  console.log('Importação concluída!');
  await db.close();
}

importBackup();
