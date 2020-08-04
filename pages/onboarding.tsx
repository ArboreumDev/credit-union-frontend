import Link from "next/link";

export function Onboarding() {
  return (
    <div>
      Are you a <Link href="/lender/profile"> lender </Link> or a
      <Link href="/borrower/profile"> borrower </Link>
    </div>
  );
}
