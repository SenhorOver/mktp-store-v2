import { Formik } from "formik"
import { useRouter } from "next/router";
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
import theme from "../../../src/theme"
import useToasty from "../../../src/contexts/Toasty";
import { initialValues, validationSchema } from "./formValues"
import Image from "next/image";

const Signin = () => {
	const { setToasty } = useToasty()
	const router = useRouter()
	const { data: session, status } = useSession()

	console.log(session)

	const handleGoogleLogin = () => {
		signIn('google', {
			callbackUrl: 'http://localhost:3000/user/dashboard'
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
			<Container maxWidth='sm' component='main' sx={{ paddingBottom: '30px' }}>
				<Typography component='h1' variant='h2' align="center" color='textPrimary'>
					Entre na sua conta
				</Typography>
			</Container>

			<Container maxWidth='md'>
				<Box sx={{ padding: theme.spacing(3), backgroundColor: theme.palette.background.white }}>
					
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
					
					<Box sx={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center', 
						backgroundColor: '#e8e8e8', 
						width: '100%', height: '1px', 
						margin: theme.spacing(7,0,4) }}>
						<span style={{ backgroundColor: 'white', padding: '0 30px' }}>ou</span>
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
													<Alert severity='error' sx={{marginBottom: '20px'}}>
														Usuário ou senha inválidos
													</Alert>
												)
												: null
										}
										<FormControl fullWidth error={errors.email && touched.email} sx={{ marginBottom: theme.spacing(2) }} >
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

										<FormControl fullWidth error={errors.password && touched.password} sx={{ marginBottom: theme.spacing(2) }} >
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
													<CircularProgress sx={{ display: 'block', margin: '10px auto'}} />
												) : (
													<Button
														type='submit'
														fullWidth
														variant='contained'
														color='primary'
														sx={{ margin: theme.spacing(3, 0, 2) }}
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
			</Container>
		</TemplateDefault>
	)
}

export default Signin