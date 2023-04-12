import React, { Suspense, Profiler } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Store/Index";
import "./index.css";
const App = React.lazy(() => import("./App"));

function onRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  // console.log({
  //   id,
  //   phase,
  //   actualDuration,
  //   baseDuration,
  //   startTime,
  //   commitTime,
  // });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <>
          <h6>Loading.....</h6>
        </>
      }
    >
      <Profiler id="React Performance" onRender={onRender}>
        <Provider store={store}>
          <App />
        </Provider>
      </Profiler>
    </Suspense>
  </React.StrictMode>
);


// Tools want to use in this Project 
// React - Virtualised = for Video Listing
// Framer - Motion = For some Animation


