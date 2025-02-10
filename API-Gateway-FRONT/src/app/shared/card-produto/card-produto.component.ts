import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss']
})
export class CardProdutoComponent {
  @Input() produto!: { id: number; name: string; description: string; price: number; stock: number };
  @Output() produtoDeletado = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {}

  deletarProduto(): void {
    this.produtoDeletado.emit(this.produto.id); // Emite o ID do usuário para o componente pai
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      data: { description: this.produto.description }, // Passa a descrição como dado
    });
  }
}
