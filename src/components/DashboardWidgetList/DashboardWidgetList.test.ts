// fetchWidgetData.test.js
import { fetchWidgetData } from "./useDashboardWidgetList"; // Replace with the actual path to your module
import { describe, it, vi } from "vitest";
import { WidgetType } from "../../types";

global.fetch = vi.fn();

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) } as Response;
}

describe("fetchWidgetData", () => {
  it('should return count of 4 for widget type "number"', async () => {
    const mockResponse = {
      pokemon_species_details: [{ name: "pokemon1" }, { name: "pokemon2" }, { name: "pokemon3" }, { name: "pokemon4" }],
    };

    vi.spyOn(global, "fetch").mockResolvedValue(createFetchResponse(mockResponse));

    const count = await fetchWidgetData("mockApi", "number" as WidgetType);
    expect(count).toBe(4);
  });

  it('should return count of 3 for widget type "number" and names', async () => {
    const mockResponse = {
      names: [{ name: "name1" }, { name: "name2" }, { name: "name3" }],
    };

    vi.spyOn(global, "fetch").mockResolvedValue(createFetchResponse(mockResponse));

    const count = await fetchWidgetData("mockApi", "number" as WidgetType);
    expect(count).toBe(3);
  });

  it('should return results for widget type other than "number"', async () => {
    const mockResponse = {
      results: [{ name: "item1" }, { name: "item2" }],
    };

    vi.spyOn(global, "fetch").mockResolvedValue(createFetchResponse(mockResponse));

    const results = await fetchWidgetData("mockApi", "list" as WidgetType);
    expect(results).toEqual(mockResponse.results);
  });
});
