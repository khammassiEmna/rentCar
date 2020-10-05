import { Brand } from "./brand"
import { from } from "rxjs";
import { Model } from './model';

export class Car {
    name: string;
    picByte: Blob;
    price: string
    type: string;
    model: Model;
    matricule: string;
    creationYear: string;
}