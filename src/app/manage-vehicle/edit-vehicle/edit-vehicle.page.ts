import { VehicleService } from './../../shared/vehicle.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Vehicle } from 'src/app/shared/vehicle';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})
export class EditVehiclePage implements OnInit {

  @Input() id: string;
  vehicle: Vehicle;

  constructor(public modalController: ModalController, private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.getVehicle(this.id);
  }

  async presentModal() {
    console.log( this.vehicle) ;
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        licensePlate: this.vehicle.licensePlate,
        name: this.vehicle.name,
        load: this.vehicle.load,
        maxLoad: this.vehicle.maxLoad,
        seats: this.vehicle.seats,
        maxSeats: this.vehicle.maxSeats,
        volume: this.vehicle.volume
      }
    });
    return await modal.present();
  }

  getVehicle(licensePlate: string){
     this.vehicleService.getVehicle(licensePlate).subscribe(data => {
      //console.log( data);
      this.vehicle = data
    });
  }


  dismissModal() {
    this.modalController.dismiss();
  }
}
