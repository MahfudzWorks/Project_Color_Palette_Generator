import { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import Header from "./components/Header";
import ColorPalette from "./components/ColorPalette";
import Footer from "./components/Footer";
import { generateGradient, randomColor } from "./utils/colorUtils";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [colors, setColors] = useState(Array.from({ length: 5 }, randomColor));
  const [copied, setCopied] = useState(null);
  const [search, setSearch] = useState("");

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleGenerate = () => {
    setColors(Array.from({ length: 5 }, randomColor));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setColors(generateGradient(search.trim()));
    }
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1000);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-center ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-blue-100 via-white to-pink-100"
      }`}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <ColorPalette
        colors={colors}
        copyToClipboard={copyToClipboard}
        copied={copied}
      />

      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <RefreshCcw size={18} />
        Generate Random Palette
      </button>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
