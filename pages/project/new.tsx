import React from 'react';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/AppBar';
import { InputLabel, Input, FormHelperText, makeStyles, createStyles, Theme, FormControl, Paper, Grid, TextField, Button, Select, MenuItem, FormControlLabel, Radio, RadioGroup, FormLabel, CssBaseline, ThemeProvider, Container } from '@material-ui/core';
import theme from '../../components/theme';

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

export default function NewProject() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ButtonAppBar />
      <Container>
        
        <Paper style={{ padding: 16 }}>
          <Typography variant="h4" align="left" component="h1" gutterBottom>
            Create new project
      </Typography>
          <Grid container alignItems="stretch" spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="projectName"
                type="text"
                label="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="githubLink"
                type="text"
                label="Github Link"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="description"
                type="text"
                label="Description"
                multiline
                rows={6}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Project Type</FormLabel>
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
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="incentive"
                type="text"
                label="Incentive"
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="process"
                type="text"
                label="Cadidate Selection Process"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="geography"
                type="text"
                label="Geography"

              />
            </Grid>


            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              // disabled={submitting}
              >
                Submit
                  </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
  </ThemeProvider>
      
        
  );
}
