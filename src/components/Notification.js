import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
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
