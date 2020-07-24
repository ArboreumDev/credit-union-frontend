import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { observer } from 'mobx-react-lite';

import { InputLabel, Input, FormHelperText, makeStyles, createStyles, Theme, FormControl } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Gaurav Paruthi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const App = observer(() => {
  const classes = useStyles();
  
  return (
    <Container maxWidth="lg">
      <div></div>
    </Container>
  );
})

export default App;