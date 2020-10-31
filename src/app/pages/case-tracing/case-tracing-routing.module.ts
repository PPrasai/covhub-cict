import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../@auth/guards/auth.guard';

import { CaseTracingComponent } from './case-tracing.component';
import { PositivesComponent } from './positives/positives.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '',
    component: PositivesComponent,
  }
  ,
  {
    canActivate: [AuthGuard],
    path: 'tracing',
    component: CaseTracingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseTracingRoutingModule { }

export const routedComponents = [
  CaseTracingComponent
];
