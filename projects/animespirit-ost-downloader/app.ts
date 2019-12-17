import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app',
  template: '<div>app works!</div>'
})
class AppComponent {

}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class App {
}
