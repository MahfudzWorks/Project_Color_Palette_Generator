function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-12 text-center text-sm sm:text-base transition-colors ${
        darkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <p
          className={`font-semibold transition-colors ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          👋 Hi, I’m{" "}
          <span
            className={`transition-colors ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Mahfudz Alfanani Syaviqi
          </span>
        </p>

        <p className="text-xs sm:text-sm">
          🎓 Fresh Graduate – Informatics Engineering @ Universitas Muhammadiyah
          Gresik (2025)
        </p>
        <p className="text-xs sm:text-sm">
          💻 Software Developer | Web Developer | Problem Solver
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs sm:text-sm">
          <a
            href="https://github.com/vyyy404"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-blue-500 transition ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            🌐 GitHub
          </a>
          <span>•</span>
          <a
            href="https://vyyy.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-blue-500 transition ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Portfolio
          </a>
          <span>•</span>
          <a
            href="mailto:mahfudzworksss@gmail.com"
            className={`hover:text-blue-500 transition ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Email
          </a>
        </div>

        <p
          className={`mt-2 text-xs transition-colors ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Made with 💙 using React + Tailwind
        </p>
      </div>
    </footer>
  );
}

export default Footer;
