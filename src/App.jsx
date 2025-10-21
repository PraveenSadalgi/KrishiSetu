import React from "react";
import Routes from "./Routes";
import { SmoothScrollProvider } from "./contexts/SmoothScrollContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SmoothScrollProvider>
        <Routes />
      </SmoothScrollProvider>
    </AuthProvider>
  );
}

export default App;
