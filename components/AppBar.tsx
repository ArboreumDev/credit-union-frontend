import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useSession } from 'next-auth/client'
import { useStore } from '../stores/root';
import { observer } from 'mobx-react-lite';


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

export default observer (()=>{
    const [session, loading] = useSession()
    const classes = useStyles()
    const store = useStore()

    if (session){
        store.setSession(session)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Arboreum</Typography>
                    {!session && <>
                        Not signed in <br />
                        <Button href='/api/auth/signin' color="inherit">Login</Button>
                        {/* <a href="/api/auth/signin">Sign in</a> */}
                    </>}
                    {session && <>
                        Signed in as {store.session.user.email} <br />
                        {/* <a href="/api/auth/signout">Sign out</a> */}
                        <Button href='/api/auth/signout' color="inherit">Logout</Button>
                    </>}



                </Toolbar>
            </AppBar>
        </div>
    );
}
)