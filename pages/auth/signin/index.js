import Link from 'next/link'
import { useRouter } from "next/router";
import { Formik } from "formik"
import { signIn, useSession } from "next-auth/react"

import {
	Box,
	Container,
	Typography,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Button,
	CircularProgress,
	Alert
} from "@mui/material"

import TemplateDefault from "../../../src/templates/Default"
import { initialValues, validationSchema } from "../../../src/pages/auth/signin/formValues";
import Image from "next/image";
import styles from "../../../src/pages/auth/signin/styles";

const Signin = ({ APP_URL }) => {
	const router = useRouter()
	const { data: session } = useSession()

	console.log(session)
	
	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: `${APP_URL}/user/dashboard`
		})
	}
	
	const handleFormSubmit = async (values) => {
		const response = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		})

		if(!response.ok) return router.push('/auth/signin?i=1')
		router.push('/user/dashboard')
	}

	return (
		<TemplateDefault>
			<Container maxWidth='sm' component='main' sx={styles.typoSpacing}>
				<Typography component='h1' variant='h2' align="center" color='textPrimary'>
					Entre na sua conta
				</Typography>
			</Container>

			<Container maxWidth='md'>
				<Box sx={styles.box}>
					
					<Box display={'flex'} justifyContent='center'>
					<Button 
						variant="contained"
						color="primary"
						startIcon={
							<Image 
								src="/images/google-icon.svg"
								width={20}
								height={20}
								alt="Login com Google"
							/>
						}
						onClick={handleGoogleLogin}
					>
						Entrar com Google
					</Button>
					</Box>
					
					<Box sx={styles.googleBtn}>
						<span style={styles.separatorText}>ou</span>
					</Box>

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
										{
											router.query.i === '1'
												? (
													<Alert severity='error' sx={styles.errorSpacing}>
														Usuário ou senha inválidos
													</Alert>
												)
												: null
										}
										<FormControl fullWidth error={errors.email && touched.email} sx={styles.formSpacing} >
											<InputLabel sx={{ left: '-14px' }}>Email</InputLabel>
											<Input
												name='email'
												type='email'
												value={values.email}
												onChange={handleChange}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.email && touched.email ? errors.email : null}
											</FormHelperText>
										</FormControl>

										<FormControl fullWidth error={errors.password && touched.password} sx={styles.formSpacing} >
											<InputLabel sx={{ left: '-14px' }}>Senha</InputLabel>
											<Input
												name='password'
												type='password'
												value={values.password}
												onChange={handleChange}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.password && touched.password ? errors.password : null}
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
														Entrar
													</Button>
												)
										}
									</form>
								)
							}
						}
					</Formik>
				</Box>
						<Link href='/auth/signup' style={{  color: 'black', textDecoration: 'none'  }}> 
							Clique aqui para cadastrar-se
						</Link>
			</Container>
		</TemplateDefault>
	)
}

export async function getServerSideProps(){
	return {
		props: {
			APP_URL: process.env.APP_URL
		}
	}
}

Signin.requireGuest = true

export default Signin