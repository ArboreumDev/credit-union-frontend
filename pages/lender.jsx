import React from 'react'
import ButtonAppBar from '../components/AppBar';
import UserConfig from '../components/UserConfig';
import { useStore } from '../stores/root';
import { observer } from 'mobx-react-lite';
import { Paper, Typography } from '@material-ui/core';

// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';


export default observer(() => {
    const store = useStore()

    return <div>
        <ButtonAppBar />

        <Paper variant="outlined" square >
        {store.session && <>

                {/* <Typography> Hi {store.session.user.name} {store.session.user.email}</Typography> */}
                <UserConfig/>
            <br />
            <br />
            
            
            {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeI7HkDCLcfS4XYAHgOeUAsA2pRqU4evlgSMOxFEwJikOP-CA/viewform?embedded=true" width="640" height="642" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
        </>}
        </Paper>
    </div>
})