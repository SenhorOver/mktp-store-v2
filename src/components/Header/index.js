import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react'
import {
  AppBar, 
  Box, 
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material';


import style from '../../../styles/situational.module.css'
import styles from './styles';

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  const { data: session } = useSession()

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <Box>
      <AppBar position="static" elevation={3}>
        <Container maxWidth='lg'>
        <Toolbar>
          <Link href='/' className={style.headerTitle}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mktp Store
            </Typography>
          </Link>
          {
            session
              ? (
                <Link href='/user/publish' className={style.headerBtnLink}>
                  <Button color="inherit" variant='outlined' sx={styles.btnSpacing}>
                    Anunciar e Vender
                  </Button>
                </Link>
              )
              : (
                <>
                  <Link href='/auth/signup' className={style.headerBtnLink}>
                    <Button color="inherit" variant='outlined' sx={styles.btnSpacing}>
                      Cadastrar-se
                    </Button>
                  </Link>

                  <Link href='/auth/signin' className={style.headerBtnLinkLogin}>
                    <Button color="inherit" variant='contained' sx={styles.btnLogin}>
                      Entrar
                    </Button>
                  </Link>
                </>
              )
          }
          
          {
            session
              ? (
                <IconButton color='secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                  {
                    session.user.image
                    ? <Avatar src={session.user.image} />
                    : <AccountCircle />
                  }
                  <Typography variant='subtitle2' color='secondary' sx={styles.perfilSpacing}>
                    {session.user.name}
                  </Typography>
                </IconButton>
              )
              : null
          }

          <Menu
            open={openUserMenu}
            anchorEl={anchorUserMenu}
            onClose={() => setAnchorUserMenu(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
          >
            <Link href='/user/dashboard' className={style.userMenuLinks}>
              <MenuItem>Meus anúncios</MenuItem>
            </Link>
            <Link href='/user/publish' className={style.userMenuLinks}>
              <MenuItem>Publicar novo anúncio</MenuItem>
            </Link>
            <Divider sx={styles.divider} />
            <MenuItem onClick={() => signOut({
              callbackUrl: '/'
            })}>Sair</MenuItem>
          </Menu>
        </Toolbar>      
        </Container>
      </AppBar>
    </Box>
  );
}