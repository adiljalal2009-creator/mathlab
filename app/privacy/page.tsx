export const metadata = { title: 'Privacy Policy', description: 'MathLab privacy policy.' };
export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: 2026-05-20</p>
      <p>MathLab respects your privacy. We use cookieless analytics (Plausible) and collect no personal information for anonymous usage of the calculators.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Aggregate, anonymous page view statistics (no cookies, no fingerprinting).</li>
        <li>Optional account data (email) only if you create an account.</li>
      </ul>
      <h2>Children (COPPA)</h2>
      <p>We do not knowingly collect personal information from children under 13. The calculators may be used anonymously without an account.</p>
      <h2>Contact</h2>
      <p>privacy@mathlab.app</p>
    </main>
  );
}
