import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar.jsx";
import Landing from "./components/layout/Landing.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-[#111118]">
          <Navbar />
          <Route exact path="/" component={Landing} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
