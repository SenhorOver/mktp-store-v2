import { Formik } from "formik"
import {
    Box,
    Container,
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
} from "@mui/material"

import TemplateDefault from "../../../src/templates/Default"
import theme from "../../../src/theme"
import { initialValues, validationSchema } from "./formValues"

const Signup = () => {
    return (
        <TemplateDefault>
            <Container maxWidth='sm' component='main' sx={{ paddingBottom: '30px' }}>
                <Typography component='h1' variant='h2' align="center" color='textPrimary'>
                    Crie sua conta
                </Typography>
                <Typography component='h5' variant='h5' align="center" color='textPrimary'>
                    E anuncie para todo o Brasil
                </Typography>
            </Container>

            <Container maxWidth='md'>
                <Box sx={{ padding: theme.spacing(3), backgroundColor: theme.palette.background.white }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('form envaido', values)
                        }}
                    >
                        {
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <FormControl fullWidth error={errors.name && touched.name} sx={{ marginBottom: theme.spacing(2) }} >
                                            <InputLabel sx={{ left: '-14px' }}>Nome</InputLabel>
                                            <Input
                                                name='name'
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText sx={{marginLeft: 0}}>
                                                {errors.name && touched.name ? errors.name : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.email && touched.email} sx={{ marginBottom: theme.spacing(2) }} >
                                            <InputLabel sx={{left: '-14px'}}>Email</InputLabel>
                                            <Input
                                                name='email'
                                                type='email'
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText sx={{marginLeft: 0}}>
                                                {errors.email && touched.email ? errors.email : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.password && touched.password} sx={{ marginBottom: theme.spacing(2) }} >
                                            <InputLabel sx={{left: '-14px'}}>Senha</InputLabel>
                                            <Input
                                                name='password'
                                                type='password'
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText sx={{marginLeft: 0}}>
                                                {errors.password && touched.password ? errors.password : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.passwordConf && touched.passwordConf} sx={{ marginBottom: theme.spacing(2) }} >
                                            <InputLabel sx={{left: '-14px'}}>Confirmação de senha</InputLabel>
                                            <Input
                                                name='passwordConf'
                                                type='password'
                                                value={values.passwordConf}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText sx={{marginLeft: 0}}>
                                                {errors.passwordConf && touched.passwordConf ? errors.passwordConf : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <Button
                                            type='submit'
                                            fullWidth
                                            variant='contained'
                                            color='primary'
                                            sx={{ margin: theme.spacing(3, 0, 2) }}
                                        >
                                            Cadastrar
                                        </Button>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Container>
        </TemplateDefault>
    )
}

export default Signup