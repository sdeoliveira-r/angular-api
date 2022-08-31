
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Curso } from './curso';


@Injectable({
  providedIn: 'root'
})

export class CursoService {

  //URL
  url = "http://localhost/api/php/";

  //Vetor
  vetor: Curso[] = [];

  //Construtor
  constructor(private http: HttpClient) {}

  //Obter todos os cursos
  getCursos() : Observable<Curso[]> {
    return this.http.get(`${this.url}/listar`).pipe(
      map((resposta: any) => {
      this.vetor = resposta['cursos'];
        return this.vetor;
      }),
      catchError(this.handleError)
    )
  }
  

  //Cadastrar curso
  cadastrarCurso(c:Curso) : Observable<Curso[]> {
    return this.http.post(`${this.url}/cadastrar`, {cursos:c}).pipe(
      map((res:any) => {
      this.vetor.push(res['curso']);
        return this.vetor;
      }), 
      catchError(this.handleError)
    )
  }

  //Atualizar curso
  atualizarCurso(c: Curso): Observable<Curso[]> {

    //Executa a alteração via URL
    return this.http.put(`${this.url}/alterar`, {cursos: c}).pipe(

      //Percorre o vetor p/ encontrar o id do curso alterado
      map((res) => {
        const cursoAlterado = this.vetor.find((item) => {
        return item ['idCurso'] === +['idCurso'];
      });

      //Quando encontrado, altera o valor do vetor local
      if(cursoAlterado){
        cursoAlterado['nomeCurso'] = c['nomeCurso'];
        cursoAlterado['valorCurso'] = c['valorCurso'];
      }
      return this.vetor;
      }),
      catchError(this.handleError)
    )
  }
  
  //Remover curso
  removerCurso(id: Curso): Observable<Curso[]> {
    const params = new HttpParams().set('idCurso', id.idCurso.toString());
    return this.http.delete(`${this.url}/excluir`, {params: params}).pipe(
      map((res) => {
        
        const filtro = this.vetor.filter((idFilter) => {
          return +idFilter['idCurso'] !== +[idFilter.idCurso];
        });
        
      return this.vetor = filtro;
    }),
      catchError(this.handleError)
    )
  }
    
  // catchError(this.handleError)
  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      
      //obter erro do lado do cliente
      errorMessage = error.error.message;
    }else{
      //obter erro do lado do cliente
      errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
