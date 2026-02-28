// Elementos do DOM
const navButtons = document.querySelectorAll('.nav-btn');
const tabs = document.querySelectorAll('.tab');
const formReceita = document.getElementById('form-receita');
const listaReceitas = document.getElementById('lista-receitas');
const searchBox = document.getElementById('busca');
const modal = document.getElementById('modal-receita');
const closeBtn = document.querySelector('.close');
const detalhesReceita = document.getElementById('detalhes-receita');

// Gerenciar abas
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos os botões e abas
        navButtons.forEach(b => b.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Adiciona active ao botão clicado e sua aba correspondente
        btn.classList.add('active');
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(tabName).classList.add('active');
    });
});

// Classe para Gerenciar Receitas
class GerenciadorReceitas {
    constructor() {
        this.receitas = this.carregarReceitas();
    }

    // Carregar receitas do localStorage
    carregarReceitas() {
        const dados = localStorage.getItem('receitas');
        return dados ? JSON.parse(dados) : [];
    }

    // Salvar receitas no localStorage
    salvarReceitas() {
        localStorage.setItem('receitas', JSON.stringify(this.receitas));
    }

    // Adicionar nova receita
    adicionarReceita(receita) {
        receita.id = Date.now();
        receita.dataCriacao = new Date().toLocaleDateString('pt-BR');
        receita.autor = receita.autor || 'Anônimo';
        this.receitas.unshift(receita);
        this.salvarReceitas();
        return receita;
    }

    // Obter receita por ID
    obterReceita(id) {
        return this.receitas.find(r => r.id === id);
    }

    // Deletar receita
    deletarReceita(id) {
        this.receitas = this.receitas.filter(r => r.id !== id);
        this.salvarReceitas();
    }

    // Buscar receitas
    buscar(termo) {
        if (!termo) return this.receitas;
        
        const termo_lower = termo.toLowerCase();
        return this.receitas.filter(r =>
            r.nome.toLowerCase().includes(termo_lower) ||
            r.categoria.toLowerCase().includes(termo_lower)
        );
    }

    // Obter todas as receitas
    obterTodas() {
        return this.receitas;
    }
}

// Instanciar gerenciador
const gerenciador = new GerenciadorReceitas();

// Função para formatar o ingrediente/modo de preparo
function formatarLista(texto) {
    return texto.split('\n').filter(item => item.trim());
}

// Renderizar lista de receitas
function renderizarReceitas(receitas = gerenciador.obterTodas()) {
    listaReceitas.innerHTML = '';

    if (receitas.length === 0) {
        listaReceitas.innerHTML = '<div class="empty-state"><p>Nenhuma receita encontrada. 👀</p></div>';
        return;
    }

    receitas.forEach(receita => {
        const receiptCard = document.createElement('div');
        receiptCard.className = 'receita-card';
        receiptCard.innerHTML = `
            <img src="${receita.imagem || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(receita.nome)}" alt="${receita.nome}" class="receita-imagem">
            <div class="receita-info">
                <span class="receita-categoria">${receita.categoria}</span>
                <h3>${receita.nome}</h3>
                <div class="receita-autor">👤 por <strong>${receita.autor || 'Anônimo'}</strong></div>
                <div class="receita-meta">
                    <span>⏱️ ${receita.tempo}min</span>
                    <span>🍽️ ${receita.porcoes} porções</span>
                </div>
                <div class="receita-actions">
                    <button class="btn-ver" onclick="abrirModalReceita(${receita.id})">👀 Ver Receita</button>
                    <button class="btn-deletar" onclick="deletarReceita(${receita.id})">🗑️</button>
                </div>
            </div>
        `;
        listaReceitas.appendChild(receiptCard);
    });
}

// Abrir modal com detalhes da receita
function abrirModalReceita(id) {
    const receita = gerenciador.obterReceita(id);
    if (!receita) return;

    const ingredientos = formatarLista(receita.ingredientes);
    const passos = formatarLista(receita.modo);
    const observacoes_lista = receita.observacoes ? formatarLista(receita.observacoes) : [];

    let html = `
        <img src="${receita.imagem || 'https://via.placeholder.com/700x300?text=' + encodeURIComponent(receita.nome)}" alt="${receita.nome}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
        
        <span class="modal-receita-categoria">${receita.categoria}</span>
        <h2 class="modal-receita-titulo">${receita.nome}</h2>
        <p class="modal-receita-autor">👤 Receita compartilhada por <strong>${receita.autor || 'Anônimo'}</strong> em ${receita.dataCriacao}</p>

        <div class="modal-receita-meta">
            <div class="modal-receita-meta-item">
                <strong>⏱️ Tempo de Preparo</strong>
                <span>${receita.tempo} minutos</span>
            </div>
            <div class="modal-receita-meta-item">
                <strong>🍽️ Porções</strong>
                <span>${receita.porcoes} porções</span>
            </div>
        </div>

        <div class="modal-secao">
            <h4>📝 Ingredientes</h4>
            <ul>
                ${ingredientos.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-secao">
            <h4>👨‍🍳 Modo de Preparo</h4>
            <ol>
                ${passos.map(passo => `<li>${passo}</li>`).join('')}
            </ol>
        </div>
    `;

    if (observacoes_lista.length > 0) {
        html += `
            <div class="modal-secao">
                <h4>💡 Dicas e Observações</h4>
                <ul>
                    ${observacoes_lista.map(obs => `<li>${obs}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    detalhesReceita.innerHTML = html;
    modal.style.display = 'block';
}

// Fechar modal
function fecharModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', fecharModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

// Deletar receita
function deletarReceita(id) {
    if (confirm('Tem certeza que deseja deletar esta receita?')) {
        gerenciador.deletarReceita(id);
        renderizarReceitas();
        mostrarNotificacao('Receita deletada com sucesso! 👋', 'success');
    }
}

// Submeter formulário
formReceita.addEventListener('submit', (e) => {
    e.preventDefault();

    const receita = {
        nome: document.getElementById('nome').value,
        autor: document.getElementById('autor').value,
        categoria: document.getElementById('categoria').value,
        tempo: parseInt(document.getElementById('tempo').value),
        porcoes: parseInt(document.getElementById('porcoes').value),
        ingredientes: document.getElementById('ingredientes').value,
        modo: document.getElementById('modo').value,
        imagem: document.getElementById('imagem').value,
        observacoes: document.getElementById('observacoes').value
    };

    gerenciador.adicionarReceita(receita);
    
    // Limpar formulário
    formReceita.reset();
    
    // Voltar para tab de receitas
    navButtons[0].click();
    
    // Renderizar receitas
    renderizarReceitas();
    
    // Mostrar notificação
    mostrarNotificacao('Receita adicionada com sucesso! ✨', 'success');
});

// Buscar receitas
searchBox.addEventListener('input', (e) => {
    const termo = e.target.value;
    const resultados = gerenciador.buscar(termo);
    renderizarReceitas(resultados);
});

// Mostrar notificação
function mostrarNotificacao(mensagem, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensagem;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Adição de CSS para animação de saída
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar
renderizarReceitas();

// Adicionar algumas receitas de exemplo (opcional)
function adicionarReceitasExemplo() {
    const exemplos = [
        {
            nome: "Bolo de Chocolate",
            categoria: "Doces",
            tempo: 45,
            porcoes: 8,
            ingredientes: "2 xícaras de farinha\n1 xícara de açúcar\n3/4 xícara de chocolate em pó\n2 ovos\n1 xícara de leite\n1/2 xícara de óleo\n2 colheres de sopa de fermento\nPinça de sal",
            modo: "Misture os ingredientes secos na tigela\nAdicione os ovos, leite e óleo\nBata bem até ficar homogêneo\nColoque em forma untada\nAsse a 180°C por 40-45 minutos",
            imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
            observacoes: "Deixe esfriar antes de desenformar\nPode ser decorado com calda de chocolate"
        },
        {
            nome: "Brigadeiro Caseiro",
            categoria: "Doces",
            tempo: 15,
            porcoes: 24,
            ingredientes: "1 lata de leite condensado\n4 colheres de sopa de chocolate em pó\n2 colheres de sopa de manteiga\nGrânulos de chocolate para cobertura",
            modo: "Coloque o leite condensado na panela\nAdicione o chocolate em pó e misture\nCozinhe em fogo médio mexendo sempre\nQuando desgrudar do fundo, retire do fogo\nDeixe esfriar e faça bolinhas\nPasse na cobertura de chocolate",
            imagem: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11?w=400&h=300&fit=crop",
            observacoes: "Tenha cuidado ao mexer pois fica muito quente\nPode colocar em capacinhos"
        }
    ];

    exemplos.forEach(ex => {
        if (gerenciador.obterTodas().length === 0) {
            gerenciador.adicionarReceita(ex);
        }
    });

    renderizarReceitas();
}

// Descomente a linha abaixo para adicionar receitas de exemplo na primeira vez
// adicionarReceitasExemplo();
