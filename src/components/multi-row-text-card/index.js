import React from 'react';
import Link from 'components/link';
import { Box, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import { cx } from '@emotion/css';

const MultiRowTextCard = ({ data, modifier }) => {
  const theme = useTheme();
  const a = useStyles(theme);
  console.log(a)
  return (
    <Card className={a}>
      <Box className="header">
        <Link href={data.header.href} className={cx('link', modifier)}>
          <Box className={cx('row', modifier)}>
            <Typography className="text">{data.header.text}</Typography>
          </Box>
        </Link>
      </Box>
      <Box className="content">
        {data.content.map((row) => (
          <Link href={row.href} key={row.href} className="link">
            <Box className={cx('row', modifier)}>
              <Typography className="text">{row.text}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Card>
  );
};

export default MultiRowTextCard;
