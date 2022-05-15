import { Vaccine } from "./vaccine";

export class Vaccination {
    _id: number;
    personal_number: string;
    name: string;
    healthcare_institution: string;
    vaccine: Vaccine;

    constructor(obj?: any) {
        this._id = obj && obj._id || 0;
        this.personal_number = obj && obj.personal_number || "";
        this.name = obj && obj.name || "";
        this.healthcare_institution = obj && obj.healthcare_institution || "";
        // this.vaccine = obj && obj.vaccine.map((x:any) => new Vaccine()) || null;
        // this.vaccine = obj && new Vaccine(obj.vaccine) || null;

        // Ovaj tip ide da bi radilo dodavanje nove vakcine i hvatanje podataka vakcinisanog, sa gornjima radi jedno ili drugo
        this.vaccine = obj && obj.vaccine || new Vaccine()
    }
}