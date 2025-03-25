export default function MatchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      {children}
    </section>
  );
} 