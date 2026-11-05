import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/config/site.config';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'r66-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
  protected readonly instagramUrl = `https://instagram.com/${SITE.instagram}`;
  protected readonly whatsappUrl = `https://wa.me/${SITE.whatsapp}`;
}
