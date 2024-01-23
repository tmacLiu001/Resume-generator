import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Routers } from "./router/router";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path={Routers.DASHBOARD} element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
);

export default App;
