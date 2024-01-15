import DashboardWidget from "../DashboardWidget/DashboardWidget";
import { Widget } from "../../types";
import useDashboardWidgetList from "./useDashboardWidgetList";

const DashboardWidgetList = ({ widgets }: { widgets: Widget[] }) => {
  const { widgetData } = useDashboardWidgetList(widgets);

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

export default DashboardWidgetList;
