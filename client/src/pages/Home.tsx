import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import BarChart from "../components/BarChart";

export default function Home() {
  return (
    <HomeContainer>
      <Navbar />
      <main>
        <Filters />
        <Outlet />
        <BarChart />
      </main>
    </HomeContainer>
  );
}

const HomeContainer = styled.section`
  main {
    width: 90%;
    margin: 0 auto;
  }
`;
