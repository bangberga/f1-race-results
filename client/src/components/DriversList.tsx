import styled from "styled-components";
import { VscGraph } from "react-icons/vsc";
import Loading from "./Loading";
import { useFiltersContext } from "../contexts/filters_context";
import { useDriversContext } from "../contexts/driers_context";
import Driver from "./Driver";
import { useBarchartContext } from "../contexts/barchar_context";

export default function DriversList() {
  const { loading } = useDriversContext();
  const { filteredDrivers } = useFiltersContext();
  const { handleShow, updateData, handleTitle } = useBarchartContext();

  return (
    <DriversListContainer>
      <h1 className="title">Drivers</h1>
      {loading ? (
        <Loading />
      ) : filteredDrivers.length === 0 ? (
        <p>No drivers found</p>
      ) : (
        <div>
          {filteredDrivers.map((driver, i) => {
            const { year, data } = driver;
            return (
              <div key={i} className="list-section">
                <header className="list-header">
                  <h4>{year}</h4>
                  <button
                    onClick={() => {
                      updateData(data);
                      handleTitle("x", "Points");
                      handleTitle("y", "Drivers");
                      handleShow(true);
                    }}
                  >
                    <VscGraph />
                  </button>
                </header>
                <hr />
                {data.length === 0 && <p>No data</p>}
                <div className="list-container">
                  {data.map((driver, i) => (
                    <Driver driver={driver} key={i} />
                  ))}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </DriversListContainer>
  );
}

const DriversListContainer = styled.div``;
