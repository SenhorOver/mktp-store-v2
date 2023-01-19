import * as yup from 'yup'

const initialValues = {
    title: '',
    category: '',
    description: '',
    price: '',
    email: '',
    name: '',
    phone: '',
    cep: '',
    uf: '',
    city: '',
    district: '',
    publicPlace: '',
    files: [],
}

const validateSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Escreva um título maior')
        .max(100, 'Título muito grande')
        .required('Campo obrigatório'),
    
    category: yup.string().required('Campo Obrigatório'),

    description: yup.string()
    .min(50, 'Escreva uma descrição com pelo menos 50 caracteres')
    .required('Campo obrigatório'),

    price: yup.number()
        .typeError('Precisa ser um número válido (Sem vírgulas, pontos, etc)')
        .integer('O número precisa ser inteiro')
        .max(100000000000000, 'Número muito grande')
        .required('Campo Obrigatório'),

    email: yup.string()
        .email('Digite um e-mail válido')
        .required('Campo Obrigatório'),

    name: yup.string()
        .max(250, 'Nome muito grande')
        .required('Campo Obrigatório'),

    phone: yup.number()
        .typeError('Digite um número válido (Sem vígulas, pontos, parênteses, etc)')
        .integer('Digite um número válido')
        .max(9999999999999, 'Número muito grande')
        .required('Campo Obrigatório'),


    cep: yup.string().matches(/^[0-9]{5}-[0-9]{3}$/, 'Digite um CEP válido').required('Campo Obrigatório'),

    uf: yup.string().required('Campo Obrigatório'),

    city: yup.string().required('Campo Obrigatório'),

    district: yup.string().min(3, 'Digite sem abreviações').required('Campo Obrigatório'),

    publicPlace: yup.string().min(10, 'Digite sem abreviações').required('Campo Obrigatório'),

    files: yup.array().min(1, 'Envie pelo menos uma foto').max(25, 'Muitos arquivos').required('Campo Obrigatório'),

})

export {
    initialValues,
    validateSchema
}