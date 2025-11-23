// Menu Hamburguer
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.body = document.body;
        
        this.init();
    }

    init() {
        this.createOverlay();
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.addLinkEvents();
        window.addEventListener('resize', () => this.handleResize());
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'menu-overlay';
        this.overlay.addEventListener('click', () => this.closeMenu());
        document.body.appendChild(this.overlay);
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        this.overlay.classList.toggle('active');
        this.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        this.body.style.overflow = '';
    }

    addLinkEvents() {
        const links = this.mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    handleResize() {
        if (window.innerWidth > 1024) {
            this.closeMenu();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});

// Estado para controlar se estamos editando ou não
const editState = {
    personal: false,
    prof: false
};

// Quando a página carrega, tentamos buscar dados salvos
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
});

// Função chamada ao clicar no botão "Editar/Salvar"
function toggleEdit(section) {
    // Identifica os IDs baseados na seção (pessoal ou profissional)
    const containerId = section === 'personal' ? 'personal-fields' : 'prof-fields';
    const btnId = section === 'personal' ? 'btnEditPersonal' : 'btnEditProf';
    
    const container = document.getElementById(containerId);
    const inputs = container.querySelectorAll('input, select, textarea');
    const button = document.getElementById(btnId);
    
    // Inverte o estado atual (se era falso vira verdadeiro, e vice-versa)
    editState[section] = !editState[section];
    const isEditing = editState[section];

    if (isEditing) {
        // MODO EDIÇÃO
        inputs.forEach(input => input.removeAttribute('disabled'));
        button.textContent = 'Salvar';
        button.classList.add('saving');
        // Foca no primeiro campo da seção
        if(inputs.length > 0) inputs[0].focus();
    } else {
        // MODO SALVAR
        inputs.forEach(input => input.setAttribute('disabled', 'true'));
        button.textContent = 'Editar';
        button.classList.remove('saving');
        
        // Salva tudo no navegador
        saveProfileData();
    }
}

function saveProfileData() {
    // Pega os valores de todos os campos
    const profileData = {
        // Pessoais
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        localizacao: document.getElementById('localizacao').value,
        nascimento: document.getElementById('nascimento').value,
        cpf: document.getElementById('cpf').value,
        // Profissionais
        area: document.getElementById('area').value,
        nivel: document.getElementById('nivel').value,
        formacao: document.getElementById('formacao').value,
        resumo: document.getElementById('resumo').value
    };

    // Salva no LocalStorage (memória do navegador)
    // O JSON.stringify converte o objeto em texto para poder salvar
    localStorage.setItem('ecoUserProfile', JSON.stringify(profileData));
    
    // Atualiza a barra lateral imediatamente
    updateSidebar(profileData);

    // Feedback visual (opcional: pode ser um alert ou toast)
    // alert('Dados salvos com sucesso!');
}

function loadProfileData() {
    // Tenta recuperar o texto salvo
    const savedData = localStorage.getItem('ecoUserProfile');
    
    if (savedData) {
        // Converte o texto de volta para objeto
        const data = JSON.parse(savedData);
        
        // Preenche os campos apenas se existir valor salvo para eles
        if(data.nome) document.getElementById('nome').value = data.nome;
        if(data.email) document.getElementById('email').value = data.email;
        if(data.telefone) document.getElementById('telefone').value = data.telefone;
        if(data.localizacao) document.getElementById('localizacao').value = data.localizacao;
        if(data.nascimento) document.getElementById('nascimento').value = data.nascimento;
        if(data.cpf) document.getElementById('cpf').value = data.cpf;
        
        if(data.area) document.getElementById('area').value = data.area;
        if(data.nivel) document.getElementById('nivel').value = data.nivel;
        if(data.formacao) document.getElementById('formacao').value = data.formacao;
        if(data.resumo) document.getElementById('resumo').value = data.resumo;
        
        // Atualiza a sidebar também ao carregar
        updateSidebar(data);
    }
}

function updateSidebar(data) {
    // Atualiza o nome na lateral
    if(data.nome && data.nome.trim() !== "") {
        // Lógica para pegar primeiro e último nome (ex: Maria Silva Santos -> Maria Santos)
        const names = data.nome.trim().split(' ');
        const displayName = names.length > 1 ? `${names[0]} ${names[names.length-1]}` : names[0];
        document.getElementById('sidebar-name').textContent = displayName;
    }

    // Atualiza email na lateral
    if(data.email && data.email.trim() !== "") {
        document.getElementById('sidebar-email').textContent = data.email;
    }

    // Atualiza cargo/área na lateral
    if(data.area && data.area.trim() !== "") {
        document.getElementById('sidebar-role').textContent = data.area;
    }
}
