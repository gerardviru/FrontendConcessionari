import { Provincia } from "../provincia/provincia.model";

export interface Concesionari{
    idpk_con: number;
    cif: string;
    nom: string;
    telefon: string;
    email: string;
    adreça: string;
    idfk_prov: Provincia;
    codi_postal: number;
    creat_per: string;
    data_creacio: Date;
    actualitzat_per: string;
    data_actualitzacio: Date;
}