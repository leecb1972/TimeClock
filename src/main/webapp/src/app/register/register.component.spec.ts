import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RegisterComponent } from './register.component';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {User} from "../model/User";


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  httpClient.post.and.returnValue(of({}));
  httpClient.get.and.returnValue(of({}));
  const mockUserService = jasmine.createSpyObj('UserService', ['getUser', 'updateUser', 'createUser']);

  const user: User = {
    firstName: 'testFirst',
    lastName: 'testLast',
    userId: 'test001',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {provide: HttpClient, useValue: httpClient},
        {provide: FormBuilder, useValue: new FormBuilder()},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not register', () => {
    mockUserService.getUser.and.returnValue(of(user));

    component.firstNameCtrl.setValue(user.firstName);
    component.lastNameCtrl.setValue(user.lastName);
    component.userIdCtrl.setValue("0");
    component.submit()

    expect(mockUserService.getUser.calls.count()).toBe(0);
    expect(mockUserService.createUser.calls.count()).toBe(0);
    expect(component.submitted).toBeTruthy();
  });


  it('should register', () => {
    mockUserService.getUser.and.returnValue(null);
    mockUserService.createUser.and.returnValue(of(user));

    component.firstNameCtrl.setValue(user.firstName);
    component.lastNameCtrl.setValue(user.lastName);
    component.userIdCtrl.setValue(user.userId);
    component.submit()

    expect(mockUserService.getUser.calls.count()).toBe(0);
    expect(component.submitted).toBeTruthy();
    expect(component.user).toEqual(user);
  });
});
