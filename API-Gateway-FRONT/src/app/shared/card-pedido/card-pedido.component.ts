import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalProdutosDePedidoComponent } from "../modal-produtos-de-pedido/modal-produtos-de-pedido.component";

@Component({
  selector: 'app-card-pedido',
  templateUrl: './card-pedido.component.html',
  styleUrls: ['./card-pedido.component.scss']
})
export class CardPedidoComponent {
  @Input() pedido!: { id: number; userId: number; totalPrice: number; createdAt: string };
  @Output() pedidoDeletado = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  deletarPedido(): void {
    this.pedidoDeletado.emit(this.pedido.id); // Emite o ID do usuário para o componente pai
  }

  openDialog(): void {
    this.dialog.open(ModalProdutosDePedidoComponent, {
      data: { orderId: this.pedido.id }
    });
  }
}
