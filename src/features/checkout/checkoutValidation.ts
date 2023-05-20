import * as yup from 'yup';

export const validationScheme =[
yup.object({
    adresa: yup.string().required('Adresa je obavezna'),
    grad: yup.string().required('Grad je obavezan!'),
    drzava: yup.string().required('Drzava je obavezna'),
    BrojTelefona: yup.string().required('Broj telefona je obavezan!')
}),
yup.object(),
yup.object({
    nameOncard: yup.string().required()
})
]