import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = { title: "Terms and Conditions — JusCAD", description: "Terms governing access to the JusCAD website and early-access services." };
export default function TermsPage() {
  return <LegalDocument eyebrow="Legal / 02" title="Terms and Conditions" summary="These terms govern your use of the JusCAD website, accounts, beta programme, and related services.">
    <h2>1. Agreement and eligibility</h2><p>By using JusCAD, you agree to these terms and our Privacy Policy. You must be legally able to enter this agreement. If you use JusCAD for an organisation, you confirm that you are authorised to bind it.</p>
    <h2>2. Accounts</h2><p>Provide accurate information, protect your credentials, and notify us of suspected unauthorised access. You are responsible for activity under your account. We may refuse, suspend, or terminate accounts used unlawfully or in breach of these terms.</p>
    <h2>3. Early-access service</h2><p>JusCAD is under active development. Download, credit, usage, billing, and other account screens may be unavailable or informational only. An account or beta application does not guarantee admission, a release date, credits, commercial availability, or continued access.</p>
    <h2>4. Acceptable use</h2><p>Do not misuse the service, bypass access controls, disrupt infrastructure, introduce malicious code, scrape at unreasonable volume, impersonate others, infringe rights, or use JusCAD for unlawful activity. Do not attempt to obtain administrator access or another user&apos;s data.</p>
    <h2>5. Your submissions</h2><p>You retain ownership of material you submit. You grant JusCAD permission to store, process, and review it as needed to provide the requested service, respond to you, evaluate an application, or improve the beta. Do not submit confidential or third-party material unless you have permission.</p>
    <h2>6. JusCAD intellectual property</h2><p>The website, software, branding, designs, documentation, and related technology belong to JusCAD or its licensors. These terms grant only a limited, revocable, non-transferable right to use available services as intended. No source-code, patent, trademark, or commercial licence is granted.</p>
    <h2>7. Third-party services</h2><p>JusCAD depends on third-party hosting, authentication, storage, email, analytics, and security providers. Their availability and terms may affect the service, and links to external sites are provided for convenience.</p>
    <h2>8. Disclaimers</h2><p>To the extent permitted by law, the service is provided “as is” and “as available.” Early-access output must not be treated as validated engineering, safety, manufacturing, or regulatory advice. You remain responsible for independent review and professional engineering judgement.</p>
    <h2>9. Liability</h2><p>To the maximum extent permitted by law, JusCAD is not liable for indirect, incidental, special, consequential, or lost-profit damages arising from use of an unavailable or beta service. Nothing excludes liability that cannot lawfully be excluded.</p>
    <h2>10. Termination</h2><p>You may stop using JusCAD or delete a normal-user account at any time. We may suspend access to protect users, infrastructure, legal compliance, or the integrity of the beta. Provisions concerning ownership, disclaimers, liability, and disputes survive termination.</p>
    <h2>11. Governing law</h2><p>These terms are governed by the laws of India. Courts with jurisdiction in Mumbai, Maharashtra will have exclusive jurisdiction, subject to any mandatory rights available under applicable law.</p>
    <h2>12. Contact and changes</h2><p>Questions may be sent to <a href="mailto:enquire@juscad.com">enquire@juscad.com</a>. We may revise these terms as the service develops; continued use after an effective-date change constitutes acceptance where permitted by law.</p>
  </LegalDocument>;
}
