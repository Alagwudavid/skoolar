"use client";

import {
  Search,
  X,
  TrendingUp,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 0.49 0.43"
    xmlSpace="preserve"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    {...props}
  >
    <g>
      <path
        d="M0.29 0.3c-0.05,0.02 -0.14,0.09 -0.2,0.05 -0.04,-0.04 -0.02,-0.14 0,-0.19 0.08,-0.15 0.23,-0.13 0.2,0.14zm0.19 -0.18c0.01,-0.02 0.01,-0.02 0.01,-0.04l-0.07 0.01 -0.01 0.03c-0.01,0.06 -0.05,0.1 -0.06,0.12 0,-0.05 0,-0.1 -0.02,-0.15 -0.05,-0.14 -0.24,-0.11 -0.3,0.04 -0.04,0.08 -0.05,0.21 0.02,0.27 0.09,0.08 0.19,-0.01 0.26,-0.03 0.06,0.06 0.1,0.08 0.18,0l-0.04 -0.04c-0.04,0.01 -0.05,0.04 -0.08,0.01 -0.02,-0.04 0.08,-0.1 0.11,-0.22z"
        fill="black"
      />
    </g>
  </svg>
);

interface SearchBarProps {
  maxWidth?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string; // Controlled mode: external value
  onChange?: (value: string) => void; // Controlled mode: external handler
  showDropdown?: boolean; // Whether to show search results dropdown
  enableDebounce?: boolean; // Enable debounced search
  debounceMs?: number; // Debounce delay in milliseconds
}

export default function SearchBar({
  maxWidth = "max-w-xl",
  placeholder = "Search...",
  onSearch,
  value: externalValue,
  onChange: externalOnChange,
  showDropdown = true,
  enableDebounce = true,
  debounceMs = 1500,
}: SearchBarProps) {
  // Support both controlled and uncontrolled modes
  const [internalValue, setInternalValue] = useState("");
  const isControlled = externalValue !== undefined;
  const searchQuery = isControlled ? externalValue : internalValue;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock trending searches
  const trendingSearches = [
    { id: 1, text: "aws generative ai developer", trend: "up" },
    { id: 2, text: "abhishek veeramalla", trend: "up" },
    { id: 3, text: "stephane maarek", trend: "up" },
    { id: 4, text: "piano", trend: "up" },
    { id: 5, text: "mlops", trend: "up" },
    { id: 6, text: "aws certified ai practitioner", trend: "up" },
  ];

  // Mock search results grouped by category
  const mockSearchResults = (query: string) => ({
    courses: [
      {
        id: 1,
        title: `AI Video Creation with Kling AI: Mind-Blowing Generative AI`,
        author: "Dan Britain",
        image: "👨‍🎨",
      },
      {
        id: 2,
        title: `Create Ai Videos | Kling Ai For Beginners | Step-by-step`,
        author: "FXveda Gen Ai Education App",
        image: "🎬",
      },
      {
        id: 3,
        title: `Klaviyo Automation and Segmentation Masterclass`,
        author: "Jeremy Robinson",
        image: "📧",
      },
      {
        id: 4,
        title: `Master AI Video Generation With KlingAI Generative AI`,
        author: "Faizan Amied",
        image: "🤖",
      },
    ],
    communities: [
      {
        id: 1,
        name: `${query} Community`,
        members: "2.5K members",
        image: "🏘️",
      },
      {
        id: 2,
        name: `${query} Developers`,
        members: "1.8K members",
        image: "💻",
      },
    ],
    users: [
      { id: 1, name: `${query} Expert`, username: "@expert", image: "👤" },
      {
        id: 2,
        name: `${query} Instructor`,
        username: "@instructor",
        image: "👨‍🏫",
      },
    ],
    events: [
      { id: 1, title: `${query} Workshop`, date: "Jan 15, 2026", image: "📅" },
      {
        id: 2,
        title: `${query} Masterclass`,
        date: "Jan 20, 2026",
        image: "🎓",
      },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Update value based on controlled/uncontrolled mode
    if (isControlled) {
      externalOnChange?.(value);
    } else {
      setInternalValue(value);
    }

    // Immediate callback for external filtering
    onSearch?.(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Only handle dropdown search if enabled
    if (showDropdown && value.trim()) {
      setIsSearching(true);
      setSearchResults(null);

      // Debounce search for dropdown results
      if (enableDebounce) {
        searchTimeoutRef.current = setTimeout(() => {
          setSearchResults(mockSearchResults(value));
          setIsSearching(false);
        }, debounceMs);
      } else {
        setSearchResults(mockSearchResults(value));
        setIsSearching(false);
      }
    } else {
      setSearchResults(null);
      setIsSearching(false);
    }
  };


  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleClearSearch = () => {
    if (isControlled) {
      externalOnChange?.("");
    } else {
      setInternalValue("");
    }

    onSearch?.("");
    setSearchResults(null);
    setIsSearching(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  return (
    <div className={`${maxWidth} relative`} ref={dropdownRef}>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`w-full bg-background text-foreground pl-10 pr-12 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400`}
          />

          {/* Clear Button or Loading Indicator */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : searchQuery ? (
              <button
                onClick={handleClearSearch}
                className="p-1.5 rounded-lg transition-colors text-muted-foreground hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
