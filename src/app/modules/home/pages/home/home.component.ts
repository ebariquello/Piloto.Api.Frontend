import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/internal/Subject';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { WorkflowModel } from 'app/core/services/workflow/workflow.model';
import { BaseRowEventModel } from 'app/shared/models/base.model';
import { checkErrorMessage } from 'app/core/helpers/toaster-error.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit() {}
}
