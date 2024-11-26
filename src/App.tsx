import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.scss";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
