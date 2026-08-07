// Sistema de Gestão - Centro Educacional de Barra Nova
// DATA FUTURA FIXA: 07 de setembro de 2026
const DATA_REFERENCIA = new Date(2026, 11, 31); // Mês 12 = Dezembro

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
        diasTreinoResumo = aluno.diasTreino.map((d) => `${d.dia}`).join(" / ");
      } else {
        diasTreinoResumo = "N/D";
      }

      let horariosResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        horariosResumo = aluno.diasTreino
          .map((d) => `${d.horario}`)
          .join(" | ");
      } else {
        horariosResumo = "N/D";
      }

      let turnoTreinoDisplay = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        const horario = aluno.diasTreino[0].horario;
        if (
          horario.includes("07") ||
          horario.includes("08") ||
          horario.includes("09") ||
          horario.includes("10")
        ) {
          turnoTreinoDisplay =
            '<span class="badge" style="background: #3498db; color: white;">🌅 Matutino</span>';
        } else if (
          horario.includes("13") ||
          horario.includes("14") ||
          horario.includes("15") ||
          horario.includes("16")
        ) {
          turnoTreinoDisplay =
            '<span class="badge" style="background: #e67e22; color: white;">🌆 Vespertino</span>';
        }
      }

      return `<div class="aluno-card" style="${cardBorder}" onclick="abrirCardAluno(${aluno.id})">
        <div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i>
        </div>
        <div class="aluno-info">
          <h4>${aluno.nome} ${statusIcon} ${alertaBadge}</h4>
          <p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p>
          <p><i class="fas fa-clock"></i> <strong>Horários:</strong> ${horariosResumo}</p>
          <p><i class="fas fa-calendar-week"></i> <strong>Dias:</strong> ${diasTreinoResumo} | ${aluno.turma}</p>
          <p><i class="fas fa-chart-line"></i> Média: ${mediaFormatada}</p>
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
            ${turnoTreinoDisplay}
            ${statusBadge}
          </div>
        </div>
      </div>`;
    })
    .join("");
}

function formatarDiasTreino(diasTreino) {
  if (!diasTreino || diasTreino.length === 0) return "Não definido";
  return diasTreino.map((d) => `${d.dia} (${d.horario})`).join(" | ");
}

window.limparFiltroInconsistencia = function () {
  renderizarAlunos(ordenarAlunosPorNome(alunos));
};

function ordenarAlunosPorNome(alunosArray) {
  return [...alunosArray].sort((a, b) => a.nome.localeCompare(b.nome));
}

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return 0;
  const hoje = DATA_REFERENCIA;
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
  const hojeStr = `${DATA_REFERENCIA.getFullYear()}-${String(DATA_REFERENCIA.getMonth() + 1).padStart(2, "0")}-${String(DATA_REFERENCIA.getDate()).padStart(2, "0")}`;
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

function gerarDataAtualFormatada() {
  const data = DATA_REFERENCIA;
  return `${data.getDate().toString().padStart(2, "0")}/${(data.getMonth() + 1).toString().padStart(2, "0")}/${data.getFullYear()}`;
}

function gerarHoraAtualFormatada() {
  return "12:00:00";
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

      if (!aluno.diasTreino || aluno.diasTreino.length === 0) {
        aluno.diasTreino = [];
        if (aluno.diaTreino && aluno.horario) {
          aluno.diasTreino.push({
            dia: aluno.diaTreino,
            horario: aluno.horario,
          });
        }
      }

      if (!aluno.turno) {
        if (aluno.turma.includes("Módulo")) aluno.turno = "NOTURNO";
        else if (
          [
            "6º ANO A",
            "6º ANO B",
            "7º ANO A",
            "7º ANO B",
            "8º ANO A",
            "8º ANO B",
            "9º ANO A",
          ].includes(aluno.turma)
        )
          aluno.turno = "MATUTINO";
        else if (
          [
            "6º ANO C",
            "6º ANO D",
            "7º ANO C",
            "7º ANO D",
            "8º ANO C",
            "9º ANO B",
            "9º ANO C",
          ].includes(aluno.turma)
        )
          aluno.turno = "VESPERTINO";
        else aluno.turno = "NOTURNO";
      }

      if (aluno.diasSuspensao > 0 && aluno.dataInicioSuspensao) {
        const hojeStr = `${DATA_REFERENCIA.getFullYear()}-${String(DATA_REFERENCIA.getMonth() + 1).padStart(2, "0")}-${String(DATA_REFERENCIA.getDate()).padStart(2, "0")}`;
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

    console.log(
      "Exemplo de aluno com diasTreino:",
      alunos.find((a) => a.diasTreino && a.diasTreino.length > 1)?.nome,
    );
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

  // Evento do botão da Tabela Completa - usando os filtros atuais
  document
    .getElementById("gerarTabelaCompletaBtn")
    ?.addEventListener("click", function () {
      // Reaplica os filtros para garantir que alunosFiltrados esteja atualizado
      aplicarFiltros();
      // Depois gera a tabela com os alunos filtrados
      gerarTabelaCompletaComFiltros();
    });

  // Eventos da Tabela Completa
  document
    .getElementById("gerarPDFTabelaCompletaBtn")
    ?.addEventListener("click", gerarPDFTabelaCompleta);
  document
    .getElementById("fecharTabelaCompletaBtn")
    ?.addEventListener("click", () => {
      mudarView("alunos");
    });
}

let alunosFiltrados = [];

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
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
    "Módulo I ao III",
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
  const linkAtivo = document.querySelector(`[data-view="${view}"]`);
  if (linkAtivo) linkAtivo.classList.add("active");
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  const viewElement = document.getElementById(`${view}View`);
  if (viewElement) {
    viewElement.classList.add("active");
    viewElement.style.display = "";
  }
  const titles = {
    dashboard: "Dashboard",
    alunos: "Alunos",
    busca: "Busca Avançada",
    modalidades: "Alunos por Modalidade",
    tabelaCompleta: "📋 Tabela Completa de Alunos",
  };
  document.getElementById("pageTitle").textContent = titles[view] || view;
  if (view === "dashboard") atualizarDashboard();
}

// ===== FUNÇÃO PARA GERAR TABELA COMPLETA COM FILTROS =====
function gerarTabelaCompletaComFiltros() {
  // Usar os alunos já filtrados (alunosFiltrados)
  let filtrados =
    alunosFiltrados && alunosFiltrados.length > 0 ? alunosFiltrados : alunos;

  // Mudar para a view da tabela
  mudarView("tabelaCompleta");

  // Atualizar info dos filtros
  const filtroInfo = document.getElementById("tabelaFiltroInfo");

  // Coletar informações dos filtros atuais
  const turma = document.getElementById("filtroTurma")?.value;
  const modalidade = document.getElementById("filtroModalidade")?.value;
  const turnoAula = document.getElementById("filtroTurnoAula")?.value;
  const turnoTreino = document.getElementById("filtroTurnoTreino")?.value;
  const sexo = document.getElementById("filtroSexo")?.value;
  const status = document.getElementById("filtroStatus")?.value;
  const nome = document.getElementById("searchNome")?.value;
  const idadeMin = document.getElementById("filtroIdadeMin")?.value;
  const idadeMax = document.getElementById("filtroIdadeMax")?.value;
  const dia = document.getElementById("filtroDia")?.value;
  const horario = document.getElementById("filtroHorario")?.value;

  let infoText = "";
  if (turma) infoText += ` | Turma: ${turma}`;
  if (modalidade) infoText += ` | Modalidade: ${modalidade}`;
  if (turnoAula) infoText += ` | Turno Aula: ${turnoAula}`;
  if (turnoTreino) infoText += ` | Turno Treino: ${turnoTreino}`;
  if (sexo) infoText += ` | Sexo: ${sexo}`;
  if (status === "apto") infoText += " | ✅ Apto";
  else if (status === "suspenso") infoText += " | ❌ Suspenso";
  else if (status === "incompativel") infoText += " | ⚠️ Incompatível";
  if (nome) infoText += ` | Nome contém: "${nome}"`;
  if (idadeMin) infoText += ` | Idade ≥ ${idadeMin}`;
  if (idadeMax) infoText += ` | Idade ≤ ${idadeMax}`;
  if (dia) infoText += ` | Dia: ${dia}`;
  if (horario) infoText += ` | Horário: ${horario}`;

  if (infoText) {
    filtroInfo.textContent = `Filtros aplicados: ${infoText}`;
    filtroInfo.style.display = "inline-block";
  } else {
    filtroInfo.textContent = "Todos os alunos";
    filtroInfo.style.display = "inline-block";
  }

  // Salvar para uso no PDF
  alunosFiltradosTabela = filtrados;

  // Renderizar a tabela
  renderizarTabelaCompleta(filtrados);
}

// ===== FUNÇÃO PARA RENDERIZAR A TABELA COMPLETA =====
function renderizarTabelaCompleta(alunosArray) {
  const container = document.getElementById("tabelaCompletaContainer");
  if (!container) return;

  const alunosOrdenados = ordenarAlunosPorNome(alunosArray || alunos);
  const dataAtual = gerarDataAtualFormatada();

  let html = `
    <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #2c3e50; padding-bottom: 15px;">
        <h3 style="color: #2c3e50;">🏫 CENTRO EDUCACIONAL DE BARRA NOVA</h3>
        <p style="color: #666; font-size: 14px;">LISTA COMPLETA DE ALUNOS</p>
        <p style="color: #999; font-size: 12px;">Gerado em: ${dataAtual} | Total de alunos: ${alunosOrdenados.length}</p>
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #2c3e50; color: white;">
              <th style="padding: 10px 12px; text-align: left; border: 1px solid #34495e;">NOME</th>
              <th style="padding: 10px 12px; text-align: left; border: 1px solid #34495e;">DATA NASC.</th>
              <th style="padding: 10px 12px; text-align: center; border: 1px solid #34495e;">IDADE</th>
              <th style="padding: 10px 12px; text-align: center; border: 1px solid #34495e;">CPF</th>
              <th style="padding: 10px 12px; text-align: left; border: 1px solid #34495e;">MODALIDADES</th>
            </tr>
          </thead>
          <tbody>
  `;

  alunosOrdenados.forEach((aluno, index) => {
    const dataNasc = aluno.dataNascimento
      ? new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")
      : "N/I";
    const cpfFormatado = aluno.cpf
      ? aluno.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : "N/I";
    const modalidadesLista =
      aluno.modalidades && aluno.modalidades.length > 0
        ? aluno.modalidades
            .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
            .join(", ")
        : "Nenhuma";
    const rowColor = index % 2 === 0 ? "#f9f9f9" : "white";

    html += `
      <tr style="background: ${rowColor};">
        <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: 500;">${aluno.nome}</td>
        <td style="padding: 8px 12px; border: 1px solid #ddd;">${dataNasc}</td>
        <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">${aluno.idade}</td>
        <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; font-family: monospace;">${cpfFormatado}</td>
        <td style="padding: 8px 12px; border: 1px solid #ddd; font-size: 12px;">${modalidadesLista}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
      <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 11px;">
        <p>Centro Educacional de Barra Nova - Sistema de Gestão Esportiva</p>
        <p>Documento gerado automaticamente em ${dataAtual}</p>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Variável para armazenar os alunos filtrados da tabela
let alunosFiltradosTabela = [];

// ===== FUNÇÃO PARA GERAR PDF DA TABELA COMPLETA =====
function gerarPDFTabelaCompleta() {
  const alunosParaPDF =
    alunosFiltradosTabela.length > 0 ? alunosFiltradosTabela : alunos;
  const alunosOrdenados = ordenarAlunosPorNome(alunosParaPDF);
  const dataAtual = gerarDataAtualFormatada();

  let tabelaHTML = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Tabela Completa de Alunos - Centro Educacional de Barra Nova</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; background: white; }
      .header { text-align: center; margin-bottom: 25px; border-bottom: 3px solid #2c3e50; padding-bottom: 15px; }
      .header h1 { color: #2c3e50; font-size: 22px; }
      .header p { color: #666; font-size: 14px; margin-top: 5px; }
      .header .total { color: #999; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
      th { background: #2c3e50; color: white; padding: 10px 12px; text-align: left; border: 1px solid #34495e; }
      td { padding: 8px 12px; border: 1px solid #ddd; }
      tr:nth-child(even) { background: #f9f9f9; }
      .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 11px; }
      .col-modalidades { font-size: 12px; }
      .col-cpf { text-align: center; font-family: monospace; }
      .col-idade { text-align: center; }
      @media print { body { padding: 20px; } th { background: #2c3e50 !important; color: white !important; } }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>🏫 CENTRO EDUCACIONAL DE BARRA NOVA</h1>
      <p>LISTA COMPLETA DE ALUNOS</p>
      <p class="total">Gerado em: ${dataAtual} | Total de alunos: ${alunosOrdenados.length}</p>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">NOME</th>
          <th style="width: 15%;">DATA NASC.</th>
          <th style="width: 8%; text-align: center;">IDADE</th>
          <th style="width: 15%; text-align: center;">CPF</th>
          <th style="width: 37%;">MODALIDADES</th>
        </tr>
      </thead>
      <tbody>
  `;

  alunosOrdenados.forEach((aluno) => {
    const dataNasc = aluno.dataNascimento
      ? new Date(aluno.dataNascimento).toLocaleDateString("pt-BR")
      : "N/I";
    const cpfFormatado = aluno.cpf
      ? aluno.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : "N/I";
    const modalidadesLista =
      aluno.modalidades && aluno.modalidades.length > 0
        ? aluno.modalidades
            .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
            .join(", ")
        : "Nenhuma";

    tabelaHTML += `
      <tr>
        <td><strong>${aluno.nome}</strong></td>
        <td>${dataNasc}</td>
        <td class="col-idade">${aluno.idade}</td>
        <td class="col-cpf">${cpfFormatado}</td>
        <td class="col-modalidades">${modalidadesLista}</td>
      </tr>
    `;
  });

  tabelaHTML += `
      </tbody>
    </table>
    <div class="footer">
      <p>Centro Educacional de Barra Nova - Sistema de Gestão Esportiva</p>
      <p>Documento gerado automaticamente em ${dataAtual}</p>
    </div>
  </body>
  </html>`;

  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `tabela_completa_alunos_${dataAtual.replace(/\//g, "-")}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
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
      const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);
      return `<div class="aluno-card" onclick="abrirCardAluno(${aluno.id})"><div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><div class="aluno-info"><h4>${aluno.nome} ${alertaBadge}</h4><p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p><p><i class="fas fa-clock"></i> ${aluno.turma}</p><p><i class="fas fa-calendar-week"></i> Treinos: ${diasTreinoTexto}</p><div class="aluno-badges">${aluno.modalidades.map((m) => `<span class="badge badge-modalidade">${m.substring(0, 15)}</span>`).join("")}${statusBadge}</div></div></div>`;
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
  const turnoAula = document.getElementById("filtroTurnoAula")?.value;
  if (turnoAula) filtrados = filtrados.filter((a) => a.turno === turnoAula);
  const turnoTreino = document.getElementById("filtroTurnoTreino")?.value;
  if (turnoTreino) {
    filtrados = filtrados.filter((a) => {
      if (!a.diasTreino || a.diasTreino.length === 0) return false;
      const primeiroHorario = a.diasTreino[0].horario;
      const isMatutino =
        primeiroHorario.includes("07") ||
        primeiroHorario.includes("08") ||
        primeiroHorario.includes("09") ||
        primeiroHorario.includes("10");
      const isVespertino =
        primeiroHorario.includes("13") ||
        primeiroHorario.includes("14") ||
        primeiroHorario.includes("15") ||
        primeiroHorario.includes("16");
      if (turnoTreino === "MATUTINO") return isMatutino;
      if (turnoTreino === "VESPERTINO") return isVespertino;
      return false;
    });
  }
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
    "filtroTurnoAula",
    "filtroTurnoTreino",
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
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        diasTreinoResumo = aluno.diasTreino.map((d) => `${d.dia}`).join(" / ");
      } else {
        diasTreinoResumo = "N/D";
      }
      let horariosResumo = "";
      if (aluno.diasTreino && aluno.diasTreino.length > 0) {
        horariosResumo = aluno.diasTreino
          .map((d) => `${d.horario}`)
          .join(" | ");
      } else {
        horariosResumo = "N/D";
      }
      return `<div class="aluno-card" onclick="abrirCardAluno(${aluno.id})"><div class="aluno-foto" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user-graduate" style="font-size: 60px; color: white;"></i></div><div class="aluno-info"><h4>${aluno.nome} ${alertaBadge}</h4><p><i class="fas fa-calendar-alt"></i> ${aluno.idade} anos | ${aluno.sexo}</p><p><i class="fas fa-clock"></i> ${horariosResumo} | ${aluno.turma}</p><p><i class="fas fa-calendar-week"></i> Dias: ${diasTreinoResumo}</p><p><i class="fas fa-chart-line"></i> Média: ${mediaFormatada}</p><div class="aluno-badges">${aluno.modalidades
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
  const turnoAulaFiltro = document.getElementById("filtroTurnoAula")?.value;
  const turnoTreinoFiltro = document.getElementById("filtroTurnoTreino")?.value;

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
    statusFiltro ||
    turnoAulaFiltro ||
    turnoTreinoFiltro
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
    if (turnoAulaFiltro)
      alunosParaFrequencia = alunosParaFrequencia.filter(
        (a) => a.turno === turnoAulaFiltro,
      );
    if (turnoTreinoFiltro) {
      alunosParaFrequencia = alunosParaFrequencia.filter((a) => {
        if (!a.diasTreino || a.diasTreino.length === 0) return false;
        const primeiroHorario = a.diasTreino[0].horario;
        const isMatutino =
          primeiroHorario.includes("07") ||
          primeiroHorario.includes("08") ||
          primeiroHorario.includes("09") ||
          primeiroHorario.includes("10");
        const isVespertino =
          primeiroHorario.includes("13") ||
          primeiroHorario.includes("14") ||
          primeiroHorario.includes("15") ||
          primeiroHorario.includes("16");
        if (turnoTreinoFiltro === "MATUTINO") return isMatutino;
        if (turnoTreinoFiltro === "VESPERTINO") return isVespertino;
        return false;
      });
    }
  } else {
    alunosParaFrequencia = alunos;
  }

  if (alunosParaFrequencia.length === 0) {
    alert("Nenhum aluno encontrado para gerar a lista de frequência!");
    return;
  }

  const alunosOrdenados = ordenarAlunosPorNome(alunosParaFrequencia);
  const dataAtual = DATA_REFERENCIA;
  const dataFormatada = gerarDataAtualFormatada();
  const horaAtual = gerarHoraAtualFormatada();
  const diasSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const diaSemana = diasSemana[dataAtual.getDay()];

  let tituloFiltro = "";
  if (currentModalidadeSelecionada)
    tituloFiltro = ` - Modalidade: ${currentModalidadeSelecionada.toUpperCase()}`;
  if (turmaFiltro) tituloFiltro += ` - Turma: ${turmaFiltro}`;
  if (diaFiltro) tituloFiltro += ` - Dia: ${diaFiltro}`;
  if (horarioFiltro) tituloFiltro += ` - Horário: ${horarioFiltro}`;
  if (turnoAulaFiltro) tituloFiltro += ` - Turno Aula: ${turnoAulaFiltro}`;
  if (turnoTreinoFiltro)
    tituloFiltro += ` - Turno Treino: ${turnoTreinoFiltro}`;

  let tabelaHTML = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Lista de Frequência - Centro Educacional de Barra Nova</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Courier New', Courier, monospace; margin: 10px; padding: 10px; font-size: 11px; background: white; }
      @media print { body { margin: 0; padding: 8px; } thead { display: table-header-group; } tr { page-break-inside: avoid; } }
      .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 12px; }
      h1 { color: #2c3e50; font-size: 18px; margin-bottom: 5px; text-transform: uppercase; }
      .subtitle { color: #555; font-size: 12px; margin-bottom: 3px; }
      .info-session { background: #f5f5f5; padding: 8px 12px; margin-bottom: 15px; border-left: 4px solid #2c3e50; font-size: 10px; }
      .table-container { overflow-x: auto; margin: 15px 0; }
      table { width: 100%; border-collapse: collapse; font-size: 10px; table-layout: auto; }
      th { background: #2c3e50; color: white; padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-weight: bold; }
      td { padding: 8px 6px; border: 1px solid #ddd; vertical-align: middle; }
      .col-numero { width: 35px; text-align: center; }
      .col-nome { width: 30%; min-width: 180px; }
      .col-turma { width: 12%; min-width: 80px; }
      .col-idade { width: 8%; min-width: 50px; text-align: center; }
      .col-status { width: 12%; min-width: 85px; text-align: center; }
      .col-presenca, .col-ausencia { width: 60px; text-align: center; }
      tr:nth-child(even) { background: #f9f9f9; }
      .checkbox-placeholder { display: inline-block; width: 22px; height: 22px; border: 2px solid #333; border-radius: 4px; text-align: center; line-height: 18px; font-size: 12px; font-weight: bold; }
      .badge-status { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 9px; font-weight: bold; }
      .badge-suspenso { background: #e74c3c; color: white; }
      .badge-apto { background: #27ae60; color: white; }
      .footer { margin-top: 25px; padding-top: 15px; border-top: 1px solid #ccc; font-size: 9px; color: #666; text-align: center; }
      .assinatura { margin-top: 30px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
      .assinatura-item { text-align: center; min-width: 180px; }
      .linha-assinatura { border-top: 1px solid #333; margin-top: 25px; padding-top: 5px; width: 100%; }
      .obs-box { margin-top: 20px; padding: 10px; border: 1px solid #ccc; background: #fafafa; }
      .obs-box p { margin: 5px 0; }
      .aluno-detalhe { font-size: 9px; color: #888; display: block; margin-top: 3px; }
      @media (max-width: 800px) { .col-nome { min-width: 150px; } .col-turma { min-width: 60px; } td, th { padding: 5px 3px; } }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>📍 CENTRO EDUCACIONAL DE BARRA NOVA</h1>
      <div class="subtitle">LISTA DE FREQUÊNCIA - TREINAMENTO ESPORTIVO</div>
      <div class="subtitle">"Compromisso com o esporte e a educação"</div>
    </div>
    <div class="info-session">
      <strong>📅 DATA:</strong> ${dataFormatada} (${diaSemana}) &nbsp;&nbsp;|&nbsp;&nbsp;
      <strong>⏰ HORA DE GERAÇÃO:</strong> ${horaAtual} &nbsp;&nbsp;|&nbsp;&nbsp;
      <strong>👨‍🏫 PROFESSOR:</strong> _________________________ &nbsp;&nbsp;|&nbsp;&nbsp;
      <strong>🏫 TURNO:</strong> ${horarioFiltro?.includes("13") || horarioFiltro?.includes("14") || horarioFiltro?.includes("15") || horarioFiltro?.includes("16") ? "VESPERTINO" : "MATUTINO"}
    </div>
    <div class="info-session" style="background:#e8f4fd;">
      <strong>🎯 INFORMAÇÕES DO TREINO:${tituloFiltro}</strong>
      <span style="margin-left:15px;">👥 Total de Alunos: ${alunosOrdenados.length}</span>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="col-numero">#</th>
            <th class="col-nome">NOME COMPLETO</th>
            <th class="col-turma">TURMA</th>
            <th class="col-idade">IDADE</th>
            <th class="col-status">STATUS</th>
            <th class="col-presenca">✅ PRESENTE</th>
            <th class="col-ausencia">❌ AUSENTE</th>
          </tr>
        </thead>
        <tbody>`;

  alunosOrdenados.forEach((aluno, index) => {
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "APTO" : "SUSPENSO";
    const statusClass = isApto ? "badge-apto" : "badge-suspenso";
    const diasTreinoTexto = formatarDiasTreino(aluno.diasTreino);

    tabelaHTML += `
          <tr>
            <td class="col-numero">${index + 1}</td>
            <td class="col-nome">
              <strong>${aluno.nome}</strong>
              <span class="aluno-detalhe">${diasTreinoTexto.substring(0, 40)}${diasTreinoTexto.length > 40 ? "..." : ""}</span>
            </td>
            <td class="col-turma">${aluno.turma}</td>
            <td class="col-idade">${aluno.idade}</td>
            <td class="col-status"><span class="badge-status ${statusClass}">${statusText}</span></td>
            <td class="col-presenca"><span class="checkbox-placeholder"></span></td>
            <td class="col-ausencia"><span class="checkbox-placeholder"></span></td>
          </tr>`;
  });

  tabelaHTML += `
        </tbody>
      </table>
    </div>
    <div class="obs-box">
      <p><strong>📋 OBSERVAÇÕES E INSTRUÇÕES:</strong></p>
      <p>1. Marcar ✅ no campo "PRESENTE" para alunos que compareceram ao treino.</p>
      <p>2. Marcar ❌ no campo "AUSENTE" para alunos que não compareceram.</p>
      <p>3. Alunos com status "SUSPENSO" NÃO podem treinar durante o período de suspensão.</p>
      <p>4. Em caso de atestado médico, anexar à lista e registrar na coordenação.</p>
      <p>5. Esta lista deve ser entregue à coordenação APÓS o treino.</p>
    </div>
    <div class="assinatura">
      <div class="assinatura-item"><div class="linha-assinatura"></div><p>Assinatura do Professor</p></div>
      <div class="assinatura-item"><div class="linha-assinatura"></div><p>Assinatura da Coordenação</p></div>
    </div>
    <div class="footer">
      <p>Centro Educacional de Barra Nova - Esporte na Escola | Gerado automaticamente em ${dataFormatada} às ${horaAtual}</p>
      <p>Este documento é válido como registro de frequência para o treino do dia.</p>
    </div>
  </body>
  </html>`;

  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  const nomeArquivo = `lista_frequencia_${dataFormatada.replace(/\//g, "-")}_${horarioFiltro || currentModalidadeSelecionada || "geral"}`;
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

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
  const turnoAulaFiltro = document.getElementById("filtroTurnoAula")?.value;
  const turnoTreinoFiltro = document.getElementById("filtroTurnoTreino")?.value;

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
    statusFiltro ||
    turnoAulaFiltro ||
    turnoTreinoFiltro
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
    if (turnoAulaFiltro)
      alunosParaFrequencia = alunosParaFrequencia.filter(
        (a) => a.turno === turnoAulaFiltro,
      );
    if (turnoTreinoFiltro) {
      alunosParaFrequencia = alunosParaFrequencia.filter((a) => {
        if (!a.diasTreino || a.diasTreino.length === 0) return false;
        const primeiroHorario = a.diasTreino[0].horario;
        const isMatutino =
          primeiroHorario.includes("07") ||
          primeiroHorario.includes("08") ||
          primeiroHorario.includes("09") ||
          primeiroHorario.includes("10");
        const isVespertino =
          primeiroHorario.includes("13") ||
          primeiroHorario.includes("14") ||
          primeiroHorario.includes("15") ||
          primeiroHorario.includes("16");
        if (turnoTreinoFiltro === "MATUTINO") return isMatutino;
        if (turnoTreinoFiltro === "VESPERTINO") return isVespertino;
        return false;
      });
    }
  } else {
    alunosParaFrequencia = alunos;
  }

  if (alunosParaFrequencia.length === 0) {
    alert("Nenhum aluno encontrado para gerar a lista de frequência mensal!");
    return;
  }

  const alunosOrdenados = ordenarAlunosPorNome(alunosParaFrequencia);
  const dataAtual = DATA_REFERENCIA;
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();
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
  const dataFormatada = gerarDataAtualFormatada();
  const horaAtual = gerarHoraAtualFormatada();

  let tituloFiltro = "";
  if (currentModalidadeSelecionada)
    tituloFiltro = ` - Modalidade: ${currentModalidadeSelecionada.toUpperCase()}`;
  if (turmaFiltro) tituloFiltro += ` - Turma: ${turmaFiltro}`;
  if (horarioFiltro) tituloFiltro += ` - Horário: ${horarioFiltro}`;
  if (turnoAulaFiltro) tituloFiltro += ` - Turno Aula: ${turnoAulaFiltro}`;
  if (turnoTreinoFiltro)
    tituloFiltro += ` - Turno Treino: ${turnoTreinoFiltro}`;

  let tabelaHTML = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Frequência Mensal - ${mesFormatado}/${anoSelecionado} - Centro Educacional de Barra Nova</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @media print { body { margin: 0; padding: 0.5cm; } .tabela-wrapper { overflow-x: visible !important; } table { width: 100% !important; } }
      body { font-family: 'Segoe UI', Arial, sans-serif; background: white; padding: 15px; font-size: 10px; margin: 0 auto; }
      .header { text-align: center; margin-bottom: 15px; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; }
      .header h1 { color: #2c3e50; font-size: 16px; margin-bottom: 5px; }
      .header .subtitle { color: #666; font-size: 11px; }
      .info-session { background: #f0f4f8; padding: 8px 12px; margin-bottom: 12px; border-left: 4px solid #2c3e50; font-size: 9px; }
      .legenda { background: #f9f9f9; padding: 6px 10px; margin-bottom: 12px; border: 1px solid #ddd; font-size: 8px; display: flex; flex-wrap: wrap; gap: 12px; }
      .tabela-wrapper { width: 100%; overflow-x: auto; overflow-y: visible; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; -webkit-overflow-scrolling: touch; }
      table { border-collapse: collapse; font-size: 9px; width: auto; min-width: 100%; background: white; table-layout: auto; }
      th { background: #2c3e50; color: white; padding: 8px 4px; border: 1px solid #34495e; font-weight: bold; white-space: nowrap; }
      td { padding: 6px 4px; border: 1px solid #ddd; vertical-align: middle; }
      .col-nome { background: #f8f9fc; font-weight: bold; text-align: left; min-width: 180px; max-width: 220px; white-space: normal; word-wrap: break-word; }
      .col-info, .col-info-pequena { min-width: 50px; text-align: center; white-space: nowrap; }
      .col-info-pequena { min-width: 40px; }
      .col-dia { min-width: 32px; text-align: center; white-space: nowrap; }
      .nome-aluno { font-weight: bold; font-size: 10px; color: #2c3e50; word-break: break-word; }
      .info-aluno { font-size: 7px; color: #888; margin-top: 2px; display: block; }
      .checkbox { display: inline-block; width: 14px; height: 14px; border: 1.5px solid #333; border-radius: 2px; background: white; }
      .status-badge { display: inline-block; padding: 2px 5px; border-radius: 10px; font-size: 7px; font-weight: bold; white-space: nowrap; }
      .status-apto { background: #27ae60; color: white; }
      .status-suspenso { background: #e74c3c; color: white; }
      .semana { font-size: 6px; font-weight: normal; color: #ecf0f1; display: block; }
      .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; font-size: 7px; text-align: center; color: #666; }
      .assinatura { display: flex; justify-content: space-between; margin-top: 25px; flex-wrap: wrap; gap: 15px; }
      .assinatura-item { text-align: center; flex: 1; min-width: 150px; }
      .linha { border-top: 1px solid #333; margin-top: 20px; padding-top: 4px; }
      .obs { background: #fef9e6; padding: 8px; margin-top: 15px; border-left: 3px solid #f39c12; font-size: 7px; }
      .suspenso-row { opacity: 0.6; background: #ffebee; }
      @media (max-width: 1000px) { .col-nome { min-width: 160px; } .col-dia { min-width: 28px; } td, th { padding: 4px 2px; } }
      @media (max-width: 800px) { .col-nome { min-width: 140px; } .nome-aluno { font-size: 9px; } }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>🏫 CENTRO EDUCACIONAL DE BARRA NOVA</h1>
      <div class="subtitle">LISTA DE FREQUÊNCIA MENSAL - TREINAMENTO ESPORTIVO</div>
      <div class="subtitle"><strong>${mesFormatado.toUpperCase()} / ${anoSelecionado}</strong></div>
    </div>
    <div class="info-session">
      <strong>📅 GERADO EM:</strong> ${dataFormatada} às ${horaAtual} |
      <strong>👨‍🏫 PROFESSOR:</strong> _________________________ |
      <strong>👥 TOTAL:</strong> ${alunosOrdenados.length} alunos |
      <strong>📆 DIAS:</strong> ${diasNoMes}
      ${tituloFiltro ? `<br><strong>🎯 FILTROS:</strong> ${tituloFiltro}` : ""}
    </div>
    <div class="legenda">
      <span>✅ <strong>PRESENTE</strong> - Marcar ✓</span>
      <span>❌ <strong>AUSENTE</strong> - Marcar ✗</span>
      <span>⚕️ <strong>ATESTADO</strong> - Marcar A</span>
      <span>🔴 <strong>SUSPENSO</strong> - Não pode treinar</span>
    </div>
    <div class="tabela-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-nome">NOME DO ALUNO</th>
            <th class="col-info">TURMA</th>
            <th class="col-info-pequena">IDADE</th>
            <th class="col-info">STATUS</th>`;

  for (const dia of diasDoMes) {
    tabelaHTML += `<th class="col-dia">${dia.dia}<span class="semana">${dia.diaSemana}</span></th>`;
  }

  tabelaHTML += `
          </tr>
        </thead>
        <tbody>`;

  for (const aluno of alunosOrdenados) {
    const isApto = aluno.status === "apto";
    const statusText = isApto ? "APTO" : "SUSPENSO";
    const statusClass = isApto ? "status-apto" : "status-suspenso";
    const rowClass = !isApto ? "suspenso-row" : "";

    tabelaHTML += `
          <tr class="${rowClass}">
            <td class="col-nome">
              <div class="nome-aluno">${aluno.nome}</div>
              <span class="info-aluno">${aluno.turma} | ${aluno.idade} anos</span>
            </td>
            <td class="col-info">${aluno.turma}</td>
            <td class="col-info-pequena">${aluno.idade}</td>
            <td class="col-info"><span class="status-badge ${statusClass}">${statusText}</span></td>`;

    for (let i = 0; i < diasNoMes; i++) {
      tabelaHTML += `<td class="col-dia"><span class="checkbox"></span></td>`;
    }

    tabelaHTML += `
          </tr>`;
  }

  tabelaHTML += `
        </tbody>
      </table>
    </div>
    <div class="assinatura">
      <div class="assinatura-item"><div class="linha"></div><p>Assinatura do Professor</p><p style="font-size:6px;">Data: ___/___/_____</p></div>
      <div class="assinatura-item"><div class="linha"></div><p>Assinatura da Coordenação</p><p style="font-size:6px;">Data: ___/___/_____</p></div>
    </div>
    <div class="footer">
      <p>Centro Educacional de Barra Nova - "Esporte que transforma vidas"</p>
      <p>Gerado em ${dataFormatada} - Referência: ${mesFormatado}/${anoSelecionado}</p>
    </div>
  </body>
  </html>`;

  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  const nomeArquivo = `frequencia_mensal_${mesFormatado.toLowerCase()}_${anoSelecionado}_${horarioFiltro || currentModalidadeSelecionada || "geral"}`;
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function gerarPDFTabela(alunosArray, nomeArquivo) {
  const dataAtual = gerarDataAtualFormatada();
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
  tabelaHTML += `</tbody></table><div class="footer">Total de alunos: ${alunosOrdenados.length}</div></body></html>`;
  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}_${dataAtual.replace(/\//g, "-")}.html`;
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
  const dataAtual = gerarDataAtualFormatada();
  let tabelaHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Alunos de ${modalidade} - Centro Educacional de Barra Nova</title><style>body{font-family:Arial,sans-serif;margin:20px;}h1{text-align:center;color:#2c3e50;font-size:20px;margin-bottom:5px;}.subtitle{text-align:center;color:#666;font-size:12px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;margin-top:20px;}th{background:#2c3e50;color:white;padding:10px;text-align:left;border:1px solid #ddd;font-size:11px;}td{padding:8px;border:1px solid #ddd;font-size:10px;}tr:nth-child(even){background:#f9f9f9;}.footer{margin-top:20px;text-align:center;font-size:9px;color:#999;}.status-apto{color:#27ae60;font-weight:bold;}.status-suspenso{color:#e74c3c;font-weight:bold;}.inconsistencia{color:#f44336;font-weight:bold;}</style></head><body><h1>Centro Educacional de Barra Nova</h1><div class="subtitle">Alunos inscritos em ${modalidade.toUpperCase()} - Gerado em ${dataAtual}</div><table><thead><tr><th>ID</th><th>NOME</th><th>STATUS</th><th>PERÍODO SUSPENSÃO</th><th>IDADE</th><th>SEXO</th><th>TURMA</th><th>DIAS/HORÁRIOS</th><th>OUTRAS MODALIDADES</th><th>INCONSISTÊNCIA</th></tr></thead><tbody>`;
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
  tabelaHTML += `</tbody></table><div class="footer">Total de alunos: ${alunosOrdenados.length}</div></body></html>`;
  const blob = new Blob([tabelaHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `alunos_${modalidade}_${dataAtual.replace(/\//g, "-")}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}

console.log(
  "Sistema inicializado com sucesso! Data de referência: 01/01/2026. Total de alunos: " +
    (alunos ? alunos.length : 0),
);
