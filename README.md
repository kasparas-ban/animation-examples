This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Animation Performance Comparison

This repository contains three different implementations of the same spinner animation to compare their performance characteristics:

- **CSS Animations**: Pure CSS keyframe animations
- **Web Animations API (WAAPI)**: JavaScript-based animations using the native Web Animations API
- **Motion**: Framer Motion library animations

## Performance Testing Guide

### Built-in Benchmark Tools

#### 1. Comprehensive Benchmark (`/animations/1-spinner-benchmark`)

Full-featured testing interface with real-time monitoring:

- **Real-time FPS monitoring**: Shows current frame rate with color coding (green >60fps, yellow 30-60fps, red <30fps)
- **Memory usage tracking**: Displays current JavaScript heap size usage
- **Render time measurement**: Shows how long it takes to render all spinners
- **Dynamic spinner count**: Test with 100, 500, 1000, 2000, 4000, or 8000 spinners
- **Easy switching**: Toggle between CSS, WAAPI, and Motion implementations instantly
- **Monitoring toggle**: Disable monitoring to eliminate measurement overhead (~5-10% performance impact)

#### 2. Clean Performance Test (`/animations/1-spinner-clean-test`)

Zero-overhead testing for pure performance measurement:

- **No monitoring overhead**: Absolutely minimal JavaScript execution
- **Quick switching**: Fast toggle between animation types and counts
- **DevTools ready**: Optimized for browser Performance profiling
- **Minimal UI**: Reduces React rendering overhead to minimum

### Recommended Testing Methodology

#### 1. Baseline Testing

**Option A: With Real-time Monitoring**

1. Open `/animations/1-spinner-benchmark`
2. Start with 1000 spinners using each animation type
3. Record FPS, memory usage, and render time for each
4. Take screenshots of the performance metrics

**Option B: Zero-overhead Testing**

1. Open `/animations/1-spinner-clean-test` for pure performance
2. Use Chrome DevTools Performance tab to record profiles
3. Compare flame graphs between animation types
4. Note: This gives the most accurate performance measurements

#### 2. Stress Testing

1. Gradually increase spinner count: 2000 → 4000 → 8000
2. Observe at what point each implementation starts dropping frames
3. Note memory usage patterns and growth rates

#### 3. Browser Performance Profiling

1. Open Chrome DevTools → Performance tab
2. Click "Record" button
3. Switch between animation types or change spinner counts
4. Stop recording after 10-15 seconds
5. Analyze the flame graph for:
   - **Main thread activity**: Look for long tasks
   - **GPU activity**: Check for excessive GPU usage
   - **Memory allocations**: Look for memory leaks or excessive garbage collection
   - **Paint and composite time**: Measure rendering performance

#### 4. Key Metrics to Compare

**Frame Rate (FPS)**

- Target: 60fps for smooth animations
- Acceptable: >30fps for basic usability
- Poor: <30fps (janky animations)

**Memory Usage**

- Initial memory footprint
- Memory growth over time
- Memory cleanup after reducing spinner count

**CPU Usage**

- Main thread blocking time
- GPU utilization
- Battery impact (on mobile devices)

**Rendering Performance**

- Time to initial render
- Paint frequency
- Composite layer creation

### Expected Performance Characteristics

#### CSS Animations

- **Pros**: Hardware accelerated, minimal JavaScript overhead, excellent for simple animations
- **Cons**: Limited dynamic control, harder to coordinate complex sequences
- **Best for**: Simple, repeating animations with many instances

#### Web Animations API (WAAPI)

- **Pros**: Hardware accelerated, more dynamic control than CSS, native browser API
- **Cons**: More complex setup, less browser support than CSS
- **Best for**: Programmatically controlled animations with moderate complexity

#### Framer Motion

- **Pros**: Excellent developer experience, powerful animation features, React integration
- **Cons**: Larger bundle size, more JavaScript overhead, potential performance impact at scale
- **Best for**: Complex interactive animations, prototyping, moderate number of animated elements

### Testing Different Scenarios

#### Scenario 1: High Density Animation

- Test with 4000+ spinners
- Measure performance degradation
- Identify breaking point for each implementation

#### Scenario 2: Dynamic Control

- Programmatically start/stop animations
- Change animation speed or direction
- Measure overhead of dynamic updates

#### Scenario 3: Mobile Performance

- Test on mobile devices or throttled desktop
- Use Chrome DevTools device emulation
- Monitor battery usage patterns

### Performance Testing Checklist

- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on different devices (desktop, tablet, mobile)
- [ ] Record baseline metrics for each implementation
- [ ] Document performance breaking points
- [ ] Test with different CSS properties (will-change, transform-style)
- [ ] Monitor memory usage over extended periods
- [ ] Test interaction responsiveness during animations
- [ ] Compare bundle sizes and initialization costs

### Debugging Performance Issues

If you encounter performance problems:

1. **Check browser console** for errors or warnings
2. **Use will-change CSS property** to hint at optimizations
3. **Reduce animation complexity** or frequency
4. **Consider animation alternatives** (transform vs position changes)
5. **Profile with React DevTools** (for Motion implementation)
6. **Test with reduced motion preferences** enabled

### Contributing Performance Data

When contributing performance data:

1. Include browser version and device specifications
2. Document testing methodology
3. Provide performance profile recordings
4. Note any specific configuration or environmental factors

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
