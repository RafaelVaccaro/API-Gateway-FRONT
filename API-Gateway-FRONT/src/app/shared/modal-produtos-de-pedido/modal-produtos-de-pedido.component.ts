import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-produtos-de-pedido',
  templateUrl: './modal-produtos-de-pedido.component.html',
  styleUrls: ['./modal-produtos-de-pedido.component.scss']
})
export class ModalProdutosDePedidoComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'quantity'];
  dataSource: any[] = [];
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<ModalProdutosDePedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number },
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProdutosDePedido();
  }

  loadProdutosDePedido(): void {
    this.http.get<any>(`http://localhost:8080/order/produtosDePedido/${this.data.orderId}`)
      .subscribe({
        next: (response) => {
          this.dataSource = response.orderItems;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar produtos do pedido:', error);
          this.isLoading = false;
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
