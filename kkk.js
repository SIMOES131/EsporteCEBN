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

// Regras de idade por modalidade (apenas idade MÁXIMA)
const REGRAS_MODALIDADES = {
  "futsal sub-11 masc": {
    idadeMax: 11,
    sexo: "Masculino",
    descricao: "Sub-11 Masculino (máx 11 anos)",
  },
  "futsal sub-11 fem": {
    idadeMax: 11,
    sexo: "Feminino",
    descricao: "Sub-11 Feminino (máx 11 anos)",
  },
  "futsal sub-13 masc": {
    idadeMax: 13,
    sexo: "Masculino",
    descricao: "Sub-13 Masculino (máx 13 anos)",
  },
  "futsal sub-13 fem": {
    idadeMax: 13,
    sexo: "Feminino",
    descricao: "Sub-13 Feminino (máx 13 anos)",
  },
  "futsal sub-15 masc": {
    idadeMax: 15,
    sexo: "Masculino",
    descricao: "Sub-15 Masculino (máx 15 anos)",
  },
  "futsal sub-15 fem": {
    idadeMax: 15,
    sexo: "Feminino",
    descricao: "Sub-15 Feminino (máx 15 anos)",
  },
  "futsal sub-17 masc": {
    idadeMax: 17,
    sexo: "Masculino",
    descricao: "Sub-17 Masculino (máx 17 anos)",
  },
  "futsal sub-17 fem": {
    idadeMax: 17,
    sexo: "Feminino",
    descricao: "Sub-17 Feminino (máx 17 anos)",
  },
  "futsal aberto masc": {
    idadeMax: 100,
    sexo: "Masculino",
    descricao: "Aberto Masculino (sem limite)",
  },
  "futsal aberto fem": {
    idadeMax: 100,
    sexo: "Feminino",
    descricao: "Aberto Feminino (sem limite)",
  },
  "handebol sub-11 masc": {
    idadeMax: 11,
    sexo: "Masculino",
    descricao: "Sub-11 Masculino (máx 11 anos)",
  },
  "handebol sub-11 fem": {
    idadeMax: 11,
    sexo: "Feminino",
    descricao: "Sub-11 Feminino (máx 11 anos)",
  },
  "handebol sub-13 masc": {
    idadeMax: 13,
    sexo: "Masculino",
    descricao: "Sub-13 Masculino (máx 13 anos)",
  },
  "handebol sub-13 fem": {
    idadeMax: 13,
    sexo: "Feminino",
    descricao: "Sub-13 Feminino (máx 13 anos)",
  },
  "handebol sub-15 masc": {
    idadeMax: 15,
    sexo: "Masculino",
    descricao: "Sub-15 Masculino (máx 15 anos)",
  },
  "handebol sub-15 fem": {
    idadeMax: 15,
    sexo: "Feminino",
    descricao: "Sub-15 Feminino (máx 15 anos)",
  },
  "handebol sub-17 masc": {
    idadeMax: 17,
    sexo: "Masculino",
    descricao: "Sub-17 Masculino (máx 17 anos)",
  },
  "handebol sub-17 fem": {
    idadeMax: 17,
    sexo: "Feminino",
    descricao: "Sub-17 Feminino (máx 17 anos)",
  },
  "handebol aberto masc": {
    idadeMax: 100,
    sexo: "Masculino",
    descricao: "Aberto Masculino (sem limite)",
  },
  "handebol aberto fem": {
    idadeMax: 100,
    sexo: "Feminino",
    descricao: "Aberto Feminino (sem limite)",
  },
  "vôlei sub-11 masc": {
    idadeMax: 11,
    sexo: "Masculino",
    descricao: "Sub-11 Masculino (máx 11 anos)",
  },
  "vôlei sub-11 fem": {
    idadeMax: 11,
    sexo: "Feminino",
    descricao: "Sub-11 Feminino (máx 11 anos)",
  },
  "vôlei sub-13 masc": {
    idadeMax: 13,
    sexo: "Masculino",
    descricao: "Sub-13 Masculino (máx 13 anos)",
  },
  "vôlei sub-13 fem": {
    idadeMax: 13,
    sexo: "Feminino",
    descricao: "Sub-13 Feminino (máx 13 anos)",
  },
  "vôlei sub-15 masc": {
    idadeMax: 15,
    sexo: "Masculino",
    descricao: "Sub-15 Masculino (máx 15 anos)",
  },
  "vôlei sub-15 fem": {
    idadeMax: 15,
    sexo: "Feminino",
    descricao: "Sub-15 Feminino (máx 15 anos)",
  },
  "vôlei sub-17 masc": {
    idadeMax: 17,
    sexo: "Masculino",
    descricao: "Sub-17 Masculino (máx 17 anos)",
  },
  "vôlei sub-17 fem": {
    idadeMax: 17,
    sexo: "Feminino",
    descricao: "Sub-17 Feminino (máx 17 anos)",
  },
  "vôlei aberto masc": {
    idadeMax: 100,
    sexo: "Masculino",
    descricao: "Aberto Masculino (sem limite)",
  },
  "vôlei aberto fem": {
    idadeMax: 100,
    sexo: "Feminino",
    descricao: "Aberto Feminino (sem limite)",
  },
  "vôlei misto": {
    idadeMax: 18,
    sexo: "Misto",
    descricao: "Misto (máx 18 anos)",
  },
  "basquete sub-11 masc": {
    idadeMax: 11,
    sexo: "Masculino",
    descricao: "Sub-11 Masculino (máx 11 anos)",
  },
  "basquete sub-11 fem": {
    idadeMax: 11,
    sexo: "Feminino",
    descricao: "Sub-11 Feminino (máx 11 anos)",
  },
  "basquete sub-13 masc": {
    idadeMax: 13,
    sexo: "Masculino",
    descricao: "Sub-13 Masculino (máx 13 anos)",
  },
  "basquete sub-13 fem": {
    idadeMax: 13,
    sexo: "Feminino",
    descricao: "Sub-13 Feminino (máx 13 anos)",
  },
  "basquete sub-15 masc": {
    idadeMax: 15,
    sexo: "Masculino",
    descricao: "Sub-15 Masculino (máx 15 anos)",
  },
  "basquete sub-15 fem": {
    idadeMax: 15,
    sexo: "Feminino",
    descricao: "Sub-15 Feminino (máx 15 anos)",
  },
  "basquete sub-17 masc": {
    idadeMax: 17,
    sexo: "Masculino",
    descricao: "Sub-17 Masculino (máx 17 anos)",
  },
  "basquete sub-17 fem": {
    idadeMax: 17,
    sexo: "Feminino",
    descricao: "Sub-17 Feminino (máx 17 anos)",
  },
  "basquete aberto masc": {
    idadeMax: 100,
    sexo: "Masculino",
    descricao: "Aberto Masculino (sem limite)",
  },
  "basquete aberto fem": {
    idadeMax: 100,
    sexo: "Feminino",
    descricao: "Aberto Feminino (sem limite)",
  },
  "baleado sub-11 masc": {
    idadeMax: 11,
    sexo: "Masculino",
    descricao: "Sub-11 Masculino (máx 11 anos)",
  },
  "baleado sub-11 fem": {
    idadeMax: 11,
    sexo: "Feminino",
    descricao: "Sub-11 Feminino (máx 11 anos)",
  },
  "baleado sub-13 masc": {
    idadeMax: 13,
    sexo: "Masculino",
    descricao: "Sub-13 Masculino (máx 13 anos)",
  },
  "baleado sub-13 fem": {
    idadeMax: 13,
    sexo: "Feminino",
    descricao: "Sub-13 Feminino (máx 13 anos)",
  },
  "baleado sub-15 masc": {
    idadeMax: 15,
    sexo: "Masculino",
    descricao: "Sub-15 Masculino (máx 15 anos)",
  },
  "baleado sub-15 fem": {
    idadeMax: 15,
    sexo: "Feminino",
    descricao: "Sub-15 Feminino (máx 15 anos)",
  },
  "baleado sub-17 masc": {
    idadeMax: 17,
    sexo: "Masculino",
    descricao: "Sub-17 Masculino (máx 17 anos)",
  },
  "baleado sub-17 fem": {
    idadeMax: 17,
    sexo: "Feminino",
    descricao: "Sub-17 Feminino (máx 17 anos)",
  },
  "baleado aberto masc": {
    idadeMax: 100,
    sexo: "Masculino",
    descricao: "Aberto Masculino (sem limite)",
  },
  "baleado aberto fem": {
    idadeMax: 100,
    sexo: "Feminino",
    descricao: "Aberto Feminino (sem limite)",
  },
  "baleado misto": {
    idadeMax: 18,
    sexo: "Misto",
    descricao: "Misto (máx 18 anos)",
  },
  "atletismo sub-11 masc": {
    idadeMax: 11,
    sexo: "Masculino",
    descricao: "Sub-11 Masculino (máx 11 anos)",
  },
  "atletismo sub-11 fem": {
    idadeMax: 11,
    sexo: "Feminino",
    descricao: "Sub-11 Feminino (máx 11 anos)",
  },
  "atletismo sub-13 masc": {
    idadeMax: 13,
    sexo: "Masculino",
    descricao: "Sub-13 Masculino (máx 13 anos)",
  },
  "atletismo sub-13 fem": {
    idadeMax: 13,
    sexo: "Feminino",
    descricao: "Sub-13 Feminino (máx 13 anos)",
  },
  "atletismo sub-15 masc": {
    idadeMax: 15,
    sexo: "Masculino",
    descricao: "Sub-15 Masculino (máx 15 anos)",
  },
  "atletismo sub-15 fem": {
    idadeMax: 15,
    sexo: "Feminino",
    descricao: "Sub-15 Feminino (máx 15 anos)",
  },
  "atletismo sub-17 masc": {
    idadeMax: 17,
    sexo: "Masculino",
    descricao: "Sub-17 Masculino (máx 17 anos)",
  },
  "atletismo sub-17 fem": {
    idadeMax: 17,
    sexo: "Feminino",
    descricao: "Sub-17 Feminino (máx 17 anos)",
  },
};

function verificarCompatibilidadeModalidade(aluno, modalidade) {
  const regra = REGRAS_MODALIDADES[modalidade];
  if (!regra) return { compatível: true, mensagem: "" };
  const idade = aluno.idade;
  const sexo = aluno.sexo;
  if (regra.sexo !== "Misto" && regra.sexo !== sexo) {
    return {
      compatível: false,
      mensagem: `⚠️ Modalidade ${regra.descricao} é exclusiva para ${regra.sexo === "Masculino" ? "ALUNOS" : "ALUNAS"}.`,
      tipo: "sexo",
    };
  }
  if (idade > regra.idadeMax && regra.idadeMax !== 100) {
    return {
      compatível: false,
      mensagem: `⚠️ ALERTA: ${aluno.nome} tem ${idade} anos, mas a modalidade ${regra.descricao} permite apenas alunos com até ${regra.idadeMax} anos!`,
      tipo: "idade",
    };
  }
  return { compatível: true, mensagem: "" };
}

function verificarModalidadesAluno(aluno) {
  const inconsistencias = [];
  aluno.modalidades.forEach((modalidade) => {
    const resultado = verificarCompatibilidadeModalidade(aluno, modalidade);
    if (!resultado.compatível) inconsistencias.push(resultado.mensagem);
  });
  return inconsistencias;
}

function alunoTemInconsistencia(aluno) {
  return verificarModalidadesAluno(aluno).length > 0;
}

function gerarAlertaInconsistencia(aluno) {
  const inconsistencias = verificarModalidadesAluno(aluno);
  if (inconsistencias.length > 0) {
    return `<div class="alerta-inconsistencia" style="background: #ffebee; border-left: 4px solid #f44336; padding: 10px; margin-bottom: 15px; border-radius: 5px;"><i class="fas fa-exclamation-triangle" style="color: #f44336; margin-right: 10px;"></i><strong>⚠️ INCOMPATIBILIDADE DE IDADE!</strong><ul style="margin: 5px 0 0 20px; font-size: 12px;">${inconsistencias.map((inc) => `<li>${inc}</li>`).join("")}</ul><small style="color: #666; display: block; margin-top: 5px;">Aluno muito velho para esta categoria. Considere realocar para categoria superior ou aberto.</small></div>`;
  }
  return "";
}

function contarAlunosComInconsistencias() {
  let count = 0;
  alunos.forEach((aluno) => {
    if (alunoTemInconsistencia(aluno)) count++;
  });
  return count;
}

function contarInconsistenciasPorTipo() {
  let porIdade = 0,
    porSexo = 0;
  alunos.forEach((aluno) => {
    aluno.modalidades.forEach((modalidade) => {
      const resultado = verificarCompatibilidadeModalidade(aluno, modalidade);
      if (!resultado.compatível) {
        if (resultado.tipo === "idade") porIdade++;
        if (resultado.tipo === "sexo") porSexo++;
      }
    });
  });
  return { porIdade, porSexo };
}

function gerarBadgeAlerta(aluno) {
  if (alunoTemInconsistencia(aluno)) {
    return `<span class="badge" style="background: #f44336; color: white; margin-left: 5px;"><i class="fas fa-exclamation-triangle"></i> Incompatível</span>`;
  }
  return "";
}

window.mostrarAlunosInconsistentes = function () {
  const alunosInconsistentes = alunos.filter((aluno) =>
    alunoTemInconsistencia(aluno),
  );
  mudarView("alunos");
  const statusSelect = document.getElementById("filtroStatus");
  if (statusSelect) statusSelect.value = "incompativel";
  renderizarAlunosComFiltro(alunosInconsistentes, true);
};

function renderizarAlunosComFiltro(
  alunosArray,
  isFiltroInconsistencia = false,
) {
  const container = document.getElementById("alunosList");
  if (!container) return;
  const mensagemAntiga = document.querySelector(".filtro-mensagem");
  if (mensagemAntiga) mensagemAntiga.remove();
  const alunosOrdenados = ordenarAlunosPorNome(alunosArray);
  if (alunosOrdenados.length === 0) {
    container.innerHTML =
      '<div class="no-results"><i class="fas fa-search"></i><p>Nenhum aluno encontrado</p></div>';
    return;
  }
  if (isFiltroInconsistencia && alunosArray.length > 0) {
    const mensagem = document.createElement("div");
    mensagem.className = "filtro-mensagem";
    mensagem.style.cssText =
      "background: #ffebee; border: 1px solid #f44336; border-radius: 10px; padding: 10px 15px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;";
    mensagem.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #f44336;"></i><span><strong>Filtro aplicado:</strong> Mostrando apenas alunos com inconsistências de idade (${alunosArray.length} alunos)</span><button onclick="limparFiltroInconsistencia();" class="btn-secondary" style="margin-left: auto; padding: 5px 15px; cursor: pointer;">Limpar Filtro</button>`;
    container.parentNode.insertBefore(mensagem, container);
  }
  container.innerHTML = alunosOrdenados
    .map((aluno) => {
      const isApto = aluno.status === "apto";
      const statusIcon = isApto
        ? '<i class="fas fa-check-circle" style="color: #27ae60;"></i>'
        : '<i class="fas fa-ban" style="color: #e74c3c;"></i>';
      const statusBadge = isApto
        ? '<span class="badge" style="background: #27ae60; color: white;">APTO</span>'
        : '<span class="badge" style="background: #e74c3c; color: white;">SUSPENSO</span>';
      const mediaFormatada = formatarMediaGeral(aluno.mediaGeral);
      const alertaBadge = gerarBadgeAlerta(aluno);
      const temInconsistencia = alunoTemInconsistencia(aluno);
      const cardBorder = temInconsistencia
        ? "border-left: 4px solid #f44336;"
        : "";
      let diasTreinoResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        diasTreinoResumo = aluno.diasTreino.map((d) => `${d.dia}`).join("/");
      } else {
        diasTreinoResumo = aluno.diaTreino || "N/D";
      }
      return `<div class="aluno-card" style="${cardBorder}" onclick="abrirCardAluno(${aluno.id})"><div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><div class="aluno-info"><h4>${aluno.nome} ${statusIcon} ${alertaBadge}</h4><p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p><p><i class="fas fa-clock"></i> ${aluno.horario || "N/D"} | ${aluno.turma}</p><p><i class="fas fa-calendar-week"></i> Dias: ${diasTreinoResumo}</p><p><i class="fas fa-chart-line"></i> Média: ${mediaFormatada}</p><div class="aluno-badges">${aluno.modalidades
        .slice(0, 2)
        .map(
          (m) =>
            `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`,
        )
        .join(
          "",
        )}${aluno.modalidades.length > 2 ? `<span class="badge badge-modalidade">+${aluno.modalidades.length - 2}</span>` : ""}${aluno.advertencias > 0 ? `<span class="badge badge-advertencia"><i class="fas fa-exclamation-triangle"></i> ${aluno.advertencias}</span>` : ""}${statusBadge}</div></div></div>`;
    })
    .join("");
}

window.limparFiltroInconsistencia = function () {
  renderizarAlunos(ordenarAlunosPorNome(alunos));
};

function ordenarAlunosPorNome(alunosArray) {
  return [...alunosArray].sort((a, b) => a.nome.localeCompare(b.nome));
}

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return 0;
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

function atualizarIdades() {
  let alteracoes = false;
  alunos.forEach((aluno) => {
    if (aluno.dataNascimento) {
      const novaIdade = calcularIdade(aluno.dataNascimento);
      if (aluno.idade !== novaIdade) {
        aluno.idade = novaIdade;
        alteracoes = true;
      }
    }
  });
  if (alteracoes) {
    console.log("Idades atualizadas automaticamente");
    atualizarDashboard();
    renderizarAlunos(ordenarAlunosPorNome(alunos));
  }
}

function calcularDataFimSuspensao(dataInicio, dias) {
  if (!dataInicio || dias <= 0) return null;
  const [ano, mes, dia] = dataInicio.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  data.setDate(data.getDate() + dias - 1);
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
}

function calcularDataRetorno(dataInicio, dias) {
  if (!dataInicio || dias <= 0) return null;
  const [ano, mes, dia] = dataInicio.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  data.setDate(data.getDate() + dias);
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
}

function formatarDataParaExibicao(dataString) {
  if (!dataString) return "";
  const [ano, mes, dia] = dataString.split("-").map(Number);
  return `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${ano}`;
}

function formatarPeriodoSuspensao(dataInicio, dias) {
  if (!dataInicio || dias <= 0) return "";
  const inicioFormatado = formatarDataParaExibicao(dataInicio);
  const dataFim = calcularDataFimSuspensao(dataInicio, dias);
  const fimFormatado = formatarDataParaExibicao(dataFim);
  return `${dias} dias (${inicioFormatado} até ${fimFormatado})`;
}

function formatarMediaGeral(media) {
  if (media === null || media === undefined || media === 0)
    return "Sem informação";
  return media.toFixed(1);
}

function verificarReativacaoAutomatica() {
  const hoje = new Date();
  const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  let alteracoes = false;
  alunos.forEach((aluno) => {
    if (aluno.diasSuspensao > 0 && aluno.dataInicioSuspensao) {
      const dataFim = calcularDataFimSuspensao(
        aluno.dataInicioSuspensao,
        aluno.diasSuspensao,
      );
      if (hojeStr > dataFim) {
        aluno.status = "apto";
        aluno.suspensoes = 0;
        aluno.diasSuspensao = 0;
        aluno.dataInicioSuspensao = null;
        alteracoes = true;
      }
    }
  });
  if (alteracoes) {
    atualizarDashboard();
    renderizarAlunos(ordenarAlunosPorNome(alunos));
    atualizarEstatisticasSidebar();
  }
}

const MODALIDADES = [
  "xadrez",
  "dominó",
  "futsal sub-11 masc",
  "futsal sub-11 fem",
  "futsal sub-13 masc",
  "futsal sub-13 fem",
  "futsal sub-15 masc",
  "futsal sub-15 fem",
  "futsal sub-17 masc",
  "futsal sub-17 fem",
  "futsal aberto masc",
  "futsal aberto fem",
  "handebol sub-11 masc",
  "handebol sub-11 fem",
  "handebol sub-13 masc",
  "handebol sub-13 fem",
  "handebol sub-15 masc",
  "handebol sub-15 fem",
  "handebol sub-17 masc",
  "handebol sub-17 fem",
  "handebol aberto masc",
  "handebol aberto fem",
  "vôlei sub-11 masc",
  "vôlei sub-11 fem",
  "vôlei sub-13 masc",
  "vôlei sub-13 fem",
  "vôlei sub-15 masc",
  "vôlei sub-15 fem",
  "vôlei sub-17 masc",
  "vôlei sub-17 fem",
  "vôlei aberto masc",
  "vôlei aberto fem",
  "vôlei misto",
  "basquete sub-11 masc",
  "basquete sub-11 fem",
  "basquete sub-13 masc",
  "basquete sub-13 fem",
  "basquete sub-15 masc",
  "basquete sub-15 fem",
  "basquete sub-17 masc",
  "basquete sub-17 fem",
  "basquete aberto masc",
  "basquete aberto fem",
  "baleado sub-11 masc",
  "baleado sub-11 fem",
  "baleado sub-13 masc",
  "baleado sub-13 fem",
  "baleado sub-15 masc",
  "baleado sub-15 fem",
  "baleado sub-17 masc",
  "baleado sub-17 fem",
  "baleado aberto masc",
  "baleado aberto fem",
  "baleado misto",
  "atletismo sub-11 masc",
  "atletismo sub-11 fem",
  "atletismo sub-13 masc",
  "atletismo sub-13 fem",
  "atletismo sub-15 masc",
  "atletismo sub-15 fem",
  "atletismo sub-17 masc",
  "atletismo sub-17 fem",
];

document.addEventListener("DOMContentLoaded", () => {
  carregarAlunosDoArquivo();
  inicializarEventos();
  preencherModalidades();
  setInterval(verificarReativacaoAutomatica, 60000);
  setInterval(atualizarIdades, 3600000);
});

function carregarAlunosDoArquivo() {
  if (typeof ALUNOS_CADASTRADOS !== "undefined") {
    alunos = [...ALUNOS_CADASTRADOS];
    console.log("Total de alunos carregados:", alunos.length);
    alunos.forEach((aluno) => {
      if (aluno.status === undefined)
        aluno.status = aluno.suspensoes > 0 ? "suspenso" : "apto";
      if (aluno.diasSuspensao === undefined) aluno.diasSuspensao = 0;
      if (aluno.dataInicioSuspensao === undefined)
        aluno.dataInicioSuspensao = null;
      if (aluno.dataNascimento)
        aluno.idade = calcularIdade(aluno.dataNascimento);
      else aluno.idade = 0;
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        aluno.diaTreino = aluno.diasTreino[0].dia;
        aluno.horario = aluno.diasTreino[0].horario;
      } else {
        if (!aluno.diaTreino) aluno.diaTreino = "Segunda";
        if (!aluno.horario) aluno.horario = "07h15-08h15";
      }
      if (aluno.diasSuspensao > 0 && aluno.dataInicioSuspensao) {
        const hoje = new Date();
        const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
        const dataFim = calcularDataFimSuspensao(
          aluno.dataInicioSuspensao,
          aluno.diasSuspensao,
        );
        if (hojeStr > dataFim) {
          aluno.status = "apto";
          aluno.suspensoes = 0;
          aluno.diasSuspensao = 0;
          aluno.dataInicioSuspensao = null;
        } else {
          aluno.status = "suspenso";
        }
      } else {
        aluno.status = "apto";
      }
    });
  } else {
    alunos = [];
    console.error("ALUNOS_CADASTRADOS não encontrado!");
  }
}

function inicializarEventos() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", fazerLogin);
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
      if (window.innerWidth <= 768) toggleMenu();
    });
  });
  document
    .getElementById("gerarPDFBtn")
    ?.addEventListener("click", () =>
      gerarPDFTabela(alunosFiltrados || alunos, "lista_geral_alunos"),
    );
  document
    .getElementById("gerarListaFrequenciaBtn")
    ?.addEventListener("click", () => gerarListaFrequencia());
  document
    .getElementById("gerarFrequenciaMensalBtn")
    ?.addEventListener("click", () => gerarFrequenciaMensal());
  document
    .getElementById("gerarPDFModalidadeBtn")
    ?.addEventListener("click", () => gerarPDFPorModalidade());
  document
    .getElementById("gerarFrequenciaModalidadeBtn")
    ?.addEventListener("click", () => {
      if (currentModalidadeSelecionada) {
        gerarListaFrequencia();
      } else {
        alert("Selecione uma modalidade primeiro!");
      }
    });
  document
    .getElementById("gerarFrequenciaMensalModalidadeBtn")
    ?.addEventListener("click", () => {
      if (currentModalidadeSelecionada) {
        gerarFrequenciaMensal();
      } else {
        alert("Selecione uma modalidade primeiro!");
      }
    });
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
  document
    .getElementById("limparFiltroModalidadeBtn")
    ?.addEventListener("click", () => {
      currentModalidadeSelecionada = "";
      document.querySelectorAll(".btn-modalidade").forEach((btn) => {
        btn.classList.remove("btn-modalidade-active");
      });
      renderizarAlunosModalidade([]);
      document.getElementById("modalidadeResultados").innerHTML =
        '<div class="no-results"><i class="fas fa-search"></i><p>Selecione uma modalidade para ver os alunos</p></div>';
    });
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
    if (event.target.classList.contains("modal"))
      event.target.style.display = "none";
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
      )
        sidebar.classList.remove("open");
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
    "6º ANO A",
    "6º ANO B",
    "6º ANO C",
    "6º ANO D",
    "7º ANO A",
    "7º ANO B",
    "7º ANO C",
    "7º ANO D",
    "8º ANO A",
    "8º ANO B",
    "8º ANO C",
    "9º ANO A",
    "9º ANO B",
    "9º ANO C",
    "9º ANO D",
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
  const categorias = {
    individual: ["xadrez", "dominó"],
    futsal: MODALIDADES.filter((m) => m.startsWith("futsal")),
    handebol: MODALIDADES.filter((m) => m.startsWith("handebol")),
    volei: MODALIDADES.filter((m) => m.startsWith("vôlei")),
    basquete: MODALIDADES.filter((m) => m.startsWith("basquete")),
    baleado: MODALIDADES.filter((m) => m.startsWith("baleado")),
    atletismo: MODALIDADES.filter((m) => m.startsWith("atletismo")),
  };
  const container = document.getElementById("modalidadesButtons");
  if (container) {
    container.innerHTML = `<div class="modalidades-container"><div class="modalidades-categoria categoria-individual"><h4><i class="fas fa-chess"></i> Esportes Individuais</h4><div class="modalidades-buttons">${categorias.individual.map((m) => `<button class="btn-modalidade btn-modalidade-individual" data-modalidade="${m}">${m.charAt(0).toUpperCase() + m.slice(1)}</button>`).join("")}</div></div><div class="modalidades-categoria categoria-futsal"><h4><i class="fas fa-futbol"></i> Futsal</h4><div class="modalidades-buttons">${categorias.futsal.map((m) => `<button class="btn-modalidade btn-modalidade-futsal" data-modalidade="${m}">${m.replace("futsal ", "").toUpperCase()}</button>`).join("")}</div></div><div class="modalidades-categoria categoria-handebol"><h4><i class="fas fa-hand-peace"></i> Handebol</h4><div class="modalidades-buttons">${categorias.handebol.map((m) => `<button class="btn-modalidade btn-modalidade-handebol" data-modalidade="${m}">${m.replace("handebol ", "").toUpperCase()}</button>`).join("")}</div></div><div class="modalidades-categoria categoria-volei"><h4><i class="fas fa-volleyball-ball"></i> Vôlei</h4><div class="modalidades-buttons">${categorias.volei.map((m) => `<button class="btn-modalidade btn-modalidade-volei" data-modalidade="${m}">${m.replace("vôlei ", "").toUpperCase()}</button>`).join("")}</div></div><div class="modalidades-categoria categoria-basquete"><h4><i class="fas fa-basketball-ball"></i> Basquete</h4><div class="modalidades-buttons">${categorias.basquete.map((m) => `<button class="btn-modalidade btn-modalidade-basquete" data-modalidade="${m}">${m.replace("basquete ", "").toUpperCase()}</button>`).join("")}</div></div><div class="modalidades-categoria categoria-baleado"><h4><i class="fas fa-crosshairs"></i> Baleado</h4><div class="modalidades-buttons">${categorias.baleado.map((m) => `<button class="btn-modalidade btn-modalidade-baleado" data-modalidade="${m}">${m.replace("baleado ", "").toUpperCase()}</button>`).join("")}</div></div><div class="modalidades-categoria categoria-atletismo"><h4><i class="fas fa-running"></i> Atletismo</h4><div class="modalidades-buttons">${categorias.atletismo.map((m) => `<button class="btn-modalidade btn-modalidade-atletismo" data-modalidade="${m}">${m.replace("atletismo ", "").toUpperCase()}</button>`).join("")}</div></div></div>`;
    document.querySelectorAll(".btn-modalidade").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modalidade = btn.dataset.modalidade;
        const parentGroup = btn.parentElement;
        if (parentGroup)
          parentGroup
            .querySelectorAll(".btn-modalidade")
            .forEach((b) => b.classList.remove("btn-modalidade-active"));
        btn.classList.add("btn-modalidade-active");
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
  const periodoSuspensao = !isApto
    ? formatarPeriodoSuspensao(aluno.dataInicioSuspensao, aluno.diasSuspensao)
    : "";
  const statusText = isApto
    ? "APTO PARA TREINAR"
    : `SUSPENSO - ${periodoSuspensao}`;
  const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
  const dataRetorno =
    !isApto && aluno.dataInicioSuspensao
      ? formatarDataParaExibicao(
          calcularDataRetorno(aluno.dataInicioSuspensao, aluno.diasSuspensao),
        )
      : null;
  const mediaFormatada = formatarMediaGeral(aluno.mediaGeral);
  const alertaInconsistencia = gerarAlertaInconsistencia(aluno);
  const container = document.getElementById("alunoInfo");
  container.innerHTML = `<div style="text-align: center; margin-bottom: 20px;"><div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><h2>${aluno.nome}</h2><p><i class="fas fa-id-card"></i> CPF: ***.***.***-${aluno.cpf.slice(-4)}</p></div>${alertaInconsistencia}<div style="margin-bottom: 20px;"><div class="${statusClass}" style="padding: 15px; border-radius: 10px; text-align: center;"><span style="font-size: 24px;">${statusIcon}</span><p style="margin-top: 10px; font-weight: bold;">${statusText}</p>${dataRetorno ? `<p style="margin-top: 5px; font-size: 12px;">Retorno previsto: ${dataRetorno}</p>` : ""}</div></div><div style="border-top: 1px solid #eee; padding-top: 20px;"><p><strong><i class="fas fa-calendar-alt"></i> Data Nascimento:</strong> ${new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</p><p><strong><i class="fas fa-birthday-cake"></i> Idade:</strong> ${aluno.idade} anos</p><p><strong><i class="fas fa-venus-mars"></i> Sexo:</strong> ${aluno.sexo}</p><p><strong><i class="fas fa-chalkboard"></i> Turma:</strong> ${aluno.turma}</p><p><strong><i class="fas fa-calendar-week"></i> Dias e Horários de Treino:</strong> ${diasTreinoTexto}</p><p><strong><i class="fas fa-medal"></i> Modalidades:</strong></p><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px;">${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m}</span>`).join("")}</div><p style="margin-top: 15px;"><strong><i class="fas fa-exclamation-triangle"></i> Advertências:</strong> ${aluno.advertencias}</p><p><strong><i class="fas fa-ban"></i> Suspensões:</strong> ${aluno.suspensoes}</p><p><strong><i class="fas fa-star"></i> Média Geral:</strong> ${mediaFormatada}</p></div>`;
}

function inicializarSistema() {
  atualizarIdades();
  verificarReativacaoAutomatica();
  atualizarDashboard();
  renderizarAlunos(ordenarAlunosPorNome(alunos));
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
    dashboard: "Dashboard",
    alunos: "Alunos",
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
  const alunosInconsistentes = contarAlunosComInconsistencias();
  const { porIdade, porSexo } = contarInconsistenciasPorTipo();
  let turnoManha = 0,
    turnoTarde = 0;
  alunos.forEach((aluno) => {
    if (aluno.diasTreino && aluno.diasTreino.length > 0) {
      const primeiroHorario = aluno.diasTreino[0].horario;
      if (
        primeiroHorario.includes("07") ||
        primeiroHorario.includes("08") ||
        primeiroHorario.includes("09") ||
        primeiroHorario.includes("10")
      )
        turnoManha++;
      else if (
        primeiroHorario.includes("13") ||
        primeiroHorario.includes("14") ||
        primeiroHorario.includes("15") ||
        primeiroHorario.includes("16")
      )
        turnoTarde++;
    } else if (aluno.horario) {
      if (
        aluno.horario.includes("07") ||
        aluno.horario.includes("08") ||
        aluno.horario.includes("09") ||
        aluno.horario.includes("10")
      )
        turnoManha++;
      else turnoTarde++;
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
  const alertaContainer = document.getElementById("alertaInconsistencias");
  if (alertaContainer) {
    if (alunosInconsistentes > 0) {
      alertaContainer.innerHTML = `<div class="alerta-global" style="background: #ffebee; border: 1px solid #f44336; border-radius: 10px; padding: 12px 20px; margin-bottom: 20px;"><div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><i class="fas fa-exclamation-triangle" style="color: #f44336; font-size: 24px;"></i><span style="flex: 1;"><strong>Atenção!</strong> ${alunosInconsistentes} aluno(s) estão com inscrições incompatíveis.</span><button onclick="mostrarAlunosInconsistentes();" class="btn-primary" style="padding: 8px 20px; background: #f44336; border: none; cursor: pointer; border-radius: 5px; color: white;"><i class="fas fa-eye"></i> Ver Alunos</button></div><div style="display: flex; gap: 20px; margin-top: 10px; padding-top: 10px; border-top: 1px solid #ffcdd2; font-size: 12px;"><span><i class="fas fa-calendar-alt"></i> Problemas de idade: ${porIdade}</span><span><i class="fas fa-venus-mars"></i> Problemas de sexo: ${porSexo}</span></div></div>`;
      alertaContainer.style.display = "block";
    } else {
      alertaContainer.style.display = "none";
    }
  }
}

function renderizarAlunos(alunosArray) {
  renderizarAlunosComFiltro(alunosArray, false);
}

function renderizarAlunosModalidade(alunosArray) {
  const container = document.getElementById("modalidadeResultados");
  if (!container) return;
  const alunosOrdenados = ordenarAlunosPorNome(alunosArray);
  if (alunosOrdenados.length === 0) {
    container.innerHTML =
      '<div class="no-results"><i class="fas fa-search"></i><p>Nenhum aluno encontrado</p></div>';
    return;
  }
  container.innerHTML = alunosOrdenados
    .map((aluno) => {
      const isApto = aluno.status === "apto";
      const statusBadge = isApto
        ? '<span class="badge" style="background: #27ae60; color: white;">APTO</span>'
        : '<span class="badge" style="background: #e74c3c; color: white;">SUSPENSO</span>';
      const alertaBadge = gerarBadgeAlerta(aluno);
      let diasTreinoResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0)
        diasTreinoResumo = aluno.diasTreino
          .map((d) => `${d.dia} ${d.horario}`)
          .join(" e ");
      else
        diasTreinoResumo = `${aluno.diaTreino || "N/D"} ${aluno.horario || ""}`;
      return `<div class="aluno-card" onclick="abrirCardAluno(${aluno.id})"><div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><div class="aluno-info"><h4>${aluno.nome} ${alertaBadge}</h4><p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p><p><i class="fas fa-clock"></i> ${aluno.turma}</p><p><i class="fas fa-calendar-week"></i> Treinos: ${diasTreinoResumo}</p><div class="aluno-badges">${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`).join("")}${statusBadge}</div></div></div>`;
    })
    .join("");
}

window.abrirCardAluno = function (id) {
  const aluno = alunos.find((a) => a.id === id);
  if (!aluno) return;
  const isApto = aluno.status === "apto";
  const statusClass = isApto ? "status-apto" : "status-suspenso";
  const statusIcon = isApto ? "✅" : "❌";
  const periodoSuspensao = !isApto
    ? formatarPeriodoSuspensao(aluno.dataInicioSuspensao, aluno.diasSuspensao)
    : "";
  const statusText = isApto
    ? "Apto para treinar"
    : `Suspenso - ${periodoSuspensao}`;
  const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
  const dataRetorno =
    !isApto && aluno.dataInicioSuspensao
      ? formatarDataParaExibicao(
          calcularDataRetorno(aluno.dataInicioSuspensao, aluno.diasSuspensao),
        )
      : null;
  const mediaFormatada = formatarMediaGeral(aluno.mediaGeral);
  const alertaInconsistencia = gerarAlertaInconsistencia(aluno);
  const cardContent = document.getElementById("cardContent");
  cardContent.innerHTML = `<div style="text-align: center;"><div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><h2>${aluno.nome}</h2>${alertaInconsistencia}<div style="margin: 20px 0; text-align: left;"><p><strong>📅 Nascimento:</strong> ${new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")}</p><p><strong>🎂 Idade:</strong> ${aluno.idade} anos</p><p><strong>⚧ Sexo:</strong> ${aluno.sexo}</p><p><strong>🏫 Turma:</strong> ${aluno.turma}</p><p><strong>⏰ Dias e Horários de Treino:</strong> ${diasTreinoTexto}</p><p><strong>🏅 Modalidades:</strong></p><div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0;">${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m}</span>`).join("")}</div><p><strong>⚠️ Advertências:</strong> ${aluno.advertencias}</p><p><strong>🚫 Suspensões:</strong> ${aluno.suspensoes}</p><p><strong>📋 Status:</strong> <span class="${statusClass}" style="display: inline-block; padding: 5px 10px; border-radius: 5px; font-weight: bold;">${statusIcon} ${statusText}</span></p>${dataRetorno ? `<p><strong>📅 Retorno previsto:</strong> ${dataRetorno}</p>` : ""}<p><strong>⭐ Média Geral:</strong> ${mediaFormatada}</p></div><button class="btn-primary" onclick="fecharModalCard()" style="margin-top: 10px;">Fechar</button></div>`;
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
  const dia = document.getElementById("filtroDia")?.value;
  if (dia)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.dia === dia),
    );
  const horario = document.getElementById("filtroHorario")?.value;
  if (horario)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.horario === horario),
    );
  const turma = document.getElementById("filtroTurma")?.value;
  if (turma) filtrados = filtrados.filter((a) => a.turma === turma);
  const sexo = document.getElementById("filtroSexo")?.value;
  if (sexo) filtrados = filtrados.filter((a) => a.sexo === sexo);
  const modalidade = document.getElementById("filtroModalidade")?.value;
  if (modalidade)
    filtrados = filtrados.filter((a) => a.modalidades.includes(modalidade));
  const status = document.getElementById("filtroStatus")?.value;
  if (status === "apto")
    filtrados = filtrados.filter((a) => a.status === "apto");
  if (status === "suspenso")
    filtrados = filtrados.filter((a) => a.status === "suspenso");
  if (status === "incompativel")
    filtrados = filtrados.filter((a) => alunoTemInconsistencia(a));
  alunosFiltrados = filtrados;
  renderizarAlunos(filtrados);
}

function limparFiltros() {
  document.getElementById("searchNome").value = "";
  document.getElementById("filtroIdadeMin").value = "";
  document.getElementById("filtroIdadeMax").value = "";
  const selects = [
    "filtroDia",
    "filtroHorario",
    "filtroTurma",
    "filtroSexo",
    "filtroModalidade",
    "filtroStatus",
  ];
  selects.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
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
  const dia = document.getElementById("buscaDia")?.value;
  if (dia)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.dia === dia),
    );
  const horario = document.getElementById("buscaHorario")?.value;
  if (horario)
    filtrados = filtrados.filter(
      (a) => a.diasTreino && a.diasTreino.some((t) => t.horario === horario),
    );
  const turma = document.getElementById("buscaTurma")?.value;
  if (turma) filtrados = filtrados.filter((a) => a.turma === turma);
  const sexo = document.getElementById("buscaSexo")?.value;
  if (sexo) filtrados = filtrados.filter((a) => a.sexo === sexo);
  const modalidade = document.getElementById("buscaModalidade")?.value;
  if (modalidade)
    filtrados = filtrados.filter((a) => a.modalidades.includes(modalidade));
  const advertencias = document.getElementById("buscaAdvertencias")?.value;
  if (advertencias)
    filtrados = filtrados.filter(
      (a) => a.advertencias <= parseInt(advertencias),
    );
  const suspensoes = document.getElementById("buscaSuspensoes")?.value;
  if (suspensoes)
    filtrados = filtrados.filter((a) => a.suspensoes <= parseInt(suspensoes));
  const status = document.getElementById("buscaStatus")?.value;
  if (status === "apto")
    filtrados = filtrados.filter((a) => a.status === "apto");
  if (status === "suspenso")
    filtrados = filtrados.filter((a) => a.status === "suspenso");
  const mediaMin = document.getElementById("buscaMediaMin")?.value;
  if (mediaMin)
    filtrados = filtrados.filter((a) => a.mediaGeral >= parseFloat(mediaMin));
  const mediaMax = document.getElementById("buscaMediaMax")?.value;
  if (mediaMax)
    filtrados = filtrados.filter((a) => a.mediaGeral <= parseFloat(mediaMax));
  renderizarAlunosGridBusca(filtrados, "buscaResultados");
}

function renderizarAlunosGridBusca(alunosArray, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const alunosOrdenados = ordenarAlunosPorNome(alunosArray);
  if (alunosOrdenados.length === 0) {
    container.innerHTML =
      '<div class="no-results"><i class="fas fa-search"></i><p>Nenhum aluno encontrado</p></div>';
    return;
  }
  container.innerHTML = alunosOrdenados
    .map((aluno) => {
      const isApto = aluno.status === "apto";
      const statusBadge = isApto
        ? '<span class="badge" style="background: #27ae60; color: white;">APTO</span>'
        : '<span class="badge" style="background: #e74c3c; color: white;">SUSPENSO</span>';
      const mediaFormatada = formatarMediaGeral(aluno.mediaGeral);
      const alertaBadge = gerarBadgeAlerta(aluno);
      let diasTreinoResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0)
        diasTreinoResumo = aluno.diasTreino.map((d) => `${d.dia}`).join("/");
      else diasTreinoResumo = aluno.diaTreino || "N/D";
      return `<div class="aluno-card" onclick="abrirCardAluno(${aluno.id})"><div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><div class="aluno-info"><h4>${aluno.nome} ${alertaBadge}</h4><p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p><p><i class="fas fa-clock"></i> ${aluno.horario || "N/D"} | ${aluno.turma}</p><p><i class="fas fa-calendar-week"></i> Dias: ${diasTreinoResumo}</p><p><i class="fas fa-chart-line"></i> Média: ${mediaFormatada}</p><div class="aluno-badges">${aluno.modalidades
        .slice(0, 2)
        .map(
          (m) =>
            `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`,
        )
        .join(
          "",
        )}${aluno.advertencias > 0 ? `<span class="badge badge-advertencia"><i class="fas fa-exclamation-triangle"></i> ${aluno.advertencias}</span>` : ""}${statusBadge}</div></div></div>`;
    })
    .join("");
}

function limparBusca() {
  document.getElementById("buscaNome").value = "";
  document.getElementById("buscaIdadeMin").value = "";
  document.getElementById("buscaIdadeMax").value = "";
  const selects = [
    "buscaDia",
    "buscaHorario",
    "buscaTurma",
    "buscaSexo",
    "buscaModalidade",
    "buscaStatus",
  ];
  selects.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const inputs = [
    "buscaAdvertencias",
    "buscaSuspensoes",
    "buscaMediaMin",
    "buscaMediaMax",
  ];
  inputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("buscaResultados").innerHTML =
    '<div class="no-results"><i class="fas fa-search"></i><p>Use os filtros acima para buscar alunos</p></div>';
}

function filtrarPorModalidade(modalidade) {
  currentModalidadeSelecionada = modalidade;
  let filtrados;
  if (modalidade === "atletismo")
    filtrados = alunos.filter((a) =>
      a.modalidades.some((m) => m.includes("atletismo")),
    );
  else filtrados = alunos.filter((a) => a.modalidades.includes(modalidade));
  renderizarAlunosModalidade(filtrados);
}

// ==================== FUNÇÕES DE FREQUÊNCIA ====================

// Função para gerar lista de frequência de UM DIA específico
function gerarListaFrequencia() {
  let alunosParaFrequencia = [];

  const nomeFiltro =
    document.getElementById("searchNome")?.value.toLowerCase() || "";
  const turmaFiltro = document.getElementById("filtroTurma")?.value;
  const diaFiltro = document.getElementById("filtroDia")?.value;
  const horarioFiltro = document.getElementById("filtroHorario")?.value;
  const sexoFiltro = document.getElementById("filtroSexo")?.value;
  const modalidadeFiltro = document.getElementById("filtroModalidade")?.value;
  const statusFiltro = document.getElementById("filtroStatus")?.value;

  if (currentModalidadeSelecionada && !modalidadeFiltro) {
    if (currentModalidadeSelecionada === "atletismo")
      alunosParaFrequencia = alunos.filter((a) =>
        a.modalidades.some((m) => m.includes("atletismo")),
      );
    else
      alunosParaFrequencia = alunos.filter((a) =>
        a.modalidades.includes(currentModalidadeSelecionada),
      );
  } else if (
    nomeFiltro ||
    turmaFiltro ||
    diaFiltro ||
    horarioFiltro ||
    sexoFiltro ||
    modalidadeFiltro ||
    statusFiltro
  ) {
    alunosParaFrequencia =
      alunosFiltrados && alunosFiltrados.length > 0 ? alunosFiltrados : alunos;
    if (statusFiltro === "incompativel")
      alunosParaFrequencia = alunosParaFrequencia.filter((a) =>
        alunoTemInconsistencia(a),
      );
    else if (statusFiltro === "apto")
      alunosParaFrequencia = alunosParaFrequencia.filter(
        (a) => a.status === "apto",
      );
    else if (statusFiltro === "suspenso")
      alunosParaFrequencia = alunosParaFrequencia.filter(
        (a) => a.status === "suspenso",
      );
  } else {
    alunosParaFrequencia = alunos;
  }

  if (alunosParaFrequencia.length === 0) {
    alert("Nenhum aluno encontrado para gerar a lista de frequência!");
    return;
  }

  const alunosOrdenados = ordenarAlunosPorNome(alunosParaFrequencia);
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
  const horaAtual = dataAtual.toLocaleTimeString("pt-BR");
  const diaSemana = dataAtual.toLocaleDateString("pt-BR", { weekday: "long" });

  let tituloFiltro = "";
  if (currentModalidadeSelecionada)
    tituloFiltro = ` - Modalidade: ${currentModalidadeSelecionada.toUpperCase()}`;
  if (turmaFiltro) tituloFiltro += ` - Turma: ${turmaFiltro}`;
  if (diaFiltro) tituloFiltro += ` - Dia: ${diaFiltro}`;
  if (horarioFiltro) tituloFiltro += ` - Horário: ${horarioFiltro}`;

  let tabelaHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Lista de Frequência - Centro Educacional de Barra Nova</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Courier New',Courier,monospace;margin:20px;font-size:12px;}
    .header{text-align:center;margin-bottom:25px;border-bottom:2px solid #333;padding-bottom:15px;}
    h1{color:#2c3e50;font-size:22px;margin-bottom:5px;text-transform:uppercase;letter-spacing:2px;}
    .subtitle{color:#555;font-size:14px;margin-bottom:5px;}
    .info-session{background:#f5f5f5;padding:10px;margin-bottom:20px;border-left:4px solid #2c3e50;font-size:11px;}
    table{width:100%;border-collapse:collapse;margin-top:15px;font-size:11px;}
    th{background:#2c3e50;color:white;padding:10px 8px;text-align:left;border:1px solid #ddd;font-weight:bold;}
    td{padding:8px;border:1px solid #ddd;vertical-align:middle;}
    tr:nth-child(even){background:#f9f9f9;}
    .presente-col,.ausente-col{text-align:center;width:60px;}
    .checkbox-placeholder{display:inline-block;width:24px;height:24px;border:2px solid #333;border-radius:4px;text-align:center;line-height:20px;font-size:14px;font-weight:bold;}
    .footer{margin-top:30px;padding-top:20px;border-top:1px solid #ccc;font-size:10px;color:#666;}
    .assinatura{margin-top:40px;display:flex;justify-content:space-between;}
    .assinatura-item{text-align:center;width:200px;}
    .linha-assinatura{border-top:1px solid #333;margin-top:30px;padding-top:5px;width:100%;}
    .badge-status{display:inline-block;padding:2px 8px;border-radius:10px;font-size:9px;font-weight:bold;}
    .badge-suspenso{background:#e74c3c;color:white;}
    .badge-apto{background:#27ae60;color:white;}
    .obs-box{margin-top:20px;padding:10px;border:1px solid #ccc;background:#fafafa;}
    .obs-box p{margin:5px 0;}
    .col-nome{width:35%;}.col-turma{width:12%;}.col-idade{width:8%;}.col-status{width:12%;}
  </style></head><body>
    <div class="header"><h1>📍 CENTRO EDUCACIONAL DE BARRA NOVA</h1><div class="subtitle">LISTA DE FREQUÊNCIA - TREINAMENTO ESPORTIVO</div><div class="subtitle">"Compromisso com o esporte e a educação"</div></div>
    <div class="info-session"><strong>📅 DATA:</strong> ${dataFormatada} (${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}) &nbsp;&nbsp;|&nbsp;&nbsp;<strong>⏰ HORA DE GERAÇÃO:</strong> ${horaAtual} &nbsp;&nbsp;|&nbsp;&nbsp;<strong>👨‍🏫 PROFESSOR RESPONSÁVEL:</strong> _________________________ &nbsp;&nbsp;|&nbsp;&nbsp;<strong>🏫 TURNO:</strong> ${horarioFiltro?.includes("13") || horarioFiltro?.includes("14") || horarioFiltro?.includes("15") || horarioFiltro?.includes("16") ? "VESPERTINO" : "MATUTINO"}</div>
    <div class="info-session" style="background:#e8f4fd;"><strong>🎯 INFORMAÇÕES DO TREINO:${tituloFiltro}</strong><span style="margin-left:15px;">👥 Total de Alunos: ${alunosOrdenados.length}</span></div>
    <table><thead><tr><th style="width:40px;">#</th><th class="col-nome">NOME COMPLETO</th><th class="col-turma">TURMA</th><th class="col-idade">IDADE</th><th class="col-status">STATUS</th><th class="presente-col">✅ PRESENTE</th><th class="ausente-col">❌ AUSENTE</th></tr></thead><tbody>`;

  alunosOrdenados.forEach((aluno, index) => {
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "APTO" : "SUSPENSO";
    const statusClass = isApto ? "badge-apto" : "badge-suspenso";
    const diasTreinoTexto =
      aluno.diasTreino && aluno.diasTreino.length > 0
        ? aluno.diasTreino.map((d) => `${d.dia} ${d.horario}`).join(" | ")
        : `${aluno.diaTreino || "N/D"} ${aluno.horario || ""}`;
    tabelaHTML += `<tr><td style="text-align:center;">${index + 1}</td><td><strong>${aluno.nome}</strong><br><span style="font-size:9px;color:#888;">${diasTreinoTexto.substring(0, 35)}${diasTreinoTexto.length > 35 ? "..." : ""}</span></td><td>${aluno.turma}</td><td style="text-align:center;">${aluno.idade}</td><td style="text-align:center;"><span class="badge-status ${statusClass}">${statusText}</span></td><td class="presente-col"><span class="checkbox-placeholder">☐</span></td><td class="ausente-col"><span class="checkbox-placeholder">☐</span></td></tr>`;
  });

  tabelaHTML += `</tbody></table>
    <div class="obs-box"><p><strong>📋 OBSERVAÇÕES E INSTRUÇÕES:</strong></p><p>1. Marcar ✅ no campo "PRESENTE" para alunos que compareceram ao treino.</p><p>2. Marcar ❌ no campo "AUSENTE" para alunos que não compareceram.</p><p>3. Alunos com status "SUSPENSO" NÃO podem treinar durante o período de suspensão.</p><p>4. Em caso de atestado médico, anexar à lista e registrar na coordenação.</p><p>5. Esta lista deve ser entregue à coordenação após o treino.</p></div>
    <div class="assinatura"><div class="assinatura-item"><div class="linha-assinatura"></div><p>Assinatura do Professor</p></div><div class="assinatura-item"><div class="linha-assinatura"></div><p>Assinatura da Coordenação</p></div></div>
    <div class="footer"><p>Centro Educacional de Barra Nova - Esporte na Escola | Gerado automaticamente em ${dataFormatada} às ${horaAtual}</p><p>Este documento é válido como registro de frequência para o treino do dia.</p></div>
  </body></html>`;

  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  const nomeArquivo = `lista_frequencia_${dataAtual.toISOString().split("T")[0]}_${horarioFiltro || currentModalidadeSelecionada || "geral"}`;
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Função para gerar lista de frequência MENSAL
function gerarFrequenciaMensal() {
  let alunosParaFrequencia = [];

  const nomeFiltro =
    document.getElementById("searchNome")?.value.toLowerCase() || "";
  const turmaFiltro = document.getElementById("filtroTurma")?.value;
  const diaFiltro = document.getElementById("filtroDia")?.value;
  const horarioFiltro = document.getElementById("filtroHorario")?.value;
  const sexoFiltro = document.getElementById("filtroSexo")?.value;
  const modalidadeFiltro = document.getElementById("filtroModalidade")?.value;
  const statusFiltro = document.getElementById("filtroStatus")?.value;

  if (currentModalidadeSelecionada && !modalidadeFiltro) {
    if (currentModalidadeSelecionada === "atletismo")
      alunosParaFrequencia = alunos.filter((a) =>
        a.modalidades.some((m) => m.includes("atletismo")),
      );
    else
      alunosParaFrequencia = alunos.filter((a) =>
        a.modalidades.includes(currentModalidadeSelecionada),
      );
  } else if (
    nomeFiltro ||
    turmaFiltro ||
    diaFiltro ||
    horarioFiltro ||
    sexoFiltro ||
    modalidadeFiltro ||
    statusFiltro
  ) {
    alunosParaFrequencia =
      alunosFiltrados && alunosFiltrados.length > 0 ? alunosFiltrados : alunos;
    if (statusFiltro === "incompativel")
      alunosParaFrequencia = alunosParaFrequencia.filter((a) =>
        alunoTemInconsistencia(a),
      );
    else if (statusFiltro === "apto")
      alunosParaFrequencia = alunosParaFrequencia.filter(
        (a) => a.status === "apto",
      );
    else if (statusFiltro === "suspenso")
      alunosParaFrequencia = alunosParaFrequencia.filter(
        (a) => a.status === "suspenso",
      );
  } else {
    alunosParaFrequencia = alunos;
  }

  if (alunosParaFrequencia.length === 0) {
    alert("Nenhum aluno encontrado para gerar a lista de frequência mensal!");
    return;
  }

  const alunosOrdenados = ordenarAlunosPorNome(alunosParaFrequencia);
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();

  // Selecionar mês
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let mesSelecionado = prompt(
    `Selecione o mês para a lista de frequência (1-12):\n1 - Janeiro\n2 - Fevereiro\n3 - Março\n4 - Abril\n5 - Maio\n6 - Junho\n7 - Julho\n8 - Agosto\n9 - Setembro\n10 - Outubro\n11 - Novembro\n12 - Dezembro\n\n(Deixe em branco para o mês atual)`,
    (mesAtual + 1).toString(),
  );

  let mesIndex;
  if (
    mesSelecionado &&
    !isNaN(parseInt(mesSelecionado)) &&
    parseInt(mesSelecionado) >= 1 &&
    parseInt(mesSelecionado) <= 12
  ) {
    mesIndex = parseInt(mesSelecionado) - 1;
  } else {
    mesIndex = mesAtual;
  }

  let anoSelecionado = parseInt(
    prompt(`Digite o ano (ex: ${anoAtual}):`, anoAtual.toString()) || anoAtual,
  );
  if (isNaN(anoSelecionado)) anoSelecionado = anoAtual;

  // Calcular dias do mês
  const diasNoMes = new Date(anoSelecionado, mesIndex + 1, 0).getDate();
  const diasDoMes = [];
  for (let i = 1; i <= diasNoMes; i++) {
    const data = new Date(anoSelecionado, mesIndex, i);
    const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "short" });
    diasDoMes.push({ dia: i, diaSemana: diaSemana.substring(0, 3) });
  }

  const nomeMes = new Date(anoSelecionado, mesIndex, 1).toLocaleDateString(
    "pt-BR",
    { month: "long" },
  );
  const mesFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
  const horaAtual = dataAtual.toLocaleTimeString("pt-BR");

  let tituloFiltro = "";
  if (currentModalidadeSelecionada)
    tituloFiltro = ` - Modalidade: ${currentModalidadeSelecionada.toUpperCase()}`;
  if (turmaFiltro) tituloFiltro += ` - Turma: ${turmaFiltro}`;
  if (horarioFiltro) tituloFiltro += ` - Horário: ${horarioFiltro}`;

  const colWidth = Math.max(
    40,
    Math.min(60, Math.floor(800 / (diasNoMes + 4))),
  );
  const tableStyle = `min-width: ${(diasNoMes + 4) * colWidth}px;`;

  let tabelaHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Frequência Mensal - ${mesFormatado}/${anoSelecionado} - Centro Educacional de Barra Nova</title><style>
    *{margin:0;padding:0;box-sizing:border-box;}
    @media print{body{margin:0;padding:10px;}.page-break{page-break-before:always;}table{page-break-inside:avoid;}tr{page-break-inside:avoid;}}
    body{font-family:'Courier New',Courier,monospace;margin:10px;font-size:10px;}
    .header{text-align:center;margin-bottom:15px;border-bottom:2px solid #333;padding-bottom:10px;}
    h1{color:#2c3e50;font-size:18px;margin-bottom:3px;text-transform:uppercase;}
    .subtitle{color:#555;font-size:11px;margin-bottom:5px;}
    .info-session{background:#f5f5f5;padding:8px;margin-bottom:15px;border-left:4px solid #2c3e50;font-size:10px;}
    .table-container{overflow-x:auto;margin-top:15px;}
    table{border-collapse:collapse;font-size:9px;${tableStyle}}
    th{background:#2c3e50;color:white;padding:6px 3px;text-align:center;border:1px solid #ddd;font-weight:bold;font-size:8px;}
    td{padding:4px 2px;border:1px solid #ddd;vertical-align:middle;text-align:center;}
    .aluno-nome{text-align:left;font-weight:bold;background:#f9f9f9;position:sticky;left:0;z-index:1;}
    .checkbox-placeholder{display:inline-block;width:16px;height:16px;border:1.5px solid #333;border-radius:3px;text-align:center;line-height:13px;font-size:11px;font-weight:bold;}
    .footer{margin-top:20px;padding-top:10px;border-top:1px solid #ccc;font-size:9px;color:#666;}
    .assinatura{margin-top:20px;display:flex;justify-content:space-between;}
    .assinatura-item{text-align:center;width:180px;}
    .linha-assinatura{border-top:1px solid #333;margin-top:20px;padding-top:5px;}
    .badge-status{display:inline-block;padding:2px 6px;border-radius:8px;font-size:8px;font-weight:bold;}
    .badge-suspenso{background:#e74c3c;color:white;}
    .badge-apto{background:#27ae60;color:white;}
    .legenda{margin:10px 0;padding:8px;background:#f0f0f0;font-size:9px;display:flex;gap:15px;flex-wrap:wrap;}
    .col-nome{min-width:180px;}.col-turma{min-width:60px;}.col-status{min-width:60px;}
    tr:nth-child(even){background:#fafafa;}
    .obs-box{margin-top:15px;padding:8px;border:1px solid #ccc;background:#fafafa;}
  </style></head><body>
    <div class="header"><h1>📍 CENTRO EDUCACIONAL DE BARRA NOVA</h1><div class="subtitle">LISTA DE FREQUÊNCIA MENSAL - TREINAMENTO ESPORTIVO</div><div class="subtitle">${mesFormatado.toUpperCase()} / ${anoSelecionado}</div></div>
    <div class="info-session"><strong>📅 DATA DE GERAÇÃO:</strong> ${dataFormatada} às ${horaAtual} &nbsp;&nbsp;|&nbsp;&nbsp;<strong>👨‍🏫 PROFESSOR RESPONSÁVEL:</strong> _________________________ &nbsp;&nbsp;|&nbsp;&nbsp;<strong>🏫 TURNO:</strong> ${horarioFiltro?.includes("13") || horarioFiltro?.includes("14") || horarioFiltro?.includes("15") || horarioFiltro?.includes("16") ? "VESPERTINO" : "MATUTINO"}</div>
    <div class="info-session" style="background:#e8f4fd;"><strong>🎯 INFORMAÇÕES:${tituloFiltro}</strong><span style="margin-left:15px;">👥 Total de Alunos: ${alunosOrdenados.length}</span><span style="margin-left:15px;">📆 Dias no Mês: ${diasNoMes}</span></div>
    <div class="legenda"><span><strong>✅ INSTRUÇÕES DE PREENCHIMENTO:</strong></span><span>✓ Marcar <strong>✅</strong> ou <strong>P</strong> para PRESENTE</span><span>✗ Marcar <strong>❌</strong> ou <strong>F</strong> para AUSENTE</span><span>⚕️ Marcar <strong>A</strong> para ATESTADO</span><span>🔴 Alunos com status "SUSPENSO" NÃO podem treinar</span></div>
    <div class="table-container"><table><thead><tr><th class="col-nome">NOME DO ALUNO</th><th class="col-turma">TURMA</th><th class="col-status">STATUS</th>`;

  for (const dia of diasDoMes) {
    tabelaHTML += `<th style="min-width:30px;">${dia.dia}<br><span style="font-weight:normal;">${dia.diaSemana}</span></th>`;
  }

  tabelaHTML += `</tr></thead><tbody>`;

  for (const aluno of alunosOrdenados) {
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "APTO" : "SUSPENSO";
    const statusClass = isApto ? "badge-apto" : "badge-suspenso";
    const styleSuspenso = !isApto ? "opacity:0.5; background:#ffebee;" : "";

    tabelaHTML += `<tr><td class="aluno-nome" style="text-align:left;"><strong>${aluno.nome}</strong><br><span style="font-size:7px;color:#888;">${aluno.turma} | ${aluno.idade} anos</span></td><td style="text-align:center;">${aluno.turma}</td><td style="text-align:center;"><span class="badge-status ${statusClass}">${statusText}</span></td>`;

    for (let i = 0; i < diasNoMes; i++) {
      tabelaHTML += `<td style="text-align:center; ${styleSuspenso}"><span class="checkbox-placeholder">☐</span></td>`;
    }
    tabelaHTML += `</tr>`;
  }

  tabelaHTML += `</tbody></table></div>
    <div class="obs-box"><p><strong>📋 OBSERVAÇÕES E INSTRUÇÕES:</strong></p><p>1. Marcar ✅ (PRESENTE) ou ❌ (AUSENTE) em cada dia de treino correspondente à turma.</p><p>2. Alunos com status "SUSPENSO" não devem ter presença marcada durante o período de suspensão.</p><p>3. Em caso de atestado médico, marcar "A" na data correspondente e anexar documento.</p><p>4. Ao final do mês, calcular o percentual de frequência de cada aluno (mínimo 75% para continuidade).</p><p>5. Esta lista deve ser entregue à coordenação no início do mês seguinte.</p></div>
    <div class="assinatura"><div class="assinatura-item"><div class="linha-assinatura"></div><p>Assinatura do Professor</p><p style="font-size:8px;margin-top:5px;">Data: ___/___/_____</p></div><div class="assinatura-item"><div class="linha-assinatura"></div><p>Assinatura da Coordenação</p><p style="font-size:8px;margin-top:5px;">Data: ___/___/_____</p></div></div>
    <div class="footer"><p>Centro Educacional de Barra Nova - Esporte na Escola | Gerado automaticamente em ${dataFormatada}</p><p>Esta lista cobre todo o mês de ${mesFormatado}/${anoSelecionado} - Total de ${diasNoMes} dias</p></div>
  </body></html>`;

  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  const nomeArquivo = `frequencia_mensal_${mesFormatado.toLowerCase()}_${anoSelecionado}_${horarioFiltro || currentModalidadeSelecionada || "geral"}`;
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function gerarPDFTabela(alunosArray, nomeArquivo) {
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  const alunosOrdenados = ordenarAlunosPorNome(alunosArray);
  let tabelaHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Lista de Alunos - Centro Educacional de Barra Nova</title><style>body{font-family:Arial,sans-serif;margin:20px;}h1{text-align:center;color:#2c3e50;font-size:20px;margin-bottom:5px;}.subtitle{text-align:center;color:#666;font-size:12px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;margin-top:20px;}th{background:#2c3e50;color:white;padding:10px;text-align:left;border:1px solid #ddd;font-size:11px;}td{padding:8px;border:1px solid #ddd;font-size:10px;}tr:nth-child(even){background:#f9f9f9;}.footer{margin-top:20px;text-align:center;font-size:9px;color:#999;}.status-apto{color:#27ae60;font-weight:bold;}.status-suspenso{color:#e74c3c;font-weight:bold;}.inconsistencia{color:#f44336;font-weight:bold;}</style></head><body><h1>Centro Educacional de Barra Nova</h1><div class="subtitle">Lista de Alunos - Gerado em ${dataAtual}</div><table><thead><tr><th>ID</th><th>NOME</th><th>IDADE</th><th>SEXO</th><th>TURMA</th><th>DIAS/HORÁRIOS</th><th>MODALIDADES</th><th>ADVERTÊNCIAS</th><th>STATUS</th><th>PERÍODO SUSPENSÃO</th><th>MÉDIA</th><th>INCONSISTÊNCIAS</th></tr></thead><tbody>`;
  alunosOrdenados.forEach((aluno) => {
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "Apto" : "Suspenso";
    const statusClass = isApto ? "status-apto" : "status-suspenso";
    const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
    const periodoSuspensao = !isApto
      ? formatarPeriodoSuspensao(aluno.dataInicioSuspensao, aluno.diasSuspensao)
      : "-";
    const mediaFormatada = formatarMediaGeral(aluno.mediaGeral);
    const temInconsistencia = alunoTemInconsistencia(aluno);
    const inconsistenciaText = temInconsistencia
      ? "⚠️ ALERTA: Aluno muito velho para esta categoria!"
      : "-";
    const inconsistenciaClass = temInconsistencia ? "inconsistencia" : "";
    tabelaHTML += `<tr><td>${aluno.id}</td><td><strong>${aluno.nome}</strong></td><td>${aluno.idade}</td><td>${aluno.sexo}</td><td>${aluno.turma}</td><td>${diasTreinoTexto}</td><td>${aluno.modalidades.join(", ")}</td><td>${aluno.advertencias}</td><td class="${statusClass}">${statusText}</td><td>${periodoSuspensao}</td><td>${mediaFormatada}</td><td class="${inconsistenciaClass}">${inconsistenciaText}</td></tr>`;
  });
  tabelaHTML += `</tbody>\\n<table><div class="footer">Total de alunos: ${alunosOrdenados.length}</div></body></html>`;
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
  const alunosOrdenados = ordenarAlunosPorNome(alunosModalidade);
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  let tabelaHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Alunos de ${modalidade} - Centro Educacional de Barra Nova</title><style>body{font-family:Arial,sans-serif;margin:20px;}h1{text-align:center;color:#2c3e50;font-size:20px;margin-bottom:5px;}.subtitle{text-align:center;color:#666;font-size:12px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;margin-top:20px;}th{background:#2c3e50;color:white;padding:10px;text-align:left;border:1px solid #ddd;font-size:11px;}td{padding:8px;border:1px solid #ddd;font-size:10px;}tr:nth-child(even){background:#f9f9f9;}.footer{margin-top:20px;text-align:center;font-size:9px;color:#999;}.status-apto{color:#27ae60;font-weight:bold;}.status-suspenso{color:#e74c3c;font-weight:bold;}.inconsistencia{color:#f44336;font-weight:bold;}</style></head><body><h1>Centro Educacional de Barra Nova</h1><div class="subtitle">Alunos inscritos em ${modalidade.toUpperCase()} - Gerado em ${dataAtual}</div><tr><thead><tr><th>ID</th><th>NOME</th><th>STATUS</th><th>PERÍODO SUSPENSÃO</th><th>IDADE</th><th>SEXO</th><th>TURMA</th><th>DIAS/HORÁRIOS</th><th>MODALIDADES</th><th>INCONSISTÊNCIA</th></tr></thead><tbody>`;
  alunosOrdenados.forEach((aluno) => {
    const outras =
      aluno.modalidades.filter((m) => m !== modalidade).join(", ") || "Nenhuma";
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "Apto" : "Suspenso";
    const statusClass = isApto ? "status-apto" : "status-suspenso";
    const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
    const periodoSuspensao = !isApto
      ? formatarPeriodoSuspensao(aluno.dataInicioSuspensao, aluno.diasSuspensao)
      : "-";
    const regra = REGRAS_MODALIDADES[modalidade];
    const temInconsistencia =
      regra && aluno.idade > regra.idadeMax && regra.idadeMax !== 100;
    const inconsistenciaText = temInconsistencia
      ? "⚠️ ALERTA: Aluno muito velho para esta categoria!"
      : "-";
    const inconsistenciaClass = temInconsistencia ? "inconsistencia" : "";
    tabelaHTML += `<tr><td>${aluno.id}</td><td><strong>${aluno.nome}</strong></td><td class="${statusClass}">${statusText}</td><td>${periodoSuspensao}</td><td>${aluno.idade}</td><td>${aluno.sexo}</td><td>${aluno.turma}</td><td>${diasTreinoTexto}</td><td>${outras}</td><td class="${inconsistenciaClass}">${inconsistenciaText}</td></tr>`;
  });
  tabelaHTML += `</tbody>\\n<table><div class="footer">Total de alunos: ${alunosOrdenados.length}</div></body></html>`;
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
