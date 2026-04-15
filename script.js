// Sistema de Gestão - Centro Educacional de Barra Nova
let alunos = [];
let currentUser = null;
let currentUserType = null;
let currentAlunoLogado = null;
let currentModalidadeSelecionada = "";

// Credenciais do professor
const PROFESSOR_CREDENTIALS = {
  username: "cebn2026",
  password: "cebn2002",
};

// Lista completa de modalidades disponíveis
const MODALIDADES = [
  "xadrez",
  "dominó em dupla",
  "futsal",
  "handebol",
  "vôlei",
  "baleado",
  "atletismo sub-11 masc",
  "atletismo sub-11 fem",
  "atletismo sub-13 masc",
  "atletismo sub-13 fem",
  "atletismo sub-15 masc",
  "atletismo sub-15 fem",
  "atletismo sub-17 masc",
  "atletismo sub-17 fem",
  "atletismo aberto masc",
  "atletismo aberto fem",
  "baleado misto",
];

// Inicialização do sistema
document.addEventListener("DOMContentLoaded", () => {
  carregarAlunosDoArquivo();
  inicializarEventos();
  preencherModalidades();
});

function carregarAlunosDoArquivo() {
  if (typeof ALUNOS_CADASTRADOS !== "undefined") {
    alunos = [...ALUNOS_CADASTRADOS];
    alunos.forEach((aluno) => {
      if (aluno.status === undefined) {
        aluno.status = aluno.suspensoes > 0 ? "suspenso" : "apto";
      }
      if (aluno.diasSuspensao === undefined) aluno.diasSuspensao = 0;
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        aluno.diaTreino = aluno.diasTreino[0].dia;
        aluno.horario = aluno.diasTreino[0].horario;
      } else {
        if (!aluno.diaTreino) aluno.diaTreino = "Segunda";
        if (!aluno.horario) aluno.horario = "07h15-08h15";
      }
    });
    console.log("Alunos carregados:", alunos.length);
  } else {
    alunos = [];
    console.log("Nenhum aluno encontrado");
  }
}

function inicializarEventos() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", fazerLogin);
  }

  document.getElementById("logoutBtn")?.addEventListener("click", fazerLogout);
  document
    .getElementById("alunoLogoutBtn")
    ?.addEventListener("click", fazerLogoutAluno);
  document.getElementById("menuToggle")?.addEventListener("click", toggleMenu);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      mudarView(view);
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });

  document
    .getElementById("gerarPDFBtn")
    ?.addEventListener("click", () =>
      gerarPDFTabela(alunosFiltrados || alunos, "lista_geral_alunos"),
    );
  document
    .getElementById("gerarPDFModalidadeBtn")
    ?.addEventListener("click", () => gerarPDFPorModalidade());
  document
    .getElementById("aplicarFiltrosBtn")
    ?.addEventListener("click", aplicarFiltros);
  document
    .getElementById("limparFiltrosBtn")
    ?.addEventListener("click", limparFiltros);
  document
    .getElementById("buscaAvancadaBtn")
    ?.addEventListener("click", buscaAvancada);
  document
    .getElementById("limparBuscaBtn")
    ?.addEventListener("click", limparBusca);

  // Filtros em tempo real
  document
    .getElementById("searchNome")
    ?.addEventListener("input", () => aplicarFiltros());
  document
    .getElementById("filtroIdadeMin")
    ?.addEventListener("input", () => aplicarFiltros());
  document
    .getElementById("filtroIdadeMax")
    ?.addEventListener("input", () => aplicarFiltros());
  document
    .getElementById("buscaNome")
    ?.addEventListener("input", () => buscaAvancada());
  document
    .getElementById("buscaIdadeMin")
    ?.addEventListener("input", () => buscaAvancada());
  document
    .getElementById("buscaIdadeMax")
    ?.addEventListener("input", () => buscaAvancada());

  document
    .querySelector(".close-card")
    ?.addEventListener("click", () => fecharModal("cardModal"));

  window.onclick = (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  };

  document.addEventListener("click", (event) => {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    if (
      window.innerWidth <= 768 &&
      sidebar &&
      sidebar.classList.contains("open")
    ) {
      if (
        !sidebar.contains(event.target) &&
        !menuToggle?.contains(event.target)
      ) {
        sidebar.classList.remove("open");
      }
    }
  });
}

let alunosFiltrados = [];

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

function formatarDiasTreino(diasTreino) {
  if (!diasTreino || diasTreino.length === 0) return "Não definido";
  return diasTreino.map((d) => `${d.dia} (${d.horario})`).join(" e ");
}

function preencherModalidades() {
  const selects = ["filtroModalidade", "buscaModalidade"];
  selects.forEach((selectId) => {
    const select = document.getElementById(selectId);
    if (select) {
      select.innerHTML =
        '<option value="">Todas</option>' +
        MODALIDADES.map(
          (m) =>
            `<option value="${m}">${m.charAt(0).toUpperCase() + m.slice(1)}</option>`,
        ).join("");
    }
  });

  const turmas = [
    "6° A",
    "6° B",
    "6° C",
    "6° D",
    "7° A",
    "7° B",
    "7° C",
    "7° D",
    "8° A",
    "8° B",
    "8° C",
    "9° A",
    "9° B",
    "9° C",
    "9° D",
    "Módulo I",
    "Módulo II",
    "Módulo III",
    "Módulo IV",
    "Módulo V",
  ];

  const turmaSelects = ["filtroTurma", "buscaTurma"];
  turmaSelects.forEach((selectId) => {
    const select = document.getElementById(selectId);
    if (select) {
      select.innerHTML =
        '<option value="">Todas</option>' +
        turmas.map((t) => `<option value="${t}">${t}</option>`).join("");
    }
  });

  const container = document.getElementById("modalidadesButtons");
  if (container) {
    container.innerHTML = MODALIDADES.map(
      (m) =>
        `<button class="btn-modalidade" data-modalidade="${m}">${m.charAt(0).toUpperCase() + m.slice(1)}</button>`,
    ).join("");

    document.querySelectorAll(".btn-modalidade").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalidade = btn.dataset.modalidade;
        filtrarPorModalidade(modalidade);
      });
    });
  }
}

function fazerLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const userType = document.querySelector(
    'input[name="userType"]:checked',
  ).value;

  if (userType === "professor") {
    if (
      username === PROFESSOR_CREDENTIALS.username &&
      password === PROFESSOR_CREDENTIALS.password
    ) {
      currentUser = username;
      currentUserType = "professor";
      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("mainContainer").style.display = "flex";
      document.getElementById("loggedUser").textContent = "cebn2026";
      document.getElementById("loggedUserName").textContent = "cebn2026";
      inicializarSistema();
    } else {
      alert("Credenciais inválidas! Senha ou usuário incorretos.");
    }
  } else {
    const aluno = alunos.find((a) => a.cpf === username);
    if (aluno && password === username) {
      currentUser = aluno.nome;
      currentUserType = "aluno";
      currentAlunoLogado = aluno;
      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("alunoContainer").style.display = "block";
      exibirPainelAluno(aluno);
    } else {
      alert(
        "CPF não encontrado ou senha incorreta! Use seu CPF como usuário e senha.",
      );
    }
  }
}

function fazerLogout() {
  currentUser = null;
  currentUserType = null;
  document.getElementById("loginContainer").style.display = "flex";
  document.getElementById("mainContainer").style.display = "none";
  document.getElementById("sidebar").classList.remove("open");
}

function fazerLogoutAluno() {
  currentUser = null;
  currentUserType = null;
  currentAlunoLogado = null;
  document.getElementById("loginContainer").style.display = "flex";
  document.getElementById("alunoContainer").style.display = "none";
}

function exibirPainelAluno(aluno) {
  const isApto = aluno.status === "apto";
  const statusClass = isApto ? "status-apto" : "status-suspenso";
  const statusIcon = isApto ? "✅" : "❌";
  const statusText = isApto
    ? "APTO PARA TREINAR"
    : `SUSPENSO - ${aluno.diasSuspensao} dias de suspensão`;
  const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);

  const container = document.getElementById("alunoInfo");
  container.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i>
            </div>
            <h2>${aluno.nome}</h2>
            <p><i class="fas fa-id-card"></i> CPF: ***.***.***-${aluno.cpf.slice(-4)}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <div class="${statusClass}" style="padding: 15px; border-radius: 10px; text-align: center;">
                <span style="font-size: 24px;">${statusIcon}</span>
                <p style="margin-top: 10px; font-weight: bold;">${statusText}</p>
            </div>
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 20px;">
            <p><strong><i class="fas fa-calendar-alt"></i> Data Nascimento:</strong> ${new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</p>
            <p><strong><i class="fas fa-birthday-cake"></i> Idade:</strong> ${aluno.idade} anos</p>
            <p><strong><i class="fas fa-venus-mars"></i> Sexo:</strong> ${aluno.sexo}</p>
            <p><strong><i class="fas fa-chalkboard"></i> Turma:</strong> ${aluno.turma}</p>
            <p><strong><i class="fas fa-calendar-week"></i> Dias e Horários de Treino:</strong> ${diasTreinoTexto}</p>
            <p><strong><i class="fas fa-medal"></i> Modalidades:</strong></p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px;">
                ${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m}</span>`).join("")}
            </div>
            <p style="margin-top: 15px;"><strong><i class="fas fa-exclamation-triangle"></i> Advertências:</strong> ${aluno.advertencias}</p>
            <p><strong><i class="fas fa-ban"></i> Suspensões:</strong> ${aluno.suspensoes}</p>
            <p><strong><i class="fas fa-star"></i> Média Geral:</strong> ${aluno.mediaGeral.toFixed(1)}</p>
        </div>
    `;
}

function inicializarSistema() {
  console.log("Inicializando sistema com", alunos.length, "alunos");
  atualizarDashboard();
  renderizarAlunos(alunos);
  atualizarEstatisticasSidebar();
}

function atualizarEstatisticasSidebar() {
  document.getElementById("totalAlunos").textContent = alunos.length;
  const totalTurmas = [...new Set(alunos.map((a) => a.turma))].length;
  document.getElementById("totalTurmas").textContent = totalTurmas;
}

function mudarView(view) {
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active"));
  document.querySelector(`[data-view="${view}"]`).classList.add("active");

  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById(`${view}View`).classList.add("active");

  const titles = {
    dashboard: "Dashboard - Centro Educacional de Barra Nova",
    alunos: "Alunos - Centro Educacional de Barra Nova",
    busca: "Busca Avançada",
    modalidades: "Alunos por Modalidade",
  };
  document.getElementById("pageTitle").textContent = titles[view];

  if (view === "dashboard") atualizarDashboard();
}

function atualizarDashboard() {
  const masculino = alunos.filter((a) => a.sexo === "Masculino").length;
  const feminino = alunos.filter((a) => a.sexo === "Feminino").length;
  const mediaIdade =
    alunos.length > 0
      ? alunos.reduce((sum, a) => sum + a.idade, 0) / alunos.length
      : 0;

  let turnoManha = 0;
  let turnoTarde = 0;

  alunos.forEach((aluno) => {
    if (aluno.diasTreino && aluno.diasTreino.length > 0) {
      const primeiroHorario = aluno.diasTreino[0].horario;
      if (
        primeiroHorario.includes("07") ||
        primeiroHorario.includes("08") ||
        primeiroHorario.includes("09") ||
        primeiroHorario.includes("10")
      ) {
        turnoManha++;
      } else if (
        primeiroHorario.includes("13") ||
        primeiroHorario.includes("14") ||
        primeiroHorario.includes("15") ||
        primeiroHorario.includes("16")
      ) {
        turnoTarde++;
      }
    } else if (aluno.horario) {
      if (
        aluno.horario.includes("07") ||
        aluno.horario.includes("08") ||
        aluno.horario.includes("09") ||
        aluno.horario.includes("10")
      ) {
        turnoManha++;
      } else {
        turnoTarde++;
      }
    }
  });

  const aptosTreinar = alunos.filter((a) => a.status === "apto").length;
  const suspensos = alunos.filter((a) => a.status === "suspenso").length;

  document.getElementById("statMasculino").textContent = masculino;
  document.getElementById("statFeminino").textContent = feminino;
  document.getElementById("mediaIdade").textContent = mediaIdade
    ? mediaIdade.toFixed(1)
    : "0";
  document.getElementById("totalAlunosDash").textContent = alunos.length;
  document.getElementById("turnoManha").textContent = turnoManha;
  document.getElementById("turnoTarde").textContent = turnoTarde;
  document.getElementById("aptosTreinar").textContent = aptosTreinar;
  document.getElementById("suspensos").textContent = suspensos;
}

function renderizarAlunos(alunosArray) {
  const container = document.getElementById("alunosList");
  if (!container) return;

  if (alunosArray.length === 0) {
    container.innerHTML =
      '<div class="no-results"><i class="fas fa-search"></i><p>Nenhum aluno encontrado</p></div>';
    return;
  }

  container.innerHTML = alunosArray
    .map((aluno) => {
      const isApto = aluno.status === "apto";
      const statusIcon = isApto
        ? '<i class="fas fa-check-circle" style="color: #27ae60;"></i>'
        : '<i class="fas fa-ban" style="color: #e74c3c;"></i>';
      const statusBadge = isApto
        ? '<span class="badge" style="background: #27ae60; color: white;">APTO</span>'
        : '<span class="badge" style="background: #e74c3c; color: white;">SUSPENSO</span>';

      let diasTreinoResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        diasTreinoResumo = aluno.diasTreino.map((d) => `${d.dia}`).join("/");
      } else {
        diasTreinoResumo = aluno.diaTreino || "N/D";
      }

      return `
        <div class="aluno-card" onclick="abrirCardAluno(${aluno.id})">
            <div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i>
            </div>
            <div class="aluno-info">
                <h4>${aluno.nome} ${statusIcon}</h4>
                <p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p>
                <p><i class="fas fa-clock"></i> ${aluno.horario || "N/D"} | ${aluno.turma}</p>
                <p><i class="fas fa-calendar-week"></i> Dias: ${diasTreinoResumo}</p>
                <p><i class="fas fa-chart-line"></i> Média: ${aluno.mediaGeral.toFixed(1)}</p>
                <div class="aluno-badges">
                    ${aluno.modalidades
                      .slice(0, 2)
                      .map(
                        (m) =>
                          `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`,
                      )
                      .join("")}
                    ${aluno.modalidades.length > 2 ? `<span class="badge badge-modalidade">+${aluno.modalidades.length - 2}</span>` : ""}
                    ${aluno.advertencias > 0 ? `<span class="badge badge-advertencia"><i class="fas fa-exclamation-triangle"></i> ${aluno.advertencias}</span>` : ""}
                    ${statusBadge}
                </div>
            </div>
        </div>`;
    })
    .join("");
}

function renderizarAlunosModalidade(alunosArray) {
  const container = document.getElementById("modalidadeResultados");
  if (!container) return;

  if (alunosArray.length === 0) {
    container.innerHTML =
      '<div class="no-results"><i class="fas fa-search"></i><p>Nenhum aluno encontrado</p></div>';
    return;
  }

  container.innerHTML = alunosArray
    .map((aluno) => {
      const isApto = aluno.status === "apto";
      const statusBadge = isApto
        ? '<span class="badge" style="background: #27ae60; color: white;">APTO</span>'
        : '<span class="badge" style="background: #e74c3c; color: white;">SUSPENSO</span>';

      let diasTreinoResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        diasTreinoResumo = aluno.diasTreino
          .map((d) => `${d.dia} ${d.horario}`)
          .join(" e ");
      } else {
        diasTreinoResumo = `${aluno.diaTreino || "N/D"} ${aluno.horario || ""}`;
      }

      return `
        <div class="aluno-card" onclick="abrirCardAluno(${aluno.id})">
            <div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i>
            </div>
            <div class="aluno-info">
                <h4>${aluno.nome}</h4>
                <p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p>
                <p><i class="fas fa-clock"></i> ${aluno.turma}</p>
                <p><i class="fas fa-calendar-week"></i> Treinos: ${diasTreinoResumo}</p>
                <div class="aluno-badges">
                    ${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`).join("")}
                    ${statusBadge}
                </div>
            </div>
        </div>`;
    })
    .join("");
}

window.abrirCardAluno = function (id) {
  const aluno = alunos.find((a) => a.id === id);
  if (!aluno) return;

  const isApto = aluno.status === "apto";
  const statusClass = isApto ? "status-apto" : "status-suspenso";
  const statusIcon = isApto ? "✅" : "❌";
  const statusText = isApto
    ? "Apto para treinar"
    : aluno.diasSuspensao > 0
      ? `Suspenso por ${aluno.diasSuspensao} dias`
      : "Suspenso";
  const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);

  const cardContent = document.getElementById("cardContent");
  cardContent.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i>
            </div>
            <h2>${aluno.nome}</h2>
            <div style="margin: 20px 0; text-align: left;">
                <p><strong>📅 Nascimento:</strong> ${new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</p>
                <p><strong>🎂 Idade:</strong> ${aluno.idade} anos</p>
                <p><strong>⚧ Sexo:</strong> ${aluno.sexo}</p>
                <p><strong>🏫 Turma:</strong> ${aluno.turma}</p>
                <p><strong>⏰ Dias e Horários de Treino:</strong> ${diasTreinoTexto}</p>
                <p><strong>🏅 Modalidades:</strong></p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0;">
                    ${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m}</span>`).join("")}
                </div>
                <p><strong>⚠️ Advertências:</strong> ${aluno.advertencias}</p>
                <p><strong>🚫 Suspensões:</strong> ${aluno.suspensoes}</p>
                <p><strong>📋 Status:</strong> <span class="${statusClass}" style="display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold;">${statusIcon} ${statusText}</span></p>
                <p><strong>⭐ Média Geral:</strong> ${aluno.mediaGeral.toFixed(1)}</p>
            </div>
            <button class="btn-primary" onclick="fecharModalCard()" style="margin-top: 10px;">Fechar</button>
        </div>
    `;
  document.getElementById("cardModal").style.display = "block";
};

window.fecharModalCard = function () {
  document.getElementById("cardModal").style.display = "none";
};

function fecharModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function aplicarFiltros() {
  let filtrados = [...alunos];

  const nome = document.getElementById("searchNome")?.value.toLowerCase() || "";
  if (nome)
    filtrados = filtrados.filter((a) => a.nome.toLowerCase().includes(nome));

  const idadeMin = document.getElementById("filtroIdadeMin")?.value;
  if (idadeMin)
    filtrados = filtrados.filter((a) => a.idade >= parseInt(idadeMin));

  const idadeMax = document.getElementById("filtroIdadeMax")?.value;
  if (idadeMax)
    filtrados = filtrados.filter((a) => a.idade <= parseInt(idadeMax));

  const dia = document.getElementById("filtroDia").value;
  if (dia)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.dia === dia),
    );

  const horario = document.getElementById("filtroHorario").value;
  if (horario)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.horario === horario),
    );

  const turma = document.getElementById("filtroTurma").value;
  if (turma) filtrados = filtrados.filter((a) => a.turma === turma);

  const sexo = document.getElementById("filtroSexo").value;
  if (sexo) filtrados = filtrados.filter((a) => a.sexo === sexo);

  const modalidade = document.getElementById("filtroModalidade").value;
  if (modalidade)
    filtrados = filtrados.filter((a) => a.modalidades.includes(modalidade));

  const status = document.getElementById("filtroStatus").value;
  if (status === "apto")
    filtrados = filtrados.filter((a) => a.status === "apto");
  if (status === "suspenso")
    filtrados = filtrados.filter((a) => a.status === "suspenso");

  alunosFiltrados = filtrados;
  renderizarAlunos(filtrados);
}

function limparFiltros() {
  document.getElementById("searchNome").value = "";
  document.getElementById("filtroIdadeMin").value = "";
  document.getElementById("filtroIdadeMax").value = "";
  document.querySelectorAll("#alunosView select").forEach((input) => {
    input.value = "";
  });
  alunosFiltrados = alunos;
  renderizarAlunos(alunos);
}

function buscaAvancada() {
  let filtrados = [...alunos];

  const nome = document.getElementById("buscaNome")?.value.toLowerCase() || "";
  if (nome)
    filtrados = filtrados.filter((a) => a.nome.toLowerCase().includes(nome));

  const idadeMin = document.getElementById("buscaIdadeMin")?.value;
  if (idadeMin)
    filtrados = filtrados.filter((a) => a.idade >= parseInt(idadeMin));

  const idadeMax = document.getElementById("buscaIdadeMax")?.value;
  if (idadeMax)
    filtrados = filtrados.filter((a) => a.idade <= parseInt(idadeMax));

  const dia = document.getElementById("buscaDia").value;
  if (dia)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.dia === dia),
    );

  const horario = document.getElementById("buscaHorario").value;
  if (horario)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.horario === horario),
    );

  const turma = document.getElementById("buscaTurma").value;
  if (turma) filtrados = filtrados.filter((a) => a.turma === turma);

  const sexo = document.getElementById("buscaSexo").value;
  if (sexo) filtrados = filtrados.filter((a) => a.sexo === sexo);

  const modalidade = document.getElementById("buscaModalidade").value;
  if (modalidade)
    filtrados = filtrados.filter((a) => a.modalidades.includes(modalidade));

  const advertencias = document.getElementById("buscaAdvertencias").value;
  if (advertencias)
    filtrados = filtrados.filter(
      (a) => a.advertencias <= parseInt(advertencias),
    );

  const suspensoes = document.getElementById("buscaSuspensoes").value;
  if (suspensoes)
    filtrados = filtrados.filter((a) => a.suspensoes <= parseInt(suspensoes));

  const status = document.getElementById("buscaStatus")?.value;
  if (status === "apto")
    filtrados = filtrados.filter((a) => a.status === "apto");
  if (status === "suspenso")
    filtrados = filtrados.filter((a) => a.status === "suspenso");

  const mediaMin = document.getElementById("buscaMediaMin").value;
  if (mediaMin)
    filtrados = filtrados.filter((a) => a.mediaGeral >= parseFloat(mediaMin));

  const mediaMax = document.getElementById("buscaMediaMax").value;
  if (mediaMax)
    filtrados = filtrados.filter((a) => a.mediaGeral <= parseFloat(mediaMax));

  renderizarAlunosGridBusca(filtrados, "buscaResultados");
}

function renderizarAlunosGridBusca(alunosArray, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (alunosArray.length === 0) {
    container.innerHTML =
      '<div class="no-results"><i class="fas fa-search"></i><p>Nenhum aluno encontrado</p></div>';
    return;
  }

  container.innerHTML = alunosArray
    .map((aluno) => {
      const isApto = aluno.status === "apto";
      const statusBadge = isApto
        ? '<span class="badge" style="background: #27ae60; color: white;">APTO</span>'
        : '<span class="badge" style="background: #e74c3c; color: white;">SUSPENSO</span>';

      let diasTreinoResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        diasTreinoResumo = aluno.diasTreino.map((d) => `${d.dia}`).join("/");
      } else {
        diasTreinoResumo = aluno.diaTreino || "N/D";
      }

      return `
        <div class="aluno-card" onclick="abrirCardAluno(${aluno.id})">
            <div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i>
            </div>
            <div class="aluno-info">
                <h4>${aluno.nome}</h4>
                <p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p>
                <p><i class="fas fa-clock"></i> ${aluno.horario || "N/D"} | ${aluno.turma}</p>
                <p><i class="fas fa-calendar-week"></i> Dias: ${diasTreinoResumo}</p>
                <p><i class="fas fa-chart-line"></i> Média: ${aluno.mediaGeral.toFixed(1)}</p>
                <div class="aluno-badges">
                    ${aluno.modalidades
                      .slice(0, 2)
                      .map(
                        (m) =>
                          `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`,
                      )
                      .join("")}
                    ${aluno.advertencias > 0 ? `<span class="badge badge-advertencia"><i class="fas fa-exclamation-triangle"></i> ${aluno.advertencias}</span>` : ""}
                    ${statusBadge}
                </div>
            </div>
        </div>`;
    })
    .join("");
}

function limparBusca() {
  document.getElementById("buscaNome").value = "";
  document.getElementById("buscaIdadeMin").value = "";
  document.getElementById("buscaIdadeMax").value = "";
  document
    .querySelectorAll("#buscaView input, #buscaView select")
    .forEach((input) => {
      input.value = "";
    });
  document.getElementById("buscaResultados").innerHTML =
    '<div class="no-results"><i class="fas fa-search"></i><p>Use os filtros acima para buscar alunos</p></div>';
}

function filtrarPorModalidade(modalidade) {
  currentModalidadeSelecionada = modalidade;
  let filtrados;

  if (modalidade === "atletismo") {
    filtrados = alunos.filter((a) =>
      a.modalidades.some((m) => m.includes("atletismo")),
    );
  } else {
    filtrados = alunos.filter((a) => a.modalidades.includes(modalidade));
  }

  renderizarAlunosModalidade(filtrados);
}

function gerarPDFTabela(alunosArray, nomeArquivo) {
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  let tabelaHTML = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Lista de Alunos - Centro Educacional de Barra Nova</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #2c3e50; font-size: 18px; }
            .subtitle { text-align: center; color: #666; font-size: 12px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 10px; }
            th { background: #2c3e50; color: white; padding: 8px; text-align: left; border: 1px solid #ddd; }
            td { padding: 6px; border: 1px solid #ddd; }
            tr:nth-child(even) { background: #f9f9f9; }
            .footer { margin-top: 20px; text-align: center; font-size: 9px; color: #999; }
            .status-apto { color: #27ae60; font-weight: bold; }
            .status-suspenso { color: #e74c3c; font-weight: bold; }
        </style>
        </head>
        <body>
            <h1>Centro Educacional de Barra Nova</h1>
            <div class="subtitle">Lista de Alunos - Gerado em ${dataAtual}</div>
            <table>
                <thead><tr><th>ID</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Turma</th><th>Dias/Horários</th><th>Modalidades</th><th>Advert.</th><th>Status</th><th>Média</th></tr></thead>
                <tbody>`;

  alunosArray.forEach((aluno) => {
    const isApto = aluno.status === "apto";
    const statusText = isApto
      ? "Apto"
      : aluno.diasSuspensao > 0
        ? `Suspenso (${aluno.diasSuspensao}d)`
        : "Suspenso";
    const statusClass = isApto ? "status-apto" : "status-suspenso";
    const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
    tabelaHTML += `<tr><td>${aluno.id}</td><td><strong>${aluno.nome}</strong></td></td><td class="${statusClass}">${statusText}</td></td><td>${aluno.idade}</td></td><td>${aluno.sexo}</td><tr><td>${aluno.turma}</td><td><td>${diasTreinoTexto}</td><td><td>${aluno.modalidades.join(", ")}</td><td><td>${aluno.advertencias}</td></td><td>${aluno.mediaGeral.toFixed(1)}</td></tr>`;
  });

  tabelaHTML += `</tbody>不错<div class="footer">Total de alunos: ${alunosArray.length}</div></body></html>`;
  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}_${new Date().toISOString().split("T")[0]}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function gerarPDFPorModalidade() {
  if (!currentModalidadeSelecionada) {
    alert("Selecione uma modalidade primeiro!");
    return;
  }

  const modalidade = currentModalidadeSelecionada;
  const alunosModalidade = alunos.filter((a) =>
    a.modalidades.includes(modalidade),
  );
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  let tabelaHTML = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Alunos de ${modalidade} - Centro Educacional de Barra Nova</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #2c3e50; font-size: 18px; }
            .subtitle { text-align: center; color: #666; font-size: 12px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 10px; }
            th { background: #2c3e50; color: white; padding: 8px; text-align: left; border: 1px solid #ddd; }
            td { padding: 6px; border: 1px solid #ddd; }
            tr:nth-child(even) { background: #f9f9f9; }
            .footer { margin-top: 20px; text-align: center; font-size: 9px; color: #999; }
            .status-apto { color: #27ae60; font-weight: bold; }
            .status-suspenso { color: #e74c3c; font-weight: bold; }
        </style>
        </head>
        <body>
            <h1>Centro Educacional de Barra Nova</h1>
            <div class="subtitle">Alunos inscritos em ${modalidade.toUpperCase()} - Gerado em ${dataAtual}</div>
            <table>
                <thead><tr><th>ID</th><th>Nome</th><th>Status</th><th>Idade</th><th>Sexo</th><th>Turma</th><th>Dias/Horários</th><th>Outras Modalidades</th></tr></thead>
                <tbody>`;

  alunosModalidade.forEach((aluno) => {
    const outras =
      aluno.modalidades.filter((m) => m !== modalidade).join(", ") || "Nenhuma";
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "Apto" : "Suspenso";
    const statusClass = isApto ? "status-apto" : "status-suspenso";
    const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
    tabelaHTML += `<tr><td>${aluno.id}</td><td><strong>${aluno.nome}</strong></td><td class="${statusClass}">${statusText}</td><td>${aluno.idade}</td><td>${aluno.sexo}</td><td>${aluno.turma}</td><td>${diasTreinoTexto}</td><td>${outras}</td></tr>`;
  });

  tabelaHTML += `</tbody></table><div class="footer">Total de alunos: ${alunosModalidade.length}</div></body></html>`;
  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `alunos_${modalidade}_${new Date().toISOString().split("T")[0]}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

console.log(
  "Sistema inicializado com sucesso! Total de alunos: " +
    (alunos ? alunos.length : 0),
);
