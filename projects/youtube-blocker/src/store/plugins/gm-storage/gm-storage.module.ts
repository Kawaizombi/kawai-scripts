import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGXS_PLUGINS } from '@ngxs/store';
import { DEFAULT_CONFIG, GM_STORAGE_PLUGIN_CONFIG, GmStoragePlugin } from './gm-storage.plugin';

@NgModule()
export class GmStorageModule {
  static forRoot(config?: typeof DEFAULT_CONFIG): ModuleWithProviders {
    return {
      ngModule: GmStorageModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: GmStoragePlugin,
          multi: true,
        },
        {
          provide: GM_STORAGE_PLUGIN_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
