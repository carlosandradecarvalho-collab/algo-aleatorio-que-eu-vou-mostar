    <script>
    document.addEventListener("DOMContentLoaded", () => {
        "use strict";

        // Mapeamento dos elementos do DOM
        const DOM = {
            form: document.getElementById("formApoio"),
            msg: document.getElementById("msgSucesso"),
            campoTexto: document.getElementById("relato"),
            btnSair: document.getElementById("btnSair")
        };

        // Validação preventiva: garante que todos os elementos existem na tela
        if (!DOM.form || !DOM.msg || !DOM.campoTexto || !DOM.btnSair) {
            console.error("Erro crítico: Elementos da interface não foram encontrados.");
            return;
        }

        /**
         * Sanitiza strings para prevenir ataques de injeção de script (XSS).
         * @param {string} text - O texto bruto digitado pelo usuário.
         * @returns {string} O texto escapado e seguro.
         */
        const sanitizeInput = (text) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '/': '&#x2F;'
            };
            return text.replace(/[&<>"'/]/g, (match) => map[match]);
        };

        /**
         * Gerencia o envio do formulário de forma assíncrona simulada.
         */
        DOM.form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const textoBruto = DOM.campoTexto.value.trim();
            if (!textoBruto) return;

            const textoSeguro = sanitizeInput(textoBruto);

            try {
                // Simula o salvamento local do relato (banco de dados do navegador)
                const relatosSalvos = JSON.parse(localStorage.getItem("relatos_anonimos")) || [];
                relatosSalvos.push({
                    id: crypto.randomUUID(),
                    conteudo: textoSeguro,
                    data: new Date().toISOString()
                });
                localStorage.setItem("relatos_anonimos", JSON.stringify(relatosSalvos));

                // Feedback visual e de acessibilidade (Leitores de tela)
                DOM.campoTexto.value = "";
                DOM.msg.style.display = "block";
                DOM.msg.setAttribute("aria-live", "polite");

                // Esconde a mensagem de sucesso após 5 segundos de forma limpa
                setTimeout(() => {
                    DOM.msg.style.display = "none";
                    DOM.msg.removeAttribute("aria-live");
                }, 5000);

            } catch (error) {
                console.error("Falha ao processar o relato de forma segura:", error);
                alert("Ocorreu um erro ao enviar seu relato. Por favor, tente novamente.");
            }
        });

        /**
         * Lógica da Saída de Emergência.
         * Limpa dados sensíveis voláteis e substitui o histórico para impedir o botão "Voltar".
         */
        DOM.btnSair.addEventListener("click", () => {
            try {
                // Limpa inputs ativos antes de redirecionar por privacidade
                DOM.campoTexto.value = "";
                
                // Redireciona quebrando o histórico de navegação imediato
                window.location.replace("https://google.com");
            } catch (error) {
                // Fallback de segurança caso o replace falhe
                window.location.href = "https://google.com";
            }
        });
    });
</script>