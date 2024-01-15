/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Column } from "../../types";

import DashboardWidgetList from "../DashboardWidgetList/DashboardWidgetList";

interface PokemonDashboardProps {
  configuration: {
    columns: Column[];
  };
}

const PokemonDashboard = ({ configuration }: PokemonDashboardProps) => {
  return (
    <DashboardContainer>
      {configuration &&
        configuration.columns.map((column: Column, columnIndex: number) => (
          <DashboardColumn key={`column-${columnIndex}`} columnSize={column.size}>
            <DashboardColumnHeading>{column.heading}</DashboardColumnHeading>
            <DashboardWidgetContainer>
              <DashboardWidgetList widgets={column.widgets} />
            </DashboardWidgetContainer>
          </DashboardColumn>
        ))}
    </DashboardContainer>
  );
};

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-gray-300 shadow gap-6 h-full p-4 rounded-md`}>
      {children}
    </div>
  );
};

const DashboardColumn = ({ columnSize, children }: { columnSize: number; children: ReactNode }) => {
  return <div className={`col-span-1 lg:col-span-${columnSize}  w-full h-full`}>{children}</div>;
};

const DashboardColumnHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-14">
      <h2 className="text-lg font-bold uppercase tracking-wider line-clamp-2">{children}</h2>
    </div>
  );
};

const DashboardWidgetContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-4 gap-6 border-2 bg-gray-50 p-4 rounded-md border-gray-300 shadow-lg">
      {children}
    </div>
  );
};

export default PokemonDashboard;
