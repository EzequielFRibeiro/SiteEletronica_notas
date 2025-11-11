// Funções para consumir API Express (backend)
async function carregarClientes() {
    const res = await fetch('http://localhost:3001/api/clientes');
    const clientes = await res.json();
    const lista = document.getElementById('clientes-list');
    lista.innerHTML = '';
    clientes.forEach(c => {
        const div = document.createElement('div');
        div.className = 'registro';
        div.innerHTML = `<div class='registro-header'><span class='os-number'>OS: ${c.os}</span><span>${c.nome}</span></div>
            <div class='registro-content'>
                <p><b>Telefone:</b> ${c.telefone}</p>
                <p><b>Aparelho:</b> ${c.aparelho}</p>
                <p><b>Marca:</b> ${c.marca}</p>
                <p><b>Problema:</b> ${c.problema}</p>
                <p><b>Status:</b> ${c.status}</p>
                <p><b>Valor:</b> R$ ${c.valor || 0}</p>
                <button onclick="editarCliente('${c.id}')">Editar</button>
                <button onclick="removerCliente('${c.id}')">Remover</button>
            </div>`;
        lista.appendChild(div);
    });
}

function abrirCadastro() {
    document.getElementById('cadastro-panel').style.display = 'block';
    document.getElementById('cadastro-form').reset();
    document.getElementById('cadastro-form').dataset.editing = '';
}
function fecharCadastro() {
    document.getElementById('cadastro-panel').style.display = 'none';
}
document.getElementById('cadastro-form').onsubmit = async function(e) {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(e.target));
    let id = document.getElementById('cadastro-form').dataset.editing;
    if (id) {
        // Editar cliente
        await fetch(`http://localhost:3001/api/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
    } else {
        // Novo cliente
        dados.id = Date.now().toString();
        await fetch('http://localhost:3001/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
    }
    fecharCadastro();
    carregarClientes();
};

async function editarCliente(id) {
    const res = await fetch(`http://localhost:3001/api/clientes/${id}`);
    const cliente = await res.json();
    for (const campo in cliente) {
        if (document.getElementById(campo)) {
            document.getElementById(campo).value = cliente[campo];
        }
    }
    document.getElementById('cadastro-form').dataset.editing = id;
    abrirCadastro();
}

async function removerCliente(id) {
    await fetch(`http://localhost:3001/api/clientes/${id}`, { method: 'DELETE' });
    carregarClientes();
}

window.onload = carregarClientes;
