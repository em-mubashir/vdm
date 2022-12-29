import "./App.css";
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Home from "./pages/home/Home";
import { CircularProgress, Box, Typography } from "@mui/material";
import MyNav from "./components/MyNav";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { defaultThemeOptions } from "./theme/defaultThemeOptions";
import React, { Suspense } from "react";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import ContactUs from "./pages/contact";
import Congratulations from "./pages/auth/greetings";
import { blue, red, deepPurple } from "@mui/material/colors";
import Footer from "./components/Footer";
function App() {
  const Home = React.lazy(() => import("./pages/home/Home"));
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        light: deepPurple[100],
        main: "#000000",
        dark: deepPurple[700],
      },
      third: {
        light: deepPurple[100],
        main: deepPurple[300],
        dark: deepPurple[700],
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "Poppins",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
      >
        <MemoryRouter>
          <MyNav />
          <Routes>
            {/* <Route path='/' element={<Navigate to='/' />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/greetings' element={<Congratulations />} />
            <Route path='/contact-us' element={<ContactUs />} />

            {/* <Route path="/contact" element={<Home />} /> */}
          </Routes>
          <Footer />
        </MemoryRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Navbar from "./component/Navbar";
// import Home from "./pages/home";
// import About from "./pages/about";
// import Contact from "./pages/contact";
// import Faq from "./pages/faq";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/contact" component={Contact} />
//         <Route path="/faq" component={Faq} />
//       </Switch>
//     </Router>
//   );
// }
// export default App;
