import { CyberUI } from "./sdk/CyberUI";
import defaultWidget from "./sdk/defaultWidget";

const cyber = CyberUI({ widget: defaultWidget });

const store = cyber.store({
  state: {
    username: "",
    email: "",
    role: "user",
    users: [
      { name: "John Doe", desc: "Software Engineer", avatar: "" },
      { name: "Jane Smith", desc: "Product Manager", avatar: "" },
    ],
  },
  config: {
    username: {
      required: true,
    },
    email: {
      required: true,
    },
    role: {
      enum: ["user", "admin", "moderator"],
    },
  },
});

// globalThis.store = store;

const App = () => (
  <div
    style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "rgba(10, 10, 10, 0.95)",
      border: "1px solid #00ff9f",
      boxShadow: "0 0 20px rgba(0, 255, 159, 0.2)",
      borderRadius: "4px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <h1 style={{ color: "#00ff9f", marginBottom: "24px", fontSize: "24px" }}>
      CyberUI Demo
    </h1>
    <store.widget.users.list />
    <store.widget.users.grid />
  </div>
);

export default App;
