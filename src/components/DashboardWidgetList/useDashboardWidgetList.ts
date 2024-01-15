import { useEffect, useState } from "react";
import { Widget, WidgetType } from "../../types";

export const fetchWidgetData = async (api: string, type: WidgetType) => {
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

export default function useDashboardWidgetList(widgets: Widget[]) {
  const [widgetData, setWidgetData] = useState<Widget[]>([]);

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

  return { widgetData };
}
