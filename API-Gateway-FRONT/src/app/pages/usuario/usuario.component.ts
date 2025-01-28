import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuario = {
    nome: '',
    email: ''
  };

  // Lista de usuários que será usada para gerar os cards
  usuarios: { id: number; nome: string; email: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios(); // Carrega os usuários ao iniciar o componente
  }

  carregarUsuarios(): void {
    const url = 'http://localhost:8080/user'; // Substitua pela URL do seu backend
    this.http.get<{ content: { id: number; nome: string; email: string }[] }>(url).subscribe({
      next: (response) => {
        console.log('Usuários carregados com sucesso!', response);
        this.usuarios = response.content; // Atribuindo apenas o array "content"
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
        alert('Erro ao carregar usuários.');
      }
    });
  }

  registrarUsuario(): void {
    const url = 'http://localhost:8080/user'; // Substitua pela URL do seu backend
    this.http.post<{ id: number; nome: string; email: string }>(url, this.usuario).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.usuarios.push(response); // Adiciona o novo usuário à lista
        this.usuario = { nome: '', email: '' }; // Reseta o formulário
      },
      error: (err) => {
        console.error('Erro ao registrar usuário:', err);
        alert('Erro ao registrar usuário.');
      }
    });
  }

  // Método para deletar o usuário
  deletarUsuario(id: number): void {
    const url = `http://localhost:8080/user/${id}`; // Substitua pela URL do seu backend
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Usuário deletado com sucesso!');
        this.usuarios = this.usuarios.filter((user) => user.id !== id); // Remove o usuário da lista
      },
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
        alert('Erro ao deletar usuário.');
      }
    });
  }
}
