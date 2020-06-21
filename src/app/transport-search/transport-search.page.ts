import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-transport-search',
  templateUrl: './transport-search.page.html',
  styleUrls: ['./transport-search.page.scss'],
})
export class TransportSearchPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  VALIDATION_MESSAGES = {
    postalCode: [
      {type: 'required', message: 'Postleitzahl ist erforderlich.'},
      {type: 'minlength', message: 'Postleitzahl muss mindestens 5 Zahlen enthalten'}
    ],
    datum: [
      {type: 'required', message: 'Datum ist erforderlich.'},
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      postalcode: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

}
