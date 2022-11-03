import SearchableDropdown from "./component/searchabledropdown";
import "./assets/style/App.css";

function App() {
  const data = [
    {
      text: 1,
    },
    { text: 2 },
    { text: 3 },
    { text: 4 },
    { text: 5 },
    { text: 6 },
    { text: 7 },
  ];

  return (
    <>
      <div className="App">
        <div>Searchable Dropdown</div>
        <SearchableDropdown data={data} other />
      </div>
    </>
  );
}

export default App;
