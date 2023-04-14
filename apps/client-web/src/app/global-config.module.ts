import type { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import type { AppProperties } from './core/properties';
import { APP_PROPERTIES } from './core/properties';
import type { AppConfigs } from './core/config';
import { APP_CONFIGS } from './core/config';

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#F5222D',
  },
};

const appProperties: AppProperties = {
  github: {
    username: 'zsmatrix62',
    repo: 'echoo.app',
  },
  appVersion: '1.0.0',
};

const appConfigs: AppConfigs = {
  ToolsSettingsLocalStoreKey: 'echoo.app.tools.settings',
};

const zorroProviders = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }];
const echooProviders = [
  { provide: APP_PROPERTIES, useValue: appProperties },
  { provide: APP_CONFIGS, useValue: appConfigs },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class GlobalConfigModule {
  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [...zorroProviders, ...echooProviders],
    };
  }
}