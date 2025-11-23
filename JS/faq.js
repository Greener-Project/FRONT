// FAQ Accordion e Funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('faqSearch');
    const faqCategories = document.querySelectorAll('.faq-category');

    // Accordion Functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha outros itens abertos no mesmo grupo
            const currentlyActive = item.parentElement.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // Alterna o item atual
            item.classList.toggle('active');
        });
    });

    // Filtro por Categoria
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Atualiza botão ativo
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filtra as categorias
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.classList.remove('hidden');
                } else {
                    cat.classList.add('hidden');
                }
            });
            
            // Atualiza a busca se houver texto
            if (searchInput.value) {
                performSearch(searchInput.value);
            }
        });
    });

    // Busca em Tempo Real
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        performSearch(searchTerm);
    });

    function performSearch(searchTerm) {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        faqCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');
            let hasVisibleItems = false;
            
            // Verifica se a categoria deve ser mostrada
            if (activeCategory !== 'all' && categoryType !== activeCategory) {
                category.classList.add('hidden');
                return;
            }
            
            // Busca dentro dos itens da categoria
            const items = category.querySelectorAll('.faq-item');
            items.forEach(item => {
                const question = item.querySelector('.faq-question span:first-child').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    hasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Mostra/oculta categoria baseado nos resultados
            if (hasVisibleItems || searchTerm === '') {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        });
    }

    // URL Hash - Abre FAQ específico
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetItem = document.getElementById(targetId);
        
        if (targetItem) {
            targetItem.classList.add('active');
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Animação suave ao clicar em links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Feedback visual para busca vazia
    searchInput.addEventListener('keyup', function() {
        if (this.value === '') {
            // Reseta para estado inicial
            const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)');
            if (visibleItems.length === 0) {
                // Se nenhum item está visível, mostra todos
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('hidden');
                });
                document.querySelectorAll('.faq-category').forEach(cat => {
                    cat.classList.remove('hidden');
                });
            }
        }
    });
});

// Adiciona IDs únicos para os itens FAQ (pode ser feito no HTML também)
document.addEventListener('DOMContentLoaded', function() {
    let faqCounter = 1;
    document.querySelectorAll('.faq-item').forEach(item => {
        item.id = `faq-${faqCounter++}`;
    });
});