import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import { useStore } from '../stores/root';
import { TextField, Grid, Icon, Button, Paper } from '@material-ui/core';

import TrustedUsers from './TrustedUsersTable';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));


export default observer(() => {
    const store = useStore()
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return <div className={classes.root}>
        <Accordion expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel0bh-content"
                id="panel0bh-header"
            >
                <Typography className={classes.heading}>Profile</Typography>
                <Typography className={classes.secondaryHeading}>
                    {store.session.user.email}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="caption">
                    {store.session.user.email}
                    {store.session.user.name}

                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>Total Exposure (INR)</Typography>
                <TextField className={classes.secondaryHeading} name="xxx" label="" type="text" value={store.fin_params.max_exposure}></TextField>
                {/* <Typography className={classes.secondaryHeading}>{store.fin_params.max_exposure} INR</Typography> */}
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="caption">
                    Maximum amount you wish to loan out, in INR? This will be your total exposure across corpus and guarantee investments.
                    (For the trial period of this program, this is a minimum 2-month commitment)
          </Typography>


            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
            >
                <Typography className={classes.heading}>Minimum Interest Rate (%)</Typography>
                <TextField className={classes.secondaryHeading} name="xxx" label="" type="text" value={store.fin_params.min_interest_rate}></TextField>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="caption">
                    What is the minimum interest rate you desire for your portfolio, on a % per annum basis?
                    Higher interest expectation will correspond to riskier investments
          </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
            >
                <Typography className={classes.heading}>Trusted Borrowers</Typography>
                <Typography className={classes.secondaryHeading}>
                    {store.fin_params.borrowers.length} borrowers
          </Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Grid container alignItems="stretch" spacing={2}>
                    <TrustedUsers rows={store.fin_params.borrowers} />
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <TextField required name="name" type="text" label="Name"/>
                            </Grid>
                            <Grid item>
                                <TextField required name="email" type="text" label="email" />
                            </Grid>
                            <Grid item>
                                <TextField required name="amount" type="text" label="amount" />
                            </Grid>
                            <Grid item>
                                <Paper className={classes.paper}><Button >Add</Button></Paper>
                                
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

    </div>

})