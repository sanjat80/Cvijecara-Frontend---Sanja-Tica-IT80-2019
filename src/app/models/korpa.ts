export interface StavkaKorpe{
    proizvodId: number,
    korpaId: number,
    kolicina: number,
    porudzbinaId: number
}

export interface Korpa{
    korpaId: number,
    kolicina: number,
    ukupanIznos: number,
    valuta: string,
    korisnikId: number,
    paymentIntentId?: string,
    clientSecret?: string
}

export interface StavkeKorpe{
    naziv: string
    kolicina: number
    cijena: number
    proizvodId:number
}