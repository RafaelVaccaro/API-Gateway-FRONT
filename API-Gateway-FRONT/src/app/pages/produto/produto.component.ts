import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  produto = {
    name: '',
    description: '',
    price: '',
    stock: ''
  };

  produtos: { id: number; name: string; description: string; price: number; stock: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarProdutos(); // Carrega os usuários ao iniciar o componente
  }

  carregarProdutos() {
    const url = 'http://localhost:8080/product';
    this.http.get<{ content: { id: number; name: string; description: string; price: number; stock: number}[] }>(url).subscribe({
      next: (response) => {
        console.log('Produtos carregados com sucesso!', response);
        this.produtos = response.content; // Atribuindo apenas o array "content"
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        alert('Erro ao carregar produtos.');
      }
    });
  }

  registrarProduto() {
    const url = 'http://localhost:8080/product';
    this.http.post<{ id: number; name: string; description: string; price: number; stock: number }>(url, this.produto).subscribe({
      next: (response) => {
        console.log('Produto registrado com sucesso!', response);
        this.produtos.push(response);
        this.produto = { name: '', description: '', price: '', stock: '' };
      },
      error: (err) => {
        console.error('Erro ao registrar produto:', err);
        alert('Erro ao registrar produto.');
      }
    });

  }

  deletarProduto(id: number): void {
    const url = `http://localhost:8080/product/${id}`; // Substitua pela URL do seu backend
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Produto deletado com sucesso!');
        this.produtos = this.produtos.filter((product) => product.id !== id); // Remove o usuário da lista
      },
      error: (err) => {
        console.error('Erro ao deletar produto:', err);
        alert('Erro ao deletar produto.');
      }
    });
  }

  clear(): void {
    this.produtos = [];
  }
}
