import { Rol } from "../enum/Rol/rol.model";
import { Persona } from '../Persona/persona.model';

export interface Usuario {
    idpk_usuari:number;
    username: string;
    email: string;
    password: string;
    rol: Rol;
    intents: number;
    bloquejat: string;
    create_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
    persona: Persona;
  }