
const perguntas = [
  { pergunta: "Quem construiu a arca?", opcoes: ["Moisés", "Abraão", "Noé", "Davi"], resposta: "Noé" },
  { pergunta: "Quantos livros há na Bíblia?", opcoes: ["66", "73", "70", "80"], resposta: "66" },
  { pergunta: "Quem foi lançado na cova dos leões?", opcoes: ["Elias", "Daniel", "José", "Paulo"], resposta: "Daniel" },
  { pergunta: "Qual o primeiro milagre de Jesus?", opcoes: ["Andar sobre as águas", "Multiplicar pães", "Ressuscitar Lázaro", "Transformar água em vinho"], resposta: "Transformar água em vinho" },
  { pergunta: "Quem traiu Jesus?", opcoes: ["Pedro", "João", "Judas", "Tomé"], resposta: "Judas" }
];

const quizContainer = document.getElementById("quiz-container");
perguntas.forEach((q, i) => {
  const div = document.createElement("div");
  div.innerHTML = `<p><b>${i+1}) ${q.pergunta}</b></p>` +
    q.opcoes.map(op => `
      <label>
        <input type="radio" name="q${i}" value="${op}">
        ${op}
      </label><br>`).join("");
  quizContainer.appendChild(div);
});

function finalizarQuiz() {
  let acertos = 0;
  perguntas.forEach((q, i) => {
    const selecionado = document.querySelector(`input[name=q${i}]:checked`);
    if (selecionado && selecionado.value === q.resposta) acertos++;
  });

  const nickname = document.getElementById("nickname").value;
  const porcentagem = (acertos / perguntas.length * 100).toFixed(1);

  document.getElementById("resultado").innerHTML = `
    <h2>🏁 Fim do Quiz!</h2>
    <p>Jogador: <b>${nickname}</b></p>
    <p>Acertos: ${acertos} de ${perguntas.length}</p>
    <p>Taxa de acertos: ${porcentagem}%</p>
  `;

  fetch("COLE_AQUI_SEU_WEBAPP_URL", {
    method: "POST",
    body: JSON.stringify({ nickname, acertos, porcentagem }),
    headers: { "Content-Type": "application/json" }
  }).then(r => r.text()).then(r => console.log(r));
}
