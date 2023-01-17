import { Card as CardMUI, CardMedia, CardContent, Typography, CardActions } from "@mui/material"

const Card = ({ image, title, subtitle, actions }) => {
    console.log(title)
    return (
        <CardMUI>
              <CardMedia 
                image={image}
                title={title}
                sx={{ paddingTop: '56%' }}
              />
              <CardContent>
                <Typography variant='h5' component='h2' sx={{ height: '40px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {title}
                </Typography>
                <Typography>
                  {subtitle}
                </Typography>
              </CardContent>
              {
                actions
                ? (
                <CardActions>
                    {actions}
                </CardActions>
                  )
                : null
              }
            </CardMUI>
    )
}

export default Card