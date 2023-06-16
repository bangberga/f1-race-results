import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import RacesProvider from "./contexts/races_context.tsx";
import FiltersProvider from "./contexts/filters_context.tsx";
import DriversProvider from "./contexts/driers_context.tsx";
import TeamsProvider from "./contexts/team_context.tsx";
import BarchartProvider from "./contexts/barchar_context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RacesProvider>
      <DriversProvider>
        <TeamsProvider>
          <FiltersProvider>
            <BarchartProvider>
              <App />
            </BarchartProvider>
          </FiltersProvider>
        </TeamsProvider>
      </DriversProvider>
    </RacesProvider>
  </React.StrictMode>
);
