import { Component, inject, OnInit } from '@angular/core';
import { AddressBookService } from '../../address-book/services/address-book.service';
import { Router } from '@angular/router';
import { AddressBookDto } from '../models/address-book-dto';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  toastr = inject(ToastrService);

  //variables
  addresses: AddressBookDto[] = [];
  imageUrl = environment.imageApiUrl;

  ngOnInit(): void {
    this.getAllAddressBooks();
  }

  onDelete(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-2', // Style valid for your Bootstrap/Custom CSS
        cancelButton: 'btn btn-secondary mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true // Puts "Cancel" on the left, "Delete" on the right
    }).then((result) => {
      
      if (result.isConfirmed) {
        // User clicked "Yes", so we call the API
        this.addressService.deleteAddressBook(id).subscribe({
          next: () => {
            // 1. Show success message (using Toastr to keep it quick)
            this.toastr.success('Address deleted successfully');
            
            // 2. Refresh the list (remove item from array locally to avoid API call)
            this.addresses = this.addresses.filter(a => a.id !== id);
          },
          error: (err) => {
            this.toastr.error('Failed to delete address');
            console.error(err);
          }
        });
      }
    });
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
