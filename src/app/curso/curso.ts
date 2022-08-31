import { OnInit, Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//Classe
export class Curso {
    nomeCurso!: string | null;
    valorCurso!: number | null;
    idCurso!: number;      
}
