import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../model/person';
import { Vaccination } from '../model/vaccination';
import { VakcineService } from '../service/vakcine.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  vakcinisani: Person = new Person();
  // vaccinations: Vaccination = new Vaccination[];
 
  constructor(private servis:VakcineService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    //definisemo params kao any i posle ga hvatamo dodeljujuci naziv promenjive i params gde je params jednak nazivu koji je koristen u rutiranju
    this.route.params.subscribe((params: any) => {
      let jmbg = params['personal_number'];
    //Pozivamo funkciju koja izvrsava radnju nakon ucitavanja stranice  
      this.getPerson(jmbg);
    })
 
  }

  // Posto ciljamo odredjeni unos potreban je neki ID u ovom slucaju ciljamo po jbmg
  getPerson(jmbg: number):void{
    this.servis.getPerson(jmbg).subscribe((data: Person) => {
      this.vakcinisani = data;
      // Uzimamo objekat u objektu
      this.getListaVakcinacija()
    })
  }

  getListaVakcinacija(): Vaccination[] {
    let ids = this.vakcinisani.vaccinations
    // Hvatamo svaki unos mapiranjem i dodeljivanjem vrednosti vracamo novi niz
    //Stvaramo niz vaccine i dodeljivanjem 'o' imamo nacin za pozivanje
      .map((o) => o.vaccine)
    // Prolazimo kroz niz i hvatamo '_id'
      .map((el) => el._id);
    //Filtriramo elemente tako sto hvatamo index elementa i dodajemo +1 da se svaki uvecava za 1
    let filtered = this.vakcinisani.vaccinations.filter(
      ({ _id }, index) => !ids.includes(_id, index + 1)
    );
    // Vracamo filtrirani rezultat
    return filtered;
  }

}
