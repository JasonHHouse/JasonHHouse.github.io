import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;