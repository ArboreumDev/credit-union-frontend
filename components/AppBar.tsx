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

const clientId = '514394392436-jbqpopjpqvcr7f49fc43eio9mk5ocu5c.apps.googleusercontent.com'

const MountTest = () => {
    const store = useStore()

    const [showButton, toggleShow] = useState(true)

    const success = response => {
        console.log(response) // eslint-disable-line
        store.setUser("gaurav", "g@p.com")
    }

    const error = response => {
        console.error(response) // eslint-disable-line
    }

    const loading = () => {
        console.log('loading') // eslint-disable-line
    }

    const logout = () => {
        console.log('logout') // eslint-disable-line
        toggleShow(false)
    }

    if (showButton) {
        return (
            <GoogleLogin
                onSuccess={res => {
                    toggleShow(false)
                    success(res)
                }}
                onFailure={error}
                clientId={clientId}
                isSignedIn={true}
            >
                Auth then Hide button {store.name}
            </GoogleLogin>
        )
    }

    return <div><GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout} /></div>
}

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

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    
                    <MountTest/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
