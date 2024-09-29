import React from "react";
import Navbar from "./components";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resume from "./pages";
import Categories from "./pages/categories";
import Jobs from "./pages/jobs";
import Results from "./pages/result";
import "@mantine/core/styles.css";

const theme = createTheme({
    /** Your theme override here */
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Resume />} />
                    <Route path="/categories" element={<Categories />} />
                    {/* TODO maybe remove this path to Jobs directly? */}
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/result" element={<Results />} />
                </Routes>
            </Router>
        </MantineProvider>
    );
}

export default App;
