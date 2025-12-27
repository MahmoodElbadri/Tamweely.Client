import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AddressBookDto } from '../../address-book/models/address-book-dto';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Department } from '../../address-book/models/department';
import { JobTitle } from '../../address-book/models/jobTitle';
import { AddressBookService } from '../../address-book/services/address-book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, BsDatepickerModule, RouterLink, RouterLink],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  //injections
  addressService = inject(AddressBookService);
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  //variables
  addAddressForm!: FormGroup;
  addAddressDto: AddressBookDto;
  depts: Department[] = [];
  jobTitles: JobTitle[] = [];
  isEdit: boolean = false;
  id!: number;

  constructor() {
    this.addAddressDto = {
      id: 0,
      fullname: '',
      mobileNumber: '',
      dateOfBirth: new Date(),
      address: '',
      email: '',
      photoPath: '',
      jobTitleName: '',
      departmentName: '',
      age: 0,
    };
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id && this.id > 0) {
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
  this.initializingAddAddressForm();
  this.getAllDepts();
  this.getAllJobTitles();

  if (this.isEdit) {
    this.addressService.getAddressBook(this.id).subscribe({
      next: (res) => {
        const dataToPatch = { ...res };

        if (dataToPatch.dateOfBirth) {
          dataToPatch.dateOfBirth = new Date(dataToPatch.dateOfBirth);
        }

        this.addAddressForm.patchValue(dataToPatch);
      },
      error: (error) => {
        this.toastr.error(error.message);
      },
    });
  }
}

  bsConfig = {
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD',
    containerClass: 'theme-green',
  };

  getAllDepts() {
    this.addressService.getAllDepartments().subscribe({
      next: (res) => {
        this.depts = res;
      },
      error: (error) => {
        this.toastr.error(error.message);
      },
    });
  }

  getAllJobTitles() {
    this.addressService.getAllJobs().subscribe({
      next: (res) => {
        this.jobTitles = res;
      },
      error: (error) => {
        this.toastr.error(error.message);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Store the file object in the form control
      this.addAddressForm.patchValue({
        photo: file,
      });

      // Update validity to ensure the validator knows a file is selected
      this.addAddressForm.get('photo')?.updateValueAndValidity();
    }
  }

  initializingAddAddressForm() {
    this.addAddressForm = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')],
      ],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      photo: ['', [Validators.required]],
      jobTitleId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
    });
  }

onSubmit() {
  if (!this.addAddressForm.valid) {
    this.addAddressForm.markAllAsTouched();
    this.toastr.warning('Please fill all required fields');
    return;
  }

  const payload = this.prepareFormData();

  if (this.isEdit) {
    this.handleUpdate(payload);
  } else {
    this.handleCreate(payload);
  }
}

private prepareFormData(): FormData {
  const formData = new FormData();
  const controls = this.addAddressForm.controls;

  formData.append('fullname', controls['fullname'].value?.trim() || '');
  formData.append('email', controls['email'].value?.trim() || '');
  formData.append('address', controls['address'].value?.trim() || '');
  formData.append('mobileNumber', controls['mobileNumber'].value?.trim() || '');
  formData.append('jobTitleId', controls['jobTitleId'].value);
  formData.append('departmentId', controls['departmentId'].value);

  const dobValue = controls['dateOfBirth'].value;
  if (dobValue) {
    const dob = new Date(dobValue);
    formData.append('dateOfBirth', dob.toISOString());
  }
  const file = controls['photo'].value;
  if (file) {
    formData.append('photo', file);
  }

  return formData;
}

private handleUpdate(payload: FormData) {
  this.addressService.updateAddressBook(this.id, payload).subscribe({
    next: () => {
      this.toastr.success('Address Updated Successfully ');
      this.router.navigate(['/address-book']);
    },
    error: (error) => {
      console.error(error);
      this.toastr.error(error?.message || 'Failed to update address ');
    },
  });
}

private handleCreate(payload: FormData) {
  this.addressService.createAddressBook(payload).subscribe({
    next: () => {
      this.toastr.success('Address Added Successfully');
      this.router.navigate(['/address-book']);
    },
    error: (err) => {
      console.error(err);
      this.toastr.error(err?.message || 'Failed to add address');
    },
  });
}

}
