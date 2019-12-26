import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { BlockerService } from './blocker.service';
import { BlockButtonComponent } from './block-button.component';

@NgModule({
  declarations: [BlockButtonComponent],
  entryComponents: [BlockButtonComponent],
  providers: [BlockerService],
  imports: [
    FontAwesomeModule,
    MatButtonModule,
  ],
})
export class BlockerModule {

}
