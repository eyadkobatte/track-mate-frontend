import { Injectable } from '@angular/core';
import { User } from 'src/app/home/auth/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  storedUsers: User[] = [];

  constructor(private http: HttpClient) {}

  storeUsers(usersToFind: string[]) {
    this.http
      .post<User[]>(`${environment.apiURL}/users/list`, {
        usersToFind: usersToFind
      })
      .subscribe((users: User[]) => {
        this.storedUsers.push(...users);
        console.log('got users', this.storedUsers);
      });
  }
}
