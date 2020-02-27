import { NgModule } from '@angular/core';
import { AddFilterFormComponent } from './add-filter-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [AddFilterFormComponent],
  exports: [AddFilterFormComponent],
  imports: [
    MatFormFieldModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class AddFilterFormModule {

}
