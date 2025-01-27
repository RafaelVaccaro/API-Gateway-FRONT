import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuarioComponent} from "./pages/usuario/usuario.component";
import { ProdutoComponent } from "./pages/produto/produto.component";
import { PedidoComponent } from "./pages/pedido/pedido.component";

const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: '', redirectTo: '/usuario', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
