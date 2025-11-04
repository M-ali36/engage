import React, { useEffect, useRef, useCallback } from 'react';
import WorldMap from '@Svg/world-map.svg';
import gsap from 'gsap';
// NOTE: The 'gsap' import was removed here to resolve compilation errors in this environment. 
// ASSUMPTION: 'gsap' is correctly installed in your Gatsby project via 'npm install gsap'
// and is available for use.
// import { gsap } from 'gsap';

// NOTE: The WorldMap import was removed to resolve the unresolvable path alias (@Svg/world-map.svg).
// import WorldMap from '@Svg/world-map.svg'; 
import PropTypes from 'prop-types';


// --- CONFIGURATION ---
const MAX_PROXIMITY_PX = 20; // Radius (in screen pixels) around the mouse to react
const BASE_COLOR = '#313340'; // Black (initial fill)
const ACTIVE_COLOR = '#FF4F17'; // Green (proximity fill)

/**
 * WorldMapProximity: An SVG wrapper that applies a mouse proximity fill effect
 * to all child <path> elements within the WorldMap SVG.
 */
const WorldMapProximity = ({ className }) => {
    // Reference to the main div wrapper, which contains the SVG
    const mapContainerRef = useRef(null);
    
    // Stores the initial path elements found in the SVG
    const pathRefs = useRef([]); 
    
    // --- Helper for Color Blending (GSAP Utility) ---
    // This allows GSAP to smoothly animate between two colors
    const getBlendedColor = (t) => {
        // Since we removed the direct GSAP import, we need a manual interpolation helper.
        // This is a simplified function to demonstrate the logic. 
        // NOTE: Use gsap.utils.interpolate in your real project for better color blending.
        const r1 = parseInt(BASE_COLOR.slice(1, 3), 16);
        const g1 = parseInt(BASE_COLOR.slice(3, 5), 16);
        const b1 = parseInt(BASE_COLOR.slice(5, 7), 16);
        
        const r2 = parseInt(ACTIVE_COLOR.slice(1, 3), 16);
        const g2 = parseInt(ACTIVE_COLOR.slice(3, 5), 16);
        const b2 = parseInt(ACTIVE_COLOR.slice(5, 7), 16);
        
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).padStart(6, '0')}`;
    };

    // --- Main Mouse Move Handler ---
    const handleMouseMove = useCallback((event) => {
        const container = mapContainerRef.current;
        if (!container || typeof gsap === 'undefined') return; // Check for gsap availability

        // Loop through all paths to calculate distance and set color
        pathRefs.current.forEach((path) => {
            // Use getBoundingClientRect for screen-space calculations
            const pathRect = path.getBoundingClientRect();
            
            // Calculate the center of the path's bounding box in screen coordinates
            const pathCenterX = pathRect.left + pathRect.width / 2;
            const pathCenterY = pathRect.top + pathRect.height / 2;

            // Calculate distance from mouse to path center
            const dx = event.clientX - pathCenterX;
            const dy = event.clientY - pathCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // --- Proximity & Easing Logic ---
            
            // 1. Calculate raw proximity (0.0 to 1.0)
            const rawProximity = Math.max(0, 1 - distance / MAX_PROXIMITY_PX);

            // 2. Apply Cubic Ease-Out (for the "easing" requested by user)
            const proximity = 1 - Math.pow(1 - rawProximity, 3);
            
            // 3. Animate the fill color using GSAP
            gsap.to(path, {
                duration: 0.15, // Short duration for responsive feel
                fill: getBlendedColor(proximity),
                ease: "power1.out"
            });
        });
    }, []);

    // --- Setup Effect (Runs once on mount) ---
    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container || typeof gsap === 'undefined') {
            console.error("GSAP is not available. Ensure it is installed and imported correctly in your project.");
            return;
        }

        // 1. Find all relevant paths within the SVG
        const svgElement = container.querySelector('svg');
        if (svgElement) {
             // Find all paths within the SVG. This is our target list.
            const paths = Array.from(container.querySelectorAll('svg > path:not([fill="#FF4F17"])'));
            pathRefs.current = paths;

            // 2. Initialize the fill color for all paths to black using GSAP
            gsap.set(paths, { fill: BASE_COLOR });

            // 3. Attach the mouse move listener to the container
            container.addEventListener('mousemove', handleMouseMove);
        }

        // 4. Cleanup function to remove the listener on unmount
        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [handleMouseMove]);

    return (
        <div 
            ref={mapContainerRef} 
            className={className}
        >
            <WorldMap className="world-map"/>
        </div>
    );
};

WorldMapProximity.propTypes = {
    className: PropTypes.string,
};

export default WorldMapProximity;
