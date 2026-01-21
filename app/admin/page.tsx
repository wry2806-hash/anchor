import { prisma } from "../../lib/db";

export default async function AdminPage() {
  const creators = await prisma.creator.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="section-pad">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="section-title">CREATORS</h1>
        <div className="rounded-2xl border border-line bg-paper p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-mute">Invite creators via API.</p>
          </div>
          <div className="mt-6 space-y-3">
            {creators.length === 0 && (
              <p className="text-sm text-mute">No creators yet.</p>
            )}
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="flex items-center justify-between rounded-xl border border-line px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{creator.name}</p>
                  <p className="text-xs text-mute">{creator.email}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-mute">
                  {creator.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
