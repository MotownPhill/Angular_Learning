import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public http: HttpClient) { }

  getEmployees() {
    return this.http.get('http://localhost:8080/getEmployees').pipe(map((response) => {
      //console.log("response11111",response);
      return response;
    }))

  }

  getEmployee(key) {
    let data = { "key": key };
    return this.http.get('http://localhost:8080/getEmployee', { params: { param: key } }).pipe(map((response) => {
      //console.log("response11111",response);
      return response;
    }))

  }


  addEmployee(name, dob, position_held) {
    var data = {
      name: name,
      date_of_birth: dob,
      position_held: position_held
    };
    //console.log("addEmployee", JSON.stringify(data));
    return this.http.put('http://localhost:8080/addEmployee', data);

  }

  authenticate = function (username, password) {
    var data = { "username": username, "password": password };
    return this.http.put('http://localhost:8080/authenticate', data);
  }

  deleteEmployee() {

  }


}
