<script>
    /**
     * Sistema de Interatividade Portal Conexão Segura
     * Desenvolvido com padrões modernos de arquitetura JS (ES6+)
     */
    document.addEventListener("DOMContentLoaded", () => {
        "use strict";

        // ==========================================
        // 1. CONFIGURAÇÕES, DADOS E ESTADOS
        // ==========================================
        const CONFIG = {
            tempoTrocaQuiz: 5000,
            limiteCaracteres: 400,
            avisoCaracteres: 330,
            redirecionamentoEmergencia: "https://google.com",
            frasesApoio: [
                "\"Você é muito mais forte do que qualquer comentário maldoso em uma tela.\"",
                "\"A internet passa, mas sua saúde importa hoje. Procure ajuda e fique bem.\"",
                "\"Nenhum print ou montagem define quem você é de verdade.\"",
                "\"Denunciar não é fraqueza, é um ato de coragem e proteção.\""
            ],
            perguntasQuiz: [
                { q: "Apagar a mensagem resolve todo o problema jurídico do cyberbullying.", a: false, f: "Mito! É fundamental guardar capturas de tela (prints) completas antes de remover para servirem de provas." },
                { q: "Agressores virtuais menores de idade também respondem legalmente.", a: true, f: "Verdade! Menores respondem por ato infracional e os responsáveis legais podem pagar indenizações financeiras." },
                { q: "Bater boca ou retrucar ofensas faz o ataque cessar mais rápido.", a: false, f: "Mito! Revides geram engajamento. O bloqueio rápido é a melhor resposta imediata." }
            ]
        };

        const ESTADO = {
            quizPerguntaAtual: 0,
            quizBloqueado: false
        };

        // ==========================================
        // 2. MAPEAMENTO SEGURO DO DOM
        // ==========================================
        const DOM = {
            botoesAbas: document.querySelectorAll(".tab-btn"),
            conteudosAbas: document.querySelectorAll(".tab-content"),
            quizPergunta: document.getElementById("quizPergunta"),
            quizFeedback: document.getElementById("quizFeedback"),
            inputBusca: document.getElementById("inputBusca"),
            itensFaq: document.querySelectorAll(".faq-item"),
            campoTexto: document.getElementById("relato"),
            contador: document.getElementById("contadorCaracteres"),
            formApoio: document.getElementById("formApoio"),
            msgSucesso: document.getElementById("msgSucesso"),
            painelDicaRede: document.getElementById("dicaRedeSocial"),
            painelResultadoGravidade: document.getElementById("resultadoGravidade"),
            checkboxesGravidade: document.querySelectorAll(".chk-gravidade"),
            textoMensagem: document.getElementById("textoMensagem"),
            btnMudarFrase: document.getElementById("btnMudarFrase"),
            btnSair: document.getElementById("btnSair")
        };

        // ==========================================
        // 3. FUNÇÕES E MÓDULOS OPERACIONAIS
        // ==========================================

        // Sistema de Abas Educativas
        window.alternarAba = (indiceAba) => {
            if (!DOM.botoesAbas.length || !DOM.conteudosAbas.length) return;
            
            DOM.botoesAbas.forEach((btn, index) => {
                btn.classList.toggle("active", index === indiceAba);
                DOM.conteudosAbas[index].classList.toggle("active", index === indiceAba);
            });
        };

        // Sistema do Quiz Dinâmico
        const CoreQuiz = {
            inicializar() {
                this.carregar();
            },
            carregar() {
                if (!DOM.quizPergunta || !DOM.quizFeedback) return;
                DOM.quizPergunta.textContent = CONFIG.perguntasQuiz[ESTADO.quizPerguntaAtual].q;
                DOM.quizFeedback.style.display = "none";
                ESTADO.quizBloqueado = false;
            },
            checar(respostaUsuario) {
                if (ESTADO.quizBloqueado || !DOM.quizFeedback) return;
                ESTADO.quizBloqueado = true;

                const pergunta = CONFIG.perguntasQuiz[ESTADO.quizPerguntaAtual];
                DOM.quizFeedback.style.display = "block";
                
                if (respostaUsuario === pergunta.a) {
                    DOM.quizFeedback.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                    DOM.quizFeedback.style.color = "var(--success)";
                    DOM.quizFeedback.innerHTML = `🎉 Correto! ${pergunta.f}`;
                } else {
                    DOM.quizFeedback.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                    DOM.quizFeedback.style.color = "var(--danger)";
                    DOM.quizFeedback.innerHTML = `❌ Incorreto. ${pergunta.f}`;
                }

                ESTADO.quizPerguntaAtual = (ESTADO.quizPerguntaAtual + 1) % CONFIG.perguntasQuiz.length;
                setTimeout(() => this.carregar(), CONFIG.tempoTrocaQuiz);
            }
        };
        window.verificarResposta = (resp) => CoreQuiz.checar(resp);

        // Sistema de Dicas de Aplicativos (Redes Sociais)
        window.mostrarDicaRede = (rede) => {
            if (!DOM.painelDicaRede) return;
            if (!rede) { DOM.painelDicaRede.style.display = "none"; return; }

            DOM.painelDicaRede.style.display = "block";
            DOM.painelDicaRede.style.padding = "16px";
            DOM.painelDicaRede.style.borderRadius = "8px";
            DOM.painelDicaRede.style.backgroundColor = "var(--primary-light)";

            const guias = {
                instagram: "👉 **Instagram**: Acesse o perfil do agressor, toque nos três pontos, selecione 'Bloquear'. Vá em Configurações > Privacidade > Palavras Ocultas para banir termos repetitivos automaticamente.",
                tiktok: "👉 **TikTok**: Segure pressionado o dedo sobre o comentário nocivo e toque em 'Denunciar'. No perfil do usuário, use o menu do canto superior direito para bloqueá-lo permanentemente.",
                whatsapp: "👉 **WhatsApp**: Abra a conversa, clique na foto ou nome do contato, role o menu até o fim e selecione 'Bloquear'. Nunca delete o chat imediatamente; mantenha o registro com o número visível."
            };

            DOM.painelDicaRede.innerHTML = guias[rede] || "Escolha um aplicativo válido.";
        };

        // Calculadora de Nível de Gravidade
        window.calcularGravidade = () => {
            if (!DOM.painelResultadoGravidade) return;

            const marcados = document.querySelectorAll(".chk-gravidade:checked").length;
            if (marcados === 0) { DOM.painelResultadoGravidade.style.display = "none"; return; }

            DOM.painelResultadoGravidade.style.display = "block";
            DOM.painelResultadoGravidade.style.padding = "16px";
            DOM.painelResultadoGravidade.style.borderRadius = "8px";

            if (marcados <= 1) {
                DOM.painelResultadoGravidade.style.backgroundColor = "rgba(245, 158, 11, 0.15)";
                DOM.painelResultadoGravidade.style.color = "var(--warning)";
                DOM.painelResultadoGravidade.innerHTML = "⚠️ **Alerta Moderado**: Ative imediatamente os filtros de privacidade e realize o bloqueio completo. Converse abertamente com familiares de confiança.";
            } else {
                DOM.painelResultadoGravidade.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                DOM.painelResultadoGravidade.style.color = "var(--danger)";
                DOM.painelResultadoGravidade.innerHTML = "🚨 **Risco Crítico**: Incidentes graves envolvendo perfis falsos ou ameaças corporais diretas exigem a coleta metódica de capturas de tela e a formalização de um Boletim de Ocorrência na Polícia Civil.";
            }
        };

        // ==========================================
        // 4. ATIVAÇÃO DOS OUVINTES DE EVENTOS (LISTENERS)
        // ==========================================

        // Inicializador do Quiz
        CoreQuiz.inicializar();

        // Controle da Barra de Busca Dinâmica (FAQ)
        if (DOM.inputBusca && DOM.itensFaq.length) {
            DOM.inputBusca.addEventListener("input", () => {
                const termo = DOM.inputBusca.value.toLowerCase();
                DOM.itensFaq.forEach(item => {
                    const texto = item.textContent.toLowerCase();
                    item.style.display = texto.includes(termo) ? "block" : "none";
                });
            });
        }

        // Eventos do Formulário de Relato Seguro e Contador Emocional
        if (DOM.campoTexto && DOM.contador) {
            DOM.campoTexto.addEventListener("input", () => {
                const qtd = DOM.campoTexto.value.length;
                DOM.contador.textContent = `${qtd} / ${CONFIG.limiteCaracteres} caracteres`;
                DOM.contador.style.color = qtd >= CONFIG.avisoCaracteres ? "var(--danger)" : "var(--text-muted)";
            });
        }

        // Submissão do Formulário e Exportação via Blob (.txt)
        if (DOM.formApoio && DOM.campoTexto) {
            DOM.formApoio.addEventListener("submit", (e) => {
                e.preventDefault();
                const textoLimpo = DOM.campoTexto.value.trim();

                if (textoLimpo.length > 0) {
                    try {
                        const conteudo = `PORTAL CONEXÃO SEGURA\nRascunho de Registro de Caso\nData: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n\nTexto do Relato:\n"${textoLimpo}"\n\nInstruções: Leve este documento anotado junto com as capturas de tela (prints) organizadas à delegacia de polícia mais próxima.`;
                        
                        const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
                        const link = document.createElement("a");