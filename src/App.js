import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Twitch from "./component/Main/Twitch";
import "./App.css";

function App() {
  return (
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <Twitch />
    </DndProvider>
  );
}

export default App;
