import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../components/theme';
import App from '../components/app';
import ButtonAppBar from '../components/AppBar';
import NewProject from './project/new';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import useSWR from 'swr'
import { fetcher } from '../utils/api';
import { useSession } from 'next-auth/client'


export default function Home() {
  const [session, loading] = useSession()

  // const { data, error } = useSWR('{ users { name } }', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  // const { users } = data

  return <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <ButtonAppBar />
    <Typography variant="h4" align="left" component="h1" gutterBottom /> 
    <p>
      {!session && <>
        Not signed in <br />
        <a href="/api/auth/signin">Sign in</a>
      </>}
      {session && <>
        Signed in as {session.user.email} <br />
        <a href="/api/auth/signout">Sign out</a>
      </>}
    </p>
    
    {/* <div>
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div> */}

  </ThemeProvider>
  
}
