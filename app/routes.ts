import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/AircraftsList.tsx"),
  route("aircraft/:id", "routes/AircraftDetails.tsx"),
] satisfies RouteConfig;
