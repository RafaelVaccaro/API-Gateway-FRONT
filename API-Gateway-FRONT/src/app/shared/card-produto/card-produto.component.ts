import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss']
})
export class CardProdutoComponent {
  @Input() produto!: { id: number; name: string; description: string; price: number; stock: number };
  @Output() produtoDeletado = new EventEmitter<number>();

  deletarProduto(): void {
    this.produtoDeletado.emit(this.produto.id); // Emite o ID do usuário para o componente pai
  }

  openDialog() {

  }
}
