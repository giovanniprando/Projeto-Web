/**
 * L'OR DORÉ — SISTEMA PRINCIPAL (E-commerce Engine)
 * Versão 2.1 — Imagens corrigidas e Carrinho Autônomo
 */

// ==========================================================================
// ESTADO GLOBAL DA APLICAÇÃO
// ==========================================================================

const catalogo = [
    {
        id: 1,
        brand: "Maison Francis Kurkdjian",
        name: "Baccarat Rouge 540",
        category: "Compartilhável",
        olfactoryFamily: "Floral Amadeirado",
        notes: "Jasmim, Açafrão, Cedro, Âmbar Gris",
        price: 2450.00,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        brand: "Creed",
        name: "Aventus",
        category: "Masculino",
        olfactoryFamily: "Chipre Frutado",
        notes: "Abacaxi, Bétula, Almíscar, Musgo de Carvalho",
        price: 3100.00,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        brand: "Tom Ford",
        name: "Tobacco Vanille",
        category: "Compartilhável",
        olfactoryFamily: "Oriental Especiado",
        notes: "Folha de Tabaco, Baunilha, Cacau, Fava Tonka",
        price: 2150.00,
        image: "https://images.unsplash.com/photo-1595425964071-5b721869f109?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        brand: "Le Labo",
        name: "Santal 33",
        category: "Compartilhável",
        olfactoryFamily: "Amadeirado Aromático",
        notes: "Sândalo, Cedro, Cardamomo, Violeta",
        price: 1890.00,
        image: "https://images.unsplash.com/photo-1608528577891-eb0559d3fa06?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        brand: "Roja Parfums",
        name: "Elysium",
        category: "Masculino",
        olfactoryFamily: "Fougère Aromático",
        notes: "Toranja, Vetiver, Âmbar Gris, Groselha Preta",
        price: 4200.00,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        brand: "Kilian",
        name: "Love, Don't Be Shy",
        category: "Feminino",
        olfactoryFamily: "Oriental Floral",
        notes: "Néroli, Flor de Laranjeira, Marshmallow, Baunilha",
        price: 2350.00,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 7,
        brand: "Parfums de Marly",
        name: "Layton",
        category: "Masculino",
        olfactoryFamily: "Oriental Floral",
        notes: "Maçã, Lavanda, Baunilha, Pimenta Rosa",
        price: 2100.00,
        image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?q=80&w=800&auto=format&fit=crop" 
    },
    {
        id: 8,
        brand: "Amouage",
        name: "Interlude Man",
        category: "Masculino",
        olfactoryFamily: "Amadeirado Especiado",
        notes: "Orégano, Incenso, Opoponax, Couro",
        price: 2850.00,
        image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 9,
        brand: "Byredo",
        name: "Gypsy Water",
        category: "Compartilhável",
        olfactoryFamily: "Amadeirado Aromático",
        notes: "Bergamota, Zimbro, Agulhas de Pinheiro, Sândalo",
        price: 1950.00,
        image: "https://images.unsplash.com/photo-1615397323145-c1f96cb43703?q=80&w=800&auto=format&fit=crop"
    }
];

/**
 * ESTADO DO CARRINHO (CART STATE)
 * Mantemos o carrinho como um array linear, onde cada ocorrência de ID
 * representa uma unidade daquele produto.
 */
let cart = [];

// Preferências e Filtros
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentCategory = 'todos';
let currentSearch = '';
let currentSort = 'default';
let toastTimeout;

// ==========================================================================
// CACHE DO DOM
// ==========================================================================

const DOM = {
    // Header & Navegação
    header: document.getElementById('site-header'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mainNav: document.getElementById('main-nav'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Busca & Ordenação
    searchToggleBtn: document.getElementById('search-toggle-btn'),
    searchCloseBtn: document.getElementById('search-close-btn'),
    searchPanel: document.getElementById('search-panel'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    
    // Catálogo
    productGrid: document.getElementById('product-grid'),
    productCount: document.getElementById('product-count'),
    noResults: document.getElementById('no-results'),
    clearFiltersBtn: document.getElementById('clear-filters-btn'),
    
    // UI Elements
    toast: document.getElementById('toast-notification'),
    toastMessage: document.getElementById('toast-message'),
    overlay: document.getElementById('overlay'),
    
    // Elementos do Carrinho
    cartBtn: document.getElementById('cart-toggle-btn'),
    cartBadge: document.getElementById('cart-badge'),
    sidebar: document.getElementById('cart-sidebar'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartView: document.getElementById('cart-view'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartSubtotal: document.getElementById('cart-subtotal-value'),
    cartTotal: document.getElementById('cart-total-value'),
    goToCheckoutBtn: document.getElementById('go-to-checkout-btn'),
    continueShoppingBtn: document.getElementById('continue-shopping-btn'),
    
    // Checkout & Pagamento
    checkoutView: document.getElementById('checkout-view'),
    checkoutContent: document.getElementById('checkout-content'),
    cancelCheckoutBtn: document.getElementById('cancel-checkout-btn'),
    checkoutSummaryList: document.getElementById('checkout-summary-list'),
    checkoutSubtotal: document.getElementById('checkout-subtotal'),
    checkoutTotalValue: document.getElementById('checkout-total-value'),
    confirmPurchaseBtn: document.getElementById('confirm-purchase-btn'),
    paymentOptions: document.querySelectorAll('.payment-option'),
    
    // Sucesso
    successMessage: document.getElementById('success-message'),
    successDetailsText: document.getElementById('success-details-text'),
    successTotalText: document.getElementById('success-total-text'),
    returnHomeBtn: document.getElementById('return-home-btn')
};

// ==========================================================================
// INICIALIZAÇÃO E PERSISTÊNCIA (LOCALSTORAGE)
// ==========================================================================

function init() {
    loadCartFromStorage();
    setupEventListeners();
    renderProducts();
    updateCartUI();
    lucide.createIcons();
    initScrollAnimations();
}

function saveCartToStorage() {
    localStorage.setItem('lordore_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('lordore_cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch (e) {
            console.error("Erro ao carregar carrinho do localStorage", e);
            cart = [];
        }
    }
}

// ==========================================================================
// ANIMAÇÕES & GSAP
// ==========================================================================

function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const heroTl = gsap.timeline();
    heroTl.to('.hero-tagline', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
          .to('.hero-title-line', { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.6")
          .to('.hero-description', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.4")
          .to('.btn-hero', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4");

    // Header Scroll State
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            DOM.header.classList.add('scrolled');
        } else {
            DOM.header.classList.remove('scrolled');
        }
    }, { passive: true });
}

function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout);
    
    DOM.toastMessage.textContent = message;
    DOM.toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, 3000);
}

// ==========================================================================
// LÓGICA DE PRODUTOS & RENDERIZAÇÃO
// ==========================================================================

function formatPrice(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getFilteredProducts() {
    // 1. Filtrar Categoria (usando FILTER)
    let filtered = catalogo;
    if (currentCategory !== 'todos') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // 2. Filtrar Busca Textual (usando FILTER)
    if (currentSearch.trim() !== '') {
        const query = currentSearch.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.brand.toLowerCase().includes(query) ||
            p.notes.toLowerCase().includes(query)
        );
    }

    // 3. Ordenação
    if (currentSort !== 'default') {
        filtered = [...filtered]; // Clonar para não mutar original
        switch (currentSort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }

    return filtered;
}

function renderProducts() {
    const productsToRender = getFilteredProducts();
    
    DOM.productCount.textContent = `Mostrando ${productsToRender.length} fragrância(s)`;

    if (productsToRender.length === 0) {
        DOM.productGrid.innerHTML = '';
        DOM.noResults.classList.remove('hidden');
        return;
    }

    DOM.noResults.classList.add('hidden');
    DOM.productGrid.innerHTML = '';

    productsToRender.forEach((produto, index) => {
        // Agora verificaremos os botões dinamicamente no clique e não manteremos fixos como "added" permanentemente,
        // mas vamos colocar o texto normal. A animação verde ocorrerá apenas no momento do clique.
        const btnText = 'Adicionar ao Carrinho';
        const btnClass = 'btn-add-cart';
        
        const card = document.createElement('article');
        card.className = 'product-card';
        // Delay escalonado para entrada (se não preferir reduced motion)
        const delay = prefersReducedMotion ? 0 : index * 100;
        
        card.innerHTML = `
            <div class="product-image-container">
                <span class="category-tag">${produto.category}</span>
                <img src="${produto.image}" alt="${produto.name} - ${produto.brand}" class="product-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop'">
            </div>
            <div class="product-info">
                <span class="product-brand">${produto.brand}</span>
                <h3 class="product-name">${produto.name}</h3>
                <p class="product-olfactory-family">${produto.olfactoryFamily}</p>
                <p class="product-notes">${produto.notes}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(produto.price)}</span>
                    <button class="${btnClass}" data-id="${produto.id}" aria-label="Adicionar ${produto.name} ao carrinho">
                        <span><i data-lucide="plus" style="width: 14px; height: 14px; margin-right: 4px; display: inline-block; vertical-align: middle;"></i>${btnText}</span>
                    </button>
                </div>
            </div>
        `;
        
        DOM.productGrid.appendChild(card);
        
        // GSAP ScrollTrigger para revelar cards
        if (!prefersReducedMotion) {
            ScrollTrigger.create({
                trigger: card,
                start: "top 90%",
                onEnter: () => card.classList.add('revealed'),
                once: true
            });
        } else {
            card.classList.add('revealed');
        }
    });

    lucide.createIcons();
}

// ==========================================================================
// LÓGICA DO CARRINHO (MÉTODOS ARRAY OBRIGATÓRIOS)
// ==========================================================================

// REQUISITO ACADÊMICO: Uso de PUSH
function addToCart(productId) {
    cart.push(productId);
    saveCartToStorage();
    updateCartUI();
    // showToast("Fragrância adicionada à sua coleção."); // Removido, pois vamos abrir o carrinho no lugar do toast
    
    // Animação de Bump no Badge
    DOM.cartBadge.classList.remove('bump');
    void DOM.cartBadge.offsetWidth; // Trigger reflow
    DOM.cartBadge.classList.add('bump');
}

// REQUISITO ACADÊMICO: Remoção com SPLICE (equivale ao conceito de Pop direcional)
function removeFromCart(productId, removeAll = false) {
    if (removeAll) {
        // Usa FILTER para remover todas as instâncias (Requisito acadêmico)
        cart = cart.filter(id => id !== productId);
    } else {
        // Encontra o último índice e remove uma unidade (como um pop específico)
        const lastIndex = cart.lastIndexOf(productId);
        if (lastIndex !== -1) {
            cart.splice(lastIndex, 1);
        }
    }
    saveCartToStorage();
    updateCartUI();
}

function updateCartUI() {
    // 1. Atualizar Badge
    DOM.cartBadge.textContent = cart.length;

    if (cart.length === 0) {
        DOM.cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i data-lucide="shopping-bag"></i>
                <p>Sua coleção está vazia.</p>
                <button class="btn-secondary-outline" id="empty-cart-close-btn">Descobrir Fragrâncias</button>
            </div>
        `;
        DOM.cartSubtotal.textContent = 'R$ 0,00';
        DOM.cartTotal.textContent = 'R$ 0,00';
        DOM.goToCheckoutBtn.disabled = true;
        lucide.createIcons();
        
        // Listener para botão de fechar quando vazio
        document.getElementById('empty-cart-close-btn')?.addEventListener('click', closeCart);
        return;
    }

    DOM.goToCheckoutBtn.disabled = false;
    DOM.cartItemsContainer.innerHTML = '';

    // REQUISITO ACADÊMICO: Uso de FILTER (para criar itens únicos)
    // Filtramos o catálogo mantendo apenas itens que existem no carrinho (ids presentes)
    const uniqueItems = catalogo.filter(produto => cart.includes(produto.id));

    // REQUISITO ACADÊMICO: Uso de REDUCE (Cálculo do Total)
    const totalPrice = cart.reduce((total, currentId) => {
        const item = catalogo.find(p => p.id === currentId);
        return total + (item ? item.price : 0);
    }, 0);

    // Renderizar Itens Únicos
    uniqueItems.forEach(produto => {
        // REQUISITO ACADÊMICO: Uso de FILTER (contar quantidade)
        const quantity = cart.filter(id => id === produto.id).length;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item-card';
        itemEl.innerHTML = `
            <img src="${produto.image}" alt="${produto.name}" class="cart-item-thumb">
            <div class="cart-item-details">
                <span class="cart-item-brand">${produto.brand}</span>
                <h4 class="cart-item-name">${produto.name}</h4>
                <div class="cart-item-price">${formatPrice(produto.price)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn remove-qty" data-id="${produto.id}" aria-label="Diminuir quantidade">-</button>
                    <span class="qty-display" aria-label="Quantidade: ${quantity}">${quantity}</span>
                    <button class="qty-btn add-qty" data-id="${produto.id}" aria-label="Aumentar quantidade">+</button>
                    <button class="btn-remove-item" data-id="${produto.id}" aria-label="Remover item">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `;
        DOM.cartItemsContainer.appendChild(itemEl);
    });

    const formattedTotal = formatPrice(totalPrice);
    DOM.cartSubtotal.textContent = formattedTotal;
    DOM.cartTotal.textContent = formattedTotal;
    
    // Atualizar UI de Checkout também
    updateCheckoutUI(uniqueItems, totalPrice);
    
    lucide.createIcons();
}

function updateCheckoutUI(uniqueItems, totalPrice) {
    DOM.checkoutSummaryList.innerHTML = '';
    
    uniqueItems.forEach(produto => {
        const quantity = cart.filter(id => id === produto.id).length;
        const itemLine = document.createElement('div');
        itemLine.className = 'checkout-summary-item';
        itemLine.innerHTML = `
            <div style="flex: 1;">
                <span style="font-size:0.7rem; color:var(--gold-primary); text-transform:uppercase;">${produto.brand}</span>
                <h4 style="font-family:var(--font-serif); font-size:1.1rem; font-weight:400;">${produto.name} <span style="color:var(--text-secondary); font-family:var(--font-sans); font-size:0.8rem;">x${quantity}</span></h4>
            </div>
            <div style="font-weight:500;">
                ${formatPrice(produto.price * quantity)}
            </div>
        `;
        DOM.checkoutSummaryList.appendChild(itemLine);
    });

    const formattedTotal = formatPrice(totalPrice);
    DOM.checkoutSubtotal.textContent = formattedTotal;
    DOM.checkoutTotalValue.textContent = formattedTotal;
}

// ==========================================================================
// CONTROLES DE INTERFACE (MODAIS, CARRINHO E TRANSIÇÕES)
// ==========================================================================

function openCart() {
    DOM.sidebar.classList.add('open');
    DOM.overlay.classList.add('active');
    document.body.classList.add('cart-open');
    DOM.sidebar.setAttribute('aria-hidden', 'false');
    
    // Trap focus ou focar no fechar
    setTimeout(() => DOM.closeCartBtn.focus(), 100);
}

function closeCart() {
    DOM.sidebar.classList.remove('open');
    DOM.overlay.classList.remove('active');
    document.body.classList.remove('cart-open');
    DOM.sidebar.setAttribute('aria-hidden', 'true');
    DOM.cartBtn.focus(); // Retornar foco
}

// REQUISITO TÉCNICO: Animação GSAP Carrinho -> Checkout sem recarregar página
function transitionToCheckout() {
    const tl = gsap.timeline();
    
    // 1. Esconder view do carrinho
    tl.to(DOM.cartView, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
            DOM.cartView.classList.add('hidden');
            DOM.checkoutView.classList.remove('hidden');
            DOM.checkoutView.setAttribute('aria-hidden', 'false');
            DOM.sidebar.classList.add('fullscreen');
        }
    });

    // 2. Expandir container lateral para tela cheia
    tl.to(DOM.sidebar, {
        width: '100vw',
        duration: 0.6,
        ease: 'power3.inOut'
    }, "-=0.1");

    // 3. Revelar conteúdo do Checkout com Stagger
    tl.fromTo(DOM.checkoutContent, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4 }
    )
    .fromTo(['.checkout-header', '.checkout-items-card', '.checkout-payment-card'],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
        "-=0.2"
    );
}

function reverterCheckout() {
    const tl = gsap.timeline();

    // 1. Esconder checkout
    tl.to(DOM.checkoutView, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            DOM.checkoutView.classList.add('hidden');
            DOM.checkoutView.setAttribute('aria-hidden', 'true');
            DOM.sidebar.classList.remove('fullscreen');
            DOM.cartView.classList.remove('hidden');
        }
    });

    // 2. Retrair largura
    tl.to(DOM.sidebar, {
        width: 'var(--cart-width)',
        duration: 0.5,
        ease: 'power3.inOut'
    });

    // 3. Mostrar carrinho
    tl.fromTo(DOM.cartView,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3 }
    );
}

// REQUISITO TÉCNICO: Finalizar compra sem location.reload()
function finalizePurchase() {
    const tl = gsap.timeline();

    // 1. Fade out no conteúdo do checkout
    tl.to(DOM.checkoutContent, {
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        onComplete: () => {
            DOM.checkoutContent.classList.add('hidden');
            DOM.successMessage.classList.remove('hidden');
            DOM.successMessage.setAttribute('aria-hidden', 'false');
            
            // REQUISITO ACADÊMICO: Uso de JOIN (Criar string de nomes)
            const boughtItems = catalogo.filter(produto => cart.includes(produto.id));
            const itemNames = boughtItems.map(p => {
                const qty = cart.filter(id => id === p.id).length;
                return `${p.name} (x${qty})`;
            });
            DOM.successDetailsText.textContent = itemNames.join(' • ');
            
            const total = cart.reduce((acc, curr) => {
                const item = catalogo.find(p => p.id === curr);
                return acc + (item ? item.price : 0);
            }, 0);
            DOM.successTotalText.textContent = `Total Pago: ${formatPrice(total)}`;
            
            // Esvaziar carrinho após a compra
            cart = [];
            saveCartToStorage();
        }
    });

    // 2. Fade in na tela de sucesso
    tl.fromTo(DOM.successMessage,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
    );
}

// Retornar à loja da tela de sucesso sem dar reload
function retornarALoja() {
    DOM.successMessage.classList.add('hidden');
    DOM.successMessage.setAttribute('aria-hidden', 'true');
    DOM.checkoutContent.classList.remove('hidden');
    DOM.checkoutView.classList.add('hidden');
    DOM.cartView.classList.remove('hidden');
    DOM.sidebar.classList.remove('fullscreen');
    DOM.sidebar.style.width = ''; // Reseta para css
    closeCart();
    
    // Reseta visibilidade da view para próximas vezes
    gsap.set(DOM.cartView, { opacity: 1, x: 0 });
    gsap.set(DOM.checkoutContent, { opacity: 1, scale: 1 });
    
    updateCartUI();
}

// ==========================================================================
// EVENT LISTENERS DELEGATION
// ==========================================================================

function setupEventListeners() {
    // Filtros de Categoria
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            currentCategory = e.currentTarget.dataset.category;
            renderProducts();
            
            if (window.innerWidth <= 768) {
                toggleMobileMenu(false);
            }
        });
    });

    // Mobile Menu
    DOM.mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = DOM.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        toggleMobileMenu(!isExpanded);
    });

    function toggleMobileMenu(forceState) {
        if (forceState) {
            DOM.mainNav.classList.add('open');
            DOM.mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('cart-open'); // bloqueia scroll
        } else {
            DOM.mainNav.classList.remove('open');
            DOM.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('cart-open');
        }
    }

    // Busca (Busca e UI)
    DOM.searchToggleBtn.addEventListener('click', () => {
        DOM.searchPanel.classList.add('open');
        DOM.searchToggleBtn.setAttribute('aria-expanded', 'true');
        DOM.searchInput.focus();
    });

    DOM.searchCloseBtn.addEventListener('click', () => {
        DOM.searchPanel.classList.remove('open');
        DOM.searchToggleBtn.setAttribute('aria-expanded', 'false');
        if (currentSearch !== '') {
            currentSearch = '';
            DOM.searchInput.value = '';
            renderProducts();
        }
    });

    // Debounce manual simples para busca
    let searchTimeout;
    DOM.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = e.target.value;
            renderProducts();
        }, 300);
    });

    // Ordenação
    DOM.sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Limpar filtros do state de "No Results"
    DOM.clearFiltersBtn.addEventListener('click', () => {
        currentSearch = '';
        DOM.searchInput.value = '';
        currentCategory = 'todos';
        DOM.navLinks.forEach(l => l.classList.remove('active'));
        DOM.navLinks[0].classList.add('active');
        renderProducts();
    });

    // Abertura/Fechamento do Carrinho
    DOM.cartBtn.addEventListener('click', openCart);
    DOM.closeCartBtn.addEventListener('click', closeCart);
    DOM.continueShoppingBtn.addEventListener('click', closeCart);
    DOM.overlay.addEventListener('click', () => {
        if (DOM.sidebar.classList.contains('open') && !DOM.sidebar.classList.contains('fullscreen')) {
            closeCart();
        }
    });

    // Delegação de Eventos para interações dentro do Grid (Adicionar)
    DOM.productGrid.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.btn-add-cart');
        if (addBtn && !addBtn.classList.contains('added')) {
            const id = parseInt(addBtn.dataset.id);
            
            // 1. Feedback visual no botão (Fica verde)
            addBtn.classList.add('added');
            const span = addBtn.querySelector('span');
            span.innerHTML = '<i data-lucide="check" style="width: 14px; height: 14px; margin-right: 4px; display: inline-block; vertical-align: middle;"></i>Adicionado';
            lucide.createIcons(); // renderizar o ícone de check novo
            
            // 2. Adiciona ao carrinho internamente
            addToCart(id);

            // 3. NOVIDADE: Abre a gaveta lateral do carrinho automaticamente
            setTimeout(() => {
                openCart();
            }, 300); // pequeno delay para o usuário ver o botão verde antes de abrir

            // 4. Reverte o botão após 1.5s (pronto para ser clicado novamente se fechar o carrinho)
            setTimeout(() => {
                addBtn.classList.remove('added');
                span.innerHTML = '<i data-lucide="plus" style="width: 14px; height: 14px; margin-right: 4px; display: inline-block; vertical-align: middle;"></i>Adicionar ao Carrinho';
                lucide.createIcons();
            }, 1500);
        }
    });

    // Delegação de Eventos para interações dentro do Carrinho (Sidebar)
    DOM.cartItemsContainer.addEventListener('click', (e) => {
        const btnAdd = e.target.closest('.add-qty');
        const btnRemoveQty = e.target.closest('.remove-qty');
        const btnTrash = e.target.closest('.btn-remove-item');

        if (btnAdd) {
            addToCart(parseInt(btnAdd.dataset.id));
        } else if (btnRemoveQty) {
            removeFromCart(parseInt(btnRemoveQty.dataset.id));
        } else if (btnTrash) {
            removeFromCart(parseInt(btnTrash.dataset.id), true);
        }
    });

    // Checkout Navigation
    DOM.goToCheckoutBtn.addEventListener('click', transitionToCheckout);
    DOM.cancelCheckoutBtn.addEventListener('click', reverterCheckout);
    
    // Seleção de Pagamento
    DOM.paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            DOM.paymentOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            const radio = option.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });

    // Confirmação de Compra
    DOM.confirmPurchaseBtn.addEventListener('click', () => {
        const btn = DOM.confirmPurchaseBtn;
        const originalHtml = btn.innerHTML;
        
        // Simular processamento
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="spin-icon"></i> <span>Processando...</span>';
        lucide.createIcons();
        
        // CSS para a rotação
        const style = document.createElement('style');
        style.innerHTML = `
            .spin-icon { animation: spin 1s linear infinite; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
            document.head.removeChild(style);
            finalizePurchase();
        }, 1500);
    });

    // Retorno para loja
    DOM.returnHomeBtn.addEventListener('click', retornarALoja);

    // Escape Key Handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (DOM.searchPanel.classList.contains('open')) {
                DOM.searchCloseBtn.click();
            } else if (DOM.sidebar.classList.contains('open') && !DOM.sidebar.classList.contains('fullscreen')) {
                closeCart();
            }
        }
    });
}

// Iniciar Aplicação
document.addEventListener('DOMContentLoaded', init);
