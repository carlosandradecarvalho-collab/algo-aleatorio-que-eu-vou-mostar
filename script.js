    // 1. Lógica do Formulário de Relato Anônimo
    const form = document.getElementById("formRelato");
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const textoRelato = document.getElementById("textoRelato");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede a página de recarregar
        
        // Aqui o texto do relato está na variável 'textoRelato.value'
        // Em um sistema real, enviaríamos isso para um banco de dados seguro.
        console.log("Relato recebido de forma anônima: ", textoRelato.value);
        
        // Limpa o campo de texto
        textoRelato.value = "";
        
        // Mostra a mensagem de sucesso na tela
        mensagemSucesso.style.display = "block";
        
        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            mensagemSucesso.style.display = "none";
        }, 5000);
    });

    // 2. Lógica do Botão de Pânico (Saída Rápida)
    const btnPanico = document.getElementById("btnPanico");
    
    btnPanico.addEventListener("click", function() {
        // Redireciona a aba atual imediatamente para o Google
        window.location.href = "https://google.com";
    });
});