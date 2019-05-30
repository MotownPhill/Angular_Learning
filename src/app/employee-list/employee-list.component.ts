import { Component, OnInit , Input , Output,EventEmitter} from '@angular/core';
import { DeleteService } from '../delete.service';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/Operators';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers:[DeleteService]
})
export class EmployeeListComponent implements OnInit {

  @Input() color:string; 
  @Output() employeeClicked:EventEmitter<string> = new EventEmitter<string>();


  position_held:string;
  
  employees:any;
 
  constructor(public deleteService:DeleteService,public http:HttpServiceService) {
       
   }

  ngOnInit() {
      this.refreshEmployee();
  }



  refreshEmployee(){
    this.http.getEmployees().subscribe(
      (data) => {
        console.log("this",this);
        console.log(data);
        this.employees=data; 
  
      })
    // this.employees = employees;
  }

  deleteEmployee(key:number){
     this.deleteService.delete(this.employees,key);
  }
  
}