import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  TableStatusEnum,
  TableStatusEnumDescription,
} from 'app/shared/enums/table-status.enum';
import {
  BaseTableModel,
  BaseRowEventModel,
} from 'app/shared/models/base.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T> implements OnInit, OnDestroy {
  /**
   * Required - Table title
   */
  @Input() gridTitle: string;

  /**
   * Required - Table headers (<th>)
   */
  @Input() gridHeaders: string[];

  /**
   * Observable of grid data
   * If your data isn`t an Observable use gridData
   */
  @Input() gridData$: Observable<T[]>;

  /**
   * Required - All grid data
   */
  @Input() gridData: T[] = [];

  /**
   * Required - The property name that will show in the columns of the table
   * in order of appearance. Must be the same property name of gridData
   */
  @Input() gridRows: string[];

  /**
   * Required - Inputs the state of loading
   */
  @Input() gridLoading: boolean = false;

  /**
   * Actions that need to trigger an click event and emit a value
   */
  @Input() gridActions: any[];

  /**
   * Send the index of the triggered action
   */
  @Output() sendActionEmitter = new EventEmitter();

  private gridDataSubscription: Subscription;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.gridData$) {
      this.gridDataSubscription = this.gridData$.subscribe((value) => {
        this.gridData = value;
        this.changeDetection.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    if (this.gridDataSubscription) {
      this.gridDataSubscription.unsubscribe();
    }
  }

  /**
   * Send action to father component
   * @param row
   * @param index
   */
  sendAction(Row: T, ActionIndex: number): void {
    this.sendActionEmitter.emit({ Row, ActionIndex });
  }

  /**
   * Verify if the cell contains the 'aprovado' enum
   * @param value table cell value
   */
  isAprovado(value: string): boolean {
    return value === TableStatusEnumDescription(TableStatusEnum.APROVADO);
  }

  /**
   * Verify if the cell contains the 'reprovado' enum
   * @param value table cell value
   */
  isReprovado(value: string): boolean {
    return value === TableStatusEnumDescription(TableStatusEnum.REPROVADO);
  }
}
