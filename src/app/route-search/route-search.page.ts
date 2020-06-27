import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Shipment} from '../shared/shipment';
import {DataHelperService} from '../shared/data-helper.service';
import {ShipmentService} from '../shared/shipment.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-route-search',
  templateUrl: './route-search.page.html',
  styleUrls: ['./route-search.page.scss'],
})
export class RouteSearchPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  shipmentList: Shipment[];




  VALIDATION_MESSAGES = {
    postalCode: [
      {type: 'required', message: 'Postleitzahl ist erforderlich.'},
      {type: 'minlength', message: 'Postleitzahl muss mindestens 5 Zahlen enthalten'}
    ],
    datum: [
      {type: 'required', message: 'Datum ist erforderlich.'},
    ]
  };


  constructor(private formBuilder: FormBuilder, private router: Router, private datahelper: DataHelperService, private shipmentService: ShipmentService) {
  }


  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      postalcode: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      seats: new FormControl(''),
      startAddress: new FormControl(''),
      toAddress: new FormControl(''),
      date: new FormControl('')
    });
  }

  search(value){
    this.shipmentService.searchRoute(value.seats, value.startAddress, value.toAddress, value.date).forEach(shipment => {
      this.shipmentList = shipment;
    });

    console.log(this.shipmentList);

    this.datahelper.tranportData = this.shipmentList;
    this.router.navigate(['search-result']);
  }

  navigateToSearchResult(){
    this.router.navigate(['/search-result']);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }

  navigateToMangeVehicle(){
    this.router.navigate(['/manage-vehicle']);
  }

  navigateToRouteSearch(){
    this.router.navigate(['/route-search']);
  }

  navigateToTransportSearch(){
    this.router.navigate(['/transport-search']);
  }
  navigateToProfile(){
    this.router.navigate(['/profile']);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  navigateToImpressum(){
    this.router.navigate(['/impressum']);
  }
}
