<script>
    document.addEventListener("DOMContentLoaded", () => {
        "use strict";

        // --- 1. LÓGICA DO QUIZ INTERATIVO ---
        const perguntasQuiz = [
            { q: "Apagar a mensagem resolve o problema jurídico do cyberbullying.", a: false, f: "Mito! É essencial guardar capturas de tela (prints) antes de deletar para servirem de prova legal." },
            { q: "O agressor virtual pode ser punido por lei mesmo sendo menor de idade.", a: true, f: "Verdade! Menores respondem por ato infracional equivalente e pais pagam indenizações." },
            { q: "Responder às provocações faz o agressor parar o ataque.", a: false, f: "Mito! Agressores buscam reação. O ideal é bloquear imediatamente sem responder." }
        ];
        let perguntaAtual = 0;
        const campoPergunta = document.getElementById("quizPergunta");
        const feedbackQuiz = document.getElementById("quizFeedback");

        function carregarPergunta() {
            if (campoPergunta && feedbackQuiz) {
                campoPergunta.textContent = perguntasQuiz[perguntaAtual].q;
                feedbackQuiz.style.display = "none";
            }
        }

        window.verificarResposta = (respostaUsuario) => {
            const correta = perguntasQuiz[perguntaAtual].a;
            feedbackQuiz.style.display = "block";
            
            if (respostaUsuario === correta) {
                feedbackQuiz.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                feedbackQuiz.style.color = "var(--success)";
                feedbackQuiz.innerHTML = "🎉 Correto! " + perguntasQuiz[perguntaAtual].f;
            } else {
                feedbackQuiz.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                feedbackQuiz.style.color = "var(--danger)";
                feedbackQuiz.innerHTML = "❌ Incorreto. " + perguntasQuiz[perguntaAtual].f;
            }

            perguntaAtual = (perguntaAtual + 1) % perguntasQuiz.length;
            setTimeout(carregarPergunta, 4500);
        };
        carregarPergunta();

        // --- 2. FILTRO DINÂMICO DE DÚVIDAS (BUSCA) ---
        const inputBusca = document.getElementById("inputBusca");
        const itensFaq = document.querySelectorAll(".faq-item");

        if (inputBusca) {
            inputBusca.addEventListener("input", () => {
                const termo = inputBusca.value.toLowerCase();
                itensFaq.forEach(item => {
                    const texto = item.textContent.toLowerCase();
                    item.style.display = texto.includes(termo) ? "block" : "none";
                });
            });
        }

        // --- 3. CONTADOR DE CARACTERES EMOCIONAL ---
        const campoTexto = document.getElementById("relato");
        const contador = document.getElementById("contadorCaracteres");

        if (campoTexto && contador) {
            campoTexto.addEventListener("input", () => {
                const qtd = campoTexto.value.length;
                contador.textContent = `${qtd} / 300 caracteres`;
                contador.style.color = qtd >= 250 ? "var(--danger)" : "var(--text-muted)";
            });
        }

        // --- 4. NOVO: GERADOR E DOWNLOAD DE RELATO SEGURO ---
        const form = document.getElementById("formApoio");
        const msg = document.getElementById("msgSucesso");

        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const textoRelato = campoTexto.value;

                // Cria o arquivo de texto para baixar
                const blob = new Blob([`RELATO DE CYBERBULLEYING\nData: ${new Date().toLocaleDateString()}\n\nDepoimento:\n${textoRelato}`], { type: "text/plain;charset=utf-8" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "meu_relato_cyberbullying.txt";
                link.click();

                campoTexto.value = "";
                if (contador) contador.textContent = "0 / 300 caracteres";
                if (msg) {
                    msg.style.display = "block";
                    setTimeout(() => msg.style.display = "none", 5000);
                }
            });
        }

        // --- 5. NOVO: VERIFICAÇÃO DE INSTRUÇÕES POR REDE SOCIAL ---
        // Cria dinamicamente uma caixinha de seleção no HTML se ela existir
        window.mostrarDicaRede = (rede) => {
            const painelDica = document.getElementById("dicaRedeSocial");
            if (!painelDica) return;

            painelDica.style.display = "block";
            painelDica.style.padding = "15px";
            painelDica.style.marginTop = "15px";
            painelDica.style.borderRadius = "8px";
            painelDica.style.backgroundColor = "var(--primary-light)";

            const guias = {
                instagram: "👉 No Instagram: Toque nos três pontos no perfil do agressor, selecione 'Bloquear' e depois escolha 'Denunciar'. Ative as 'Palavras Ocultas' nas configurações de privacidade.",
                tiktok: "👉 No TikTok: Segure o dedo pressionado no comentário ofensivo, toque em 'Denunciar'. Para bloquear, vá no perfil dele, clique na seta no canto superior direito e escolha 'Bloquear'.",
                whatsapp: "👉 No WhatsApp: Abra a conversa, toque no nome do contato no topo, role até o final e selecione 'Bloquear'. Certifique-se de printar a tela com o número do telefone aparecendo."
            };

            painelDica.innerHTML = guias[rede] || "Selecione uma rede para ver as instruções.";
        };

        // --- 6. NOVO: CALCULADORA DE RISCO E GRAVIDADE ---
        window.calcularGravidade = () => {
            const opcoes = document.querySelectorAll(".chk-gravidade:checked");
            const painelResultado = document.getElementById("resultadoGravidade");
            if (!painelResultado) return;

            painelResultado.style.display = "block";
            painelResultado.style.padding = "15px";
            painelResultado.style.marginTop = "15px";
            painelResultado.style.borderRadius = "8px";

            let pontos = opcoes.length;

            if (pontos === 0) {
                painelResultado.style.backgroundColor = "var(--border)";
                painelResultado.style.color = "var(--text)";
                painelResultado.innerHTML = "Selecione pelo menos uma opção para calcular.";
            } else if (pontos <= 2) {
                painelResultado.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                painelResultado.style.color = "var(--success)";
                painelResultado.innerHTML = "⚠️ **Risco Inicial**: Bloqueie o usuário imediatamente, não responda e alerte os pais ou responsáveis sobre o comportamento.";
            } else {
                painelResultado.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                painelResultado.style.color = "var(--danger)";
                painelResultado.innerHTML = "🚨 **Risco Severo**: Casos com ameaças diretas ou perfis falsos exigem preservação urgente de provas (prints) e registro de Boletim de Ocorrência na polícia.";
            }
        };

        // --- 7. GERADOR DE FRASES DE APOIO ---
        const frases = [
            "\"Você é muito mais forte do que qualquer comentário maldoso em uma tela.\"",
            "\"A internet passa, mas sua saúde importa hoje. Procure ajuda e fique bem.\"",
            "\"Nenhum print ou montagem define quem você é de verdade.\"",
            "\"Denunciar não é fraqueza, é um ato de coragem e proteção.\""
        ];
        const textoMensagem = document.getElementById("textoMensagem");
        const btnMudarFrase = document.getElementById("btnMudarFrase");
        
        if (btnMudarFrase && textoMensagem) {
            btnMudarFrase.addEventListener("click", () => {
                const indexAleatorio = Math.floor(Math.random() * frases.length);
                textoMensagem.textContent = frases[indexAleatorio];
            });
        }

        // --- 8. SAÍDA DE EMERGÊNCIA (BOTÃO DE PÂNICO) ---
        const btnSair = document.getElementById("btnSair");
        if (btnSair) {
            btnSair.addEventListener("click", () => {
                window.location.replace("https://google.com");
            });
        }
    </script><script>
    document.addEventListener("DOMContentLoaded", () => {
        "use strict";

        // --- 1. LÓGICA DO QUIZ INTERATIVO ---
        const perguntasQuiz = [
            { q: "Apagar a mensagem resolve o problema jurídico do cyberbullying.", a: false, f: "Mito! É essencial guardar capturas de tela (prints) antes de deletar para servirem de prova legal." },
            { q: "O agressor virtual pode ser punido por lei mesmo sendo menor de idade.", a: true, f: "Verdade! Menores respondem por ato infracional equivalente e pais pagam indenizações." },
            { q: "Responder às provocações faz o agressor parar o ataque.", a: false, f: "Mito! Agressores buscam reação. O ideal é bloquear imediatamente sem responder." }
        ];
        let perguntaAtual = 0;
        const campoPergunta = document.getElementById("quizPergunta");
        const feedbackQuiz = document.getElementById("quizFeedback");

        function carregarPergunta() {
            if (campoPergunta && feedbackQuiz) {
                campoPergunta.textContent = perguntasQuiz[perguntaAtual].q;
                feedbackQuiz.style.display = "none";
            }
        }

        window.verificarResposta = (respostaUsuario) => {
            const correta = perguntasQuiz[perguntaAtual].a;
            feedbackQuiz.style.display = "block";
            
            if (respostaUsuario === correta) {
                feedbackQuiz.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                feedbackQuiz.style.color = "var(--success)";
                feedbackQuiz.innerHTML = "🎉 Correto! " + perguntasQuiz[perguntaAtual].f;
            } else {
                feedbackQuiz.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                feedbackQuiz.style.color = "var(--danger)";
                feedbackQuiz.innerHTML = "❌ Incorreto. " + perguntasQuiz[perguntaAtual].f;
            }

            perguntaAtual = (perguntaAtual + 1) % perguntasQuiz.length;
            setTimeout(carregarPergunta, 4500);
        };
        carregarPergunta();

        // --- 2. FILTRO DINÂMICO DE DÚVIDAS (BUSCA) ---
        const inputBusca = document.getElementById("inputBusca");
        const itensFaq = document.querySelectorAll(".faq-item");

        if (inputBusca) {
            inputBusca.addEventListener("input", () => {
                const termo = inputBusca.value.toLowerCase();
                itensFaq.forEach(item => {
                    const texto = item.textContent.toLowerCase();
                    item.style.display = texto.includes(termo) ? "block" : "none";
                });
            });
        }

        // --- 3. CONTADOR DE CARACTERES EMOCIONAL ---
        const campoTexto = document.getElementById("relato");
        const contador = document.getElementById("contadorCaracteres");

        if (campoTexto && contador) {
            campoTexto.addEventListener("input", () => {
                const qtd = campoTexto.value.length;
                contador.textContent = `${qtd} / 300 caracteres`;
                contador.style.color = qtd >= 250 ? "var(--danger)" : "var(--text-muted)";
            });
        }

        // --- 4. NOVO: GERADOR E DOWNLOAD DE RELATO SEGURO ---
        const form = document.getElementById("formApoio");
        const msg = document.getElementById("msgSucesso");

        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const textoRelato = campoTexto.value;

                // Cria o arquivo de texto para baixar
                const blob = new Blob([`RELATO DE CYBERBULLEYING\nData: ${new Date().toLocaleDateString()}\n\nDepoimento:\n${textoRelato}`], { type: "text/plain;charset=utf-8" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "meu_relato_cyberbullying.txt";
                link.click();

                campoTexto.value = "";
                if (contador) contador.textContent = "0 / 300 caracteres";
                if (msg) {
                    msg.style.display = "block";
                    setTimeout(() => msg.style.display = "none", 5000);
                }
            });
        }

        // --- 5. NOVO: VERIFICAÇÃO DE INSTRUÇÕES POR REDE SOCIAL ---
        // Cria dinamicamente uma caixinha de seleção no HTML se ela existir
        window.mostrarDicaRede = (rede) => {
            const painelDica = document.getElementById("dicaRedeSocial");
            if (!painelDica) return;

            painelDica.style.display = "block";
            painelDica.style.padding = "15px";
            painelDica.style.marginTop = "15px";
            painelDica.style.borderRadius = "8px";
            painelDica.style.backgroundColor = "var(--primary-light)";

            const guias = {
                instagram: "👉 No Instagram: Toque nos três pontos no perfil do agressor, selecione 'Bloquear' e depois escolha 'Denunciar'. Ative as 'Palavras Ocultas' nas configurações de privacidade.",
                tiktok: "👉 No TikTok: Segure o dedo pressionado no comentário ofensivo, toque em 'Denunciar'. Para bloquear, vá no perfil dele, clique na seta no canto superior direito e escolha 'Bloquear'.",
                whatsapp: "👉 No WhatsApp: Abra a conversa, toque no nome do contato no topo, role até o final e selecione 'Bloquear'. Certifique-se de printar a tela com o número do telefone aparecendo."
            };

            painelDica.innerHTML = guias[rede] || "Selecione uma rede para ver as instruções.";
        };

        // --- 6. NOVO: CALCULADORA DE RISCO E GRAVIDADE ---
        window.calcularGravidade = () => {
            const opcoes = document.querySelectorAll(".chk-gravidade:checked");
            const painelResultado = document.getElementById("resultadoGravidade");
            if (!painelResultado) return;

            painelResultado.style.display = "block";
            painelResultado.style.padding = "15px";
            painelResultado.style.marginTop = "15px";
            painelResultado.style.borderRadius = "8px";

            let pontos = opcoes.length;

            if (pontos === 0) {
                painelResultado.style.backgroundColor = "var(--border)";
                painelResultado.style.color = "var(--text)";
                painelResultado.innerHTML = "Selecione pelo menos uma opção para calcular.";
            } else if (pontos <= 2) {
                painelResultado.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                painelResultado.style.color = "var(--success)";
                painelResultado.innerHTML = "⚠️ **Risco Inicial**: Bloqueie o usuário imediatamente, não responda e alerte os pais ou responsáveis sobre o comportamento.";
            } else {
                painelResultado.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
                painelResultado.style.color = "var(--danger)";
                painelResultado.innerHTML = "🚨 **Risco Severo**: Casos com ameaças diretas ou perfis falsos exigem preservação urgente de provas (prints) e registro de Boletim de Ocorrência na polícia.";
            }
        };

        // --- 7. GERADOR DE FRASES DE APOIO ---
        const frases = [
            "\"Você é muito mais forte do que qualquer comentário maldoso em uma tela.\"",
            "\"A internet passa, mas sua saúde importa hoje. Procure ajuda e fique bem.\"",
            "\"Nenhum print ou montagem define quem você é de verdade.\"",
            "\"Denunciar não é fraqueza, é um ato de coragem e proteção.\""
        ];
        const textoMensagem = document.getElementById("textoMensagem");
        const btnMudarFrase = document.getElementById("btnMudarFrase");
        
        if (btnMudarFrase && textoMensagem) {
            btnMudarFrase.addEventListener("click", () => {
                const indexAleatorio = Math.floor(Math.random() * frases.length);
                textoMensagem.textContent = frases[indexAleatorio];
            });
        }

        // --- 8. SAÍDA DE EMERGÊNCIA (BOTÃO DE PÂNICO) ---
        const btnSair = document.getElementById("btnSair");
        if (btnSair) {
            btnSair.addEventListener("click", () => {
                window.location.replace("https://google.com");
            });
        }
    </script>