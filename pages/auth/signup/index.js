import Link from 'next/link'
import { Formik } from "formik"
import axios from 'axios';
import { useRouter } from "next/router";
import {
	Box,
	Container,
	Typography,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Button,
	CircularProgress
} from "@mui/material"

import TemplateDefault from "../../../src/templates/Default"
import useToasty from "../../../src/contexts/Toasty";
import { initialValues, validationSchema } from '../../../src/pages/auth/signup/formValues'
import styles from '../../../src/pages/auth/signup/styles'

const Signup = () => {
	const { setToasty } = useToasty()
	const router = useRouter()
	
	const handleFormSubmit = async (values) => {
		const response = await axios.post('/api/users', values)

		if(response.data.success){
			setToasty({
				open: true,
				severity: 'success',
				text: 'Cadastro Realizado com Sucesso'
			})

			router.push('/auth/signin')
		}
	}

	return (
		<TemplateDefault>
			<Container maxWidth='sm' component='main' sx={styles.typoSpacing}>
				<Typography component='h1' variant='h2' align="center" color='textPrimary'>
					Crie sua conta
				</Typography>
				<Typography component='h5' variant='h5' align="center" color='textPrimary'>
					E anuncie para todo o Brasil
				</Typography>
			</Container>

			<Container maxWidth='md'>
				<Box sx={styles.box}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormSubmit}
					>
						{
							({
								values,
								errors,
								touched,
								handleChange,
								handleSubmit,
								isSubmitting,
							}) => {
								return (
									<form onSubmit={handleSubmit}>
										<FormControl fullWidth error={errors.name && touched.name} sx={styles.formSpacing} >
											<InputLabel sx={styles.iptLabel}>Nome</InputLabel>
											<Input
												name='name'
												value={values.name}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.name && touched.name ? errors.name : null}
											</FormHelperText>
										</FormControl>

										<FormControl fullWidth error={errors.email && touched.email} sx={styles.formSpacing} >
											<InputLabel sx={styles.iptLabel}>Email</InputLabel>
											<Input
												name='email'
												type='email'
												value={values.email}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.email && touched.email ? errors.email : null}
											</FormHelperText>
										</FormControl>

										<FormControl fullWidth error={errors.password && touched.password} sx={styles.formSpacing} >
											<InputLabel sx={styles.iptLabel}>Senha</InputLabel>
											<Input
												name='password'
												type='password'
												value={values.password}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.password && touched.password ? errors.password : null}
											</FormHelperText>
										</FormControl>

										<FormControl fullWidth error={errors.passwordConf && touched.passwordConf} sx={styles.formSpacing} >
											<InputLabel sx={styles.iptLabel}>Confirmação de senha</InputLabel>
											<Input
												name='passwordConf'
												type='password'
												value={values.passwordConf}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.passwordConf && touched.passwordConf ? errors.passwordConf : null}
											</FormHelperText>
										</FormControl>
										{
											isSubmitting 
												? (
													<CircularProgress sx={styles.circularProgress} />
												) : (
													<Button
														type='submit'
														fullWidth
														variant='contained'
														color='primary'
														sx={styles.submitBtn}
													>
														Cadastrar
													</Button>
												)
										}
									</form>
								)
							}
						}
					</Formik>
				</Box>
				<Link href='/auth/signin' style={{  color: 'black', textDecoration: 'none' }}>
					Clique aqui para fazer login
				</Link>
			</Container>
		</TemplateDefault>
	)
}

// Signup.requireGuest = true

export default Signup