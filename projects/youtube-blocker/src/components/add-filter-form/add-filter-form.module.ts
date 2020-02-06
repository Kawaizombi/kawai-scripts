import { NgModule } from '@angular/core';
import { AddFilterFormComponent } from './add-filter-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
