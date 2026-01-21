import { prisma } from "../../../lib/db";
import { formatMoney } from "../../../lib/utils";

export default async function CreatorPage({
  params
}: {
  params: { code: string };
}) {
  const creator = await prisma.creator.findUnique({
    where: { code: params.code.toUpperCase() },
    include: {
      commissions: true,
      orders: true
    }
  });

  if (!creator) {
    return (
      <div className="section-pad">
        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-paper p-8">
          <h1 className="section-title">CREATOR NOT FOUND</h1>
        </div>
      </div>
    );
  }

  const totalCommission = creator.commissions.reduce(
    (sum, c) => sum + c.amount,
    0
  );

  return (
    <div className="section-pad">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="section-title">{creator.name.toUpperCase()}</h1>
        <div className="rounded-2xl border border-line bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Total earned</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {formatMoney(totalCommission.toFixed(2), "USD")}
          </p>
        </div>
      </div>
    </div>
  );
}
