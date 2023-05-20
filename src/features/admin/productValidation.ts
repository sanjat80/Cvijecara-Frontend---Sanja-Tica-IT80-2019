import * as yup from 'yup';

export const validationSchema = yup.object({
    proizvodId: yup.number().required(),
    naziv: yup.string().required(),
    cijena: yup.number().required(),
    valuta: yup.string().required().oneOf(["RSD", "EUR", "BAM"]),
    velicina: yup.string().required(),
    zalihe: yup.number().required().moreThan(5),
    pakovanjeId: yup.number().required(),
    kategorijaId: yup.number().required(),
    vrstaId: yup.number().required()
})
