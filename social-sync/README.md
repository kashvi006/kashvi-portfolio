# SocialSync

SocialSync is an interactive social media scheduling dashboard and React performance optimization lab.

It combines a visual content calendar with post management, drag-and-drop scheduling, persistent browser storage, and an interactive demonstration of React rendering optimizations.

## Features

- Interactive monthly content calendar
- Create and schedule social media posts
- Instagram and LinkedIn platform selection
- Drag-and-drop post rescheduling
- Edit scheduled posts
- Delete scheduled posts
- Persistent post storage using localStorage
- Dashboard statistics
- React.memo optimization toggle
- useMemo optimization toggle
- useCallback optimization toggle
- Individual optimization toggle counters
- Total optimization counter
- Active optimization counter
- React Profiler performance monitoring
- Baseline vs optimized render measurements
- Performance improvement calculation
- Technical explanation of optimization techniques
- Automated testing with Vitest and React Testing Library
- Responsive dashboard design

## Technologies

- React
- Vite
- JavaScript
- FullCalendar
- React Profiler
- Vitest
- React Testing Library
- CSS
- localStorage

## Performance Optimization Lab

SocialSync demonstrates three React optimization techniques:

| Technique | Purpose |
|---|---|
| React.memo | Reduces unnecessary component re-renders |
| useMemo | Memoizes calculated values |
| useCallback | Maintains stable function references |

Each optimization can be independently enabled or disabled through the dashboard.

The application also uses React Profiler to measure rendering performance.

## Testing

The project uses Vitest and React Testing Library.

Run the test suite:

```bash
npm test