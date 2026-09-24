import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',     // 👈 BẮT BUỘC: Báo cho Next.js xuất ra file web tĩnh chuẩn
  images: {
    unoptimized: true, // 👈 BẮT BUỘC: Để Netlify hiển thị đúng file ảnh gốc
  },
};

export default nextConfig;
