import { User } from "./user"
import { Car } from "./car"
import { Observable } from "rxjs";


export class reservation {
    dateDeb: Date;
    dateFin: Date;
    car: Observable<Car>;
    somme: Number;
    user: User
    confirmed: Boolean

}