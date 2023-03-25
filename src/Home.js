import React, { useContext } from "react";
import { useGlobalContext } from "./context";
import Search from "./Search";
import Movies from "./Movies"

const Home = () => {
  return (
    <>
    <Search />
    <Movies />
    </>
  )
}

export default Home;