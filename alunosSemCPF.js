import { ALUNOS_CADASTRADOS } from "./alunosData.js";

const cpf = ALUNOS_CADASTRADOS;

function alunosSemCPF() {
  const alunosSemCPF = cpf.filter((aluno) => aluno.cpf === "SemCPF");
  console.log("Alunos sem CPF:");
  console.log(alunosSemCPF);
}
alunosSemCPF();

const quantidadeAlunosSemCPF = cpf.filter(
  (aluno) => aluno.cpf === "SemCPF",
).length;
console.log(`Quantidade de alunos sem CPF: ${quantidadeAlunosSemCPF}`);
