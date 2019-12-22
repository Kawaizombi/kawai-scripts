### Favicon indicator

### Usage

```typescript
import { Injectable, NgModule } from '@angular/core';
import { FaviconModule, FaviconService, Progress } from '@kawai-scripts/favicon-indicator';

@NgModule({
  imports: [FaviconModule],
})
class App {}

@Injectable()
class Service {
  constructor(private faviconService: FaviconService) {}

  someWork() {
    // ...
    this.faviconService.useIcon(new Progress().setPercentage(10));
  }
}
```
