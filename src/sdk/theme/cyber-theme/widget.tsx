import type { FieldProps } from "../../types";

const widget = {
  table: ({ value, gap = "12px" }: FieldProps) => {
    if (!Array.isArray(value) || value.length === 0) return null;

    const headerStyle = {
      padding: gap,
      textAlign: "left",
      color: "#00ff9f",
      borderBottom: "1px solid #00ff9f",
      background: "rgba(0, 255, 159, 0.1)",
      fontWeight: "normal",
    } as const;

    const cellStyle = {
      padding: gap,
      color: "#fff",
      borderBottom: "1px solid rgba(0, 255, 159, 0.2)",
    } as const;

    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: gap,
      border: "1px solid #00ff9f",
      borderRadius: "4px",
      overflow: "hidden",
    } as const;

    const columns = Object.keys(value[0]);

    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} style={headerStyle}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column} style={cellStyle}>
                  {String(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  list: ({ value, columns = 1, gap = "16px", onClick }: FieldProps) => (
    <div
      style={{
        marginBottom: gap,
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {Array.isArray(value) &&
        value.map((item, index) => (
          <div
            key={index}
            onClick={onClick}
            style={{
              padding: gap,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid #00ff9f",
              borderRadius: "4px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap,
              cursor: onClick ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              if (onClick) {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 255, 159, 0.2)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
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
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#00ff9f", fontSize: "20px" }}>
                  {item.title.charAt(0)}
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
                {item.title}
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

  input: ({
    value,
    onChange,
    onClick,
    required,
    gap = "16px",
    ...props
  }: FieldProps) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
      style={{
        width: "100%",
        padding: "8px 12px",
        marginBottom: gap,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid #00ff9f",
        borderRadius: "4px",
        color: "#fff",
        outline: "none",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "text",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 159, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 159, 0.3)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
      required={required}
      {...props}
    />
  ),

  select: ({
    value,
    onChange,
    onClick,
    enum: options = [],
    gap = "16px",
    ...props
  }: FieldProps) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
      style={{
        width: "100%",
        padding: "8px 12px",
        marginBottom: gap,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid #00ff9f",
        borderRadius: "4px",
        color: "#fff",
        outline: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 159, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 159, 0.3)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
      {...props}
    >
      {Array.isArray(options) &&
        options.map((option) => {
          const value = typeof option === "object" ? option.value : option;
          const label = typeof option === "object" ? option.label : option;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
    </select>
  ),

  radio: ({ value, onChange, onClick, gap = "16px", ...props }: FieldProps) => (
    <div
      style={{
        marginBottom: gap,
        display: "flex",
        flexDirection: "column",
        gap,
        padding: "12px 16px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "1px solid #00ff9f",
        borderRadius: "6px",
        boxShadow: "0 0 10px rgba(0, 255, 159, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #00ff9f, transparent)",
          opacity: 0.5,
        }}
      />
      <label
        onClick={(e) => {
          onChange(true);
          if (onClick) onClick(e);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: value === true ? "#00ff9f" : "rgba(255, 255, 255, 0.8)",
          cursor: "pointer",
          padding: "6px 16px",
          backgroundColor:
            value === true ? "rgba(0, 255, 159, 0.15)" : "rgba(0, 0, 0, 0.3)",
          borderRadius: "4px",
          transition: "all 0.3s ease",
          border: `1px solid ${value === true ? "#00ff9f" : "transparent"}`,
          boxShadow:
            value === true ? "0 0 15px rgba(0, 255, 159, 0.2)" : "none",
          fontWeight: value === true ? "500" : "normal",
        }}
        onMouseOver={(e) => {
          if (value !== true) {
            e.currentTarget.style.backgroundColor = "rgba(0, 255, 159, 0.05)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 159, 0.1)";
          }
        }}
        onMouseOut={(e) => {
          if (value !== true) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: "2px solid #00ff9f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#00ff9f",
              opacity: value === true ? 1 : 0,
              transform: value === true ? "scale(1)" : "scale(0)",
              transition: "all 0.2s ease",
            }}
          />
        </div>
        True
      </label>
      <label
        onClick={(e) => {
          onChange(false);
          if (onClick) onClick(e);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: value === false ? "#00ff9f" : "rgba(255, 255, 255, 0.8)",
          cursor: "pointer",
          padding: "6px 16px",
          backgroundColor:
            value === false ? "rgba(0, 255, 159, 0.15)" : "rgba(0, 0, 0, 0.3)",
          borderRadius: "4px",
          transition: "all 0.3s ease",
          border: `1px solid ${value === false ? "#00ff9f" : "transparent"}`,
          boxShadow:
            value === false ? "0 0 15px rgba(0, 255, 159, 0.2)" : "none",
          fontWeight: value === false ? "500" : "normal",
        }}
        onMouseOver={(e) => {
          if (value !== false) {
            e.currentTarget.style.backgroundColor = "rgba(0, 255, 159, 0.05)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 159, 0.1)";
          }
        }}
        onMouseOut={(e) => {
          if (value !== false) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: "2px solid #00ff9f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#00ff9f",
              opacity: value === false ? 1 : 0,
              transform: value === false ? "scale(1)" : "scale(0)",
              transition: "all 0.2s ease",
            }}
          />
        </div>
        False
      </label>
    </div>
  ),

  grid: ({ value, columns = 2, gap = "16px", onClick }: FieldProps) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        marginBottom: gap,
      }}
    >
      {Array.isArray(value) &&
        value.map((item, index) => (
          <div
            key={index}
            onClick={onClick}
            style={{
              padding: gap,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid #00ff9f",
              borderRadius: "4px",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              cursor: onClick ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              if (onClick) {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 255, 159, 0.2)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseDown={(e) => {
              if (onClick) {
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
            onMouseUp={(e) => {
              if (onClick) {
                e.currentTarget.style.transform = "translateY(-2px)";
              }
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
                marginBottom: gap,
              }}
            >
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#00ff9f", fontSize: "24px" }}>
                  {item.title.charAt(0)}
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
              {item.title}
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

  auto: (props: FieldProps) => {
    if (typeof props.value === "boolean") {
      return widget.radio(props);
    }
    if (props.enum && Array.isArray(props.enum)) {
      return widget.select(props);
    }
    return widget.input(props);
  },

  menu: ({
    value: currentValue,
    onChange,
    onClick,
    enum: options = [],
    gap = "16px",
  }: FieldProps) => (
    <div
      style={{
        marginBottom: gap,
        padding: "4px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        border: "1px solid #00ff9f",
        borderRadius: "4px",
        display: "flex",
        gap: "4px",
      }}
    >
      {Array.isArray(options) &&
        options.map((option) => {
          const value = typeof option === "object" ? option.value : option;
          const label = typeof option === "object" ? option.label : option;
          const isActive = value === currentValue;
          return (
            <button
              key={value}
              onClick={(e) => {
                onChange(value);
                if (onClick) onClick(e);
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: isActive
                  ? "rgba(0, 255, 159, 0.15)"
                  : "transparent",
                border: `1px solid ${isActive ? "#00ff9f" : "transparent"}`,
                borderRadius: "4px",
                color: isActive ? "#00ff9f" : "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                outline: "none",
                fontWeight: isActive ? "500" : "normal",
                boxShadow: isActive
                  ? "0 0 15px rgba(0, 255, 159, 0.2)"
                  : "none",
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 255, 159, 0.05)";
                  e.currentTarget.style.border =
                    "1px solid rgba(0, 255, 159, 0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(0, 255, 159, 0.1)";
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {label}
            </button>
          );
        })}
    </div>
  ),
};

export default widget;
