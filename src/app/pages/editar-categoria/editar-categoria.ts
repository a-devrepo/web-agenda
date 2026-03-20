import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria {

  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP CLIENT
  private http = inject(HttpClient);

  //ACTIVATED ROUTE (capturar variaveis passadas na URL da rota)
  private activatedRoute = inject(ActivatedRoute);

  //Armazenar o id da categoria na URL
  private id: string = '';

  //Função executada ao abrir a página
  ngOnInit() {
    //capturar o id enviado na URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.id);
    //consultar os dados da categoria na API attravés do ID
    this.http.get('http://localhost:8082/api/v1/categorias/' + this.id)
      .subscribe((data: any) => {
        //Preencher o formulário com os dados da categoria
        this.formulario.patchValue(data);
      });
  }

  //Criando o formulário
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required])
  });

  //Criando uma função para fazer o SUBMIT do formulário
  atualizar() {
    //enviando uma requisição PUT para a API da agenda cadastrar a categoria
    this.http.put('http://localhost:8082/api/v1/categorias/' + this.id, this.formulario.value)
      .subscribe({ //aguardando o retorno da API
        next: (data: any) => {
          this.mensagemSucesso.set("Categoria " + data.nome + ", atualizada com sucesso.");
          this.mensagemErro.set(""); //limpando mensagem de erro
        },
        error: (e) => {
          this.mensagemErro.set(e.error.nome);
          this.mensagemSucesso.set("");
        }
      });
  }
}
