import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, '../backup_os_2025-06-28.json');

export function getClientes() {
  if (!fs.existsSync(dbFile)) return [];
  return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
}

export function saveClientes(clientes) {
  fs.writeFileSync(dbFile, JSON.stringify(clientes, null, 2));
}
