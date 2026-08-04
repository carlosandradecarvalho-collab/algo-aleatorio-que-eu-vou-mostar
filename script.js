
---

### 2. Novo `script.js` (Modular, Moderno e Limpo)
```javascript
/**
 * PROJETO: Internet Segura - Contra o Cyberbullying
 * ESTRUTURA: JavaScript ES6+ Otimizado e Orientado a Eventos
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. GERENCIADOR DA BARRA DE PROGRESSO DE LEITURA
    // ==========================================================================
    const handleProgressBar = () => {
        const progressBar = document.getElementById("progress-bar");
        if (!progressBar) return;

        window.addEventListener("scroll", () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = `${scrolled}%`;
        }, { passive: true });
    };

    // ==========================================================================
    // 2. ALTERNADOR DE TEMA GLOBAL (DARK / LIGHT MODE)
    // ==========================================================================
    const initThemeToggle = () => {
        const themeBtn = document.getElementById("theme-toggle");
        const rootHtml = document.documentElement;
        if (!themeBtn) return;

        themeBtn.addEventListener("click", () => {
            const isLight = rootHtml.getAttribute("data-theme") === "light";
            const targetTheme = isLight ? "dark" : "light";
            
            rootHtml.setAttribute("data-theme", targetTheme);
            themeBtn.innerHTML = isLight 
                ? '<i class="fa-solid fa-sun"></i>' 
                : '<i class="fa-solid fa-moon"></i>';
            themeBtn.setAttribute("aria-label", `Ativar modo ${isLight ? 'claro' : 'escuro'}`);
        });
    };

    // ==========================================================================
    // 3. MENU MOBILE RESPONSIVO (HAMBÚRGUER)
    // ==========================================================================
    const initMenuMobile = () => {
        const menuBtn = document.querySelector(".menu-toggle");
        const navMenu = document.querySelector(".nav-menu");
        if (!menuBtn || !navMenu) return;

        const toggleMenu = () => {
            const isOpen = navMenu.classList.toggle("is-open");
            menuBtn.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
            menuBtn.setAttribute("aria-expanded", isOpen);
        };

        menuBtn.addEventListener("click", toggleMenu);

        // Event Delegation para fechar o menu ao clicar em links internos
        navMenu.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
                navMenu.classList.remove("is-open");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    };

    // ==========================================================================
    // 4. CONTROLE DO INTERATIVO: QUIZ CARDS (FLIP ANIMAÇÃO)
    // ==========================================================================
    const initQuizCards = () => {
        const quizContainer = document.getElementById("quiz");
        if (!quizContainer) return;

        // Uso do Event Delegation para melhorar performance de memória
        quizContainer.addEventListener("click", (event) => {
            const targetCard = event.target.closest(".quiz-card");
            if (targetCard) {
                targetCard.classList.toggle("is-flipped");
            }
        });
    };

    // ==========================================================================
    // 5. ACORDEÃO INTERATIVO DO FAQ
    // ==========================================================================
    const initFaqAccordion = () => {
        const faqSection = document.getElementById("faq");
        if (!faqSection) return;

        faqSection.addEventListener("click", (event) => {
            const clickedQuestion = event.target.closest(".faq-question");
            if (!clickedQuestion) return;

            const targetItem = clickedQuestion.parentElement;
            const isCurrentlyActive = targetItem.classList.contains("is-active");

            // Fecha todos os outros blocos abertos simultaneamente (foco visual)
            faqSection.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("is-active");
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isCurrentlyActive) {
                targetItem.classList.add("is-active");
            }
        });
    };

    // ==========================================================================
    // 6. CONTADOR DE CARACTERES EM TEMPO REAL E ALERTA DE LIMITE
    // ==========================================================================
    const initCharacterCounter = () => {
        const textarea = document.getElementById("message");
        const counter = document.getElementById("char-counter");
        if (!textarea || !counter) return;

        const maxCharacters = parseInt(textarea.getAttribute("maxlength"), 10) || 500;

        textarea.addEventListener("input", () => {
            const currentLength = textarea.value.length;
            counter.textContent = `${currentLength} / ${maxCharacters} caracteres`;
            
            // Controle visual semântico baseado na proximidade do estouro
            if (currentLength >= maxCharacters - 50) {
                counter.style.color = "var(--clr-danger)";
                counter.style.fontWeight = "bold";
            } else {
                counter.style.color = "var(--clr-text-muted)";
                counter.style.fontWeight = "normal";
            }
        });
    };

    // ==========================================================================
    // 7. FORMULÁRIO SEGURO COM FEEDBACK AVANÇADO
    // ==========================================================================
    const initSecureForm = () => {
        const form = document.getElementById("secureForm");
        const feedbackBlock = document.getElementById("alertFeedback");
        if (!form || !feedbackBlock) return;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Extração limpa dos dados usando FormData API
            const formData = new FormData(form);
            const userName = formData.get("name") || "Anônimo";

            // Transição visual escondendo o formulário nativamente via CSS
            form.classList.add("hidden");

            // Inserção da resposta tratada
            feedbackBlock.innerHTML = `
                <div class="feedback-alert">
                    <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; color: var(--clr-secondary); margin-bottom: 1rem; display: block;"></i>
                    <strong>Relato enviado de forma segura, ${escapeHtml(userName)}!</strong><br><br>
                    Configuramos e registramos com sucesso esse envio no ambiente simulado. Lembre-se que sua integridade emocional é prioridade. Caso precise lidar com ataques persistentes, registre as telas e faça uso das redes de apoio públicas como o CVV (Ligue 188).
                </div>
            `;
            feedbackBlock.classList.remove("hidden");
            
            // Rolagem sutil de foco para a mensagem de sucesso
            feedbackBlock.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    };

    /**
     * Função auxiliar para prevenir ataques XSS (Segurança básica de injeção)
     */
    const escapeHtml = (string) => {
        const matchHtmlRegExp = /["'&<>]/;
        const str = '' + string;
        const match = matchHtmlRegExp.exec(str);

        if (!match) return str;

        let escape;
        let html = '';
        let index = 0;
        let lastIndex = 0;

        for (index = match.index; index < str.length; index++) {
            switch (str.charCodeAt(index)) {
                case 34: escape = '&quot;'; break; // "
                case 38: escape = '&amp;'; break;  // &
                case 39: escape = '&#39;'; break;  // '
                case 60: escape = '&lt;'; break;   // <
                case 62: escape = '&gt;'; break;   // >
                default: continue;
            }

            if (lastIndex !== index) {
                html += str.substring(lastIndex, index);
            }

            lastIndex = index + 1;
            html += escape;
        }

        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    };

    // ==========================================================================
    // DISPARO DA INICIALIZAÇÃO DOS MÓDULOS
    // ==========================================================================
    handleProgressBar();
    initThemeToggle();
    initMenuMobile();
    initQuizCards();
    initFaqAccordion();
    initCharacterCounter();
    initSecureForm();
});