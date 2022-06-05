import { useEffect } from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import Link from 'next/link';
import Script from 'next/script';
import ContextProvider,{ Context } from '../stores/Context';

const Layout = ({children}) => {



  return (
    <div>
      <Head>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></Script>
        <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></Script> 
      </Head>
      <ContextProvider>
        {children}
      </ContextProvider>
    </div>
  )
} 

export default Layout;
