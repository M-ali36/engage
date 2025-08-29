import "./src/styles/global.css";

// Called once when the app loads
export const onInitialClientRender = () => {
  console.log("Gatsby has loaded and rendered the initial page.");

  const navEntries = performance.getEntriesByType("navigation");
  const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

  if (isReload) {
    const event = new Event("gatsby:pageFullyLoaded");
    window.dispatchEvent(event);
  }
};

// Called once when the client starts
export const onClientEntry = () => {
  // Optional: any startup logic
};

// Called after every route change
export const onRouteUpdate = () => {
  const event = new Event("gatsby:routeUpdated");
  window.dispatchEvent(event);
};
