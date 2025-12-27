import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AddressBookDto } from '../../models/address-book-dto';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  //injections
  private http = inject(HttpClient);

  //variables
  apiUrl = environment.apiUrl;

  createAddressBook(model: any) {
    return this.http.post(`${this.apiUrl}address-book`, model);
  }

  updateAddressBook(model: any) {
    return this.http.put(`${this.apiUrl}address-book`, model);
  }

  getAllAddressBooks() {
    return this.http.get<AddressBookDto[]>(`${this.apiUrl}address-book`);
  }
}
