import { css } from '@emotion/css';

const useStyles = (theme, block) => {
  if (block === 'toolbar') {
    return css`
      display: flex;
      justify-content: space-between;

      & .link,
      & .title {
        align-self: stretch;
        display: flex;
        align-items: center;
      }

      & .link,
      & .title {
        font-family: ${theme.typography.fontStacks.sansSerif};
        font-size: ${theme.typography.h6.fontSize};
        font-weight: ${theme.typography.h6.fontWeight};
        lineheight: ${theme.typography.h6.lineHeight};
        padding-left: ${theme.spacing(2)};
        padding-right: ${theme.spacing(2)};
      }

      & .link {
        color: ${theme.palette.primary.contrastText};
        transition: color 1s linear;
      }
      & .link:hover {
        color: ${theme.palette.primary.highlightText};
        text-decoration: none;
      }
      & .link:focus {
        color: ${theme.palette.primary.contrastText};
        background-color: ${theme.palette.primary.light};
      }

      & .title {
        color: ${theme.palette.primary.highlightText};
        position: relative;
      }
      & .title::after {
        content: '';
        width: 100%;
        height: 4px;
        background-color: ${theme.palette.primary.highlightText};
        position: absolute;
        left: 0;
        bottom: 0;
      }
    `;
  }
};

export default useStyles;
