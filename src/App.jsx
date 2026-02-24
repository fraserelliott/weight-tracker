import "./App.css";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import "@fraserelliott/fe-components/stylesheet";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { SettingsPage } from "@pages/SettingsPage";
import { HomePage } from "@pages/HomePage";
import {
  OptionalPortal,
  ToastMessageDisplay,
} from "@fraserelliott/fe-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/goals" element={<></>} />
          <Route path="/info" element={<></>} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <OptionalPortal portalTarget={document.body}>
        <ToastMessageDisplay />
      </OptionalPortal>
    </>
  );
}

export default App;
