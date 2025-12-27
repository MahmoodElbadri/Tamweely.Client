import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AddressBookDto} from '../models/address-book-dto';
import {Department} from '../models/department';
import {JobTitle} from '../models/jobTitle';

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

  updateAddressBook(id: number, model: FormData) {
    return this.http.put(`${this.apiUrl}address-book/${id}`, model);
  }

  getAddressBook(id: number) {
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

  //string? term, DateTime? from, DateTime? to

  searchForAddress(term: string = '', from?: Date | null, to?: Date | null) {

    // 1. Initialize Params
    let params = new HttpParams();

    if (term) {
      params = params.set('term', term);
    }
    if (from) {
      params = params.set('from', from.toISOString());
    }
    if (to) {
      params = params.set('to', to.toISOString());
    }

    return this.http.get<AddressBookDto[]>(`${this.apiUrl}address-book/search`, {params});
  }

  exportAsExcel(term: string = '', from?: Date | null, to?: Date | null){
    let params = new HttpParams();

    if (term) {
      params = params.set('term', term);
    }
    if (from) {
      params = params.set('from', from.toISOString());
    }
    if (to) {
      params = params.set('to', to.toISOString());
    }

    return this.http.get<Blob>(`${this.apiUrl}address-book/asExcel`, {
      params,
      responseType: 'blob' as 'json' // This helps TypeScript understand the response type
    });
  }
}
