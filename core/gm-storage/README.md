### GM storage

Wrapper around `GM_getValue`, `GM_setValue`, `GM_deleteValue`, `GM_listValues`

### Usage

```javascript
import GMStorage from "@kawai-scripts/gm-storage";

const storage = new GMStorage();


storage.setValue('flag', true);

storage.getValue('flag');

storage.listValues(); // => ['flag'] 

storage.deleteValue('flag');
```
