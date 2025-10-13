import { Sun, Moon, Search } from "lucide-react";

function Header({ darkMode, toggleDarkMode, search, setSearch, handleSearch }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mb-6 px-4 gap-3">
      <h1
        className={`text-2xl sm:text-3xl font-bold tracking-wide transition-colors ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        🎨 Color Palette Generator
      </h1>

      <div className="flex items-center gap-2">
        <form
          key={darkMode ? "dark" : "light"}
          onSubmit={handleSearch}
          className={`flex items-center rounded-full shadow-md overflow-hidden px-3 py-1 transition ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="Cari warna (misal: red atau #ff0000)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`bg-transparent text-sm px-2 py-1 outline-none w-48 sm:w-64 transition-colors ${
              darkMode ? "text-gray-100 placeholder-gray-400" : "text-gray-800"
            }`}
          />
          <button
            type="submit"
            className={`transition ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <Search size={18} />
          </button>
        </form>

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full hover:scale-110 transition ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
    </div>
  );
}

export default Header;
