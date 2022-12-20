import { styled } from '@mui/material/styles';

const PREFIX = 'Publish';
export const classes = {
  imgHover: `${PREFIX}-imgHover`,
  imgMask: `${PREFIX}-imgMask`,
}
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.imgHover}:hover`]: {
    [`& .${classes.imgMask}`]: { display: 'flex' }
  },
}))

export default Root