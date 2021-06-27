import { css } from '@emotion/css';

const useStyles = (theme) => {
  return css`
    & .content {
      margin: ${theme.spacing(2)};
    }
  `;
};

export default useStyles;
