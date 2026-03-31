import React, { useState } from "react";
import { C } from "../constants";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: 560,
      background: C.white,
      border: `1.5px solid ${C.teal300}`,
      borderRadius: 12,
      padding: "10px 16px",
      boxShadow: "0 2px 12px rgba(10,46,42,0.08)",
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink4} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search for a lake..."
        value={inputValue}
        onChange={handleChange}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 16,
          color: C.ink,
          marginLeft: 10,
          width: "100%",
        }}
      />
    </div>
  );
}
