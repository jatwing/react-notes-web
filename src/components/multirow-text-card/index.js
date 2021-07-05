import React from 'react';
import Link from 'components/link';
import { Card, List, ListItem, Divider, Typography } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const MultirowTextCard = ({ data, modifier }) => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <List className={classes.list}>
        <Link
          href={data.header.href}
          key={data.header.href}
          className={classes.link}
        >
          <ListItem
            button={true}
            className={clsx(classes.item, classes[modifier])}
          >
            <Typography className={clsx(classes.text, classes[modifier])}>
              {data.header.text}
            </Typography>
          </ListItem>
        </Link>
        <Divider className={clsx(classes.divider, classes[modifier])} />
        {data.content.map((object) => (
          <Link href={object.href} key={object.href} className={classes.link}>
            <ListItem
              button={true}
              className={clsx(classes.item, classes[modifier])}
            >
              <Typography className={clsx(classes.text, classes[modifier])}>
                {object.text}
              </Typography>
            </ListItem>
          </Link>
        ))}
      </List>
    </Card>
  );
};

export default MultirowTextCard;
