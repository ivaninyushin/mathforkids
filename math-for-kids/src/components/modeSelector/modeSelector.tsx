import { Link } from "react-router-dom";

const ModeSelector = () => (
  <div className="flex flex-col w-full align-middle justify-center h-full">
    <Link to="math1" className="text-2xl">Математика + -</Link>
    <Link to="math2" className="text-2xl">Математика ×</Link>
    <Link to="math3" className="text-2xl">Математика ÷</Link>
    <Link to="ru/music" className="text-2xl">Ноты ДО-СИ</Link>
    <Link to="en/music" className="text-2xl">Notes A-G</Link>
  </div>
)

export default ModeSelector;
