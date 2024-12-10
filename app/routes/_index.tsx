import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Index() {
  return (
    <div style={{ height: "100vh" }}>
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
