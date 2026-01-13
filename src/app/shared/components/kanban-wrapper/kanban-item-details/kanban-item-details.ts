import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  model,
  output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JobDetails } from '../../../models/kanban.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-kanban-item-details',
  imports: [
    DialogModule,
    CurrencyPipe,
    ButtonModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './kanban-item-details.html',
  styleUrl: './kanban-item-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItemDetails {
  onSave = output<any>();
  onClose = output<boolean>();

  jobDetails = signal<JobDetails>({} as JobDetails);
  headerName = computed(() => (this.editJobDetails() ? 'Edit' : this.jobDetails().jobName));

  editJobDetails = signal<boolean>(false);
  showDialog = model<boolean>(false);

  jobForm = new FormGroup({
    jobName: new FormControl(''),
    offerUrl: new FormControl(''),
    meetingUrl: new FormControl(''),
    salaryMin: new FormControl(0),
    salaryMax: new FormControl(0),
    additionalInfo: new FormControl(''),
  });

  constructor() {
    // Effect uruchomi się za każdym razem, gdy zmieni się jobDetails()
    effect(() => {
      const details = this.jobDetails();

      // Resetujemy formularz nowymi wartościami
      // reset() jest lepszy niż patchValue tutaj, bo czyści też stan "touched/dirty"
      this.jobForm.reset({
        jobName: details.jobName,
        offerUrl: details.offerUrl,
        meetingUrl: details.meetingUrl,
        salaryMin: details.salaryMin,
        salaryMax: details.salaryMax,
        additionalInfo: details.additionalInfo,
      });
    });
  }

  show(jobDetails: JobDetails) {
    this.jobDetails.set(jobDetails);
    this.showDialog.set(true);
  }

  salaryPeriod() {
    return this.jobDetails().salaryMin <= 50 ? 'month' : 'hour';
  }

  close() {
    this.showDialog.set(false); // To zamknie okno i zaktualizuje zmienną w rodzicu
  }

  edit() {
    this.editJobDetails.set(!this.editJobDetails());
  }

  save() {
    this.editJobDetails.set(false);
    console.log(this.jobForm.value);
    if (this.jobForm.valid) {
      this.jobDetails.set({ ...this.jobDetails(), ...(this.jobForm.value as JobDetails) });
      const result = {
        id: this.jobDetails().id,
        jobName: this.jobDetails().jobName,
        offerUrl: this.jobDetails().offerUrl,
        meetingUrl: this.jobDetails().meetingUrl,
        salaryMin: this.jobDetails().salaryMin,
        salaryMax: this.jobDetails().salaryMax,
        salaryPeriod: this.salaryPeriod(),
        additionalInfo: this.jobDetails().additionalInfo,
      };
      console.log('Zapisano dane:', result);
      this.onSave.emit(result);
    }
    // this.close();
  }
}
