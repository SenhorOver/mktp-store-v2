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
	Input
} from '@mui/material'
import { Formik } from 'formik';

import TemplateDefault from '../../../src/templates/Default'
import theme from '../../../src/theme'
import { initialValues, validateSchema } from './formValues';
import FileUpload from '../../../src/components/fileUpload';


const Publish = () => {
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
				initialValues={initialValues}
				validationSchema={validateSchema}
				onSubmit={(values) => {
					console.log('enviou o form', values)
				}}
			>
				{
					({
						touched,
						values,
						errors,
						handleChange,
						handleSubmit,
						setFieldValue,
					}) => {
						return (
							<form onSubmit={handleSubmit}>
								{/* Item Name / Category */}
								<Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
									<Box sx={{
										backgroundColor: theme.palette.background.white,
										padding: theme.spacing(3)
									}}
									>
										<FormControl error={errors.title && touched.title} fullWidth>
											<InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
												Título do Anúncio
											</InputLabel>
											<Input
												variant='standard'
												name='title'
												value={values.title}
												onChange={handleChange}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.title && touched.title ? errors.title : null}
											</FormHelperText>
										</FormControl>

										<br /><br />

										<FormControl error={errors.category && touched.category} fullWidth>
											<InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
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
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.category && touched.category ? errors.category : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Images */}
								<Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
									<Box sx={{
										backgroundColor: theme.palette.background.white,
										padding: theme.spacing(3)
									}}
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
								<Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
									<Box sx={{
										backgroundColor: theme.palette.background.white,
										padding: theme.spacing(3)
									}}
									>
										<FormControl error={errors.description && touched.description} fullWidth>
											<InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
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
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.description && touched.description ? errors.description : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Price */}
								<Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
									<Box sx={{
										backgroundColor: theme.palette.background.white,
										padding: theme.spacing(3)
									}}
									>

										<br />
										<FormControl error={errors.price && touched.price} fullWidth variant='outlined'>
											<InputLabel sx={{ backgroundColor: 'white', left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
												Preço de Venda
											</InputLabel>
											<Input
												name='price'
												value={values.price}
												onChange={handleChange}
												startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
												labelwidth={40}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.price && touched.price ? errors.price : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Contact Data */}
								<Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
									<Box sx={{
										backgroundColor: theme.palette.background.white,
										padding: theme.spacing(3)
									}}
									>
										<Typography component='h6' variant='h6' color={'textPrimary'} gutterBottom>
											Dados de Contato
										</Typography>
										<FormControl error={errors.name && touched.name} fullWidth>
											<InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
												Nome
											</InputLabel>
											<Input
												variant='standard'
												name='name'
												value={values.name}
												onChange={handleChange}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.name && touched.name ? errors.name : null}
											</FormHelperText>
										</FormControl>

										<br /><br />

										<FormControl error={errors.email && touched.email} fullWidth>
											<InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
												Email
											</InputLabel>
											<Input
												variant='standard'
												name='email'
												value={values.email}
												onChange={handleChange}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.email && touched.email ? errors.email : null}
											</FormHelperText>
										</FormControl>

										<br /><br />

										<FormControl error={errors.phone && touched.phone} fullWidth>
											<InputLabel sx={{ left: '-14px', fontWeight: '400', color: theme.palette.primary.main }}>
												Telefone
											</InputLabel>
											<Input
												variant='standard'
												name='phone'
												value={values.phone}
												onChange={handleChange}
											/>
											<FormHelperText sx={{ marginLeft: 0 }}>
												{errors.phone && touched.phone ? errors.phone : null}
											</FormHelperText>
										</FormControl>
									</Box>
								</Container>

								{/* Publish Button */}
								<Container maxWidth='md' sx={{ paddingBottom: theme.spacing(3) }}>
									<Box textAlign='right'>
										<Button type='submit' variant='contained' color='primary'>
											Publicar Anúncio
										</Button>
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

export default Publish