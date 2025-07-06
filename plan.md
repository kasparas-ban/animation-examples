# Modern Web Animations

## Introduction and goals

- Inspired by Viral Forms project
- Outline and goals of the presentation
  - Contract and compare different animation tools
  - Best practices and ways to optimize performance

## Web animation tools

- CSS Animations (Keyframe animations)
- CSS transitions
- Javascript animations
- GSAP, Motion, Spring.js, Anime.js
- Rive, Lottie

## Basic principles

- Natural, Physics-based
- Minimal

## Notes

**Beware of what elements you’re animating**

Animating a `div` with `transform` is generally more performant than animating an SVG element directly. Browsers can often optimize `div` transformations by offloading them to the GPU (hardware acceleration), resulting in smoother animations and higher FPS. SVG animations, depending on their complexity and the properties being animated, might not always benefit from the same level of optimization.

**Avoid nested animations**

Modern browsers optimize animations by offloading them to the GPU. To do this, they often promote the animated element to its own `compositor layer`. Think of this as giving the element its own sheet of glass that can be moved around without disturbing the rest of the page content.

When you had two nested `motion.divs`, the browser might create two separate compositor layers—one for the outer `div` being translated (x) and one for the inner `div` being rotated (rotate). The browser then has to calculate the position and rotation for each layer and composite them together every frame. This management of multiple layers adds computational overhead.
