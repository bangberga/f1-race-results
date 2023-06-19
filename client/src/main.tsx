import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import FiltersProvider from "./contexts/filters_context.tsx";
import BarchartProvider from "./contexts/barchar_context.tsx";
import DataProvider from "./contexts/data_context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <FiltersProvider>
        <BarchartProvider>
          <App />
        </BarchartProvider>
      </FiltersProvider>
    </DataProvider>
  </React.StrictMode>
);
