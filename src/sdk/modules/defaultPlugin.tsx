import React from "react";
import type { Plugin } from "./plugin";

const defaultPlugin: Plugin = {
  Json: ({ value }) => (
    <pre style={{ color: "#00ff9f" }}>{JSON.stringify(value, null, 2)}</pre>
  ),

  Debug: ({ value }) => (
    <div
      style={{
        padding: "15px",
        border: "1px solid #00ff9f",
        borderRadius: "4px",
        marginTop: "10px",
        backgroundColor: "rgba(0, 255, 159, 0.05)",
      }}
    >
      <h3 style={{ color: "#00ff9f", margin: "0 0 15px 0", fontSize: "18px" }}>
        State Debug Info
      </h3>
      <div style={{ color: "#00ff9f" }}>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
            Keys ({Object.keys(value).length}):
          </div>
          <div style={{ marginLeft: "10px", opacity: 0.9 }}>
            {Object.keys(value).map((key) => (
              <div key={key} style={{ marginBottom: "3px" }}>
                • {key}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Types:</div>
          <div style={{ marginLeft: "10px", opacity: 0.9 }}>
            {Object.entries(value).map(([key, val]) => (
              <div key={key} style={{ marginBottom: "3px" }}>
                • {key}: <span style={{ color: "#66ffbb" }}>{typeof val}</span>
                {Array.isArray(val) && ` (length: ${val.length})`}
                {typeof val === "object" &&
                  val !== null &&
                  !Array.isArray(val) &&
                  ` (keys: ${Object.keys(val).length})`}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Values:</div>
          <div style={{ marginLeft: "10px", opacity: 0.9 }}>
            {Object.entries(value).map(([key, val]) => (
              <div key={key} style={{ marginBottom: "3px" }}>
                • {key}:{" "}
                <span style={{ color: "#66ffbb" }}>
                  {typeof val === "object"
                    ? JSON.stringify(val, null, 2).split("\n")[0].slice(0, 50) +
                      "..."
                    : String(val)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),

  Table: ({ value }) => (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        color: "#00ff9f",
        border: "1px solid #00ff9f",
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #00ff9f", padding: "8px" }}>Key</th>
          <th style={{ border: "1px solid #00ff9f", padding: "8px" }}>Value</th>
          <th style={{ border: "1px solid #00ff9f", padding: "8px" }}>Type</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(value).map(([key, val]) => (
          <tr key={key}>
            <td style={{ border: "1px solid #00ff9f", padding: "8px" }}>
              {key}
            </td>
            <td style={{ border: "1px solid #00ff9f", padding: "8px" }}>
              {typeof val === "object" ? JSON.stringify(val) : String(val)}
            </td>
            <td style={{ border: "1px solid #00ff9f", padding: "8px" }}>
              {typeof val}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export default defaultPlugin;
