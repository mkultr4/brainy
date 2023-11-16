import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { appRoutingDesign } from './routes/routes-design';
import { appRoutingDev } from './routes/routes-dev';

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(
        environment.envName === 'design' ? appRoutingDesign : appRoutingDev,
        { enableTracing: environment.enableTracing }
    );
