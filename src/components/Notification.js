import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 8px 0 8px',
    width: '100%',
    '& > * + *': {
      margin: theme.spacing(1),
    },
  },
}));

const Notification = ({ message, severity = 'info' }) => {
  const classes = useStyles();
  if (message === null) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity={severity}>{message}</Alert>
    </div>
  )
}

export default Notification;
