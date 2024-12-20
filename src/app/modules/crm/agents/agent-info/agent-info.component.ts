import { Component, Inject, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CrmService } from 'src/app/shared/services/crm/crm.service';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { EmployeeFormData } from 'src/app/shared/models/employee-data';
import { Countries } from 'src/app/core/constants/country-list';

@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrls: ['./agent-info.component.scss']
})
export class AgentInfoComponent implements OnInit {

  officialTabActive: boolean = true;
  profileImgFile: File;
  profilePic: string | SafeUrl = 'https://onburdstorageaccount.blob.core.windows.net/onburd/public/onburd_fe/assets/onburd-corporate/images/user_profile_icon.svg';

  officialInfoFields: any[];
  officialInfoForm!: FormGroup;
  personalInfoFields: any;
  personalInfoForm!: FormGroup;

  departmentList: any[] = [];
  designationList: any[] = [];
  agentDetails: any;
  loggedInUser: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AgentInfoComponent>,
    private crmService: CrmService,
    private authService: AuthenticationService,     
    private notifyService: NotificationService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    this.loggedInUser = authService.loggedInUser.data;
    // this.agentDetails = this.dialogData.conatctDetails;
    // console.log(this.agentDetails);
    this.personalInfoForm = this.fb.group({})
    this.officialInfoForm = this.fb.group({})
    this.setUpForm();    
  }

  ngOnInit(): void {
    
  }

  setUpForm() {
    this.departmentList = this.dialogData.departmentList;
    this.designationList = this.dialogData.designationList;

    this.officialInfoFields = [
      {
        controlName: 'firstName',
        controlType: 'text',
        controlLabel: 'First Name',
        controlWidth: '48%',
        initialValue: this.agentDetails?.firstName,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'lastName',
        controlType: 'text',
        controlLabel: 'Last Name',
        controlWidth: '48%',
        initialValue: this.agentDetails?.lastName,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'officialEmail',
        controlType: 'text',
        controlLabel: 'Company Email Address',
        controlWidth: '48%',
        initialValue: this.agentDetails?.email,
        validators: [Validators.required, Validators.email],
        order: 3
      },
      {
        controlName: 'phoneNo',
        controlType: 'text',
        controlLabel: 'Phone Number',
        controlWidth: '48%',
        initialValue: this.agentDetails?.phoneNumber,
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'dateOfBirth',
        controlType: 'date',
        controlLabel: 'Date of Birth',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'gender',
        controlType: 'select',
        controlLabel: 'Gender',
        controlWidth: '48%',
        initialValue: this.agentDetails?.gender[0].toUpperCase() + this.agentDetails?.gender.substring(1),
        selectOptions: {
          Male: 'Male',
          Female: 'Female'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'employmentStartDate',
        controlType: 'date',
        controlLabel: 'Employment Start Date',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'employmentType',
        controlType: 'select',
        controlLabel: 'Employment Type',
        controlWidth: '48%',
        initialValue: this.agentDetails?.employmentType,
        selectOptions: {
          Contract: 'Contract',
          Permanent: 'Permanent'
        },
        validators: [Validators.required],
        order: 10
      },
      {
        controlName: 'designation',
        controlType: 'select',
        controlLabel: 'Designation',
        controlWidth: '48%',
        initialValue: this.agentDetails?.designationId,
        selectOptions: this.arrayToObject(this.designationList, 'designationName'),
        validators: [Validators.required],
        order: 11
      },
      {
        controlName: 'department',
        controlType: 'select',
        controlLabel: 'Department',
        controlWidth: '48%',
        initialValue: this.agentDetails?.departmentId,
        selectOptions: this.arrayToObject(this.departmentList, 'departmentName'),
        validators: [Validators.required],
        order: 7
      },
      {
        controlName: 'role',
        controlType: 'text',
        controlLabel: 'Role',
        controlWidth: '48%',
        initialValue: this.agentDetails?.companyRole,
        validators: [Validators.required],
        order: 8
      },
    ]

    this.personalInfoFields = [
      {
        controlName: 'personalEmail',
        controlType: 'text',
        controlLabel: 'Personal Email Address',
        controlWidth: '48%',
        initialValue: this.agentDetails?.personalEmail,
        validators: [Validators.email],
        order: 1
      },
      {
        controlName: 'personalPhoneNo',
        controlType: 'text',
        controlLabel: 'Personal Phone Number',
        controlWidth: '48%',
        initialValue: this.agentDetails?.personalPhone,
        validators: [],
        order: 2
      },
      {
        controlName: 'address',
        controlType: 'text',
        controlLabel: 'House Address',
        controlWidth: '100%',
        initialValue: this.agentDetails?.address,
        validators: [],
        order: 3
      },
      {
        controlName: 'city',
        controlType: 'text',
        controlLabel: 'City',
        controlWidth: '48%',
        initialValue: this.agentDetails?.city,
        validators: [],
        order: 4
      },
      {
        controlName: 'country',
        controlType: 'select',
        controlLabel: 'Country',
        controlWidth: '48%',
        initialValue: this.agentDetails?.country,
        selectOptions: this.createCountryOptions(),
        validators: [],
        order: 5
      },
      {
        controlName: 'maritalStatus',
        controlType: 'select',
        controlLabel: 'Marital Status',
        controlWidth: '48%',
        initialValue: this.agentDetails?.maritalStatus,
        selectOptions: {
          Single: 'Single',
          Married: 'Married',
          Divorced: 'Divorced',
          Widow: 'Widow',
          Widower: 'Widower'
        },
        validators: [],
        order: 6
      },
      {
        controlName: 'nationality',
        controlType: 'select',
        controlLabel: 'Nationality',
        controlWidth: '48%',
        initialValue: this.agentDetails?.nationality,
        selectOptions: this.createCountryOptions(),
        validators: [],
        order: 7
      },
      {
        controlName: 'nextOfKinName',
        controlType: 'text',
        controlLabel: 'Next of Kin Name',
        controlWidth: '48%',
        initialValue: this.agentDetails?.nextOfKinFullName,
        validators: [],
        order: 8
      },
      {
        controlName: 'nextOfKinRelationship',
        controlType: 'text',
        controlLabel: 'Next of Kin Relationship',
        controlWidth: '48%',
        initialValue: this.agentDetails?.nextOfKinRelationship,
        validators: [],
        order: 9
      },
      {
        controlName: 'nextOfKinPhoneNo',
        controlType: 'text',
        controlLabel: 'Next of Kin Phone No',
        controlWidth: '48%',
        initialValue: this.agentDetails?.nextOfKinPhoneNumber,
        validators: [],
        order: 10
      },
      {
        controlName: 'nextOfKinAddress',
        controlType: 'text',
        controlLabel: 'Next of Kin Address',
        controlWidth: '48%',
        initialValue: this.agentDetails?.nextOfKinAddress,
        validators: [],
        order: 11
      },
    ]

    this.officialInfoFields.sort((a,b) => (a.order - b.order));
    this.personalInfoFields.sort((a,b) => (a.order - b.order));

    this.officialInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.officialInfoForm.addControl(field.controlName, formControl)
    });
    this.personalInfoFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.personalInfoForm.addControl(field.controlName, formControl)
    });
  }

  profilePicUpload(event) {
    this.profileImgFile = event.target.files[0];
    this.profilePic = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(event.target.files[0])
    );
    // this.fileName = this.employeesFile.name;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  //Converts an array to an Object of key value pairs
  arrayToObject(arrayVar, key:string) {
    let reqObj = {}
    reqObj = arrayVar.reduce((agg, item, index) => {
      agg[item['_id']] = item[key];
      return agg;
    }, {})
    //console.log(reqObj);
    return reqObj;
  }

  createCountryOptions() {
    let reqObj = {}
    reqObj = Countries.reduce((agg, item, index) => {
      agg[item['label']] = item['label'];
      return agg;
    }, {})
    //console.log(reqObj);
    return reqObj;
  }

  // Convert dd-mm-yyyy to date object
  convertToDate(dateString: any) {
    let d = dateString.split("-");
    let newFormat = new Date(d[2] + '-' + d[1] + '-' + d[0]);
    return newFormat;     
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('profilePhoto', this.profileImgFile);
    formData.append('firstName', this.officialInfoForm.value.firstName);
    formData.append('lastName', this.officialInfoForm.value.lastName);
    formData.append('email', this.officialInfoForm.value.officialEmail);
    formData.append('phoneNumber', this.officialInfoForm.value.phoneNo);
    formData.append('dateOfBirth', this.datePipe.transform(this.officialInfoForm.value.dateOfBirth, 'dd-M-yyyy'));
    formData.append('gender', this.officialInfoForm.value.gender);
    formData.append('departmentId', this.officialInfoForm.value.department);
    formData.append('companyRole', this.officialInfoForm.value.role);
    formData.append('employmentStartDate', this.datePipe.transform(this.officialInfoForm.value.employmentStartDate, 'dd-M-yyyy'));
    formData.append('employmentType', this.officialInfoForm.value.employmentType);
    formData.append('designationId', this.officialInfoForm.value.designation);
    formData.append('agent', 'true');

    formData.append('personalEmail', this.personalInfoForm.value.personalEmail ? this.personalInfoForm.value.personalEmail : '');
    formData.append('personalPhone', this.personalInfoForm.value.personalPhoneNo ? this.personalInfoForm.value.personalPhoneNo : '');
    formData.append('address', this.personalInfoForm.value.address ? this.personalInfoForm.value.address : '');
    formData.append('city', this.personalInfoForm.value.city ? this.personalInfoForm.value.city : '');
    formData.append('country', this.personalInfoForm.value.country ? this.personalInfoForm.value.country : '');
    formData.append('maritalStatus', this.personalInfoForm.value.maritalStatus ? this.personalInfoForm.value.maritalStatus : '');
    formData.append('nationality', this.personalInfoForm.value.nationality ? this.personalInfoForm.value.nationality : '');
    formData.append('nextOfKinFullName', this.personalInfoForm.value.nextOfKinName ? this.personalInfoForm.value.nextOfKinName : '');
    formData.append('nextOfKinRelationship', this.personalInfoForm.value.nextOfKinRelationship ? this.personalInfoForm.value.nextOfKinRelationship : '');
    formData.append('nextOfKinPhoneNumber', this.personalInfoForm.value.nextOfKinPhoneNo ? this.personalInfoForm.value.nextOfKinPhoneNo : '');
    formData.append('nextOfKinAddress', this.personalInfoForm.value.nextOfKinAddress ? this.personalInfoForm.value.nextOfKinAddress : '');

    if(this.dialogData.isExisting) {
      // this.hrService.updateEmployeeByAdmin(formData, this.employeeDetails._id).subscribe({
      //   next: res => {
      //     // console.log(res);
      //     if(res.status == 200) {
      //       this.notifyService.showSuccess('This employee has been updated successfully');
      //       this.dialogRef.close();
      //     }
      //     //this.getPageData();
      //   },
      //   error: err => {
      //     console.log(err)
      //     this.notifyService.showError(err.error.error);
      //   } 
      // })
    }
    else {
      this.crmService.createAgent(formData).subscribe({
        next: res => {
          // console.log(res);
          if(res.status == 200) {
            this.notifyService.showSuccess('This agent has been created successfully');
            this.dialogRef.close();
          }
          //this.getPageData();
        },
        error: err => {
          console.log(err)
          this.notifyService.showError(err.error.error);
        } 
      })
    }
  }

}
