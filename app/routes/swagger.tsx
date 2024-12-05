import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { LoaderFunction, json } from "@remix-run/node";
//import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const loader: LoaderFunction = async () => {
  const openApiSpec = {
    openapi: "3.0.0",
    info: {
      title: "Dynamic API",
      version: "1.0.0",
    },
    paths: {
      "/dynamic": {
        get: {
          summary: "Dynamic endpoint",
          responses: {
            "200": {
              description: "Success",
            },
          },
        },
      },
    },
  };

  return json(openApiSpec);
};

export default function index() {
  return (
    <div style={{ height: "100vh" }}>
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
