import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AddressBookDto } from '../models/address-book-dto';
import { Department } from '../models/department';
import { JobTitle } from '../models/jobTitle';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  //injections
  private http = inject(HttpClient);

  //variables
  apiUrl = environment.apiUrl;

  createAddressBook(model: FormData) {
    return this.http.post(`${this.apiUrl}address-book`, model);
  }

  updateAddressBook(id: number,model: FormData) {
    return this.http.put(`${this.apiUrl}address-book/${id}`, model);
  }

  getAddressBook(id: number){
    return this.http.get<AddressBookDto>(`${this.apiUrl}address-book/${id}`);
  }

  getAllAddressBooks() {
    return this.http.get<AddressBookDto[]>(`${this.apiUrl}address-book`);
  }

  getAllDepartments() {
    return this.http.get<Department[]>(`${this.apiUrl}Departments`);
  }

  getAllJobs() {
    return this.http.get<JobTitle[]>(`${this.apiUrl}Jobs`);
  }

  deleteAddressBook(id: number) {
    return this.http.delete(`${this.apiUrl}address-book/${id}`);
  }
}
