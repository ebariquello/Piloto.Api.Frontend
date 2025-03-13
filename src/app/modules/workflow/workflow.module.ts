import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { WorkflowService } from 'app/core/services/workflow/workflow.service';


@NgModule({
  declarations: [WorkflowComponent],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    GridModule,
  ],
  providers: [
    WorkflowService
  ]
})
export class WorkflowModule { }
