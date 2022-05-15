import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { Person } from '../model/person';
import { Vaccination } from '../model/vaccination';
import { Count } from '../model/vaccination.count';
import { Vaccine } from '../model/vaccine';

const baseURL = 'http://localhost:3000/api/'

@Injectable({
  providedIn: 'root'
})
export class VakcineService {

  // dodati HttpClient da bi se koristili params
  constructor(private http:HttpClient) { }

  /* Ispis svih podataka moze da se odradi pre params, params se moze dodati kad se dodje u fazu sortiranja/paginacije. */
  
  getAll(params?:any):Observable<Vaccination[]>{
    let queryParams = {}

    if (queryParams) {
      queryParams = {
        params: new HttpParams()
        // 
        .set('filter',params.filter && JSON.stringify(params.filter) || '')
        .set('page',params.page || '')
        .set('pageSize',params.pageSize || '')
      }
    }


    return this.http.get(`${baseURL}vaccinations`,queryParams).pipe(map(
      (data:any) => {return data.results.map((el:any) => {return new Vaccination(el)})}
    ))
  }

  getVakcine():Observable<Vaccine[]>{
    return this.http.get(`${baseURL}vaccines`).pipe(map(
      (data:any) => data.results.map((el:any) => new Vaccine(el))
    ))
  }
  getPerson(jmbg: number):Observable<Person>{
    return this.http.get(`${baseURL}persons/${jmbg}`).pipe(map(
      (data:any) => {return new Person(data)}
    ))
  }

  getCount():Observable<Count>{

    return this.http.get(`${baseURL}vaccinations`).pipe(map(
      (data:any) => {return new Count(data)}
    ))
  }

  //Za opciju dodavanja koristimo .post
  add(vakcina:Vaccination):Observable<any>{
    return this.http.post(`${baseURL}vaccinations`,vakcina)
  }

  // Funkcije put/post/get/del su u osnovi slicne glavna razlika je u atributu i ciljanom URL

  // update(vakcina:Vaccination): Observable<any> {
	// 	return this.http.put(`${baseURL}vaccinations` + "/" + vakcina._id, vakcina);
	// }

	// remove(id: number): Observable<any> {
	// 	return this.http.delete(`${baseURL}vaccinations` + "/" + id);
	// }

}
