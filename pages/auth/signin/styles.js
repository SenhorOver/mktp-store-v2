import theme from "../../../src/theme"

const styles = {
  box: { backgroundColor: theme.palette.background.white, padding: theme.spacing(3), marginBottom: theme.spacing(3) },
  typoSpacing: { paddingBottom: '30px' },
  googleBtn: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#e8e8e8', 
    width: '100%', height: '1px', 
    margin: theme.spacing(7,0,4) 
  },
  separatorText: { backgroundColor: 'white', padding: '0 30px' },
  errorSpacing: {marginBottom: '20px'},
  formSpacing: { marginBottom: theme.spacing(2) },
  circularProgress: { display: 'block', margin: '10px auto'},
  submitBtn: { margin: theme.spacing(3, 0, 2) },

}

export default styles