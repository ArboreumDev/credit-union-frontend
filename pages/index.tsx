import App from '../components/app';

import Link from 'next/link';
import useSWR from 'swr'
import { fetcher } from '../utils/api';
import { Classes } from '@blueprintjs/core';


export default function Home() {


  // const { data, error } = useSWR('{ users { name } }', fetcher)

  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>

  // const { users } = data

  return (
    
          <Link href='/lender'><a>Lender Config</a></Link> 
    
    
)
}
