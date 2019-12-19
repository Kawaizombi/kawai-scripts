### GM Http backend

Provides angular http backend based on GM_xmlhttpRequest

### Usage

```typescript
import { Injectable, NgModule } from "@angular/core"; 
import { HttpBackend,HttpClient, HttpClientModule } from "@angular/common/http";
import GMBackend from '@kawai-scripts/gm-http-backend';

@NgModule({
  imports: [HttpClientModule],
  providers: [{provide: HttpBackend, useClass: GMBackend}]
})
class App {
  
}

@Injectable()
class Service {
  constructor(private http: HttpClient) {}

  doRequest() {
    this.http.get('example.com').subscribe((res) => {/* do awesome things  */});
  }
}
```

### Achtung!!!

If `this.http.get('example.com').subscribe(callback)` don't trigger callback, but 
`this.http.get('example.com', { observe: "events" }).subscribe(callback)` works try add this code to your webpack config
```typescript
module.exports = {
  resolve: {
      alias: {
        '@angular': path.resolve(__dirname, './node_modules/@angular'),
      }
    }
}
```
