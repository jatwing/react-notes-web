import { Card, Divider, List, ListItem, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'src/components';
import React from 'react';

import { useStyles } from './styles';

const MultirowTextCard = (props) => {
  const { data, modifier } = props;

  const classes = useStyles();
  return (
    <Card>
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

export { MultirowTextCard };
