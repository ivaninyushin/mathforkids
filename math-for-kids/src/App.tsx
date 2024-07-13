import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.scss';
import ProblemGenerator from './components/problemGenerator/problemGenerator';
import DonatePage from './pages/donatePage';
import ModeSelector from './components/modeSelector/modeSelector';

function App() {
  const routesJSX = (
    <>
      <Route path="/" element={ <ModeSelector />} />
      <Route path="/math1" element={ <ProblemGenerator mode="math1" lang="en" />} />
      <Route path="/math2" element={ <ProblemGenerator mode="math2" lang="en" />} />
      <Route path="/math3" element={ <ProblemGenerator mode="math3" lang="en" />} />
      <Route path="/en/music" element={<ProblemGenerator mode="music" lang="en" />} />
      <Route path="/ru/music" element={<ProblemGenerator mode="music" lang="ru" />} />
      <Route path="/donate" element={ <DonatePage />} />
    </>)
  const routes = createRoutesFromElements(routesJSX);
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router}/>
}

export default App;
