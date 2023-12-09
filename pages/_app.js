import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from '../reducers/user';
import favCities from '../reducers/favCities';

const store = configureStore({
  reducer: {user, favCities},
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Your weather report</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
