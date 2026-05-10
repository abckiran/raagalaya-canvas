# Raagalaya Academy — content editor's guide

A short, opinionated guide for editing the website without touching code.

## Getting in

1. Open **https://raagalayaacademy.com/admin**
2. Sign in (one-time invite was sent to your email — accept it the first time, set a password)
3. You'll land on the editor dashboard, which lists collections in the left sidebar:
   - **Events — Upcoming** · concerts not yet happened
   - **Events — Past** · the archive
   - **Videos — Press (TV9 USA)** · TV9 media coverage
   - **Videos — Mayoral Awards** · award-ceremony recordings
   - **Videos — Performances** · concert performance recordings
   - **Gallery photos** · the photo wall on the Gallery page

Click any collection on the left to see existing entries; click **New** at the top right to add one.

## How saving works

Every change you make is saved as a small commit to the project's git history.
After you click **Publish**, the website rebuilds automatically and goes live in
**about 2 minutes**. You don't need to do anything else.

## Adding a new past event

1. Left sidebar → **Events — Past** → **New Past event**
2. Fill in:
   - **Title** — short title, e.g. `Sangeethothsavam · Spring 2026`
   - **Date** — pick the date from the calendar
   - **Venue** — where it happened
   - **Description** — one or two sentences about the event
3. Click **Publish** → wait ~2 minutes → refresh https://raagalayaacademy.com/events

The archive is automatically sorted with the most recent event first.

## Adding an upcoming event

Same as above but choose **Events — Upcoming** and you can leave **Date** empty
if it's still TBD. The page will show "TBD" until you fill the date in.

## Adding a YouTube video

1. Open YouTube, find the video. The URL looks like:
   `https://www.youtube.com/watch?v=ABC12345xyz`
2. Copy the part after `v=` (here, `ABC12345xyz`) — that's the **YouTube Video ID**.
3. In the admin → choose the right collection:
   - **Press** → for TV9 USA coverage
   - **Mayoral** → for award-ceremony recordings
   - **Performances** → for concert/song recordings
4. Click **New**, fill in Title and YouTube Video ID, set Order (1 = appears first).
5. Click **Publish**.

## Adding a gallery photo

1. Left sidebar → **Gallery photos** → **Photo list**
2. Click **+ Add photo** at the bottom of the list
3. Click the **image** field → **Upload new** → select a photo from your computer
4. Fill in **Caption / description** — a short sentence (used for screen readers
   and as the alt text)
5. To reorder, drag the photo up or down in the list
6. Click **Publish**

The watermark `© Raagalaya Academy` is added automatically during the rebuild —
you don't need to add it yourself. A smaller thumbnail is also generated
automatically, so the photo grid stays fast.

**Photo guidelines:** Aim for high-resolution photos (at least 1500 px wide).
JPG, PNG, and WebP are all supported. There's no max file size, but smaller
files build faster.

## Editing an existing entry

Click the entry in the list. Make changes. Click **Publish**.

To delete: click the entry, then click the **three-dot menu** in the top right →
**Delete entry**.

## Undoing a change

Because every edit is a commit, mistakes can be undone — ask Kiran. He can
restore any past version within a minute. So don't worry about experimenting.

## Things you currently *can't* edit via the admin (yet)

- **About page copy** — currently lives in code
- **Classes page copy** — currently lives in code
- **Home page hero text** — currently lives in code
- **Contact details** (email, address, social links) — currently lives in code

These rarely change, so they're not in the admin yet. If you need any of them
updated, message Kiran.

## Stuck?

- Logged out unexpectedly? Just sign in again.
- See an error after Publish? Wait 2 minutes and refresh — Netlify is rebuilding.
- Something looks wrong on the live site? Take a screenshot and message Kiran.
