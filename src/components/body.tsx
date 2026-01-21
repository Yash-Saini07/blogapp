'use client'
import Image from "next/image";
import BlogCard from "@/components/blogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import HomeHeaderWrapper from "@/components/HomeHeaderWrapper";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Body({ blogs }: { blogs: any[] }) {
  const [activeTab, setActiveTab] = useState<'Lifestyle' | 'Technology' | 'Travel' | 'All'>("All");

  const handleTabClick = (tab: 'Lifestyle' | 'Technology' | 'Travel' | 'All') => {
    setActiveTab(tab);
  };



  return (
    <div className="min-h-screen flex flex-col relative isolate overflow-hidden bg-background">
      {/* Animated background blobs from Header */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
        <div aria-hidden className="blob blob-1" />
        <div aria-hidden className="blob blob-2" />
        <div aria-hidden className="blob blob-3" />
        <div aria-hidden className="glass-overlay" />
      </div>

      <HomeHeaderWrapper />
      <Header />
      <ToggleGroup className="justify-center flex items-center mx-auto my-5" variant="outline" type="single" defaultValue="all">
        <ToggleGroupItem value="all" aria-label="Toggle all"
          onClick={() => handleTabClick("All")}

        >All</ToggleGroupItem>

        <ToggleGroupItem value="technology" aria-label="Toggle technology"
          onClick={() => handleTabClick("Technology")}

        >Technology</ToggleGroupItem>

        <ToggleGroupItem value="lifestyle" aria-label="Toggle lifestyle"
          onClick={() => handleTabClick("Lifestyle")}

        >Lifestyle</ToggleGroupItem>

        <ToggleGroupItem value="travel" aria-label="Toggle travel"
          onClick={() => handleTabClick("Travel")}

        >Travel</ToggleGroupItem>
      </ToggleGroup>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grow z-10 pb-12">
        {blogs.map((blog, index) => (

          (activeTab === "All" || activeTab === blog.type) && <BlogCard
            key={index}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            type={blog.type}
            content={blog.body}
          />
        ))}
      </div>
      <Footer />
      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
.blob {
  position: absolute;
  filter: blur(60px);
  opacity: 0.6;
  mix-blend-mode: screen;
  transform-origin: center;
}

.blob-1 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle at 30% 20%, rgba(34,211,238,0.12), transparent 30%), linear-gradient(135deg, rgba(99,102,241,0.28), rgba(79,70,229,0.16));
  top: -20%;
  left: -10%;
  animation: float1 12s ease-in-out infinite;
}

.blob-2 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle at 70% 80%, rgba(99,102,241,0.08), transparent 30%), linear-gradient(180deg, rgba(59,130,246,0.16), rgba(14,165,233,0.08));
  bottom: -24%;
  right: -12%;
  animation: float2 16s ease-in-out infinite;
}

.blob-3 {
  width: 240px;
  height: 240px;
  background: radial-gradient(circle at 50% 50%, rgba(236,72,153,0.10), transparent 30%), linear-gradient(45deg, rgba(236,72,153,0.18), rgba(168,85,247,0.10));
  top: 10%;
  right: 20%;
  animation: float3 10s ease-in-out infinite;
}

@keyframes float1 {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(30px, -18px) scale(1.05); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float2 {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-28px, 16px) scale(0.98); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float3 {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(12px, -14px) scale(1.07); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.glass-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  mix-blend-mode: normal;
}

/* dark-mode specific tints */
:global(.dark) .blob-1 { filter: blur(80px) contrast(1.1); opacity: 0.45; }
:global(.dark) .blob-2 { filter: blur(72px) contrast(1.05); opacity: 0.35; }
:global(.dark) .blob-3 { filter: blur(64px); opacity: 0.28; }
`