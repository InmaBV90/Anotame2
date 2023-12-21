import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {

  cards = [
    { title: 'Gestión carta/menú', image: './assets/img/ic-carta.png', alt: 'Carta', href: 'gestion-menu-carta' },
    { title: 'Reservas', image: './assets/img/ic_reservas2.png', alt: 'Sala', href: '/gestion-reservas' },
    { title: 'Reseñas', image: './assets/img/ic-reviews.png', alt: 'Reseñas', href: '/reviews' },
    { title: 'Configuración', image: './assets/img/ic-config-usuarios.png', alt: 'Imagen 2', href: '/config-empleados', role: 'administrador' },
  ];
  
  rol!: any;
  isDarkMode: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    public authService: AuthService,
    public themeService: ThemeService,
  ) { 
    this.getUserRole();
    console.log('Rol obtenido:', this.rol);
    this.isDarkMode = this.themeService.isDarkTheme();
  }

  navigateToPage(card: any) {
    this.router.navigateByUrl(card.href);
  }

  showCard(card: { title: string }): boolean {
    const userRole = this.authService.getUserRole();

    switch (userRole) {
      case 'administrador':
        return true;
      case 'encargado':
        return card.title !== 'Ajustes';
      case 'camarero':
        return card.title === 'Carta y/o menú' || card.title === 'Gestión Sala';
      case 'camarero':
        return card.title !== 'Ajustes';
      default:
        return false;
    }
  }

  getUserRole() {
    this.rol = this.authService.getUserRole();

    if (!(this.rol === 'administrador' || this.rol === 'encargado' || this.rol === 'camarero')) {
      this.authService.logout().subscribe(
        () => {

          localStorage.removeItem('role');
          localStorage.removeItem('usuario');

          this.router.navigate(['/inicio']);
        },
        (error) => {
          console.error('Error al cerrar sesion:', error);
        }
      )
    }
  }
  
  mostrarMenu() {
    this.menu.open('first');
  }

  closeMenu() {
    this.menu.close('first'); // Cierra el menú con el identificador 'first'
  }

  // cerrarSesion(): void {
  //   this.authService.logout().subscribe();
  // }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkTheme(this.isDarkMode);
  }
}
