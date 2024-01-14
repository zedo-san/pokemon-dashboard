/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import { Column, Widget, WidgetType } from "../types";
import DashboardWidget from "./DashboardWidget";

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

const DashboardWidgetList = ({ widgets }: { widgets: Widget[] }) => {
  const [widgetData, setWidgetData] = useState<Widget[]>([]);
  const fetchWidgetData = async (api: string, type: WidgetType) => {
    try {
      const response = await fetch(api);
      const result = await response.json();
      if (type === "number") {
        let count = 0;
        if (result.pokemon_species_details) {
          count = result.pokemon_species_details.length;
        }
        if (result.names) {
          count = result.names.length;
        }
        return count;
      } else {
        return result.results;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedWidgets = [...widgets];
      for (const widget of updatedWidgets) {
        try {
          const response = await fetchWidgetData(widget.api, widget.type);
          widget.data = response;
        } catch (error) {
          widget.data = null;
        }
      }
      setWidgetData(updatedWidgets);
    };
    fetchData();
  }, [widgets]);

  return widgetData.map((widget, widgetIndex) => (
    <DashboardWidget
      key={`widget-${widgetIndex}`}
      title={widget.title}
      subtitle={widget.subtitle}
      type={widget.type}
      api={widget.api}
      data={widget.data}
    />
  ));
};

export default PokemonDashboard;
