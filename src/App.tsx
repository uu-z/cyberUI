import { observer } from "mobx-react-lite";
import { CyberUI } from "./sdk/CyberUI";
import defaultWidget from "./sdk/defaultWidget";

interface AppState {
  username: string;
  email: string;
  role: string;
  users: Array<{
    name: string;
    desc: string;
    avatar: string;
  }>;
}

const cyber = CyberUI({ widege: defaultWidget });

const store = cyber.store<AppState>({
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
    <store.state.username.input />
    <store.state.email.input />
    <store.state.role.select />
  </div>
);

export default App;
