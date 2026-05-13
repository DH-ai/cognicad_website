import HeroScene from "@/components/home/HeroScene";
import ProblemScene from "@/components/home/ProblemScene";
import CognitionScene from "@/components/home/CognitionScene";
import ArchitectureScene from "@/components/home/ArchitectureScene";
import ObjectFormationScene from "@/components/home/ObjectFormationScene";
import ResearchCards from "@/components/home/ResearchCards";
import BetaForm from "@/components/home/BetaForm";
import FinalStatement from "@/components/home/FinalStatement";

export default function HomePage() {
  return (
    <main>
      <HeroScene />
      <ProblemScene />
      <CognitionScene />
      <ArchitectureScene />
      <ObjectFormationScene />
      <ResearchCards />
      <BetaForm />
      <FinalStatement />
    </main>
  );
}
