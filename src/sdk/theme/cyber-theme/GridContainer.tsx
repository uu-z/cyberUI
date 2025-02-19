import React from "react";

interface GridContainerProps {
  columns: number;
  gap: string;
  children: React.ReactNode;
  className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
  columns,
  gap,
  children,
  className = "",
}) => {
  const mobileColumns = 1;
  const tabletColumns = Math.min(columns, 2);
  const desktopColumns = columns;

  return (
    <>
      <style>
        {`
          .responsive-grid {
            display: grid;
            gap: var(--grid-gap);
            grid-template-columns: repeat(${mobileColumns}, minmax(0, 1fr));
          }
          
          @media (min-width: 640px) {
            .responsive-grid {
              grid-template-columns: repeat(${tabletColumns}, minmax(0, 1fr));
            }
          }
          
          @media (min-width: 1024px) {
            .responsive-grid {
              grid-template-columns: repeat(${desktopColumns}, minmax(0, 1fr));
            }
          }
        `}
      </style>
      <div
        className={`responsive-grid ${className}`}
        style={{ "--grid-gap": gap } as React.CSSProperties}
      >
        {children}
      </div>
    </>
  );
};

export default GridContainer;
