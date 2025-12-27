import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressFormComponent } from '../components/address-form/address-form.component';

const routes: Routes = [
  {
    path: '',
    component: AddressListComponent
  },
  {
    path: 'address-form',
    component: AddressFormComponent
  },
  {
    path: 'address-form/:id',
    component: AddressFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressBookRoutingModule { }
