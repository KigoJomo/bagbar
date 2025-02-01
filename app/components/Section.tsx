const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <article className="border-b border-foreground-faded pb-6 px-2 md:px-24">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </article>
)

export default Section