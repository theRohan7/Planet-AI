import Logo from "/Logo.svg";
import { CirclePlay } from "lucide-react";
import "./App.css";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar.jsx"


function App() {

  return (
    <main>
      <nav>
        <img src={Logo} alt="Logo" />
        <div className="nav-btns">
          <button className="deploy-btn">Deploy</button>
          <button className="run-btn">
            {" "}
            <CirclePlay /> Run
          </button>
        </div>
      </nav>
      <section>
          <Sidebar />
          <Canvas />
      </section>
    </main>
  );
}

export default App;
