import type { FieldProps } from "./types";

const defaultWidget = {
  input: ({ value, onChange, required, ...props }: FieldProps) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 12px",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid #00ff9f",
        borderRadius: "4px",
        color: "#fff",
        outline: "none",
      }}
      required={required}
      {...props}
    />
  ),

  select: ({ value, onChange, enum: options = [], ...props }: FieldProps) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 12px",
        marginBottom: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid #00ff9f",
        borderRadius: "4px",
        color: "#fff",
        outline: "none",
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
};

export default defaultWidget;
