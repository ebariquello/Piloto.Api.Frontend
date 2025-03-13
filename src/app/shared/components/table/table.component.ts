import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { BaseRowEventModel } from 'app/shared/models/base.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {

  /**
   * Required - Table headers (<th>)
   */
  @Input() tableHeaders: string[];

  /**
   * Required - The property name that will show in the columns of the table
   * in order of appearance. Must be the same property name of tableData
   */
  @Input() tableRows: string[];

  /**
   * Observable of table data
   * If your data isn`t an Observable use tableData
   */
  @Input() tableData$: Observable<any[]>;

  /**
   * Table data
   * Use this if your table data isn`n an Observable
   */
  @Input() tableData: any[] = [];

  /**
   * Actions that need to trigger an click event and emit a value
   * You should insert the icon class name and add its code on the CSS icons file
   */
  @Input() tableActions: { iconName: string, iconTitle: string }[];

  /**
   * This sends the index of the triggered action
   */
  @Output() sendActionEmitter = new EventEmitter<BaseRowEventModel>();

  private tableDataSubscription: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.tableData$) {
      this.tableDataSubscription = this.tableData$.subscribe(value => {
        this.tableData = value;
        this.changeDetection.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    if (this.tableDataSubscription) {
      this.tableDataSubscription.unsubscribe();
    }
  }

  /**
   * Send action to father component
   * @param Row object from the table row selected
   * @param ActionIndex action index
   */
  sendAction(Row: any, ActionIndex: number): void {
    this.sendActionEmitter.emit({ Row, ActionIndex });
  }

}
