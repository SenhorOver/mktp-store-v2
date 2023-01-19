import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react'
import {
	Box,
	Container,
	Select,
	Typography,
	Button,
	FormControl,
	InputLabel,
	InputAdornment,
	MenuItem,
	FormHelperText,
	Input,
	CircularProgress
} from '@mui/material'
import { Formik } from 'formik';
import axios from 'axios';

import TemplateDefault from '../../../src/templates/Default'
import { initialValues, validateSchema } from './formValues';
import FileUpload from '../../../src/components/fileUpload';
import useToasty from '../../../src/contexts/Toasty'
import styles from './styles';


const Publish = ({ userId, image, states }) => {
	const [cities, setCities] = useState([])
	const { setToasty } = useToasty()
	const router = useRouter()

	const formValues = {
		...initialValues,
	}

	formValues.userId = userId
	formValues.image = image

	const handleSuccess = () => {
		console.log('alou')
		setToasty({
			open: true,
			text: 'Anúncio cadastrado com sucesso',
			severity: 'success',
		})

		router.push('/user/dashboard')
	}

	const handleError = () => {
		console.log('alou')
		setToasty({
			open: true,
			text: 'Ops, ocorreu um erro, atualize a página e tente novamente',
			severity: 'error',
		})
	}

	const handleformSubmit = (values) => {
		const formData = new FormData()

		for(let field in values){
			if(field === 'files'){
				values.files.forEach(file => {
					formData.append('files', file)
				})
			} else {
				formData.append(field, values[field])
			}
		}

		
		
		axios.post('/api/products/add', formData)
			.then(handleSuccess)
			.catch(handleError)
	}

	return (
		<TemplateDefault>
			{/* Page Title */}
			<Container maxWidth="sm">
				<Typography component={'h1'} variant='h2' align='center' color={'textPrimary'}>
					Publicar Anúncio
				</Typography>
				<Typography component={'h5'} variant='h5' align='center' color={'textPrimary'}>
					Quanto mais detalhado melhor!
				</Typography>
			</Container>

			<br /><br />
			<Formik
				initialValues={formValues}
				validationSchema={validateSchema}
				onSubmit={handleformSubmit}
			>
				{
					({
						touched,
						values,
						errors,
						handleChange,
						handleSubmit,
						setFieldValue,
						setFieldTouched,
						isSubmitting,
					}) => {
						const handleStateChange = async (e) => {
							setFieldValue('city', '')
							setFieldTouched('city', false)
							const uf = e.target
								? setFieldValue('uf', e.target.value) && e.target.value
								: setFieldValue('uf', e.uf) && e.uf
							
							const city = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

							setCities(city.data)
						}

						const handleSearchCep = async () => {
							let cep = values.cep
							cep = cep.split('-')
							cep = cep.join('')
							let informations = null

							try {
								informations = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
							} catch (e) {
								return
							}

							const data = informations.data
							if(data.erro) {
								setToasty({
									open: true,
									text: 'CEP Inválido, não foi possível buscar suas informações',
									severity: 'error',
								})
								return
							}

							await handleStateChange(data)

							setFieldValue('city', data.localidade)
							setFieldValue('district', data.bairro)
							setFieldValue('publicPlace', data.logradouro)
						}

						return (
							<form onSubmit={handleSubmit}>
								<Input type='hidden' name="userId" value={values.userId} />
								<Input type='hidden' name="image" value={values.image} />

								{/* Item Name / Category */}
								<Container maxWidth='md' sx={styles.container}>
									<Box sx={styles.divSpacing}
									>
										<FormControl error={errors.title && touched.title} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Título do Anúncio
											</InputLabel>
											<Input
												variant='standard'
												name='title'
												value={values.title}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.title && touched.title ? errors.title : null}
											</FormHelperText>
										</FormControl>

										<br /><br />

										<FormControl error={errors.category && touched.category} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Categoria
											</InputLabel>
											<Select
												name="category"
												value={values.category}
												onChange={handleChange}
												fullWidth
												variant='standard'
											>
												<MenuItem value={'Bebê e Criança'}>Bebê e Criança</MenuItem>
												<MenuItem value={'Agricultura'}>Agricultura</MenuItem>
												<MenuItem value={'Moda'}>Moda</MenuItem>
												<MenuItem value={'Carros, Motos e Barcos'}>Carros, Motos e Barcos</MenuItem>
												<MenuItem value={'Serviços'}>Serviços</MenuItem>
												<MenuItem value={'Lazer'}>Lazer</MenuItem>
												<MenuItem value={'Animais'}>Animais</MenuItem>
												<MenuItem value={'Moveis, Casa e Jardim'}>Moveis, Casa e Jardim</MenuItem>
												<MenuItem value={'Imóveis'}>Imóveis</MenuItem>
												<MenuItem value={'Equipamentos e Ferramentas'}>Equipamentos e Ferramentas</MenuItem>
												<MenuItem value={'Celulares e Tablets'}>Celulares e Tablets</MenuItem>
												<MenuItem value={'Tecnologia'}>Tecnologia</MenuItem>
												<MenuItem value={'Emprego'}>Emprego</MenuItem>
												<MenuItem value={'Outros'}>Outros</MenuItem>
											</Select>
											<FormHelperText sx={styles.helperText}>
												{errors.category && touched.category ? errors.category : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Images */}
								<Container maxWidth='md' sx={styles.container}>
									<Box sx={styles.divSpacing}
									>
										<FileUpload
											files={values.files}
											errors={errors.files}
											touched={touched.files}
											setFieldValue={setFieldValue}
										/>
									</Box>
								</Container>

								{/* Description */}
								<Container maxWidth='md' sx={styles.container}>
									<Box sx={styles.box}
									>
										<FormControl error={errors.description && touched.description} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Escreva os detalhes do que está vendendo
											</InputLabel>
											<Input
												name='description'
												value={values.description}
												onChange={handleChange}
												multiline
												rows={6}
												variant='outlined'
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.description && touched.description ? errors.description : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Price */}
								<Container maxWidth='md' sx={styles.container}>
									<Box sx={styles.divSpacing}
									>

										<br />
										<FormControl error={errors.price && touched.price} fullWidth variant='outlined'>
											<InputLabel sx={styles.iptLabel}>
												Preço de Venda
											</InputLabel>
											<Input
												name='price'
												value={values.price}
												onChange={handleChange}
												startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
												labelwidth={40}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.price && touched.price ? errors.price : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>



								{/* Location */}
								<Container maxWidth='md' sx={styles.container}>
									<Box sx={styles.divSpacing}
									>
										<Typography component='h6' variant='h6' color={'textPrimary'} gutterBottom>
											Localização
										</Typography>
										
										<Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
											<FormControl error={errors.cep && touched.cep}>
												<InputLabel sx={styles.iptCep}>
													CEP
												</InputLabel>
												<Input
													variant='standard'
													name='cep'
													value={values.cep}
													onChange={handleChange}
												/>
												<FormHelperText sx={styles.helperText}>
													{errors.cep && touched.cep ? errors.cep : null}
												</FormHelperText>
											</FormControl>

											<Button type='button' variant='outlined' color='primary' onClick={handleSearchCep}>
												Achar localização
											</Button>
										</Box>

										<br />

										<Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', flexWrap: 'wrap', gap: '25px' }}>
											<FormControl error={errors.uf && touched.uf}>
												<InputLabel sx={styles.iptCep}>
													UF
												</InputLabel>
												<Select
													name="uf"
													value={values.uf}
													onChange={handleStateChange}
													fullWidth
													variant='standard'
													sx={styles.uf}
												>
													{
														states.map(state => (
															<MenuItem value={state.sigla}>{state.sigla}</MenuItem>
														))
													}
												</Select>
												<FormHelperText sx={styles.helperText}>
													{errors.uf && touched.uf ? errors.uf : null}
												</FormHelperText>
											</FormControl>




											<FormControl error={errors.city && touched.city}>
												<InputLabel sx={styles.iptCep}>
													Cidades
												</InputLabel>
												<Select
													name="city"
													value={values.city}
													onChange={handleChange}
													fullWidth
													variant='standard'
													sx={styles.iptLocation}
												>
													{
														cities.map(city => (
															<MenuItem value={city.nome}>{city.nome}</MenuItem>
														))
													}
												</Select>
												<FormHelperText sx={styles.helperText}>
													{errors.city && touched.city ? errors.city : null}
												</FormHelperText>
											</FormControl>



											<FormControl error={errors.district && touched.district} >
												<InputLabel sx={styles.iptLabel}>
													Bairro
												</InputLabel>
												<Input
													variant='standard'
													name='district'
													value={values.district}
													onChange={handleChange}
													sx={styles.iptLocation}
												/>
												<FormHelperText sx={styles.helperText}>
													{errors.district && touched.district ? errors.district : null}
												</FormHelperText>
											</FormControl>
										</Box>

										<br />

											<FormControl error={errors.publicPlace && touched.publicPlace} fullWidth>
												<InputLabel sx={styles.iptLabel}>
													Logradouro (Rua, Avenida, etc)
												</InputLabel>
												<Input
													variant='standard'
													name='publicPlace'
													value={values.publicPlace}
													onChange={handleChange}
												/>
												<FormHelperText sx={styles.helperText}>
													{errors.publicPlace && touched.publicPlace ? errors.publicPlace : null}
												</FormHelperText>
											</FormControl>


										{/* <FormControl error={errors.phone && touched.phone} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Telefone
											</InputLabel>
											<Input
												variant='standard'
												name='phone'
												value={values.phone}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.phone && touched.phone ? errors.phone : null}
											</FormHelperText>
										</FormControl> */}
									</Box>
								</Container>

								{/* Contact Data */}
								<Container maxWidth='md' sx={styles.container}>
									<Box sx={styles.divSpacing}
									>
										<Typography component='h6' variant='h6' color={'textPrimary'} gutterBottom>
											Dados de Contato
										</Typography>
										<FormControl error={errors.name && touched.name} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Nome
											</InputLabel>
											<Input
												variant='standard'
												name='name'
												value={values.name}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.name && touched.name ? errors.name : null}
											</FormHelperText>
										</FormControl>

										<br /><br />

										<FormControl error={errors.email && touched.email} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Email
											</InputLabel>
											<Input
												variant='standard'
												name='email'
												value={values.email}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.email && touched.email ? errors.email : null}
											</FormHelperText>
										</FormControl>

										<br /><br />

										<FormControl error={errors.phone && touched.phone} fullWidth>
											<InputLabel sx={styles.iptLabel}>
												Telefone
											</InputLabel>
											<Input
												variant='standard'
												name='phone'
												value={values.phone}
												onChange={handleChange}
											/>
											<FormHelperText sx={styles.helperText}>
												{errors.phone && touched.phone ? errors.phone : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Publish Button */}
								<Container maxWidth='md' sx={styles.container}>
									<Box textAlign='right'>
										{
											isSubmitting
												? <CircularProgress sx={styles.circularProgress} />
												: (
													<Button type='submit' variant='contained' color='primary'>
														Publicar Anúncio
													</Button>
												)
										}
									</Box>
								</Container>
							</form>
						)
					}
				}

			</Formik>
		</TemplateDefault>
	)
}

Publish.requireAuth = true

export async function getServerSideProps({ req }){
	const { userId, user } = await getSession({ req })

	const states = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')

	return {
		props: {
			userId,
			image: user.image,
			states: states.data
		}
	}
}


export default Publish