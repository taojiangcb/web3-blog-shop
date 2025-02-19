"use client";

import Image from "next/image";
import { useState } from "react";

export function InteractiveLogo() {
  return (
    <div className="relative w-[150px] h-[50px]">
      <Image
        src="/web-blog-logo/330x330.png"
        alt="logo"
        fill // 填充父容器
        className="object-cover object-center" // 关键裁切属性
        // sizes="(max-width: 768px) 100vw, 50px" // 响应式优化
      />
    </div>
  );
}
