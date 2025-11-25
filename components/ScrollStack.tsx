import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number; // Distance between items in flow (margin bottom)
  itemScale?: number; // How much each item scales down when covered
  itemStackDistance?: number; // Vertical offset between stuck items
  stackPosition?: string | number; // Top position where stacking happens (e.g. "15%")
  blurAmount?: number;
}

export const ScrollStackItem: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div 
      className={`scroll-stack-card sticky origin-top will-change-transform ${className}`}
      style={{
        // Default styling to ensure cards take up space and stack correctly
        width: '100%',
        boxSizing: 'border-box',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 300,
  itemScale = 0.05,
  itemStackDistance = 30,
  stackPosition = '15%',
  blurAmount = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Helper to parse "20%" or numeric pixels
  const getPixelValue = (val: string | number, total: number) => {
    if (typeof val === 'string' && val.includes('%')) {
      return (parseFloat(val) / 100) * total;
    }
    return typeof val === 'string' ? parseFloat(val) : val;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const cards = Array.from(containerRef.current.children) as HTMLElement[];
      if(cards.length === 0) return;

      const viewportHeight = window.innerHeight;
      const stackPosPx = getPixelValue(stackPosition, viewportHeight);

      cards.forEach((card, index) => {
        // 1. Set Sticky Position
        // Each card sticks slightly lower than the previous one to create the stack visual
        const stickyTop = stackPosPx + (index * itemStackDistance);
        card.style.top = `${stickyTop}px`;

        // 2. Set Flow Spacing
        // Ensure there is distance between cards so the user has to scroll to reach the next one
        if (index < cards.length - 1) {
             card.style.marginBottom = `${itemDistance}px`;
        } else {
             card.style.marginBottom = '0px';
        }

        // 3. Animation Logic
        // We calculate visual effects based on the NEXT card's position.
        // As the next card scrolls up and overlaps the current card, the current card scales down.
        const nextCard = cards[index + 1];
        let progress = 0; // 0 = full size, 1 = fully scaled down

        if (nextCard) {
            const nextCardRect = nextCard.getBoundingClientRect();
            // The point where the next card will stick
            const nextCardStickPoint = stackPosPx + ((index + 1) * itemStackDistance);
            
            // Distance of next card from its stick point
            const distanceToStick = nextCardRect.top - nextCardStickPoint;
            
            // Define an "Interaction Zone".
            // The effect happens while the next card is travelling through this zone.
            // A zone of 80% viewport height gives a smooth, long transition.
            const interactionZone = viewportHeight * 0.8;
            
            if (distanceToStick < interactionZone) {
                // Calculate normalized progress (0 to 1)
                const rawProgress = 1 - (distanceToStick / interactionZone);
                progress = Math.max(0, Math.min(1, rawProgress));
            }
        }

        // 4. Apply Transforms
        const targetScale = 1 - (progress * itemScale);
        const blur = progress * blurAmount;
        
        // We use style directly for performance (avoids React render cycle overhead on scroll)
        card.style.transform = `scale(${targetScale})`;
        
        if (blurAmount > 0) {
            // Only apply filter if needed to save GPU resources
            card.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';
        }
        
        // Ensure proper z-index stacking
        card.style.zIndex = `${index + 10}`;
      });

      rafRef.current = null;
    };

    // Run once on mount to set initial positions
    handleScroll();

    // Loop
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, blurAmount]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {children}
    </div>
  );
};

export default ScrollStack;
