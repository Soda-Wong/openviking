import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

export interface ForceFieldBackgroundProps {
  imageUrl?: string;
  hue?: number;
  saturation?: number;
  threshold?: number;
  minStroke?: number;
  maxStroke?: number;
  spacing?: number;
  noiseScale?: number;
  density?: number;
  invertImage?: boolean;
  invertWireframe?: boolean;
  magnifierEnabled?: boolean;
  magnifierRadius?: number;
  forceStrength?: number;
  friction?: number;
  restoreSpeed?: number;
  className?: string;
}

export function ForceFieldBackground({
  imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  hue = 185,
  saturation = 80,
  threshold = 255,
  minStroke = 2,
  maxStroke = 6,
  spacing = 10,
  noiseScale = 0,
  density = 2.0,
  invertImage = true,
  invertWireframe = true,
  magnifierEnabled = true,
  magnifierRadius = 150,
  forceStrength = 10,
  friction = 0.9,
  restoreSpeed = 0.05,
  className = "",
}: ForceFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const propsRef = useRef({
    hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale, 
    density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
    forceStrength, friction, restoreSpeed
  });

  useEffect(() => {
    propsRef.current = {
      hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale,
      density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
      forceStrength, friction, restoreSpeed
    };
  }, [hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale, density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius, forceStrength, friction, restoreSpeed]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
    }

    const sketch = (p: p5) => {
      let originalImg: p5.Image;
      let img: p5.Image;
      let palette: p5.Color[] = [];
      let points: {
        pos: p5.Vector;
        originalPos: p5.Vector;
        vel: p5.Vector;
      }[] = [];

      let lastHue = -1;
      let lastSaturation = -1;
      let lastSpacing = -1;
      let lastNoiseScale = -1;
      let lastDensity = -1;
      let lastInvertImage: boolean | null = null;
      let magnifierX = 0;
      let magnifierY = 0;
      let magnifierInertia = 0.1;

      p.preload = () => {
        p.loadImage(
          imageUrl,
          (loadedImg) => {
            originalImg = loadedImg;
            setIsLoading(false);
          },
          () => {
            setIsLoading(false);
          }
        );
      };

      p.setup = () => {
        if (!originalImg) return;

        const { clientWidth, clientHeight } = containerRef.current!;
        p.createCanvas(clientWidth, clientHeight);

        magnifierX = p.width / 2;
        magnifierY = p.height / 2;

        processImage();
        generatePalette(propsRef.current.hue, propsRef.current.saturation);
        generatePoints();
      };

      p.windowResized = () => {
        if (!containerRef.current || !originalImg) return;
        const { clientWidth, clientHeight } = containerRef.current;
        p.resizeCanvas(clientWidth, clientHeight);
        processImage();
        generatePoints();
      };

      function processImage() {
        if (!originalImg) return;
        img = originalImg.get();
        if (p.width > 0 && p.height > 0) {
          img.resize(p.width, p.height);
        }
        img.filter(p.GRAY);

        if (propsRef.current.invertImage) {
          img.loadPixels();
          for (let i = 0; i < img.pixels.length; i += 4) {
            img.pixels[i] = 255 - img.pixels[i];
            img.pixels[i + 1] = 255 - img.pixels[i + 1];
            img.pixels[i + 2] = 255 - img.pixels[i + 2];
          }
          img.updatePixels();
        }
        lastInvertImage = propsRef.current.invertImage;
      }

      function generatePalette(h: number, s: number) {
        palette = [];
        p.push();
        p.colorMode(p.HSL);
        for (let i = 0; i < 12; i++) {
          let lightness = p.map(i, 0, 11, 95, 5);
          palette.push(p.color(h, s, lightness));
        }
        p.pop();
      }

      function generatePoints() {
        if (!img) return;
        points = [];
        const { spacing, density, noiseScale } = propsRef.current;

        img.loadPixels();
        for (let y = 0; y < p.height; y += spacing) {
          for (let x = 0; x < p.width; x += spacing) {
            let offsetX = noiseScale > 0 ? p.noise(x * 0.01, y * 0.01) * noiseScale - noiseScale / 2 : 0;
            let offsetY = noiseScale > 0 ? p.noise(x * 0.01 + 100, y * 0.01 + 100) * noiseScale - noiseScale / 2 : 0;

            if (p.random() < (1 / density)) {
              let px = Math.floor(x + offsetX);
              let py = Math.floor(y + offsetY);
              px = p.constrain(px, 0, p.width - 1);
              py = p.constrain(py, 0, p.height - 1);

              let index = (py * p.width + px) * 4;
              let brightness = img.pixels[index];

              points.push({
                pos: p.createVector(px, py),
                originalPos: p.createVector(px, py),
                vel: p.createVector(0, 0)
              });
            }
          }
        }

        lastSpacing = spacing;
        lastNoiseScale = noiseScale;
        lastDensity = density;
      }

      p.draw = () => {
        if (!img || points.length === 0) return;

        const props = propsRef.current;

        // Detect prop changes
        if (props.hue !== lastHue || props.saturation !== lastSaturation) {
          generatePalette(props.hue, props.saturation);
          lastHue = props.hue;
          lastSaturation = props.saturation;
        }

        if (props.spacing !== lastSpacing || props.noiseScale !== lastNoiseScale || props.density !== lastDensity) {
          generatePoints();
        }

        if (props.invertImage !== lastInvertImage) {
          processImage();
        }

        p.clear();
        p.background(0, 0, 0, 0);

        // Smooth magnifier movement
        magnifierX += (p.mouseX - magnifierX) * magnifierInertia;
        magnifierY += (p.mouseY - magnifierY) * magnifierInertia;

        img.loadPixels();

        for (let pt of points) {
          // Physics for force field
          if (props.magnifierEnabled) {
            let d = p.dist(pt.pos.x, pt.pos.y, magnifierX, magnifierY);
            if (d < props.magnifierRadius && d > 0) {
              let force = p5.Vector.sub(pt.pos, p.createVector(magnifierX, magnifierY));
              force.normalize();
              let strength = p.map(d, 0, props.magnifierRadius, props.forceStrength, 0);
              force.mult(strength);
              pt.vel.add(force);
            }
          }

          // Apply friction
          pt.vel.mult(props.friction);

          // Restore to original position
          let restore = p5.Vector.sub(pt.originalPos, pt.pos);
          restore.mult(props.restoreSpeed);
          pt.vel.add(restore);

          // Update position
          pt.pos.add(pt.vel);

          // Get brightness at original position for color mapping
          let ox = Math.floor(pt.originalPos.x);
          let oy = Math.floor(pt.originalPos.y);
          ox = p.constrain(ox, 0, p.width - 1);
          oy = p.constrain(oy, 0, p.height - 1);
          let index = (oy * p.width + ox) * 4;
          let brightness = img.pixels[index];

          let condition = props.invertWireframe
            ? brightness < props.threshold
            : brightness >= props.threshold;

          if (condition) {
            let colorIndex = Math.floor(p.map(brightness, 0, 255, 0, palette.length - 1));
            colorIndex = p.constrain(colorIndex, 0, palette.length - 1);

            let strokeWeight = p.map(brightness, 0, 255, props.minStroke, props.maxStroke);
            
            p.stroke(palette[colorIndex]);
            p.strokeWeight(strokeWeight);
            p.point(pt.pos.x, pt.pos.y);
          }
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, containerRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [imageUrl]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ 
        pointerEvents: 'auto',
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
}

export default ForceFieldBackground;
