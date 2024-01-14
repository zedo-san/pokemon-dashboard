/* eslint-disable @typescript-eslint/no-explicit-any */
export type WidgetType = "list" | "number";

export interface Widget {
  title: string;
  subtitle: string;
  type: WidgetType;
  api: string;
  data?: any;
}

export interface Column {
  size: number;
  heading: string;
  widgets: Widget[];
}
