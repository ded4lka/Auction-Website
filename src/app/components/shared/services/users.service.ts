import { map, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) { }

    getUserByName(username: string): Observable<IUser> {
        return this.http.get('http://localhost:3000/users?username=${username}')
        .pipe(map((response: any) => response.json()))               // Response -> any
        .pipe(map((user: any[]) => user[0] ? user [0] : undefined)); // User -> any
    }

    createNewUser(user: IUser): Observable<IUser> {
        return this.http.post('http://localhost:3000/users?username=${username}', user).pipe(map((response: any) => response.json()));
    }
}