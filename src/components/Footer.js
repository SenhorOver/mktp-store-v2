import { Container, Grid, Box, Typography } from "@mui/material"
import Link from "next/link"
import theme from "../theme"
import style from '../../styles/situational.module.css'

const Footer = () => {
    return (
        <Container maxWidth='lg' component={'footer'} 
            sx={{
                borderTop: `1px solid ${theme.divader}`,
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),

                [theme.breakpoints.up('sm')]:{
                    paddingTop: theme.spacing(6),
                    paddingBottom: theme.spacing(6),
                }
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <Box textAlign={'center'}>
                        <Link href={'#'} className={style.footerLink}>
                            <Typography color='textSecondary' variant="subtitle1">
                                Ajuda e Contato
                            </Typography>
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Box textAlign={'center'}>
                        <Link href={'#'} className={style.footerLink}>
                            <Typography color='textSecondary' variant="subtitle1">
                                Dicas de segurança
                            </Typography>
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Box textAlign={'center'}>
                        <Link href={'#'} className={style.footerLink}>
                            <Typography color='textSecondary' variant="subtitle1">
                                Anunciar e Vender
                            </Typography>
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Box textAlign={'center'}>
                        <Link href={'#'} className={style.footerLink}>
                            <Typography color='textSecondary' variant="subtitle1">
                                Plano Profissional
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Footer