import React from 'react';
import Link from 'components/link';
import { Box, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const MultiRowTextCard = ({ data, modifier }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box className={classes.header}>
        <Link
          href={data.header.href}
          className={clsx(classes.link, classes[modifier])}
        >
          <Box className={clsx(classes.row, classes[modifier])}>
            <Typography className={classes.text}>{data.header.text}</Typography>
          </Box>
        </Link>
      </Box>
      <Box className={classes.content}>
        {data.content.map((row) => (
          <Link href={row.href} key={row.href} className={classes.link}>
            <Box className={clsx(classes.row, classes[modifier])}>
              <Typography className={classes.text}>{row.text}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Card>
  );
};

export default MultiRowTextCard;
