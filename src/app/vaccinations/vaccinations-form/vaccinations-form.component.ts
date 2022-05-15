import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from 'src/app/model/vaccination';
import { Vaccine } from 'src/app/model/vaccine';
import { VakcineService } from 'src/app/service/vakcine.service';

@Component({
  selector: 'app-vaccinations-form',
  templateUrl: './vaccinations-form.component.html',
  styleUrls: ['./vaccinations-form.component.css']
})
export class VaccinationsFormComponent implements OnInit {
  vakcine:Vaccine[] = []
  vaccine: Vaccination = new Vaccination();
  vakcinaForm: FormGroup;

  // Koristimo formBuilder kao nacin kontrole i hvatanja podataka iz forme u html-u
  constructor(private servis:VakcineService, private fb :FormBuilder, private router: Router, private route: ActivatedRoute) {

    this.vakcinaForm = this.fb.group({
      // bitno je da se zovu isto kao u modelu
			'personal_number': '',
			'name': '',
			'healthcare_institution': '',
			'vaccine': ''
		});

   }

  ngOnInit(): void {
    this.getVakcine()
  }

  getVakcine():void{
    this.servis.getVakcine().subscribe((data:Vaccine[]) =>{
      this.vakcine = data
    })
  }


  onSubmit():void{
    this.vaccine = new Vaccination(this.vakcinaForm.value);
    //kreira objekat u objektu (hvata vakcinu)
    let vaccineObject = new Vaccine({_id: Number (this.vaccine.vaccine)})
    this.vaccine.vaccine = vaccineObject;
    console.log(this.vaccine);
 
    
    this.servis.add(this.vaccine).subscribe({
      next: (data: any) => {
        // Preusmerava na zadatu rutu nakon posta
        this.router.navigate(["/vaccinations"]);
      }
    });

  }
}