import PokemonDashboard from "./components/PokemonDashboard/PokemonDashboard";
import { Column } from "./types";

const configuration = {
  columns: [
    {
      // First column
      size: 1, // The size of the column
      heading: "General Pokemon information",
      widgets: [
        {
          title: "Pokemon colours",
          subtitle: "List of all the colours",
          type: "list",
          api: "https://pokeapi.co/api/v2/pokemon-color/",
        },
        {
          title: "Pokemon Gender",
          subtitle: "List of all the genders",
          type: "list",
          api: "https://pokeapi.co/api/v2/gender/",
        },
      ],
    },
    {
      // Second column
      size: 2, // The size of the column
      heading: "Pokemon counts",
      widgets: [
        {
          title: "Genderless count",
          type: "number",
          api: "https://pokeapi.co/api/v2/gender/3/",
        },
        {
          title: "Female count",
          type: "number",
          api: "https://pokeapi.co/api/v2/gender/1/",
        },
        {
          title: "Male count",
          type: "number",
          api: "https://pokeapi.co/api/v2/gender/2/",
        },
      ],
    },
  ],
} as { columns: Column[] };

export default function App() {
  return (
    <div className="min-h-screen h-full p-4">
      <PokemonDashboard configuration={configuration} />
    </div>
  );
}
