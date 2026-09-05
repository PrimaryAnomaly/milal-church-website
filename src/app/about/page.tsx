import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">About</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        About Milal Church
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-700">
        <p>
          Milal Church is a placeholder congregation page for our growing community.
          We gather to worship, learn, and care for one another in the name of Christ.
        </p>
        <p>
          Our name, <em>Milal</em>, evokes the idea of a bright path forward — walking
          together in faith with humility and joy. This site will eventually share
          service times, ministries, and stories from our church family.
        </p>
        <p>
          For now, explore the posts section for updates, or check back soon as we
          fill in more details about our mission, leadership, and how to get involved.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Visit us</h2>
        <dl className="mt-4 space-y-3 text-sm text-stone-700">
          <div>
            <dt className="font-medium text-stone-900">Address</dt>
            <dd className="text-muted">123 Faith Avenue (placeholder), Your City</dd>
          </div>
          <div>
            <dt className="font-medium text-stone-900">Service times</dt>
            <dd className="text-muted">Sundays — time TBD</dd>
          </div>
          <div>
            <dt className="font-medium text-stone-900">Contact</dt>
            <dd className="text-muted">hello@milal.church (placeholder)</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
