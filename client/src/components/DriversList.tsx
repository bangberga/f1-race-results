import styled from "styled-components";
import Loading from "./Loading";
import { useFiltersContext } from "../contexts/filters_context";
import { useDriversContext } from "../contexts/driers_context";
import Driver from "./Driver";

export default function DriversList() {
  const { loading } = useDriversContext();
  const { filteredDrivers } = useFiltersContext();

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
                <h4>{year}</h4>
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
