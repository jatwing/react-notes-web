import { Box } from '@mui/material'

/**
// take the style from the old popup and define unified styles for this one.
//
//
// we set it in data-display because Typography is also here.
*/

export const InnerHtml = (props) => {
  const { html, sx } = props;
  return (
    <Box dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        ...sx,
        '& p:not(:last-child)': {
          margin: '0 0 0.35em 0',
        },
        '& p:last-child': {
          margin: '0',
        },
        '& a': {
          textDecoration: 'none',
          color: 'inherit'
        },
        '& a:hover, & a:focus': {
          textDecoration: 'underline',
          textDecorationColor: 'currentColor',
          color: 'inherit'
        },
        '& a': {
          textDecoration: 'none',
          color: 'inherit'
        },
      }}
    />
  )
}

