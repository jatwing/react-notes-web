import { css } from '@emotion/css';

const useStyles = (theme) => {
  return css`
    .link:hover {
      text-decoration: none;
    }

    .row {
      padding: ${theme.spacing(2)};
    }
    .row:hover {
      text-decoration: underline currentcolor;
    }

    .header .row.major {
      color: ${theme.palette.primary.contrastText};
      transition: color 1s linear;
      background-color: ${theme.palette.primary.main};
    }
    .header .row.major:hover {
      color: ${theme.palette.primary.highlightText};
      text-decoration: none;
    }

    .header .row.minor {
      color: ${theme.palette.text.primary};
      position: relative;
    }
    .header .row.minor::after {
      content: '';
      display: block;
      width: 32px;
      height: 32px;
      clip-path: polygon(0 0, 32px 0, 32px 32px);
      position: absolute;
      right: 0;
      top: 0;
      background: linear-gradient(
        ${theme.palette.secondary.dark},
        ${theme.palette.secondary.light}
      );
    }
    .header .row.minor:hover::after {
      background: linear-gradient(
        ${theme.palette.primary.dark},
        ${theme.palette.primary.light}
      );
    }

    .header.text {
      font-family: ${theme.typography.fontStacks.sansSerif};
      font-size: ${theme.typography.h6.fontSize};
      font-weight: ${theme.typography.h6.fontWeight};
      lineheight: ${theme.typography.h6.lineHeight};
    }

    .content .row.major {
      color: ${theme.palette.secondary.contrastText};
      transition: background 1s linear;
    }
    .content *:nth-child(3n + 1) .row.major {
      background-color: ${theme.palette.secondary.light};
    }
    .content *:nth-child(3n + 2) .row.major {
      background-color: ${theme.palette.secondary.main};
    }
    .content *:nth-child(3n) .row.major {
      background-color: ${theme.palette.secondary.dark};
    }
    .content .row.major:hover {
      background-color: ${theme.palette.primary.main};
    }

    .content .row.minor {
      color: ${theme.palette.text.secondary};
      border-top: 1px dashed ${theme.palette.secondary.main};
    }
    .content .row.minor:hover .text {
      font-size: ${theme.typography.h6.fontSize};
    }

    .content .text {
      font-family: ${theme.typography.fontStacks.serif}
      font-size: ${theme.typography.body1.fontSize};
      font-weight: ${theme.typography.body1.fontWeight};
      lineheight: ${theme.typography.body1.lineHeight};
      transition: font-size 1s linear;
    }
    `;
};

export default useStyles;
