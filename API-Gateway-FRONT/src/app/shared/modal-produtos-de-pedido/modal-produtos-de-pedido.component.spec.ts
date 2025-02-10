import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProdutosDePedidoComponent } from './modal-produtos-de-pedido.component';

describe('ModalProdutosDePedidoComponent', () => {
  let component: ModalProdutosDePedidoComponent;
  let fixture: ComponentFixture<ModalProdutosDePedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProdutosDePedidoComponent]
    });
    fixture = TestBed.createComponent(ModalProdutosDePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
