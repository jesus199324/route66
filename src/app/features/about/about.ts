import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

interface Pillar {
  icon: IconName;
  title: string;
  text: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'r66-about',
  imports: [Icon, RevealDirective, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly pillars: Pillar[] = [
    {
      icon: 'flame',
      title: 'Smash de verdad',
      text: 'Bollitos de carne fresca aplastados contra la plancha a 230 °C. Costra crocante afuera, jugosa adentro.',
    },
    {
      icon: 'wheat',
      title: 'Pan de la casa',
      text: 'Brioche con 24 horas de fermentación, horneado cada mañana y tostado con manteca al momento.',
    },
    {
      icon: 'milk',
      title: 'Shakes de diner',
      text: 'Tres bochas de helado artesanal, leche entera y crema batida. Se toman con pajita… y paciencia.',
    },
  ];

  protected readonly stats: Stat[] = [
    { value: '180 g', label: 'de carne por medallón' },
    { value: '24 h', label: 'de fermentación del pan' },
    { value: '3', label: 'bochas por milkshake' },
    { value: '0', label: 'congelados en la cocina' },
  ];
}
