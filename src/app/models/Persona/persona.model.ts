import { Provincia } from "../provincia/provincia.model";

export interface Persona{
    idpk_persona: number;
    nif: number;
    nom: string;
    cognom1: string;
    cognom2: string;
    telefon: string;
    email: string;
    adreça: string;
    provincia: Provincia
    codi_postal: number;
    creat_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
}