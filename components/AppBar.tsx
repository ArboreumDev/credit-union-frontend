import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useStore } from '../stores/root';
import { useSession } from 'next-auth/client'

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
            color: '#FFF'
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();
    const [session, loading] = useSession()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Link href='/'><Typography variant="h6" className={classes.title}>Vicara</Typography></Link>
                    {!session && <>
                        Not signed in <br />
                        <Button href='/project/new' color="inherit">Create</Button>
                        <a href="/api/auth/signin">Sign in</a>
                    </>}
                    {session && <>
                        Signed in as {session.user.email} <br />
                        <a href="/api/auth/signout">Sign out</a>
                        <Button href='/project/search' color="inherit">Search</Button>
                    </>}



                </Toolbar>
            </AppBar>
        </div>
    );
}
