import { CyberUI } from "./sdk/CyberUI";
import CyberTheme from "./sdk/theme/cyber-theme";

const cyber = CyberUI({ theme: CyberTheme });

const store = cyber.store({
  state: {
    username: "test",
    role: "user",
    enabled: true,
    users: [
      { name: "John Doe", desc: "Software Engineer", avatar: "" },
      { name: "Jane Smith", desc: "Product Manager", avatar: "" },
    ],
  },
  config: {
    username: {
      required: true,
    },
    role: {
      enum: ["user", "admin", "moderator"],
    },
  },
});

const App = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>CyberUI Demo</h1>

      <store.widget.users.table />
      <store.widget.users.list />
      <store.widget.users.grid />

      <store.widget.username.auto />
      <store.widget.role.auto />
      <store.widget.enabled.auto />

      <store.plugin.Json />
      <store.plugin.Table />
    </div>
  );
};

const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "30px",
  backgroundColor: "rgba(10, 10, 10, 0.95)",
  border: "1px solid #00ff9f",
  boxShadow: "0 0 20px rgba(0, 255, 159, 0.2)",
  borderRadius: "4px",
  position: "relative",
  overflow: "hidden",
} as const;

const titleStyle = {
  color: "#00ff9f",
  marginBottom: "24px",
  fontSize: "24px",
} as const;

const sectionStyle = {
  marginBottom: "24px",
} as const;

const sectionTitleStyle = {
  color: "#00ff9f",
  marginBottom: "16px",
  fontSize: "18px",
} as const;

export default App;
