import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private host = 'http://13.233.129.21:8060'
  private url: string = '';

  constructor(private http: HttpClient) { }

  registerUser(data: any) {
    this.url = this.host + '/Login/RegisterUser';
    return this.http.post(this.url, data);
  }

  loginUser(username, password) {
    this.url = this.host + '/Login/Login?userName=' + username + '&password=' + password;
    return this.http.get(this.url);
  }


  checkUserName(userName) {
    this.url = this.host + '/User/CheckUserName?userName=' + userName
    return this.http.get(this.url);
  }

}
