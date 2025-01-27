import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoPath: string = 'assets/img/LogoLightOFC.png'; // Caminho inicial do logo

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Carregar o tema armazenado no localStorage, se existir
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.onThemeChange(savedTheme);
    } else {
      this.onThemeChange('light'); // Se não tiver tema salvo, inicia com o tema claro
    }
  }

  onThemeChange(theme: string): void {
    const body = document.body;
    console.log(`Theme changed to: ${theme}`);  // Verifique se está logando corretamente

    // Remove as classes de tema existentes
    this.renderer.removeClass(body, 'light-theme');
    this.renderer.removeClass(body, 'dark-theme');

    // Adiciona a nova classe correspondente ao tema selecionado
    this.renderer.addClass(body, `${theme}-theme`);

    // Armazenar o tema no localStorage
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
      this.logoPath = 'assets/img/LogoLightOFC.png'; // Caminho do logo para o tema claro
    } else {
      this.logoPath = 'assets/img/LogoDarkOFC.png'; // Caminho do logo para o tema escuro
    }
  }
}
