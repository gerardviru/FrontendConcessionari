import { Concessionari } from "../enum/concessionari/concessionari.model";

export interface Persona{
    length: number;
    idpk_persona: number;
    nif: number;
    nom: string;
    cognom1: string;
    cognom2: string;
    telefon: string;
    email: string;
    adreça: string;
    provincia: any;
    concessionari: any;
    codi_postal: number;
    tipo_persona: string;
    creat_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
}