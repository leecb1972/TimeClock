import {async, TestBed} from '@angular/core/testing';
import { UserService } from './user.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from "./model/User";

describe('UserServiceService', () => {

  let service: UserService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
  httpClient.post.and.returnValue(of(new Observable()));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClient}
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //
  // it('should request user generation', () => {
  //
  // //  const service: UserService = TestBed.get(UserService);
  //   let result;
  //   service.getUser(user.userId).subscribe(value => {
  //     result = value;
  //   });
  //
  // //  const req = httpClient.expectOne('api/users');
  //   expect(result.firstName).toEqual(user.firstName);
  //
  //   expect(result.lastName).toEqual(user.lastName);
  // //  req.event(new HttpResponse<boolean>({ body: true }));
  //   httpSpy.verify();
  // });
});
