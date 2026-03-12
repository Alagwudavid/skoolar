"use client";

import { useState } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FEEDS = [
    { id: "for-you", label: "For you" },
    { id: "following", label: "Following" },
    { id: "community", label: "Community" },
    { id: "custom", label: "Custom feed" },
];

export function FeedDropdown() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("for-you");

    const selectedLabel = FEEDS.find((f) => f.id === selected)?.label ?? "For you";

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 font-semibold text-base hover:opacity-80 transition-opacity focus:outline-none"
            >
                {selectedLabel}
                <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

                    {/* Dropdown panel */}
                    <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-2xl border bg-popover shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <span className="font-bold text-base">Feeds</span>
                            <button className="h-7 w-7 flex items-center justify-center rounded-full border hover:bg-muted transition-colors">
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Feed options */}
                        <div className="flex flex-col py-1">
                            {FEEDS.map((feed) => (
                                <button
                                    key={feed.id}
                                    onClick={() => { setSelected(feed.id); setOpen(false); }}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors text-left",
                                        selected === feed.id && "font-semibold"
                                    )}
                                >
                                    {feed.label}
                                    {selected === feed.id && <Check className="h-4 w-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
