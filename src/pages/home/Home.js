import React from "react";
import Header from "./Header";
import "../../styles/home.css";
import Why from "./Why";
import How from "./how/How";
import Register from "./Register";
import Contact from "./Contact";

export default function Home() {
  return (
    <div>
      <Header />
      <Why />
      <How />
      <Register />
      <Contact />
    </div>
  );
}
