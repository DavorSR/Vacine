import { Component, OnInit } from '@angular/core';
import { Vaccination } from 'src/app/model/vaccination';
import { Count } from 'src/app/model/vaccination.count';
import { Vaccine } from 'src/app/model/vaccine';
import { VakcineService } from 'src/app/service/vakcine.service';

@Component({
  selector: 'app-vaccinations-list',
  templateUrl: './vaccinations-list.component.html',
  styleUrls: ['./vaccinations-list.component.css']
})
export class VaccinationsListComponent implements OnInit {

  vaccinations:Vaccination[] = []
  vakcine:Vaccine[] = []
  collectionSize:number = 0
  /* Definisemo pocetnu stranu u paginaciji i koliko prikaza vidimo po strani,
   u filteru definisemo po cemu cemo da vrsimo sortiranje u pretrazi.  */
  params = {
    page:1,
    pageSize:5,
    filter:{
      personal_number:"",
      vaccine_id:0
    }
  }

  constructor(private servis:VakcineService) { }

  ngOnInit(): void {
    this.getVaccines()
    this.getVakcine()
    this.getCount()
  }

  getVaccines():void{
    this.servis.getAll(this.params).subscribe((data:Vaccination[]) =>{
      this.vaccinations = data
    })
  }

  getVakcine():void{
    this.servis.getVakcine().subscribe((data:Vaccine[]) => {
      this.vakcine = data
    })
  }

  getCount():void{
    this.servis.getCount().subscribe((data:Count) => {
      this.collectionSize = data.count
    })
  }

  // 
  onClick(broj:number):void{
    this.params.pageSize += broj   
  }

}
