import { Copy } from "lucide-react";

function ColorPalette({ colors, copyToClipboard, copied }) {
  return (
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
                color.toUpperCase()
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorPalette;
