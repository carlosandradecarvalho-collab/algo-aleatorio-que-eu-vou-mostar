document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // ==========================================
    // 1. CONFIGURAÇÕES, DADOS E ESTADOS
    // ==========================================
    const CONFIG = {
        tempoQuiz: 5000,
        limiteTexto: 400,
        alertaTexto: 330,
        urlEscape: "https://google.com",
        frases: [
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
        perguntaAtual: 0,
        quizTrancado: false
    };

    // ==========================================
    // 2. MAPEAMENTO SEGURO DO DOM
    // ==========================================
    const DOM = {
        abasNav: document.querySelectorAll(".tab-btn"),
        abasConteudo: document.querySelectorAll(".tab-content"),
        quizPergunta: document.getElementById("quizPergunta"),
        quizFeedback: document.getElementById("quizFeedback"),
        inputBusca: document.getElementById("inputBusca"),
        itensFaq: document.querySelectorAll(".faq-item"),
        campoTexto: document.getElementById("relato"),
        contador: document.getElementById("contadorCaracteres"),
        form: document.getElementById("formApoio"),
        msg: document.getElementById("msgSucesso"),
        dicaRede: document.getElementById("dicaRedeSocial"),
        resultadoGravidade: document.getElementById("resultadoGravidade"),
        textoMsg: document.getElementById("textoMensagem"),
        btnFrase: document.getElementById("btnMudarFrase"),
        btnSair: document.getElementById("btnSair")
    };

    // ==========================================
    // 3. FUNÇÕES E MÓDULOS OPERACIONAIS
    // ==========================================

    // Sistema de Navegação de Abas
    window.alternarAba = (indiceAba) => {
        if (!DOM.abasNav.length || !DOM.abasConteudo.length) return;
        DOM.abasNav.forEach((btn, idx) => {
            btn.classList.toggle("active", idx === indiceAba);
            DOM.abasConteudo[idx].classList.toggle("active", idx === indiceAba);
        });
    };

    // Módulo do Quiz de Conscientização
    const ModuloQuiz = {
        init() { this.render(); },
        render() {
            if (!DOM.quizPergunta || !DOM.quizFeedback) return;
            DOM.quizPergunta.textContent = CONFIG.perguntasQuiz[ESTADO.perguntaAtual].q;
            DOM.quizFeedback.style.display = "none";
            ESTADO.quizTrancado = false;
        },
        checar(resposta) {
            if (ESTADO.quizTrancado || !DOM.quizFeedback) return;
            ESTADO.quizTrancado = true;

            const item = CONFIG.perguntasQuiz[ESTADO.perguntaAtual];
            DOM.quizFeedback.style.display = "block";

            if (resposta === item.a) {
                DOM.quizFeedback.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                DOM.quizFeedback.style.color = "var(--success)";
                DOM.quizFeedback.innerHTML = `🎉 Correto! ${item.f}`;
            } else {
                DOM.quizFeedback.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                DOM.quizFeedback.style.color = "var(--danger)";
                DOM.quizFeedback.innerHTML = `❌ Incorreto. ${item.f}`;
            }

            ESTADO.perguntaAtual = (ESTADO.perguntaAtual + 1) % CONFIG.perguntasQuiz.length;
            setTimeout(() => this.render(), CONFIG.tempoQuiz);
        }
    };
    window.verificarResposta = (resp) => ModuloQuiz.checar(resp);
    ModuloQuiz.init();

    // Módulo de Instruções por Aplicativo
    window.mostrarDicaRede = (rede) => {
        if (!DOM.dicaRede) return;
        if (!rede) { DOM.dicaRede.style.display = "none"; return; }

        DOM.dicaRede.style.display = "block";
        DOM.dicaRede.style.padding = "16px";
        DOM.dicaRede.style.borderRadius = "8px";
        DOM.dicaRede.style.backgroundColor = "var(--primary-light)";

        const guias = {
            instagram: "👉 **Instagram**: Acesse o perfil do agressor, toque nos três pontos, selecione 'Bloquear'. Vá em Configurações > Privacidade > Palavras Ocultas para banir termos repetitivos automaticamente.",
            tiktok: "👉 **TikTok**: Segure pressionado o dedo sobre o comentário nocivo e toque em 'Denunciar'. No perfil do usuário, use o menu do canto superior direito para bloqueá-lo permanentemente.",
            whatsapp: "👉 **WhatsApp**: Abra a conversa, clique na foto ou nome do contato, role o menu até o fim e selecione 'Bloquear'. Nunca delete o chat imediatamente; mantenha o registro com o número visível."
        };
        DOM.dicaRede.innerHTML = guias[rede] || "Escolha uma rede válida.";
    };

    // Calculadora de Gravidade
    window.calcularGravidade = () => {
        if (!DOM.resultadoGravidade) return;
        const selecionados = document.querySelectorAll(".chk-gravidade:checked").length;
        
        if (selecionados === 0) { DOM.resultadoGravidade.style.display = "none"; return; }

        DOM.resultadoGravidade.style.display = "block";
        DOM.resultadoGravidade.style.padding = "16px";
        DOM.resultadoGravidade.style.borderRadius = "8px";

        if (selecionados <= 1) {
            DOM.resultadoGravidade.style.backgroundColor = "rgba(245, 158, 11, 0.15)";
            DOM.resultadoGravidade.style.color = "var(--warning)";
            DOM.resultadoGravidade.innerHTML = "⚠️ **Alerta Moderado**: Ative imediatamente os filtros de privacidade e realize o bloqueio completo. Converse abertamente com familiares ou amigos de confiança.";
        } else {
            DOM.resultadoGravidade.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
            DOM.resultadoGravidade.style.color = "var(--danger)";
            DOM.resultadoGravidade.innerHTML = "🚨 **Risco Crítico**: Incidentes graves envolvendo perfis falsos ou ameaças corporais diretas exigem a coleta metódica de capturas de tela e a formalização urgente de um Boletim de Ocorrência.";
        }
    };

    // ==========================================
    // 4. ATIVAÇÃO DOS OUVINTES DE EVENTOS (LISTENERS)
    // ==========================================

    // Barra de Busca (FAQ)
    if (DOM.inputBusca && DOM.itensFaq.length) {
        DOM.inputBusca.addEventListener("input", () => {
            const termo = DOM.inputBusca.value.toLowerCase();
            DOM.itensFaq.forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(termo) ? "block" : "none";
            });
        });
    }

    // Contador de Caracteres Emocional
    if (DOM.campoTexto && DOM.contador) {
        DOM.campoTexto.addEventListener("input", () => {
            const total = DOM.campoTexto.value.length;
            DOM.contador.textContent = `${total} / ${CONFIG.limiteTexto} caracteres`;
            DOM.contador.style.color = total >= CONFIG.alertaTexto ? "var(--danger)" : "var(--text-muted)";
        });
    }

    // Formulário de Exportação via Blob (.txt)
    if (DOM.form && DOM.campoTexto) {
        DOM.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const texto = DOM.campoTexto.value.trim();

            if (texto.length > 0) {
                try {
                    const corpoArquivo = `PORTAL CONEXÃO SEGURA\nRascunho de Registro de Caso\nData: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}\n\nTexto do Relato:\n"${texto}"\n\nInstruções: Utilize este rascunho de depoimento impresso ou salvo junto com as capturas de tela (prints) organizadas ao comparecer à delegacia mais próxima.`;
                    
                    const blob = new Blob([corpoArquivo], { type: "text/plain;charset=utf-8" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "Rascunho_Caso_Cyberbullying.txt";
                    link.click();

                    DOM.campoTexto.value = "";
                    DOM.contador.textContent = `0 / ${CONFIG.limiteTexto} caracteres`;
                    DOM.contador.style.color = "var(--text-muted)";
                    
                    if (DOM.msg) {
                        DOM.msg.style.display = "block";
                        setTimeout(() => DOM.msg.style.display = "none", 4000);
                    }
                } catch (err) {
                    console.error("Falha ao exportar arquivo físico local:", err);
                }
            }
        });
    }

    // Mudar Frases de Apoio
    if (DOM.btnFrase && DOM.textoMsg) {
        DOM.btnFrase.addEventListener("click", () => {
            const idx = Math.floor(Math.random() * CONFIG.frases.length);
            DOM.textoMsg.textContent = CONFIG.frases[idx];
        });
    }

    // Botão de Pânico (Saída de Emergência)
    if (DOM.btnSair) {
        DOM.btnSair.addEventListener("click", () => {
            if (DOM.campoTexto) DOM.campoTexto.value = "";