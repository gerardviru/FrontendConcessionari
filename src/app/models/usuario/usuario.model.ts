import { Rol } from "../enum/Rol/rol.model";
import { Persona } from '../Persona/persona.model';

export interface Usuario {
    id:number;
    username: string;
    email: string;
    password: string;
    rol: Rol;
    intents: number;
    bloquejats: string;
    create_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
    persona: Persona;
  }