import { useState } from 'react';
import type { FaqItem } from '../types';
import { ChevronDown } from './icons';

interface FaqAccordionProps {
  items: FaqItem[];
  limit?: number;
}

export default function FaqAccordion({ items, limit }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="space-y-3">
      {displayItems.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`glass-panel overflow-hidden transition-shadow duration-200 ${
              isOpen ? 'shadow-md shadow-teal-accent/5' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/30"
              aria-expanded={isOpen}
            >
              <span className="pr-4 text-sm font-semibold text-slate-deep sm:text-base">
                {item.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isOpen ? 'bg-teal-accent/10' : 'bg-white/40'
                }`}
              >
                <ChevronDown
                  className={`h-4 w-4 text-teal-accent transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-white/50 px-5 pb-4 pt-3">
                <p className="text-sm leading-relaxed text-slate-500">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
