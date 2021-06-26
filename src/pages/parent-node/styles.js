import { css } from '@emotion/css';
import useMedia from 'utils/media';

const useStyles = (theme, block) => {
  const { largeQuery } = useMedia();

  if (block === 'list') {
    return css`
      .left {
        display: inline-block;
        width: ${100 / 3}%;
        background-color: red;
      }

      .right {
        display: inline-block;
        width: ${(100 / 3) * 2}%;
      }

      .list {
        overflow: visible;
      }


      .right .list {
        margin-top: 0;
      }

      .item {
        width: 100%;
      }
      ${largeQuery} {
        .item.test {
          position: fixed;
          width: calc(${(100 / 3)}% - ${32 / 3}px - 16px);
        }
      }
    `;
  } else if (block === 'root') {
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
    `;
  } else if (block === 'header') {
    return css`
      .link.major {
        cursor: default;
      }
      .link.major:active {
        pointer-events: none;
      }

      .row.major {
        color: ${theme.palette.primary.contrastText};
        transition: color 1s linear;
        background-color: ${theme.palette.primary.main};
      }
      .row.major:hover {
        color: ${theme.palette.primary.highlightText};
        text-decoration: none;
      }

      .row.minor {
        color: ${theme.palette.text.primary};
        position: relative;
      }
      .row.minor::after {
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
      .row.minor:hover::after {
        background: linear-gradient(
          ${theme.palette.primary.dark},
          ${theme.palette.primary.light}
        );
      }

      .text {
        font-family: ${theme.typography.fontStacks.sansSerif};
        font-size: ${theme.typography.h6.fontSize};
        font-weight: ${theme.typography.h6.fontWeight};
        lineheight: ${theme.typography.h6.lineHeight};
      }
    `;
  } else if (block === 'content') {
    return css`
      .row.major {
        color: ${theme.palette.secondary.contrastText};
        transition: background 1s linear;
      }
      *:nth-child(3n + 1) .row.major {
        background-color: ${theme.palette.secondary.light};
      }
      *:nth-child(3n + 2) .row.major {
        background-color: ${theme.palette.secondary.main};
      }
      *:nth-child(3n) .row.major {
        background-color: ${theme.palette.secondary.dark};
      }
      .row.major:hover {
        background-color: ${theme.palette.primary.main};
      }

      .row.minor {
        color: ${theme.palette.text.secondary};
        border-top: 1px dashed ${theme.palette.secondary.main};
      }
      .row.minor:hover .text {
        font-size: ${theme.typography.h6.fontSize};
      }

      .text {
        font-family: ${theme.typography.fontStacks.serif}
        font-size: ${theme.typography.body1.fontSize};
        font-weight: ${theme.typography.body1.fontWeight};
        lineheight: ${theme.typography.body1.lineHeight};
        transition: font-size 1s linear;
      }
    `;
  }
};

export default useStyles;
