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
