import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.scss';
import ProblemGenerator from './components/problemGenerator/problemGenerator';
import DonatePage from './pages/donatePage';

function App() {
  const routesJSX = (
    <>
      <Route path="/" element={ <ProblemGenerator mode="math" lang="en" />} />
      <Route path="/en/music" element={<ProblemGenerator mode="music" lang="en" />} />
      <Route path="/ru/music" element={<ProblemGenerator mode="music" lang="ru" />} />
      <Route path="/donate" element={ <DonatePage />} />
    </>)
  const routes = createRoutesFromElements(routesJSX);
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router}/>
}

export default App;
