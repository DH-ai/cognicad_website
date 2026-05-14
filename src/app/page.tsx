import { BackgroundPaths } from "@/components/ui/background-paths";
import ProblemScene from "@/components/home/ProblemScene";
import CognitionScene from "@/components/home/CognitionScene";
import ObjectFormationScene from "@/components/home/ObjectFormationScene";
import BetaForm from "@/components/home/BetaForm";
import FinalStatement from "@/components/home/FinalStatement";

export default function HomePage() {
  return (
    <main className="relative z-10">
      <BackgroundPaths
        title="CogniCAD"
        subtitle="An AI-native cognitive layer for engineering. Today: an orchestrator across CAD, simulation, and analysis. Tomorrow: a foundation model that reasons over geometry, physics, and constraints."
        ctaLabel="Join the Beta"
        ctaHref="/beta"
      />
      <ProblemScene />
      <CognitionScene />
      <ObjectFormationScene />
      <BetaForm />
      <FinalStatement />
    </main>
  );
}
