import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  placeholder,
  options = [],
  onSelect,
  defaultValue = null,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onSelect?.(option);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="costumedSelect w-full justify-between flex items-center"
      >
        {selected?.name || placeholder}
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute z-10 mt-2 w-full costumedSelectOptionContainer max-h-[144px] h-[calc(${options.length} * 48px)] overflow-y-auto`}
        >
          {options.map((opt, idx) => {
            return (
              <li key={opt.id || idx} className="">
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 hover:bg-base-200 text-sm h-[48px]"
                  onClick={() => handleSelect(opt)}
                >
                  {opt.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
