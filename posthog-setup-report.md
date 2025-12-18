# PostHog post-wizard report

The wizard has completed a deep integration of your DevEvents Next.js project. PostHog has been configured with client-side analytics using the `instrumentation-client.ts` pattern recommended for Next.js 15.3+. A reverse proxy has been set up via Next.js rewrites to improve tracking reliability and bypass ad blockers. Environment variables have been configured for secure API key management, and event tracking has been added to key user interactions throughout the application.

## Files Created/Modified

| File | Change Type | Description |
|------|-------------|-------------|
| `.env` | Created | PostHog API key and host environment variables |
| `instrumentation-client.ts` | Created | PostHog client initialization with exception capture and debug mode |
| `next.config.ts` | Modified | Added reverse proxy rewrites for PostHog ingestion |
| `components/ExploreBtn.tsx` | Modified | Added `explore_events_clicked` event tracking |
| `components/EventCard.tsx` | Modified | Added `event_card_clicked` event tracking with event properties |
| `components/Navbar.tsx` | Modified | Added navigation click event tracking |

## Events Tracked

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the 'Explore events' button to scroll to the events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (includes event_title, event_slug, event_location, event_date properties) | `components/EventCard.tsx` |
| `nav_logo_clicked` | User clicked on the logo in the navigation | `components/Navbar.tsx` |
| `nav_home_clicked` | User clicked on the Home link in the navigation | `components/Navbar.tsx` |
| `nav_events_clicked` | User clicked on the Events link in the navigation | `components/Navbar.tsx` |
| `nav_create_event_clicked` | User clicked on the Create Event link in the navigation | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://eu.posthog.com/project/109584/dashboard/464130) - Main dashboard with all insights

### Insights
- [Event Discovery Funnel](https://eu.posthog.com/project/109584/insights/BB76ta8T) - Tracks user journey from exploring events to clicking on event cards
- [Event Card Clicks by Event](https://eu.posthog.com/project/109584/insights/LMV3PZys) - Shows which events are most popular based on card clicks
- [Navigation Usage](https://eu.posthog.com/project/109584/insights/4oe5BwVB) - Tracks which navigation items users click most frequently
- [Overall User Engagement](https://eu.posthog.com/project/109584/insights/ECF63DuJ) - Total count of all tracked user interactions over time
- [Events by Location](https://eu.posthog.com/project/109584/insights/GOPSUqlC) - Shows which event locations attract the most interest

## Additional Features Enabled

- **Automatic pageview tracking**: PostHog will automatically capture page views and page leaves
- **Exception tracking**: Unhandled exceptions are automatically captured via `capture_exceptions: true`
- **Session replay**: Enabled by default for debugging user sessions
- **Debug mode**: Enabled in development for easier troubleshooting

## Running the Application

Start the development server to see PostHog in action:

```bash
pnpm dev
```

Visit http://localhost:3000 and interact with the application. Events will appear in your PostHog dashboard within a few seconds.
