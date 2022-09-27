import { Provincia } from "src/app/models/provincia/provincia.model";

export interface Concessionari {
    idpk_con: number;
    cif: string;
    nom: string;
    telefon: string;
    email: string;
    adreça: string;
    codi_postal: number;
    creat_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
    provincia: any;

}