import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, retry, tap } from 'rxjs';
import { IUser, IUserRole } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    user: IUser = {
        id: "",
        username: "",
        password: "",
        email: "",
        role: IUserRole.USER,
        cart: []
    };

    users: IUser[] = [];

    setToken(user: IUser) {
        localStorage.setItem('IsAuthToken', JSON.stringify(user));
        localStorage.setItem('username', user.username);
        localStorage.setItem('userRole', user.role);
    }
    getToken() {
        return localStorage.getItem('IsAuthToken');
    }
    getUsernameToken(): string {
        return localStorage.getItem('username')!;
    }
    getUserRoleToken(): string {
        return localStorage.getItem('userRole')!;
    }
    delToken() {
        localStorage.removeItem('IsAuthToken');
    }
    isLoggedIn() {
        return this.getToken() !== null;
    }

    getUser(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`http://localhost:3000/users/${JSON.parse(this.getToken() as string).id}`).pipe(
        delay(200),
        retry(2),
        tap(users => { this.user = users[0]; })
        )
    }
    login(userInfo: { username: string, password: string }): Observable<IUser[]> {
        return this.http.get<IUser[]>(`http://localhost:3000/users?username=${userInfo.username}`).pipe(
        delay(200),
        retry(2),
        tap((users) => {
            if (users[0].username == userInfo.username && users[0].password == userInfo.password) {
                this.user = users[0]
                this.setToken(this.user)
            }
          })
        )
    }
    logout() {
        window.localStorage.clear();    
    }
    register(userInfo: { username: string, password: string, email: string }): Observable<IUser> {
        let id: string = "id" + Math.random().toString(16).slice(2)
        this.user = {
          id: id,
          username: userInfo.username,
          password: userInfo.password,
          email: userInfo.email,
          role: IUserRole.USER,
          cart: []
        }
        return this.http.post<IUser>(`http://localhost:3000/users`, this.user).pipe(
          delay(200),
          retry(2),
          tap((user) => {
            this.setToken(this.user)
          }))
    }    
    isUserAdmin(): boolean{
        let userRole: string = this.getUserRoleToken();
        //console.log(userRole);
        if (userRole == "ADMIN"){
            //console.log("User role is ADMIN");
            return true;
        }
        else{ 
            //console.log("User role is USER");
            return false;
        }
    }
    getUserByName(username: string): Observable<IUser[]> {
        return this.http.get<IUser[]>(`http://localhost:3000/users?username=${username}`).pipe(
            delay(200),
            retry(2),
            tap()
        )
    }
    addProductToCart(id: number, user: string, cart: number[]){
        let newUser: IUser;
        this.getUserByName(user).subscribe(user => {
            newUser = user[0];
            newUser.cart = cart;
            newUser.cart.push(id);
            this.putNewCartToUser(newUser).subscribe();
            }
        );
    }

    putNewCartToUser(user: {id: string, username: string, password: string,
                        email: string, role: IUserRole, cart: number[],}){
        let newUser: IUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
            cart: user.cart
        };
        return this.http.put<IUser[]>(`http://localhost:3000/users/${newUser.id}`, newUser).pipe(
                delay(200),
                retry(2),
                tap()
                )
    }
                        
}