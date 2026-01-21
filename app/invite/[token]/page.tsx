import { prisma } from "../../../lib/db";

export default async function InvitePage({
  params
}: {
  params: { token: string };
}) {
  const invite = await prisma.invite.findUnique({
    where: { token: params.token }
  });

  if (!invite) {
    return (
      <div className="section-pad">
        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-paper p-8">
          <h1 className="section-title">INVITE NOT FOUND</h1>
          <p className="mt-4 text-mute">This invite link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-pad">
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-paper p-8">
        <h1 className="section-title">ACCEPT INVITE</h1>
        <p className="mt-4 text-mute">
          You were invited as {invite.name}. Code: {invite.code}
        </p>
        <form
          className="mt-6"
          action={`/api/invites/${invite.token}/accept`}
          method="post"
        >
          <button className="btn-primary" type="submit">
            ACCEPT
          </button>
        </form>
      </div>
    </div>
  );
}
