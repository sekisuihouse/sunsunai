import Link from "next/link";
import type { ReactNode } from "react";

export function LinkCtaCards({
  cards,
}: {
  cards: Array<{
    href: string;
    title: string;
    description: ReactNode;
    action: string;
  }>;
}) {
  return (
    <div className="km-cta-cards">
      {cards.map((card) => (
        <Link className="km-cta-card" href={card.href} key={card.href}>
          <strong className="km-cta-card__title">{card.title}</strong>
          <span className="km-cta-card__body">
            <span>{card.description}</span>
            <span className="km-meta">{card.action}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
