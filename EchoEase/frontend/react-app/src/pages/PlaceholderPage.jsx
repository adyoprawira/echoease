function PlaceholderPage({ title }) {
  return (
    <section className="mx-auto w-full max-w-5xl rounded-3xl border border-dashed border-line bg-white p-10">
      <h1 className="text-3xl font-extrabold text-brand">{title}</h1>
      <p className="mt-2 max-w-xl text-slate-600">
        This section is ready for implementation. The shared sidebar and top navigation remain persistent while
        this content area changes.
      </p>
    </section>
  );
}

export default PlaceholderPage;
