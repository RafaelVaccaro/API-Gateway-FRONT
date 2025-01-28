import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.scss']
})
export class CardUsuarioComponent {
  @Input() usuario!: { id: number; nome: string; email: string };
  @Output() usuarioDeletado = new EventEmitter<number>(); // Emitir o ID do usuário para deletar

  // Método para emitir o evento de deleção
  deletarUsuario(): void {
    this.usuarioDeletado.emit(this.usuario.id); // Emite o ID do usuário para o componente pai
  }
}

