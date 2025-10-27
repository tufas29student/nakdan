import { useState, useRef } from "react";

export default function ArabicKeyboard() {
  const [text, setText] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const inputRef = useRef(null);

  // אותיות הא-ב הערבי
  const letters = [
    "ا",
    "أ",
    "إ",
    "آ",
    "ب",
    "ت",
    "ث",
    "ج",
    "ح",
    "خ",
    "د",
    "ذ",
    "ر",
    "ز",
    "س",
    "ش",
    "ص",
    "ض",
    "ط",
    "ظ",
    "ع",
    "غ",
    "ف",
    "ق",
    "ك",
    "ل",
    "م",
    "ن",
    "ه",
    "و",
    "ي",
    "ى",
    "ة",
    "ء",
    "ؤ",
    "ئ",
    "گ",
  ];

  // תנועות (حركات)
  const harakat = [
    { name: "فَتْحَة", char: "\u064E", display: "َ◌" },
    { name: "ضَمَّة", char: "\u064F", display: "ُ◌" },
    { name: "كَسْرَة", char: "\u0650", display: "ِ◌" },
    { name: "سُكُون", char: "\u0652", display: "ْ◌" },
    { name: "شَدَّة", char: "\u0651", display: "ّ◌" },
    { name: "تَنْوِين فَتْح", char: "\u064B", display: "ً◌" },
    { name: "تَنْوِين ضَمّ", char: "\u064C", display: "ٌ◌" },
    { name: "تَنْوِين كَسْر", char: "\u064D", display: "ٍ◌" },
  ];

  const addChar = (char) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newText = text.slice(0, start) + char + text.slice(end);
    setText(newText);

    // שמירה על מיקום הסמן אחרי התו החדש
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  const handleDoubleClick = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setCopyMessage("הטקסט הועתק! ✓");
        setTimeout(() => setCopyMessage(""), 2000);
      } catch (err) {
        setCopyMessage("שגיאה בהעתקה");
        setTimeout(() => setCopyMessage(""), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* שדה טקסט */}
          <div className="mb-8 relative">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onDoubleClick={handleDoubleClick}
              placeholder="ابدأ الكتابة هنا..."
              className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg p-6 text-3xl text-right focus:outline-none focus:border-blue-500 transition-colors"
              dir="rtl"
              style={{ fontFamily: "Arial, sans-serif" }}
            />
            {copyMessage && (
              <div className="absolute top-0 left-0 right-0 flex justify-center -mt-10">
                <span className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold animate-pulse">
                  {copyMessage}
                </span>
              </div>
            )}
          </div>

          {/* תנועות */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-3 text-right">
              الحركات (תנועות)
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {harakat.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => addChar(h.char)}
                  className="bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 text-2xl py-3 rounded-lg transition-colors font-semibold"
                  title={h.name}
                >
                  {h.display}
                </button>
              ))}
            </div>
          </div>

          {/* אותיות */}
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-3 text-right">
              الحروف (אותיות)
            </h2>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
              {letters.map((letter, idx) => (
                <button
                  key={idx}
                  onClick={() => addChar(letter)}
                  className="bg-green-100 hover:bg-green-200 border-2 border-green-300 text-3xl py-4 rounded-lg transition-colors font-semibold"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
