import { useState, useEffect } from "react";
import { Sun, Moon, RefreshCcw, Copy, Search } from "lucide-react";

/** Mengubah warna input menjadi warna dasar HSL */
function hexToHsl(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.startsWith("#")) {
    hex = hex.substring(1);
  }
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    // jika bukan hex valid, fallback ke biru
    return { h: 210, s: 60, l: 50 };
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

/** Membuat gradasi harmonis berdasarkan warna dasar */
function generateGradientColors(baseColor, isDark) {
  let baseHue, saturation, lightness;
  if (baseColor.startsWith("#")) {
    const hsl = hexToHsl(baseColor);
    baseHue = hsl.h;
    saturation = hsl.s;
    lightness = hsl.l;
  } else {
    // kalau nama warna (misalnya "blue", "red", "lime")
    const fakeDiv = document.createElement("div");
    fakeDiv.style.color = baseColor;
    document.body.appendChild(fakeDiv);
    const computed = window.getComputedStyle(fakeDiv).color;
    document.body.removeChild(fakeDiv);
    const rgb = computed.match(/\d+/g).map(Number);
    const hex = "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
    const hsl = hexToHsl(hex);
    baseHue = hsl.h;
    saturation = hsl.s;
    lightness = hsl.l;
  }

  return Array.from({ length: 5 }, (_, i) => {
    const step = isDark ? i * 5 : -i * 5;
    const newLight = Math.min(90, Math.max(10, lightness + step));
    return `hsl(${baseHue}, ${saturation}%, ${newLight}%)`;
  });
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [baseColor, setBaseColor] = useState("#4a90e2");
  const [colors, setColors] = useState(
    generateGradientColors("#4a90e2", false)
  );
  const [copied, setCopied] = useState(null);
  const [search, setSearch] = useState("");

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    setColors(generateGradientColors(baseColor, !darkMode));
  };

  const handleGenerate = () => {
    setColors(generateGradientColors(baseColor, darkMode));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setBaseColor(search.trim());
      setColors(generateGradientColors(search.trim(), darkMode));
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
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mb-6 px-4 gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          🎨 Gradient Color Palette Generator
        </h1>
        <div className="flex items-center gap-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden px-3 py-1"
          >
            <input
              type="text"
              placeholder="Cari warna (misal: #ff5733 atau blue)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm px-2 py-1 outline-none text-gray-800 dark:text-gray-100 w-48 sm:w-64"
            />
            <button
              type="submit"
              className="text-gray-500 dark:text-gray-300 hover:text-blue-500"
            >
              <Search size={18} />
            </button>
          </form>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>

      {/* Color Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-10 w-full max-w-4xl px-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between rounded-2xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: color, height: "180px" }}
            onClick={() => copyToClipboard(color)}
          >
            <div className="w-full h-full flex flex-col justify-end items-center bg-black/20 hover:bg-black/40 transition-colors">
              <span className="mb-3 font-semibold text-white drop-shadow-lg flex items-center gap-1">
                {copied === color ? (
                  <>
                    <Copy size={16} /> Copied!
                  </>
                ) : (
                  color
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <RefreshCcw size={18} />
        Generate Palette
      </button>

      <footer className="mt-10 text-sm opacity-70">
        Made with 💙 using React + Tailwind + HSL
      </footer>
    </div>
  );
}

export default App;
