import { CurrencyPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
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
  show = model<boolean>(false);
  onSave = output<any>();
  onClose = output<boolean>();

  jobDetails = model<JobDetails>({} as JobDetails);
  headerName = computed(() => (this.editJobDetails() ? 'Edit' : this.jobDetails().jobName));

  editJobDetails = signal<boolean>(false);

  jobForm = new FormGroup({
    jobName: new FormControl(this.jobDetails().jobName),
    offerUrl: new FormControl(this.jobDetails().offerUrl),
    meetingUrl: new FormControl(this.jobDetails().meetingUrl),
    salaryMin: new FormControl(this.jobDetails().salaryMin),
    salaryMax: new FormControl(this.jobDetails().salaryMax),
    additionalInfo: new FormControl(this.jobDetails().additionalInfo),
  });

  salaryPeriod() {
    return this.jobDetails().salaryMin <= 50 ? 'month' : 'hour';
  }

  close() {
    this.show.set(false); // To zamknie okno i zaktualizuje zmienną w rodzicu
  }

  edit() {
    this.editJobDetails.set(!this.editJobDetails());
  }

  save() {
    this.editJobDetails.set(false);
    console.log(this.jobForm.value);
    if (this.jobForm.valid) {
      this.jobDetails.set(this.jobForm.value as JobDetails);
      const result = {
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
