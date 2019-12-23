### Favicon indicator

### Usage

```typescript
import { Injectable, NgModule } from '@angular/core';
import { FaviconModule, FaviconService, ProgressIcon } from '@kawai-scripts/favicon-indicator';

@NgModule({
  imports: [FaviconModule],
})
class App {}

@Injectable()
class Service {
  constructor(private faviconService: FaviconService) {}

  someWork() {
    // ...
    this.faviconService.useIcon(new ProgressIcon().setPercentage(10));
  }
}
```
