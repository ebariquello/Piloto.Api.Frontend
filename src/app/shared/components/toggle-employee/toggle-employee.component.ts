import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-toggle-employee',
  templateUrl: './toggle-employee.component.html',
  styleUrls: ['./toggle-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleEmployeeComponent implements OnInit {

  @Input() employees: string[] = [];

  toggle: (boolean) = false;
  userSelected: string;

  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
  }

  openEmployeeModal(employee: string) {
    this.userSelected = employee;
    this.ngxSmartModalService.getModal('userModal').open();
  }

}
