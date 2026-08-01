import { BackgroundPaths } from "@/components/ui/background-paths";
import { getSponsors } from "@/lib/get-sponsors";
import ProblemScene from "@/components/home/ProblemScene";
import CognitionScene from "@/components/home/CognitionScene";
import ObjectFormationScene from "@/components/home/ObjectFormationScene";
import BetaForm from "@/components/home/BetaForm";
import FinalStatement from "@/components/home/FinalStatement";

export default async function HomePage() {
  // load sponsors at server render
  const sponsorsPromise = getSponsors();

  // Note: getSponsors returns a promise; await when rendering below
  // in the server component we can await it directly
  const sponsors = await sponsorsPromise;
  return (
    <main className="relative z-10">
      <BackgroundPaths
        title="CogniCAD"
        subtitle="An AI-native cognitive layer for engineering. Today: an orchestrator across CAD, simulation, and analysis. Tomorrow: a foundation model that reasons over geometry, physics, and constraints."
        ctaLabel="Join the Beta"
        ctaHref="/beta"
        sponsors={sponsors}
      />
      <ProblemScene />
      <CognitionScene />
      <ObjectFormationScene />
      <BetaForm />
      <FinalStatement />
    </main>
  );
}
