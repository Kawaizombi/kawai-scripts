import { NgModule } from '@angular/core';
import { BlockListComponent } from './block-list.component';
import { MatFormFieldModule, MatListModule, MatButtonModule, MatInputModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterByTerm } from './filter-by-term.pipe';


@NgModule({
  declarations: [BlockListComponent, FilterByTerm],
  imports: [
    MatFormFieldModule,
    MatListModule,
    ScrollingModule,
    FontAwesomeModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [
    BlockListComponent
  ]
})
export class BlockListModule {

}
