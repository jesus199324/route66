import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './features/about/about';
import { CartDrawer } from './features/cart-drawer/cart-drawer';
import { ComboFeature } from './features/combo/combo-feature';
import { Hero } from './features/hero/hero';
import { MenuSection } from './features/menu/menu-section';
import { Visit } from './features/visit/visit';
import { Footer } from './layout/footer/footer';
import { Marquee } from './layout/marquee/marquee';
import { Navbar } from './layout/navbar/navbar';
import { Toast } from './layout/toast/toast';

@Component({
  selector: 'r66-root',
  imports: [Navbar, Hero, Marquee, MenuSection, ComboFeature, About, Visit, Footer, CartDrawer, Toast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  protected readonly secondaryMarquee = [
    'Combo Mother Road',
    'Shakes de dulce de leche',
    'Envío gratis desde $ 1.500',
    'Veggie friendly',
    'Pedí por WhatsApp',
  ];
}
