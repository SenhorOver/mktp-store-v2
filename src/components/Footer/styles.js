import theme from "../../theme"

const styles = {
  box: { backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) },
  title: { margin: '15px 0' },
  price: { fontWeight: 'bold', marginBottom: '15px' },
  container: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    [theme.breakpoints.up('sm')]:{
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    }
  },
  footerLink: {
    textDecoration: 'none',
    color: 'black',
  }
}

export default styles