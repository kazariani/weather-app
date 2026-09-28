import './App.css';

import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.jsx";
import Form from "./components/Form/Form.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <h1 className="text-center m-5">Weather App</h1>

      <div className="weather container border border-secondary border-2 rounded p-5">
        <ThemeSwitcher />

        <Form defaultCity="Freudenstadt" />
      </div>

      <Footer />
    </div>
  );
}

export default App;
