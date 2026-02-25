'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    label: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export default function Tooltip({
    label,
    children,
    position = 'right',
    className = ''
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isPositioned, setIsPositioned] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible || !triggerRef.current) {
            setIsPositioned(false);
            return;
        }

        const updatePosition = () => {
            const trigger = triggerRef.current;
            if (!trigger) return;

            const rect = trigger.getBoundingClientRect();
            const gap = 12; // spacing between trigger and tooltip

            let top = 0;
            let left = 0;

            switch (position) {
                case 'right':
                    top = rect.top + rect.height / 2;
                    left = rect.right + gap;
                    break;
                case 'left':
                    top = rect.top + rect.height / 2;
                    left = rect.left - gap;
                    break;
                case 'top':
                    top = rect.top - gap;
                    left = rect.left + rect.width / 2;
                    break;
                case 'bottom':
                    top = rect.bottom + gap;
                    left = rect.left + rect.width / 2;
                    break;
            }

            setCoords({ top, left });
            setIsPositioned(true);
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isVisible, position]);

    const getTransformOrigin = () => {
        switch (position) {
            case 'right': return 'left center';
            case 'left': return 'right center';
            case 'top': return 'center bottom';
            case 'bottom': return 'center top';
        }
    };

    const getTranslate = () => {
        switch (position) {
            case 'right': return 'translate(0, -50%)';
            case 'left': return 'translate(-100%, -50%)';
            case 'top': return 'translate(-50%, -100%)';
            case 'bottom': return 'translate(-50%, 0)';
        }
    };

    const getArrowPosition = () => {
        switch (position) {
            case 'right':
                return 'absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-foreground';
            case 'left':
                return 'absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-foreground';
            case 'top':
                return 'absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-foreground';
            case 'bottom':
                return 'absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-foreground';
        }
    };

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className={className}
            >
                {children}
            </div>
            {isVisible && isPositioned && typeof window !== 'undefined' && createPortal(
                <div
                    className="fixed z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        transform: getTranslate(),
                        transformOrigin: getTransformOrigin(),
                    }}
                >
                    <div className="relative bg-foreground text-background text-sm font-medium px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                        {label}
                        {/* Arrow */}
                        <div className={getArrowPosition()}></div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
