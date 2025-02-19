import { CyberUI } from "./sdk/CyberUI";
import CyberTheme from "./sdk/theme/cyber-theme";

const cyber = CyberUI({ theme: CyberTheme });

const App = () => {
  const store = cyber.store({
    state: {
      navigation: "setting",
      username: "test",
      role: "user",
      enabled: true,
      users: [
        { title: "John Doe", desc: "Software Engineer", avatar: "" },
        { title: "Jane Smith", desc: "Product Manager", avatar: "" },
      ],
    },
    config: {
      navigation: {
        enum: [
          { label: "Dashboard", value: "dashboard" },
          { label: "Profile", value: "profile" },
          { label: "Settings", value: "setting" },
        ],
      },
      username: {
        required: true,
        onChange(newVal: string) {
          console.log("change val", newVal);
        },
      },
      role: {
        enum: ["user", "admin", "moderator"],
      },
      users: {
        columns: 5,
        gap: "10px",
        onClick() {
          console.log("onClick");
        },
      },
    },
  });
  return (
    <div className="max-w-[1920px] mx-auto my-10 p-8 bg-[rgba(10,10,10,0.95)] border border-[#00ff9f] shadow-[0_0_20px_rgba(0,255,159,0.2)] rounded relative overflow-hidden">
      <h1 className="text-[#00ff9f] mb-6 text-2xl">CyberUI Demo</h1>

      <store.widget.navigation.menu />

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

export default App;
