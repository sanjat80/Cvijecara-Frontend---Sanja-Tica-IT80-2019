export interface Proizvod{
    proizvodId: number;
    naziv : string;
    cijena : number;
    valuta : string;
    velicina : string;
    zalihe: number;
    pakovanjeId: number;
    kategorijaId: number;
    vrstaId: number;
}

export interface CreateProizvod{
    naziv : string;
    cijena : number;
    valuta : string;
    velicina : string;
    zalihe: number;
    pakovanjeId: number;
    kategorijaId: number;
    vrstaId: number;
}

export interface ProizvodDetalji{
    proizvodId: number;
    naziv : string;
    cijena : number;
    valuta : string;
    velicina : string;
    zalihe: number;
    pakovanje: number;
    kategorija: number;
    vrsta: number;
}