import React from 'react';
import SuperApp from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import { Provider } from 'context-q';
import '../css/tailwind.css';

class App extends SuperApp {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = process.env.API_HOST;
  }

  render() {
    const { Component, pageProps } = this.props;

    let user = null;
    let token = null;

    if (pageProps.auth && pageProps.auth.user) {
      user = pageProps.auth.user;
      token = pageProps.auth.token;
    }

    return (
      <>
        <Head>
          <title>{process.env.APP_NAME}</title>
        </Head>
        <Provider
          defaultState={{
            user,
            token,
          }}
        >
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default App;
