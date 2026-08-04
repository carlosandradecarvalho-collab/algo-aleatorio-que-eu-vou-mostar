const form = document.getElementById("secureForm");
    const feedback = document.getElementById("alertFeedback");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const userName = document.getElementById("name").value;

        // Oculta o formulário de contato com segurança
        form.style.display = "none";

        // Aplica o feedback visual interativo
        feedback.innerHTML = `
            <div class="feedback-alert">
                <i class="fa-solid fa-circle-check" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                <strong>Obrigado pelo seu relato, ${userName}!</strong><br>
                Nossa equipe simulada acolheu suas informações com total segurança. Lembre-se: não hesite em procurar ajuda real nos canais acima!
            </div>
        `;
        feedback.classList.remove("hidden");
    });
});
Use o código com cuidado.🚀 Como colocar o site Online pelo GitHub (GitHub Pages)Depois de colocar esses 3 arquivos dentro do seu repositório no GitHub, siga estes passos simples para ativar o site:Entre na página do seu repositório no GitHub.Clique na aba Settings (Configurações) no menu superior.No menu lateral esquerdo, clique na opção Pages.Procure pela seção Build and deployment. Em Branch, mude de None para main (ou master).Clique no botão Save (Salvar).Aguarde cerca de 1 a 2 minutos. Atualize a página e o GitHub exibirá um link no topo da tela (ex: https://github.io). Pronto! Seu site estará público para o mundo.Você já possui uma conta criada no GitHub e sabe criar um repositório, ou gostaria de um passo a passo simples explicando como criar o repositório do zero na plataforma?As respostas da IA podem conter erros. Saiba mais5 sitesGitHub: o que é e como usar? [Guia completo]24 de mai. de 2024 — Criar um repositório Depois de fazer login no GitHub, você pode criar um repositório clicando no botão New e seguindo as instruçõe...LocawebGitHub: o que é e como usar? [Guia completo]24 de mai. de 2024 — Após fazer as alterações, vá até a página do seu repositório no GitHub.Locaweb[Dúvida] Pessoal como faço pra deixar de ser colaborador em um projeto no github? | Fórum Alura19 de jan. de 2024 — Clique na aba "Settings" (Configurações) que fica na parte superior da página.AluraMostrar tudo

    