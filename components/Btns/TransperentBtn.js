import React from "react";

export default function TransperentBtn({ text }) {
  return (
    <>
      <button className="border-2 rounded border-white bg-transparent text-white font-semibold text-sm px-5 py-2">
        {text}
      </button>
    </>
  );
}
