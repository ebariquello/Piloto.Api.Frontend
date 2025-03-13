import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailModule } from 'app/shared/components/user-detail/user-detail.module';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ToggleEmployeeComponent } from './toggle-employee.component';

describe('ToggleEmployeeComponent', () => {
  let component: ToggleEmployeeComponent;
  let fixture: ComponentFixture<ToggleEmployeeComponent>;

  let modalService: NgxSmartModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleEmployeeComponent ],
      imports: [
        UserDetailModule,
        HttpClientTestingModule,
        NgxSmartModalModule.forChild(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleEmployeeComponent);
    modalService = TestBed.get(NgxSmartModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    const spyModal = spyOn(modalService.getModal('userModal'), 'open');

    component.openEmployeeModal('738679');

    expect(component.userSelected).toBe('738679');
    expect(spyModal).toHaveBeenCalled();
  });
});
