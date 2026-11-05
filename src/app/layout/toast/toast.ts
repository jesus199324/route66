import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'r66-toast',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-region" role="status" aria-live="polite">
      @if (toasts.current(); as toast) {
        @for (t of [toast]; track t.id) {
          <div class="toast">
            <span class="toast__icon"><r66-icon name="check" [size]="16" [stroke]="3" /></span>
            {{ t.message }}
          </div>
        }
      }
    </div>
  `,
  styleUrl: './toast.css',
})
export class Toast {
  protected readonly toasts = inject(ToastService);
}
