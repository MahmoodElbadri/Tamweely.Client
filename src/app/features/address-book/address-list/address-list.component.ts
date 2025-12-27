import { Component, inject, OnInit } from '@angular/core';
import { AddressBookService } from '../../address-book/services/address-book.service';
import { Router } from '@angular/router';
import { AddressBookDto } from '../../models/address-book-dto';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [ DatePipe, RouterModule ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnInit {
  //injections
  addressService = inject(AddressBookService);
  router = inject(Router);

  //variables
  addresses: AddressBookDto[] = [];

  ngOnInit(): void {
    this.getAllAddressBooks();
  }

  getAllAddressBooks() {
    return this.addressService.getAllAddressBooks().subscribe({
      next: (res) => {
        this.addresses = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
