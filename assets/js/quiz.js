// Motor compartilhado do BizuQuiz. O banco da disciplina é carregado antes deste arquivo.
let perguntaAtual = 0;

function carregarPergunta() {
    const item = perguntas[perguntaAtual];
    document.getElementById("pergunta").innerText = item.pergunta;
    for (let i = 0; i < 4; i++) {
        document.getElementById("bt" + (i + 1)).innerText = item.respostas[i];
    }
    document.querySelector(".numerador").innerText =
        "Questão " + (perguntaAtual + 1) + " de " + perguntas.length;
}

function responder(opcao) {
    if (opcao === perguntas[perguntaAtual].correta) {
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            carregarPergunta();
            document.getElementById("pergunta").focus();
        } else {
            window.location.href = "../../parabens/parabens.html?materia=" + encodeURIComponent(materiaQuiz);
        }
    } else {
        window.location.href = "erro.html";
    }
}

carregarPergunta();
