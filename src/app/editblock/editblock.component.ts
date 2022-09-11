import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";


@Component({
  selector: 'app-editblock',
  templateUrl: './editblock.component.html',
  styleUrls: ['./editblock.component.css']
})
export class EditblockComponent implements OnInit {
  id: number = 0;

  @Input() set userId(value: number) {
    this.id = value;
    this.LoadUserData(value);
    console.log("EVENT @Input() set categoryId(value: " + value + " )");
  }

  failList: string[] = [];

  valueMale: string = "male";
  valueFemale: string = "female";
  valueDiverse: string = "diverse";


  userFirstName: string = "";
  userLastName: string = "";
  userBirthDate: string = "";
  userEmail: string = "";
  userGender: string = "";
  userImage: string = "";


  constructor() {
  }

  ChangeDateStyleGUI2DB(date: string): string {
    const year = date.substring(0, 2)
    const month = date.substring(3, 5)
    const day = date.substring(6, 10)
    return (year + "-" + month + "-" + day)
  }
  ChangeDateStyleDB2GUI(date: string): string {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8, 10)
    return (day + "." + month + "." + year)
  }

  CheckOnlyLettersAndBlank(value: string): boolean {
    const re = /^[A-Z a-z]+$/;
    return (value === "" || re.test(value))
  }

  GetLetterCount(value: string): number {
    return (value.match(/[A-Za-z]/g) || []).length;
  }

  CheckName(value: string): boolean {
    if (!this.CheckOnlyLettersAndBlank(value) || this.GetLetterCount(value) <= 0) {
      return false;
    }
    return true;
  }

  CheckrBirthDate(value: string): boolean {
    return moment(this.userBirthDate, 'DD.MM.YYYY', true).isValid();
  }

  CheckrEmail(value: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  CheckrGender(value: string): boolean {
    switch (value) {
      case this.valueMale:
        return true;
      case this.valueFemale:
        return true;
      case this.valueDiverse:
        return true;
      default:
        return false;
    }
  }


  checkAllInput(): boolean {
    let retValue:boolean = true;
    this.failList = [];
    if (!this.CheckName(this.userFirstName)) {
      this.failList.push("Bitte Korrekten Vornamen Eingeben")
      retValue = false;
    }
    if (!this.CheckName(this.userLastName)) {
      this.failList.push("Bitte Korrekten Nachnamen Eingeben")
      retValue = false;
    }
    if (!this.CheckrBirthDate(this.userBirthDate)) {
      this.failList.push("Bitte ein gültiges Datum Eintragen")
      retValue = false;
    }
    if (!this.CheckrEmail(this.userEmail)) {
      this.failList.push("Bitte ein gültiges Mail Addressed Eintragen")
      retValue = false;
    }
    if (!this.CheckrGender(this.userGender)) {
      this.failList.push("Bitte ein gültiges Geschlecht Eintragen")
      retValue = false;
    }

    return retValue;
  }

  async LoadUserData(id: number) {
    const response = await fetch(
      'https://dummyjson.com/users/' + id
    );
    const data = await response.json();
    this.userFirstName = data.firstName;
    this.userLastName = data.lastName;
    this.userEmail = data.email;
    this.userGender = data.gender;
    this.userImage = data.image;
    this.userBirthDate = this.ChangeDateStyleDB2GUI(data.birthDate);
    console.log(data);
  }

  async AddNewUser() {
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: this.userFirstName,
        lastName: this.userLastName,
        birthDate: this.ChangeDateStyleGUI2DB(this.userBirthDate),
        email: this.userEmail,
        gender: this.userGender,
        image: this.userImage
      })
    })
    const resData = await response.json();
    console.log(resData);
    // Check if fetch OK
    this.failList.push("Benutzer Neu angelegt")
  }
  async UpdateUser() {
    const response = await fetch('https://dummyjson.com/users/' + this.id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: this.userFirstName,
        lastName: this.userLastName,
        birthDate: this.ChangeDateStyleGUI2DB(this.userBirthDate),
        email: this.userEmail,
        gender: this.userGender,
        image: this.userImage
      })
    })
    const resData = await response.json();
    console.log(resData);
    // Check if fetch OK
    this.failList.push("Benutzer Gespeichert")
  }

  ngOnInit(): void {
  }

  onSearchChange(): void {
    this.checkAllInput();
  }

  onCheckboxChange(gender: string) {
    if (this.userGender === gender) {
      this.userGender = "empty";
    } else {
      this.userGender = gender;
    }
    this.checkAllInput();
  }

  onClickNew(): void {
    this.failList = [];
    this.id = 0;
    this.userFirstName = "";
    this.userLastName = "";
    this.userBirthDate = "";
    this.userEmail = "";
    this.userGender = "";
    this.userImage = "https://robohash.org/hicveldicta.png?set=set4";
  }

  onSave(): void {
    if(this.checkAllInput() === true ) {
      this.UpdateUser();
      this.id = -1;
    }
  }

  onCreate(): void {
    if(this.checkAllInput() === true ) {
      this.AddNewUser();
      this.id = -1;
    }
  }

  onAbort(): void {
    this.id = -1;
    this.failList = [];
  }

}
