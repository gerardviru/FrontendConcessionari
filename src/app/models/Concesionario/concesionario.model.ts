import { Provincia } from "../provincia/provincia.model";

export interface Concesionario{
    idpk_con: number;
    cif: string;
    nom: string;
    telefon: string;
    email: string;
    adreça: string;
    provicia: Provincia;
    codi_postal: number;
    creat_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
}