"use client";

import { useState } from "react";

export function InteractiveLogo() {
  return (
    <svg
      width="160"
      height="45"
      viewBox="0 0 160 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:scale-105 transition-transform duration-300"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#9EE37D" }} />
          <stop offset="100%" style={{ stopColor: "#7BC62D" }} />
        </linearGradient>
      </defs>

      {/* 装饰性圆环 */}
      <circle
        cx="22"
        cy="22"
        r="15"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeDasharray="4 2"
      />

      {/* W 字母造型 */}
      <path
        d="M15 15L19 27L22 18L25 27L29 15"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 文字部分 */}
      <text
        x="45"
        y="28"
        fill="#9EE37D"
        fontSize="22"
        fontFamily="system-ui"
        fontWeight="600"
        letterSpacing="1"
      >
        WebBlog
      </text>
    </svg>
  );
}
