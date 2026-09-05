export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Milal Church. All rights reserved.</p>
        <p>A welcoming community of faith, hope, and love.</p>
      </div>
    </footer>
  );
}
