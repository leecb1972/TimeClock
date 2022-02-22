import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('api/users/all');
  }

  public getUser(userId: string): Observable<User> {
    return this.http.get<User>('api/users/' + userId);
  }

  public updateUser(user: User): void {
    this.http.put('api/users/' + user.userId, user).subscribe(() => {});
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>('api/users/create', user);
  }
}
