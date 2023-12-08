import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from '../reducers/user';
import favCities from '../reducers/favCities';
import defaultCities from '../reducers/defaultCities';

const store = configureStore({
  reducer: {user, favCities, defaultCities},
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
