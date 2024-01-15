/* eslint-disable @typescript-eslint/no-explicit-any */
import { Widget } from "../../types";

export default function DashboardWidget({ title, subtitle, type, data }: Widget) {
  const renderWidget = () => {
    switch (type) {
      case "list":
        return (
          <div>
            <h3 className="font-semibold text-yellow-500">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
            <ul className="flex flex-col gap-4 mt-4 list-disc list-inside">
              {data &&
                Array.isArray(data) &&
                data.map((item: any, index: number) => (
                  <li key={index} className="bg-slate-200 rounded-md px-4 py-2">
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        );
      case "number":
        return (
          <div className="p-4 border rounded-md col-span-1 bg-gray-700 text-white w-full h-36">
            <h3>{title}</h3>
            <p className="text-2xl font-bold text-amber-300">Count: {data}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className={type === "list" ? "col-span-4" : "col-span-2"}>{renderWidget()}</div>;
}
