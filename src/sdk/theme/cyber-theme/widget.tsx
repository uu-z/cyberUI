import type { FieldProps } from "../../types";
import GridContainer from "./GridContainer";

const widget = {
  table: ({ value, gap = "12px", responsive = true }: FieldProps) => {
    if (!Array.isArray(value) || value.length === 0) return null;
    const columns = Object.keys(value[0]);

    return (
      <table className="w-full border-collapse border border-cyber-primary rounded overflow-hidden">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className={`text-left text-cyber-primary border-b border-cyber-primary bg-cyber-primary/10 font-normal
                  ${responsive ? "sm:p-2.5 md:p-3 lg:p-4" : "p-3"}
                  ${
                    responsive
                      ? "sm:text-xs md:text-base lg:text-lg"
                      : "text-base"
                  }
                `}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column}
                  className={`text-cyber-text border-b border-cyber-primary/20
                    ${responsive ? "sm:p-2 md:p-3 lg:p-4" : "p-3"}
                    ${
                      responsive
                        ? "sm:text-sm md:text-base lg:text-lg"
                        : "text-base"
                    }
                  `}
                >
                  {String(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  list: ({
    value,
    onClick,
    columns = 3,
    gap = "16px",
    responsive = true,
  }: FieldProps) => (
    <GridContainer columns={columns} gap={gap} className="mb-4">
      {Array.isArray(value) &&
        value.map((item, index) => (
          <div
            key={index}
            onClick={onClick}
            className={`bg-cyber-bg border border-cyber-primary rounded text-cyber-text flex items-center transition-cyber duration-cyber ease-cyber
              ${responsive ? "sm:p-3 md:p-3.5 lg:p-4" : "p-4"}
              ${responsive ? "sm:gap-3 md:gap-3 lg:gap-4" : "gap-4"}
              ${
                onClick
                  ? "cursor-pointer hover:bg-cyber-bg-hover hover:transform hover:-translate-y-0.5 hover:shadow-cyber"
                  : "cursor-default"
              }`}
          >
            <div
              className={`bg-cyber-primary/10 border border-cyber-primary rounded-full flex items-center justify-center shrink-0
              ${
                responsive
                  ? "sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-12 lg:h-12"
                  : "w-12 h-12"
              }
              min-w-[3rem] min-h-[3rem]
            `}
            >
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.title}
                  className="w-full h-full rounded-full object-cover object-center"
                />
              ) : (
                <span
                  className={`text-cyber-primary
                  ${
                    responsive
                      ? "sm:text-base md:text-lg lg:text-xl"
                      : "text-lg"
                  }
                `}
                >
                  {item.title.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div
                className={`text-cyber-primary mb-1 font-medium
                ${
                  responsive
                    ? "sm:text-sm md:text-base lg:text-lg"
                    : "text-base"
                }
              `}
              >
                {item.title}
              </div>
              <div
                className={`text-cyber-text-secondary
                ${responsive ? "sm:text-xs md:text-sm lg:text-base" : "text-sm"}
              `}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
    </GridContainer>
  ),

  input: ({
    value,
    setState,
    required,
    onChange,
    onClick,
    responsive = true,
    ...props
  }: FieldProps) => (
    <input
      value={value}
      onChange={(e) => {
        setState?.(e.target.value);
        onChange?.(e.target.value);
      }}
      onClick={onClick}
      className={`w-full bg-cyber-bg border border-cyber-primary rounded text-cyber-text outline-none 
        transition-cyber duration-cyber ease-cyber mb-4
        ${responsive ? "sm:p-2.5 md:p-3 lg:p-4" : "p-3"}
        ${responsive ? "sm:text-xs md:text-base lg:text-lg" : "text-base"}
        ${onClick ? "cursor-pointer" : "cursor-text"}
        hover:bg-cyber-bg-hover hover:shadow-cyber focus:bg-cyber-bg-active focus:shadow-cyber-active
      `}
      required={required}
      {...props}
    />
  ),

  select: ({
    value,
    setState,
    enum: options = [],
    onChange,
    onClick,
    responsive = true,
    ...props
  }: FieldProps) => (
    <select
      value={value}
      onChange={(e) => {
        setState?.(e.target.value);
        onChange?.(e.target.value);
      }}
      onClick={onClick}
      className={`w-full bg-cyber-bg border border-cyber-primary rounded text-cyber-text outline-none 
        transition-cyber duration-cyber ease-cyber mb-4 cursor-pointer
        ${responsive ? "sm:p-2.5 md:p-3 lg:p-4" : "p-3"}
        ${responsive ? "sm:text-xs md:text-base lg:text-lg" : "text-base"}
        hover:bg-cyber-bg-hover hover:shadow-cyber focus:bg-cyber-bg-active focus:shadow-cyber-active
      `}
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

  radio: ({
    value,
    setState,
    onChange,
    onClick,
    responsive = true,
    ...props
  }: FieldProps) => (
    <div
      className={`flex flex-col bg-cyber-bg-active border border-cyber-primary rounded-lg shadow-cyber relative overflow-hidden gap-4 w-full
      ${
        responsive
          ? "sm:p-2.5 sm:px-3 md:p-3 md:px-4 lg:p-4 lg:px-5"
          : "p-3 px-4"
      }
      ${responsive ? "sm:gap-2 md:gap-4 lg:gap-4" : "gap-4"}
    `}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50" />
      <label
        onClick={(e) => {
          setState?.(true);
          onChange?.(true);
          onClick?.(e);
        }}
        className={`flex items-center gap-2.5 cursor-pointer p-1.5 px-4 rounded transition-cyber duration-cyber ease-cyber ${
          value === true
            ? "text-cyber-primary bg-cyber-primary/15 border border-cyber-primary shadow-cyber font-medium"
            : "text-cyber-text-secondary bg-cyber-bg border border-transparent hover:bg-cyber-primary/5 hover:shadow-cyber"
        }`}
      >
        <div className="w-[18px] h-[18px] rounded-full border-2 border-cyber-primary flex items-center justify-center relative transition-fast">
          <div
            className={`w-2.5 h-2.5 rounded-full bg-cyber-primary transition-transform duration-200 ${
              value === true ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>
        True
      </label>
      <label
        onClick={(e) => {
          setState?.(false);
          onChange?.(false);
          onClick?.(e);
        }}
        className={`flex items-center gap-2.5 cursor-pointer p-1.5 px-4 rounded transition-cyber duration-cyber ease-cyber ${
          value === false
            ? "text-cyber-primary bg-cyber-primary/15 border border-cyber-primary shadow-cyber font-medium"
            : "text-cyber-text-secondary bg-cyber-bg border border-transparent hover:bg-cyber-primary/5 hover:shadow-cyber"
        }`}
      >
        <div className="w-[18px] h-[18px] rounded-full border-2 border-cyber-primary flex items-center justify-center relative transition-fast">
          <div
            className={`w-2.5 h-2.5 rounded-full bg-cyber-primary transition-transform duration-200 ${
              value === false ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>
        False
      </label>
    </div>
  ),

  grid: ({
    value,
    onClick,
    columns = 3,
    gap = "16px",
    responsive = true,
    ...props
  }: FieldProps) => (
    <GridContainer columns={columns} gap={gap} className="mb-4">
      {Array.isArray(value) &&
        value.map((item, index) => (
          <div
            key={index}
            onClick={onClick}
            className={`bg-cyber-bg border border-cyber-primary rounded text-cyber-text flex flex-col items-center text-center transition-cyber duration-cyber ease-cyber
              ${responsive ? "sm:p-3 md:p-3.5 lg:p-4" : "p-4"}
              ${
                onClick
                  ? "cursor-pointer hover:bg-cyber-bg-hover hover:transform hover:-translate-y-0.5 hover:shadow-cyber-elevated active:translate-y-0"
                  : "cursor-default"
              }`}
          >
            <div
              className={`bg-cyber-primary/10 border border-cyber-primary rounded-full flex items-center justify-center aspect-square
              ${
                responsive
                  ? "sm:w-16 sm:h-16 sm:mb-3 md:w-16 md:h-16 md:mb-3 lg:w-16 lg:h-16 lg:mb-3"
                  : "w-16 h-16 mb-3"
              }
              min-w-[4rem] min-h-[4rem]
            `}
            >
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.title}
                  className="w-full h-full rounded-full object-cover object-center"
                />
              ) : (
                <span
                  className={`text-cyber-primary
                  ${
                    responsive
                      ? "sm:text-xl md:text-2xl lg:text-3xl"
                      : "text-2xl"
                  }
                `}
                >
                  {item.title.charAt(0)}
                </span>
              )}
            </div>
            <div
              className={`text-cyber-primary mb-1 font-medium
              ${responsive ? "sm:text-sm md:text-base lg:text-lg" : "text-base"}
            `}
            >
              {item.title}
            </div>
            <div
              className={`text-cyber-text-secondary
              ${responsive ? "sm:text-xs md:text-sm lg:text-base" : "text-sm"}
            `}
            >
              {item.desc}
            </div>
          </div>
        ))}
    </GridContainer>
  ),

  menu: ({
    value: currentValue,
    setState,
    enum: options = [],
    onChange,
    onClick,
    responsive = true,
    ...props
  }: FieldProps) => (
    <div
      className={`bg-cyber-bg border border-cyber-primary rounded flex gap-1 mb-4 w-full
      ${responsive ? "sm:p-1 md:p-1 lg:p-1" : "p-1"}
      ${responsive ? "sm:gap-0.5 md:gap-0.5 lg:gap-0.5" : "gap-0.5"}
    `}
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
                setState?.(value);
                onChange?.(value);
                onClick?.(e);
              }}
              className={`rounded cursor-pointer transition-cyber duration-cyber ease-cyber outline-none
                ${
                  responsive
                    ? "sm:p-2 sm:px-2.5 md:p-2 md:px-3 lg:p-2 lg:px-3"
                    : "p-2 px-4"
                }
                ${
                  responsive
                    ? "sm:text-sm md:text-base lg:text-lg"
                    : "text-base"
                }
                ${
                  isActive
                    ? "bg-cyber-primary/15 border border-cyber-primary text-cyber-primary font-medium shadow-cyber"
                    : "bg-transparent border border-transparent text-cyber-text-secondary hover:bg-cyber-primary/5 hover:border-cyber-primary/30 hover:shadow-cyber"
                }`}
            >
              {label}
            </button>
          );
        })}
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
};

export default widget;
