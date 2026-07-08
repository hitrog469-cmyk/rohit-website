import { getAllPosts } from "@/lib/blog";
import Navigation from "@/components/ui/Navigation";
import PageCurtain from "@/components/ui/PageCurtain";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Research from "@/components/sections/Research";
import Projects from "@/components/sections/Projects";
import NumbersSection from "@/components/sections/NumbersSection";
import Timeline from "@/components/sections/Timeline";
import ManifestoSection from "@/components/sections/ManifestoSection";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import BeyondWork from "@/components/sections/BeyondWork";
import WorkWithMe from "@/components/sections/WorkWithMe";
import BlogPreview from "@/components/sections/BlogPreview";
import CodexTeaser from "@/components/sections/CodexTeaser";
import ExploreTeaser from "@/components/sections/ExploreTeaser";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import DimensionLine from "@/components/ui/DimensionLine";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="relative">
      <PageCurtain />
      <Navigation />
      <Hero />
      <About />
      <DimensionLine label="Section A-A · The Work" />
      <Research />
      <Projects />
      <NumbersSection />
      <DimensionLine label="Section B-B · The Road" />
      <Timeline />
      <ManifestoSection />
      <Skills />
      <Education />
      <DimensionLine label="Section C-C · The Person" />
      <BeyondWork />
      <WorkWithMe />
      <BlogPreview posts={posts} />
      <ExploreTeaser />
      <CodexTeaser />
      <DimensionLine label="Detail 01 · Say Hello" />
      <Contact />
      <Footer />
    </main>
  );
}
