import "./App.css";
import Presentation from "./components/Presentation";
import slides from "./slides";
import "@fontsource/roboto";

function App() {
  return (
    <Presentation
      initialState={{
        slide: 0,
        slides,
      }}
    />
  );
}

export default App;
