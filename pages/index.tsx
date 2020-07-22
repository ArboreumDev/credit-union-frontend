import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../components/theme';
import App from '../components/app';
import ButtonAppBar from '../components/AppBar';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import useSWR from 'swr'
import { fetcher } from '../utils/api';
import { ReactTypeformEmbed } from 'react-typeform-embed'


export default function Home() {


  // const { data, error } = useSWR('{ users { name } }', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  // const { users } = data

  return <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {/* <ButtonAppBar /> */}
    <Typography variant="h4" align="left" component="h1" gutterBottom />

    <ReactTypeformEmbed url="https://demo.typeform.com/to/njdbt5" />

  </ThemeProvider>

}
