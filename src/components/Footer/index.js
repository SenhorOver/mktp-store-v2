import { Container, Grid, Box, Typography } from "@mui/material"
import Link from "next/link"
import style from '../../../styles/situational.module.css'
import styles from "./styles"

const Footer = () => {
    return (
        <Container maxWidth='lg' component={'footer'} 
            sx={styles.container}
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