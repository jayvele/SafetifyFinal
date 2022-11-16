// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      {/* <div className='bg-blue-500'>hello</div> */}
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
