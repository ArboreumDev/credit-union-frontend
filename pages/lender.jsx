import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import ButtonAppBar from '../components/AppBar';
import { useStore } from '../stores/root';
import { observer } from 'mobx-react-lite';

// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';


export default observer(() => {
    const store = useStore()

    return <div>
        <ButtonAppBar />
        Hi {store.name} {store.email}
        <br />
        <br />
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeI7HkDCLcfS4XYAHgOeUAsA2pRqU4evlgSMOxFEwJikOP-CA/viewform?embedded=true" width="640" height="642" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    </div>
})