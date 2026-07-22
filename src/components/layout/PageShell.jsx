export default function PageShell({ children }) {
  return (
    <main id="main-content" tabIndex={-1}>
      {children}
    </main>
  );
}
