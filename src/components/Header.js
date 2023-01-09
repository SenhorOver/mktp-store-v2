import * as React from 'react';
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

import Link from 'next/link';

import style from '../../styles/situational.module.css'
import { AccountCircle } from '@mui/icons-material';

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = React.useState(false)
  const { data: session } = useSession()

  console.log(session)

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
          <Link href={session ? '/user/publish' : '/auth/signin'} className={style.headerBtnLink}>
            <Button color="inherit" variant='outlined' sx={{ marginRight: '10px' }}>
              Anunciar e Vender
            </Button>
          </Link>
          {
            session
              ? (
                <IconButton color='secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                  {
                    session.user.image
                    ? <Avatar src={session.user.image} />
                    : <AccountCircle />
                  }
                  <Typography variant='subtitle2' color='secondary' sx={{ marginLeft: '8px' }}>
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
            <Divider sx={{ margin: '8px 0' }} />
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