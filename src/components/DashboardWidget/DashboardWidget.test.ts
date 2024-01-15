// src/DashboardWidget.test.js
import { render, screen } from "@testing-library/react";
import DashboardWidget from "./DashboardWidget"; // Replace with the actual path to your component
import { assert, describe, it } from "vitest";
import { Widget } from "../../types";

describe("DashboardWidget", () => {
  it("should render list items correctly", () => {
    const widget: Widget = {
      title: "List Widget",
      subtitle: "List Subtitle",
      type: "list",
      data: [{ name: "Item 1" }, { name: "Item 2" }, { name: "Item 3" }],
      api: "/tset/api",
    };

    render(DashboardWidget(widget));

    assert.exists(screen.getByText("List Widget"));
    assert.exists(screen.getByText("List Subtitle"));
    assert.exists(screen.getByText("Item 1"));
    assert.exists(screen.getByText("Item 2"));
    assert.exists(screen.getByText("Item 3"));
  });

  it("should render number count correctly", () => {
    const widget: Widget = {
      title: "Number Widget",
      subtitle: "Number Subtitle",
      type: "number",
      data: 5,
      api: "/tset/api",
    };

    render(DashboardWidget(widget));

    assert.exists(screen.getByText("Number Widget"));
    assert.exists(screen.getByText("Count: 5"));
  });
});
