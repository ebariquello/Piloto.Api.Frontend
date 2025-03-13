import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  DetailFlexConditionComponent
} from 'app/modules/flex-condition/pages/detail-flex-condition/detail-flex-condition.component';
import { CreateFlexConditionComponent } from 'app/modules/flex-condition/pages/create-flex-condition/create-flex-condition.component';
import { FlexConditionComponent } from './pages/flex-condition/flex-condition.component';

const routes: Routes = [
  {
    path: '',
    component: FlexConditionComponent
  },
  {
    path: 'detail/:id',
    component: DetailFlexConditionComponent
  },
  {
    path: 'new',
    component: CreateFlexConditionComponent
  },
  {
    path: 'edit/:id',
    component: CreateFlexConditionComponent
  },
  {
    path: 'duplicate/:id',
    component: CreateFlexConditionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlexConditionRoutingModule { }
