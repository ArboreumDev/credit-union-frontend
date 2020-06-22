import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/AppBar';
import { InputLabel, Input, FormHelperText, makeStyles, createStyles, Theme, FormControl, Paper, Grid, TextField, Button, Select, MenuItem, FormControlLabel, Radio, RadioGroup, FormLabel, Card, CardContent, CardActions, Avatar, Divider, CssBaseline, ThemeProvider, CardActionArea, List, ListItem, ListItemAvatar, ListSubheader, ListItemText, Box } from '@material-ui/core';
import PinDropIcon from '@material-ui/icons/PinDrop';
import theme from '../../components/theme';

const messages = [
  {
    id: 1,
    primary: 'Arboreum',
    secondary: "CODE | $25/h | Full Stack Coding",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Vicara',
    secondary: `QUAL | Research Reference | Bangalore | Need to conduct interviews with 10 folks.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Vicara',
    secondary: 'CODE | Reference | Backend coding',
    person: '/static/images/avatar/2.jpg',
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);

export default function NewProject() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ButtonAppBar />
      
      <Paper square className={classes.paper}>
        <Container>
          <Grid item>
            <TextField
              fullWidth
              name="githubLink"
              type="text"
              label="Search"
            />
          </Grid>
          <RadioGroup
            style={{ flexDirection: "row" }}
          >
            <FormControlLabel
              control={<Radio />}
              label="coding"
              value="code"
            />
            <FormControlLabel
              control={<Radio />}
              label="qualitative"
              value="qual"
            />
            <FormControlLabel
              control={<Radio />}
              label="quantitative"
              value="quant"
            />
          </RadioGroup>
        </Container>
        
        <Typography className={classes.text} variant="h5" gutterBottom>
          
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

  </ThemeProvider>
     
  );
}
