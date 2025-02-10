import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Suporte para ngModel
import { HttpClientModule } from '@angular/common/http'; // Necessário para requisições HTTP

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ProdutoComponent } from './pages/produto/produto.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { CardUsuarioComponent } from './shared/card-usuario/card-usuario.component';
import { CardProdutoComponent } from './shared/card-produto/card-produto.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './shared/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CardPedidoComponent } from './shared/card-pedido/card-pedido.component';
import { ModalProdutosDePedidoComponent } from './shared/modal-produtos-de-pedido/modal-produtos-de-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsuarioComponent,
    ProdutoComponent,
    PedidoComponent,
    CardUsuarioComponent,
    CardProdutoComponent,
    ModalComponent,
    CardPedidoComponent,
    ModalProdutosDePedidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
