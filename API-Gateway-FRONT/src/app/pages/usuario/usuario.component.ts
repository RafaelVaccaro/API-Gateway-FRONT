import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  encapsulation: ViewEncapsulation.None  // Desabilita o encapsulamento de estilo
})
export class UsuarioComponent implements OnInit {


  usuario = {
    name: '',
    email: ''
  };

  displayedColumns: string[] = ['id', 'nome', 'email', 'actions']; // Definindo as colunas a serem exibidas
  dataSource = new MatTableDataSource<any>(); // A dataSource que será usada para preencher a tabela

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios(); // Carregar usuários ao inicializar o componente
  }

  carregarUsuarios(): void {
    const url = 'http://localhost:8080/user'; // Substitua pela URL do seu backend
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Usuários carregados com sucesso!', response);
        this.dataSource.data = response.content; // Atualizando a dataSource com os dados da resposta (assumindo que o retorno tem um campo "content")
        this.dataSource.paginator = this.paginator; // Aplicando o paginator
        this.dataSource.sort = this.sort; // Aplicando o sort
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
        alert('Erro ao carregar usuários.');
      }
    });
  }

  registrarUsuario(): void {
    const url = 'http://localhost:8080/user'; // Substitua pela URL do seu backend
    this.http.post(url, this.usuario).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.carregarUsuarios(); // Atualiza a lista de usuários após o registro
        this.usuario = { name: '', email: '' }; // Reseta o formulário
      },
      error: (err) => {
        console.error('Erro ao registrar usuário:', err);
        alert('Erro ao registrar usuário.');
      }
    });
  }

  deletarUsuario(id: number): void {
    const url = `http://localhost:8080/user/${id}`; // Substitua pela URL do seu backend
    this.http.delete(url).subscribe({
      next: (response) => {
        console.log('Usuário deletado com sucesso!', response);
        this.carregarUsuarios(); // Atualiza a lista de usuários após a exclusão
      },
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
        alert('Erro ao deletar usuário.');
      }
    });
  }
}
