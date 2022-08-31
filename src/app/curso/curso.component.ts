import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Curso } from './curso';
import { CursoService } from './curso.service';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})

export class CursoComponent implements OnInit {

    
  //Vetor de cursos
  vetor: Curso[] = [];

  //Objeto da classe Curso
  curso = new Curso();

  error = '';
  success = '';

  //Construtor
  constructor(private curso_servico: CursoService) { }

  //Inicializador
  ngOnInit(): void {
    //Ao iniciar o sistema, deverá listar os cursos
    this.getCursos();
  }

  //Obter todos os Cursos
  getCursos(): void {
    this.curso_servico.getCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    );
  }

  //Cadastrar
  cadastro(c:Curso) {
    this.curso_servico.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //Adicionando dados ao vetor
        this.vetor = res;
        
        //Limpar os campos
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualizar
        this.getCursos();
      }
    )
  }

  //Selecionar curso específico
  selecionarCurso(c: Curso) {
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

  //Alterar
  alterar() {
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res: Curso[]) => {

        //Atualizar vetor
        this.vetor = res;

        //Limpar os valores do objeto
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualiza a listagem
        this.getCursos();
      }
    )
  }

  remover(idCurso: number) {
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res: Curso[]) => {
            
        //Adicionar dados
        this.vetor = res;

        //Limpar
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        //Atualizar
        this.getCursos();
      }
    )
  }
  
  
}

