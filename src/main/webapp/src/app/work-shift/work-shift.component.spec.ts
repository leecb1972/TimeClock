import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkShiftComponent } from './work-shift.component';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {User} from "../model/User";
import {UserService} from "../user.service";

describe('WorkShiftComponent', () => {
  let component: WorkShiftComponent;
  let fixture: ComponentFixture<WorkShiftComponent>;

  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
  const mockUserService = jasmine.createSpyObj('UserService', ['getUser', 'updateUser', 'createUser']);

  const user: User = {
    firstName: 'testFirst',
    lastName: 'testLast',
    userId: 'test001',
  };
  httpClient.post.and.returnValue(of({}));
  httpClient.get.and.returnValue(of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkShiftComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient},
        {provide: UserService, useValue: mockUserService},
        {provide: FormBuilder, useValue: new FormBuilder()},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShiftComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form and search button', () => {
    const elForm = fixture.nativeElement.querySelector('.form');
    expect(elForm).toBeTruthy();
  });

  it('should search user', () => {
    mockUserService.getUser.and.returnValue(of(user));

    component.userIdCtrl.setValue(user.userId);
    component.search()
    expect(mockUserService.getUser.calls.count()).toBe(1);
    expect(component.user).toBe(user);
    expect(component.searchTriggered).toBeTruthy();
    expect(component.registerTriggered).toBeFalse();
    expect(component.allowRegister).toBeFalse();
  });

  it('should not search user', () => {
    mockUserService.getUser.and.returnValue(of({}));

    component.userIdCtrl.setValue( '');
    component.search()
    expect(component.user).toBeUndefined();
    expect(component.searchTriggered).toBeTruthy();
    expect(component.registerTriggered).toBeFalse();
    expect(component.allowRegister).toBeUndefined();
  });
});
