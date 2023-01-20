import theme from '../../theme';

import { styled } from '@mui/material/styles';

const PREFIX = 'FileUpload';
export const classes = {
  imgHover: `${PREFIX}-imgHover`,
  imgMask: `${PREFIX}-imgMask`,
}
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.imgHover}:hover`]: {
    [`& .${classes.imgMask}`]: { display: 'flex' }
  },
}))

export const materialStyles = {
  outsideBox: { display: 'flex', flexWrap: 'wrap', marginTop: '15px' },
  insideBox: { 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
    width: 185, 
    height: 130, 
    margin: '0 15px 15px 0',
    backgroundColor: theme.palette.background.default, 
    border: '2px dashed black',
    cursor: 'pointer',
    userSelect: 'none',
  },
  addedImagesBox: { 
    width: 185,
    height: 130,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'relative',
    margin: '0 15px 15px 0'
  },
  mainImageSignal: {
    backgroundColor: 'blue',
    padding: '6px 10px',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  deleteMask: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: '100%',
    width: '100%',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
}

export default Root