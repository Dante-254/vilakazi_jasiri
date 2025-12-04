Villakazi Rover Crew (Villakazi Jasiri Scouts)

Villakazi Rover Crew — a youth-focused Rover crew from Kasarani, Nairobi, affiliated with the Kenya Scouts Association (KSA).

Motto: "Service and Progress"

## Introduction

This repository contains the website for the Villakazi Rover Crew (Villakazi Jasiri Scouts). The site is built to communicate the crew's mission, showcase patrols and events, provide a gallery, and offer a members-only verification flow for future members.

Affiliation: Kasarani Scouts Local Association → Kenya Scouts Association

Patrols:

- Dove (novices)
- Cat (invested)
- Leo (invested)

## Goals of This Website

- Provide clear information about the crew and Rovering.
- Showcase leadership, events, and gallery content.
- Provide a members-only login/verification placeholder to support future secure access.
- Preserve Kenya Scouts Association (KSA) values while delivering a modern, youth-friendly UI.

## Features

- Responsive, mobile-first design with a sticky header and visible theme toggle.
- Seasonal hero area (config-driven) with animated text.
- Patrol pages with unique themes (Dove, Cat, Leo).
- Gallery with responsive masonry and lightbox viewing.
- Blog/Announcements placeholder for Markdown-powered posts.
- Members-only mock authentication flow with verification by Jasiri Scout Leaders (JSL).

## Tech Stack

- Next.js (App Router)
- React + React Server Components
- Tailwind CSS
- Framer Motion (animations)
- next-themes (theme toggling)

## Running Locally

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Open the URL printed by Next (typically `http://localhost:3000`).

## Future Enhancements

- Real authentication & member verification workflow.
- CMS integration for blog and events (MDX/Headless CMS).
- Improved gallery asset management and image optimization.
- Accessibility improvements for dropdowns, focus management, and keyboard navigation.

## Contributing

Feel free to open issues or PRs to suggest improvements, add content, or fix bugs. The codebase is modular and organized for easy future expansion.

---

Villakazi Rover Crew — Service and Progress
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Notes

- Added a small client-side component `src/components/patrols/PatrolMembersClient.tsx` to animate and render patrol leadership and members using Framer Motion. This component is intentionally client-only to avoid server-side animation errors.
