import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { GridModule } from 'app/shared/components/grid/grid.module';
import { WorkflowService } from 'app/core/services/workflow/workflow.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, GridModule],
})
export class HomeModule {}
