export const dynamic = "force-dynamic";

import { getProfile, getMonthlySummary } from "@/app/actions/challenges";
import ChallengePageClient from "@/components/challenge/ChallengePageClient";

export default async function ChallengePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const params = await searchParams;
  const year = params.year ? parseInt(params.year) : undefined;
  const month = params.month ? parseInt(params.month) : undefined;

  const [profile, monthly] = await Promise.all([
    getProfile(),
    getMonthlySummary(year, month),
  ]);

  return (
    <ChallengePageClient
      profile={JSON.parse(JSON.stringify(profile))}
      monthly={JSON.parse(JSON.stringify(monthly))}
    />
  );
}
