import { setupChart } from "./dom/setupChart";
import { render } from "./render/render";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("service-worker.js").then(
      (r) => {
        r.update();
        console.log("ServiceWorker registration successful", r);
      },
      (err) => console.log("ServiceWorker registration failed: ", err)
    );
  });
}

setupChart();
render();
