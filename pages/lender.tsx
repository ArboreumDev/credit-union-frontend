import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { TextField } from 'formik-material-ui';
import Button from "@material-ui/core/Button";
import { LinearProgress, Paper, createStyles, Theme, makeStyles, Typography, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(2)
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            // color: '#FFF'
        },
    }),
);


export default function NewProject() {
    const classes = useStyles();

    return (<div>
        <Paper style={{ padding: 16 }}>
            
            <Typography align="center" variant="h3" className={classes.title}>Lender</Typography>
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
            </Grid>
        </Paper>
             
            </div>

    );
}
