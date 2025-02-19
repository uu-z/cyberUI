import type { FieldProps } from "./types";

const defaultWidget = {
  list: ({ value }: FieldProps) => (
    <div style={{ marginBottom: "16px" }}>
      {Array.isArray(value) &&
        value.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "16px",
              marginBottom: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid #00ff9f",
              borderRadius: "4px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "rgba(0, 255, 159, 0.1)",
                border: "1px solid #00ff9f",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#00ff9f", fontSize: "20px" }}>
                  {item.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div
                style={{
                  color: "#00ff9f",
                  fontSize: "16px",
                  marginBottom: "4px",
                  fontWeight: "500",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
    </div>
  ),

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

  grid: ({ value }: FieldProps) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        marginBottom: "16px",
      }}
    >
      {Array.isArray(value) &&
        value.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid #00ff9f",
              borderRadius: "4px",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "rgba(0, 255, 159, 0.1)",
                border: "1px solid #00ff9f",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#00ff9f", fontSize: "24px" }}>
                  {item.name.charAt(0)}
                </span>
              )}
            </div>
            <div
              style={{
                color: "#00ff9f",
                fontSize: "16px",
                marginBottom: "4px",
                fontWeight: "500",
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
              }}
            >
              {item.desc}
            </div>
          </div>
        ))}
    </div>
  ),
};

export default defaultWidget;
