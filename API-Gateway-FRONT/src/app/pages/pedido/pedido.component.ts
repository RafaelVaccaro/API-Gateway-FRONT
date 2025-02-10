import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  pedido = {
    userId: 0,
    orderItems: [
      {
        productId: 0,
        quantity: 1
      }
    ]
  };

  pedidos: { id: number; userId: number; totalPrice: number; createdAt: string }[] = [];
  idsUsuarios: { id: number }[] = [];
  idsProdutos: { id: number }[] = [];
  selectedUserId: number = 0;

  displayedColumns: string[] = ['productId', 'quantity', 'actions'];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarPedidos();
    this.carregarIDsUsuarios();
    this.carregarIDsProdutos();
  }

  carregarPedidos() {
    const url = 'http://localhost:8080/order';
    this.http.get<{ content: { id: number; userId: number; totalPrice: number; createdAt: string }[] }>(url).subscribe({
      next: (response) => {
        console.log('Pedidos carregados:', response);
          this.pedidos = response.content;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        alert('Erro ao carregar pedidos.');
      }
    });
  }

  carregarIDsUsuarios(): void {
    const url = 'http://localhost:8080/user/ids';
    this.http.get<{ id: number }[]>(url).subscribe({
      next: (response) => {
        console.log('IDs usuarios carregados com sucesso!', response);
        this.idsUsuarios = response;
      },
      error: (err) => {
        console.error('Erro ao carregar IDs usuarios:', err);
        alert('Erro ao carregar IDs usuarios.');
      }
    });
  }

  carregarIDsProdutos(): void {
    const url = 'http://localhost:8080/product/ids';
    this.http.get<{ id: number }[]>(url).subscribe({
      next: (response) => {
        console.log('IDs produtos carregados com sucesso!', response);
        this.idsProdutos = response;
      },
      error: (err) => {
        console.error('Erro ao carregar IDs produtos:', err);
        alert('Erro ao carregar IDs produtos.');
      }
    });
  }

  adicionarItem() {
    this.pedido.orderItems = [...this.pedido.orderItems, { productId: 0, quantity: 1 }];
    this.cdr.detectChanges(); // Garante que o Angular detecte a mudança
  }

  deletarItem(index: number) {
    this.pedido.orderItems = this.pedido.orderItems.filter((_, i) => i !== index);
    this.cdr.detectChanges(); // Atualiza a UI
  }

  registrarPedido() {
    this.pedido.userId = this.selectedUserId; // Atualiza o ID do usuário antes de enviar

    const url = 'http://localhost:8080/order';
    console.log('JSON enviado:', JSON.stringify(this.pedido, null, 2)); // Log do JSON correto

    this.http.post<{ id: number; userId: number; totalPrice: number; createdAt: string }>(url, this.pedido).subscribe({
      next: (response) => {
        console.log('Pedido registrado com sucesso!', response);
        this.pedidos.push(response);

        this.pedido = {
          userId: 0, // Se necessário, ajuste conforme seu modelo
          orderItems: [] // Zera a lista de itens do pedido
        };
      },
      error: (err) => {
        console.error('Erro ao registrar pedido:', err);
        alert('Erro ao registrar pedido.');
      }
    });
  }


  deletarPedido(id: number): void {
    const url = `http://localhost:8080/order/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Pedido deletado com sucesso!');
        this.pedidos = this.pedidos.filter((pedido) => pedido.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao deletar pedido:', err);
        alert('Erro ao deletar pedido.');
      }
    });
  }
}
