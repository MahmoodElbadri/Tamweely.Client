export interface AddressBookAdd{
  /*
  public string Fullname { get; set; }
public string MobileNumber { get; set; }
public DateTime DateOfBirth { get; set; }
public string Address { get; set; }
public string Email { get; set; }
public IFormFile? Photo { get; set; }
public int JobTitleId { get; set; }
public int DepartmentId { get; set; }
   */
  fullname: string;
  mobileNumber: string;
  dateOfBirth: string;
  address: string;
  email: string;
  photo: string;
  jobTitleId: number;
  departmentId: number;
}
