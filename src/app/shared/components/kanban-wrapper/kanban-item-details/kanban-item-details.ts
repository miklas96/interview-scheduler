import { CurrencyPipe } from '@angular/common';
import { Component, model, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-kanban-item-details',
  imports: [DialogModule, CurrencyPipe, ButtonModule],
  templateUrl: './kanban-item-details.html',
  styleUrl: './kanban-item-details.css',
})
export class KanbanItemDetails {
  show = model<boolean>(false);
  jobName = signal<string>('Job');
  offerUrl = signal<string>('sdfsdfsdfsdf');
  meetingUrl = signal<string>('sdfsdfsdfsdf');
  salaryMin = signal<number>(110);
  salaryMax = signal<number>(130);
  onSave = output<any>();
  onClose = output<boolean>();

  salaryPeriod() {
    return this.salaryMin() <= 50 ? 'month' : 'hour';
  }

  close() {
    this.show.set(false); // To zamknie okno i zaktualizuje zmienną w rodzicu
  }

  save() {
    const result = {
      jobName: this.jobName(),
      offerUrl: this.offerUrl(),
      meetingUrl: this.meetingUrl(),
      salaryMin: this.salaryMin(),
      salaryMax: this.salaryMax(),
    };
    this.onSave.emit(result);
    this.close();
  }
}
