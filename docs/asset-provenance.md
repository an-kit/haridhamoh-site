# Haridham Ohio read-only asset provenance inventory

Generated: 2026-09-27

Last authorization update: 2026-09-28

## Scope and method

- This began as a read-only discovery inventory. On 2026-09-27, Ankit authorized a limited asset-intake exception: two direct-owner Haridham Ohio assets may be retained in the repository and four WordPress source files may be fetched only into local scratch space to create review thumbnails. The review-source files and thumbnails are not in the repository, are not deployed, and are not referenced by the site build.
- Haridham Ohio inventory comes from the read-only WordPress media API: 62 attachment records, of which 59 are images.
- `source_url` is WordPress's full attachment URL. It is not a `-<width>x<height>` generated derivative. This proves it is the full WordPress attachment, not necessarily that it is the source camera original before upload.
- HSAPSS candidates come only from the Guru Parampara page. Canadian logo, donation, contact, location, and other Canada-specific assets are excluded.
- HSAPSS URLs are direct `images.ctfassets.net` asset URLs with no `/_next/image` transform path or width/quality query; dimensions are observed in page image metadata. Their content lengths were obtained with HTTP HEAD only.
- “Visual subject unverified” means WordPress supplied no useful alt text/caption and no image bytes were fetched for visual inspection.


## Visual asset sourcing policy (effective 2026-09-27)

- Source: **Ankit-provided direct upload, 2026-09-27** is the approved provenance for the Haridham Ohio logo and homepage banner below. Both are **confirmed Haridham Ohio assets, not HSAPSS Canada**.
- No visual asset from `hsapss.ca` or any non-Haridham-Ohio HSAPSS chapter may be used in this project, including for visual branding, imagery, or structural/layout reference. `hsapss.ca` is reference-only for site structure, never for imagery or branding.
- The six Guru Parampara rows already recorded below are a narrow, explicit historical approval exception: approved by Ankit on 2026-09-27 for potential future use, but not copied, deployed, or referenced by the site in this intake.

## Approved Haridham Ohio direct-upload assets

### `HSAPSSLogo.png` — canonical logo source
- Source: **Ankit-provided direct upload, 2026-09-27**. **Confirmed Haridham Ohio asset, not HSAPSS Canada.**
- Original master described by Ankit: 4932 × 5214 PNG, RGBA.
- Repository intake copy actually received through Telegram: `assets/approved-brand-sources/HSAPSSLogo.approved-direct-upload.received.jpg`, 1210 × 1280 JPEG, 98,295 B, SHA-256 `c3e82aa7ff1a66a6e7f4a8d0a8829a9818c1a2dba2e6df5b91552bb843441298`. It is a rendered delivery copy, not a substitute claim for the 4932 × 5214 PNG master.
- Canonical site-derived working source: `assets/approved-brand-sources/HSAPSSLogo.approved-direct-upload.matte-removed.png`; it removes only the edge-connected near-black JPEG matte introduced in transit.
- Generated browser derivatives: `public/assets/brand/hsapss-logo-header-128.png`, `public/assets/brand/hsapss-logo-header-256.png`, and `app/icon.png` (favicon).
- WordPress `HSAPSS-1.png` is superseded and prohibited from site use.

### `WebSiteMainBanner.png` — prior homepage hero banner
- Source: **Ankit-provided direct upload, 2026-09-27**. **Confirmed Haridham Ohio asset, not HSAPSS Canada.**
- Original master described by Ankit: 1900 × 820 PNG, RGB.
- Repository intake copy actually received through Telegram: `assets/approved-brand-sources/WebSiteMainBanner.approved-direct-upload.received.jpg`, 1280 × 552 JPEG, 48,630 B, SHA-256 `abb4b23a698a66b0ee0dc0f51d5b0217bd9e030c755f6b98a3a19feb0b2dc1ab`. It is a rendered delivery copy, not a substitute claim for the 1900 × 820 PNG master.
- Generated responsive browser derivatives: `public/assets/brand/haridham-ohio-home-hero-640.jpg`, `public/assets/brand/haridham-ohio-home-hero-960.jpg`, and `public/assets/brand/haridham-ohio-home-hero-1280.jpg`.
- Status: superseded as the homepage hero by the explicitly approved DarshanTiming asset below; retained for the Guru Parampara banner.

### `DarshanTiming.wordpress-haridhamoh.2026-09-28.png` — approved permanent homepage hero
- Source: Haridham Ohio WordPress attachment: `https://haridhamoh.org/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-5.45.20%E2%80%AFPM.png`.
- Repository source: `assets/approved-brand-sources/DarshanTiming.wordpress-haridhamoh.2026-09-28.png`, 2562 × 860 PNG, 4,889,004 B.
- Authorization: **Ankit explicitly approved this asset on 2026-09-28 as the permanent replacement for `WebSiteMainBanner` on the homepage.**
- Generated responsive browser derivatives: `public/assets/brand/haridham-ohio-darshan-hero-mobile.jpg`, `public/assets/brand/haridham-ohio-darshan-hero-tablet.jpg`, and `public/assets/brand/haridham-ohio-darshan-hero-desktop.jpg`.
- Deployment: homepage hero via `app/page.tsx`.

### Additional received logo rendition
- `assets/approved-brand-sources/HSAPSSLogo.alternate-preview.received.jpg`, 500 × 529 JPEG, 42,207 B, SHA-256 `d00105f73e2aa2d014762770b1aab722a4eef346f3fc208dd0901e169c33c696`.
- Retained as direct-upload intake trace only. It is an alternate lower-resolution rendered logo rendition, not a canonical source and not a site-referenced asset.

## Haridham Ohio WordPress attachments (59 images)

### 1. `logo.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/logo.png
- Apparent content: Logo (WordPress attachment title; visual subject unverified)
- Dimensions: 156 × 40 px
- File size: 1.2 KiB (1275 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 2. `HSAPSS.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/HSAPSS.png
- Apparent content: HSAPSS (WordPress attachment title; visual subject unverified)
- Dimensions: 1380 × 1459 px
- File size: 837.1 KiB (857148 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 3. `HSAPSS-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/HSAPSS-1.png
- Apparent content: Haridham Ohio/HSAPSS logo attachment; homepage serves a WordPress-generated 125x132 derivative of this attachment.
- Dimensions: 500 × 529 px
- File size: 210.5 KiB (215597 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 4. `HSAPSS-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/HSAPSS-2.png
- Apparent content: HSAPSS (WordPress attachment title; visual subject unverified)
- Dimensions: 150 × 159 px
- File size: 34.7 KiB (35560 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 5. `Banner_Homepage.jpg`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Banner_Homepage.jpg
- Apparent content: Banner_Homepage (WordPress attachment title; visual subject unverified)
- Dimensions: 2500 × 1300 px
- File size: 1.19 MiB (1242640 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 6. `Transparent.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent.png
- Apparent content: Transparent (WordPress attachment title; visual subject unverified)
- Dimensions: 2500 × 180 px
- File size: 28.8 KiB (29443 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 7. `Transparent-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-1.png
- Apparent content: Transparent (WordPress attachment title; visual subject unverified)
- Dimensions: 4167 × 300 px
- File size: 109.8 KiB (112430 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 8. `Transparent-new.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-new.png
- Apparent content: Transparent-new (WordPress attachment title; visual subject unverified)
- Dimensions: 2497 × 300 px
- File size: 75.0 KiB (76812 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 9. `Transparent-new-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-new-1.png
- Apparent content: Transparent-new (WordPress attachment title; visual subject unverified)
- Dimensions: 2445 × 300 px
- File size: 74.9 KiB (76659 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 10. `Transparent-new-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-new-2.png
- Apparent content: Transparent-new (WordPress attachment title; visual subject unverified)
- Dimensions: 2491 × 300 px
- File size: 75.0 KiB (76793 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 11. `Transparent-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-2.png
- Apparent content: Transparent (WordPress attachment title; visual subject unverified)
- Dimensions: 3000 × 310 px
- File size: 78.1 KiB (79935 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 12. `Transparent-3.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-3.png
- Apparent content: Transparent (WordPress attachment title; visual subject unverified)
- Dimensions: 2602 × 310 px
- File size: 76.9 KiB (78793 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 13. `Transparent-4.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Transparent-4.png
- Apparent content: Transparent (WordPress attachment title; visual subject unverified)
- Dimensions: 2500 × 310 px
- File size: 76.6 KiB (78482 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 14. `Banner_Homepage.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Banner_Homepage.png
- Apparent content: Banner_Homepage (WordPress attachment title; visual subject unverified)
- Dimensions: 2500 × 1800 px
- File size: 1.45 MiB (1525333 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 15. `Screenshot-2024-09-26-at-9.30.27 PM.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Screenshot-2024-09-26-at-9.30.27 PM.png
- Apparent content: Screenshot 2024-09-26 at 9.30.27 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 2016 × 1960 px
- File size: 5.06 MiB (5302121 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 16. `Screenshot-2024-09-26-at-9.32.04 PM.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Screenshot-2024-09-26-at-9.32.04 PM.png
- Apparent content: Screenshot 2024-09-26 at 9.32.04 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 1140 × 1374 px
- File size: 2.44 MiB (2561035 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 17. `Screenshot-2024-09-26-at-9.32.04 PM-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Screenshot-2024-09-26-at-9.32.04 PM-1.png
- Apparent content: Screenshot 2024-09-26 at 9.32.04 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 1140 × 1143 px
- File size: 1.45 MiB (1525344 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 18. `Screenshot-2024-09-26-at-9.32.04 PM-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/Screenshot-2024-09-26-at-9.32.04 PM-2.png
- Apparent content: Screenshot 2024-09-26 at 9.32.04 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 1140 × 1103 px
- File size: 1.41 MiB (1477491 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 19. `HSAPSS_Name_FULL.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/HSAPSS_Name_FULL.png
- Apparent content: HSAPSS_Name_FULL (WordPress attachment title; visual subject unverified)
- Dimensions: 2050 × 256 px
- File size: 66.5 KiB (68095 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 20. `HSAPSS_Name_FULL-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/09/HSAPSS_Name_FULL-1.png
- Apparent content: HSAPSS_Name_FULL (WordPress attachment title; visual subject unverified)
- Dimensions: 2576 × 1000 px
- File size: 84.8 KiB (86800 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 21. `footer-pattern-2-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/footer-pattern-2-1.png
- Apparent content: footer-pattern-2 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 547 × 418 px
- File size: 34.6 KiB (35405 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 22. `parampara-bg-image.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/parampara-bg-image.png
- Apparent content: Decorative guru-parampara/temple-arch background observed on the current Haridham Ohio homepage.
- Dimensions: 1600 × 851 px
- File size: 595.3 KiB (609565 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 23. `footer-pattern-2-1-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/footer-pattern-2-1-1.png
- Apparent content: footer-pattern-2 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 547 × 443 px
- File size: 42.5 KiB (43511 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 24. `footer-pattern-2-1-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/footer-pattern-2-1-2.png
- Apparent content: footer-pattern-2 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 547 × 222 px
- File size: 20.9 KiB (21394 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 25. `IMG_3068.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/IMG_3068.png
- Apparent content: IMG_3068 (WordPress attachment title; visual subject unverified)
- Dimensions: 914 × 1280 px
- File size: 2.16 MiB (2266147 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 26. `IMG_0720.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/IMG_0720.png
- Apparent content: IMG_0720 (WordPress attachment title; visual subject unverified)
- Dimensions: 914 × 1280 px
- File size: 1.77 MiB (1851310 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 27. `6D463D2D-507F-4C9F-8DAD-EB7A5109AD86.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/10/6D463D2D-507F-4C9F-8DAD-EB7A5109AD86.png
- Apparent content: 6D463D2D-507F-4C9F-8DAD-EB7A5109AD86 (WordPress attachment title; visual subject unverified)
- Dimensions: 1500 × 2100 px
- File size: 4.73 MiB (4963105 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 28. `977DD8E5-4A1E-4B68-BEF0-E37B95B3A064_4_5005_c.jpeg`
- URL: https://haridhamoh.org/wp-content/uploads/2024/11/977DD8E5-4A1E-4B68-BEF0-E37B95B3A064_4_5005_c.jpeg
- Apparent content: 977DD8E5-4A1E-4B68-BEF0-E37B95B3A064_4_5005_c (WordPress attachment title; visual subject unverified)
- Dimensions: 360 × 502 px
- File size: 70.7 KiB (72363 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 29. `5.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/5.png
- Apparent content: 5 (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 468 px
- File size: 170.6 KiB (174662 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 30. `6.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/6.png
- Apparent content: 6 (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 468 px
- File size: 170.7 KiB (174821 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 31. `5-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/5-1.png
- Apparent content: 5 (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 315 px
- File size: 163.5 KiB (167469 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 32. `6-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/6-1.png
- Apparent content: 6 (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 314 px
- File size: 163.3 KiB (167185 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 33. `Blank_1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/Blank_1.png
- Apparent content: Blank_1 (WordPress attachment title; visual subject unverified)
- Dimensions: 2337 × 1085 px
- File size: 187.4 KiB (191860 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 34. `1-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/1-1.png
- Apparent content: 1 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 315 px
- File size: 175.1 KiB (179288 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 35. `2-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/2-1.png
- Apparent content: 2 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 314 px
- File size: 158.1 KiB (161864 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 36. `3-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/3-1.png
- Apparent content: 3 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 315 px
- File size: 163.0 KiB (166928 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 37. `4-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/4-1.png
- Apparent content: 4 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 315 px
- File size: 164.8 KiB (168704 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 38. `1-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/1-2.png
- Apparent content: 1 (2) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 309 px
- File size: 174.5 KiB (178680 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 39. `1-3.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/1-3.png
- Apparent content: 1 (3) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 314 px
- File size: 175.0 KiB (179206 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 40. `3-1-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/3-1-1.png
- Apparent content: 3 (1) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 315 px
- File size: 163.0 KiB (166928 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 41. `4-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/4-2.png
- Apparent content: 4 (2) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 311 px
- File size: 164.3 KiB (168259 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 42. `4-3.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/4-3.png
- Apparent content: 4 (3) (WordPress attachment title; visual subject unverified)
- Dimensions: 350 × 313 px
- File size: 164.6 KiB (168520 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 43. `parampara-bg-image1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/parampara-bg-image1.png
- Apparent content: parampara-bg-image1 (WordPress attachment title; visual subject unverified)
- Dimensions: 1600 × 235 px
- File size: 183.5 KiB (187926 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 44. `5-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/5-2.png
- Apparent content: One of the small homepage images in the Inspirer section; visual subject is not labeled in WordPress metadata.
- Dimensions: 311 × 315 px
- File size: 166.0 KiB (169938 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 45. `6-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/6-2.png
- Apparent content: One of the small homepage images in the Inspirer section; visual subject is not labeled in WordPress metadata.
- Dimensions: 311 × 314 px
- File size: 166.3 KiB (170273 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 46. `5-3.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/5-3.png
- Apparent content: 5 (WordPress attachment title; visual subject unverified)
- Dimensions: 311 × 315 px
- File size: 166.0 KiB (169938 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 47. `6-3.png`
- URL: https://haridhamoh.org/wp-content/uploads/2024/12/6-3.png
- Apparent content: 6 (WordPress attachment title; visual subject unverified)
- Dimensions: 311 × 314 px
- File size: 166.3 KiB (170273 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 48. `clock-svgrepo-com.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/clock-svgrepo-com.png
- Apparent content: clock-svgrepo-com (WordPress attachment title; visual subject unverified)
- Dimensions: 1024 × 1024 px
- File size: 70.7 KiB (72442 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 49. `recent-svgrepo-com.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/recent-svgrepo-com.png
- Apparent content: recent-svgrepo-com (WordPress attachment title; visual subject unverified)
- Dimensions: 1024 × 1024 px
- File size: 33.7 KiB (34529 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 50. `location-svgrepo-com.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/location-svgrepo-com.png
- Apparent content: location-svgrepo-com (WordPress attachment title; visual subject unverified)
- Dimensions: 1024 × 1024 px
- File size: 33.7 KiB (34499 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 51. `calendar-and-clock-time-administration-and-organization-tools-symbol-svgrepo-com.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/calendar-and-clock-time-administration-and-organization-tools-symbol-svgrepo-com.png
- Apparent content: calendar-and-clock-time-administration-and-organization-tools-symbol-svgrepo-com (WordPress attachment title; visual subject unverified)
- Dimensions: 1024 × 1024 px
- File size: 55.3 KiB (56577 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 52. `destination-svgrepo-com.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/destination-svgrepo-com.png
- Apparent content: destination-svgrepo-com (WordPress attachment title; visual subject unverified)
- Dimensions: 1024 × 1024 px
- File size: 35.4 KiB (36255 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 53. `Screenshot-2025-02-05-at-5.45.20 PM.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-5.45.20 PM.png
- Apparent content: Homepage figure near the Thakorji Darshan Timing section; visual subject not labeled in WordPress metadata.
- Dimensions: 2562 × 860 px
- File size: 4.66 MiB (4889004 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 54. `Screenshot-2025-02-05-at-5.45.20 PM-1.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-5.45.20 PM-1.png
- Apparent content: Screenshot 2025-02-05 at 5.45.20 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 2562 × 860 px
- File size: 4.66 MiB (4889004 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 55. `Screenshot-2025-02-05-at-5.45.20 PM-2.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-5.45.20 PM-2.png
- Apparent content: Screenshot 2025-02-05 at 5.45.20 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 2562 × 860 px
- File size: 4.66 MiB (4889004 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 56. `Screenshot-2025-02-05-at-5.45.20 PM-3.png`
- URL: https://haridhamoh.org/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-5.45.20 PM-3.png
- Apparent content: Screenshot 2025-02-05 at 5.45.20 PM (WordPress attachment title; visual subject unverified)
- Dimensions: 2562 × 860 px
- File size: 4.66 MiB (4889004 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 57. `da704a49-0528-4e22-aed0-3e60679a360b.jpg`
- URL: https://haridhamoh.org/wp-content/uploads/2025/08/da704a49-0528-4e22-aed0-3e60679a360b.jpg
- Apparent content: da704a49-0528-4e22-aed0-3e60679a360b (WordPress attachment title; visual subject unverified)
- Dimensions: 1142 × 1600 px
- File size: 322.8 KiB (330543 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 58. `PHOTO-2025-08-12-21-26-29.jpg`
- URL: https://haridhamoh.org/wp-content/uploads/2025/08/PHOTO-2025-08-12-21-26-29.jpg
- Apparent content: PHOTO-2025-08-12-21-26-29 (WordPress attachment title; visual subject unverified)
- Dimensions: 989 × 1280 px
- File size: 126.5 KiB (129524 B)
- Source form: original attachment URL from WordPress REST API (full size)

### 59. `E1133A5A-C573-4B52-83D2-49782CF99CD6.jpeg`
- URL: https://haridhamoh.org/wp-content/uploads/2026/09/E1133A5A-C573-4B52-83D2-49782CF99CD6.jpeg
- Apparent content: Current homepage event image; attachment has no descriptive metadata.
- Dimensions: 1024 × 683 px
- File size: 90.0 KiB (92164 B)
- Source form: original attachment URL from WordPress REST API (full size)

## HSAPSS Guru Parampara candidates only (6 images)

### 1. `sn.png`
- URL: https://images.ctfassets.net/4enkfnbaka5a/2HJsqTBW1AgxkQpVc3zbBN/78f9c9dd5bab44cf0a5d744e80470e04/sn.png
- Apparent content: Bhagwan Shree Swaminarayan (thumbnail-sahajanandswami)
- Dimensions: 815 × 940 px
- File size: 215.3 KiB (220485 B)
- Source form: Direct Contentful asset URL; no `/_next/image` optimizer path or transform parameters. Treat as the site-served source asset, not as a Next.js optimized render.
- Approval: **Approved by Ankit on 2026-09-27 as the documented historical exception; pending a later step, not copied, deployed, or referenced by the site.**

### 2. `gs.png`
- URL: https://images.ctfassets.net/4enkfnbaka5a/2Ui0UxChCFd50oeLHeeglk/4be7b6a3f9d99e79fda357a0f4caae11/gs.png
- Apparent content: Aksharmurti Gunatitanand Swamiji (thumbnail-gunatitswami)
- Dimensions: 815 × 940 px
- File size: 184.4 KiB (188868 B)
- Source form: Direct Contentful asset URL; no `/_next/image` optimizer path or transform parameters. Treat as the site-served source asset, not as a Next.js optimized render.
- Approval: **Approved by Ankit on 2026-09-27 as the documented historical exception; pending a later step, not copied, deployed, or referenced by the site.**

### 3. `sm.png`
- URL: https://images.ctfassets.net/4enkfnbaka5a/1i1SbGUzIyFAt8QCzSYP1H/70f5058c5c764f9a331e45c064f2a4f8/sm.png
- Apparent content: Brahmaswarup Shastriji Maharaj (thumbnail-shastijimaharaj)
- Dimensions: 815 × 940 px
- File size: 174.0 KiB (178145 B)
- Source form: Direct Contentful asset URL; no `/_next/image` optimizer path or transform parameters. Treat as the site-served source asset, not as a Next.js optimized render.
- Approval: **Approved by Ankit on 2026-09-27 as the documented historical exception; pending a later step, not copied, deployed, or referenced by the site.**

### 4. `ym.png`
- URL: https://images.ctfassets.net/4enkfnbaka5a/395pYRmoKqgMGdzx06Hkii/56390355027c0b2519ef8222aaeda9df/ym.png
- Apparent content: Brahmaswarup Yogiji Maharaj (thumbnail-yogijimaharaj)
- Dimensions: 815 × 940 px
- File size: 177.4 KiB (181659 B)
- Source form: Direct Contentful asset URL; no `/_next/image` optimizer path or transform parameters. Treat as the site-served source asset, not as a Next.js optimized render.
- Approval: **Approved by Ankit on 2026-09-27 as the documented historical exception; pending a later step, not copied, deployed, or referenced by the site.**

### 5. `hsm.png`
- URL: https://images.ctfassets.net/4enkfnbaka5a/6Cyjph5IbSg0DkOIXFxFyP/29f8ff4a88136049b02cb71cf3224525/hsm.png
- Apparent content: Brahmaswarup Hariprasadswamiji Maharaj (thumbnail-hariprasadswamijimaharaj)
- Dimensions: 815 × 940 px
- File size: 177.7 KiB (181978 B)
- Source form: Direct Contentful asset URL; no `/_next/image` optimizer path or transform parameters. Treat as the site-served source asset, not as a Next.js optimized render.
- Approval: **Approved by Ankit on 2026-09-27 as the documented historical exception; pending a later step, not copied, deployed, or referenced by the site.**

### 6. `psm.png`
- URL: https://images.ctfassets.net/4enkfnbaka5a/7j95e6g9wC2rH01WQqOl2m/c4d9ad86113bc6dec86137d3698ae327/psm.png
- Apparent content: Pragat Guruhari P. P. Premswaroop Swamiji Maharaj (thumbnail-premswamijimaharaj)
- Dimensions: 815 × 940 px
- File size: 177.3 KiB (181569 B)
- Source form: Direct Contentful asset URL; no `/_next/image` optimizer path or transform parameters. Treat as the site-served source asset, not as a Next.js optimized render.
- Approval: **Approved by Ankit on 2026-09-27 as the documented historical exception; pending a later step, not copied, deployed, or referenced by the site.**

### Responsive derivative verification (2026-09-28)

- The six direct Contentful delivery URLs above were re-fetched without transform parameters and with `?w=1600`; each response remained 815 × 940 px. No higher-resolution version of these same six assets was available through those recorded Contentful delivery IDs.
- The HSAPSS candidate page probes at `/guru-parampara` and `/guruparampara` returned 404.
- The site uses local 320 × 369 px and 640 × 738 px JPEG derivatives made from the approved 815 × 940 px masters. These are downscales only, not upscales. CSS caps portrait display at 310 CSS px; `srcSet` offers 320w and 640w sources.

## Explicit exclusions

- `https://hsapss.ca/images/hsapss-canada-full-white.svg` and the `_next/static/media/hsapss-canada-full...` logo were observed but excluded as HSAPSS Canada branding.
- Donation, Contact, Centers, address/location, and any other Canada-specific images/content were not inventoried as candidates.

## Review gate

Direct-upload logo/banner derivatives are retained and referenced only as documented above. The six historical Guru Parampara candidates are approved for potential future use but remain unimported, undeployed, and unreferenced. All other WordPress assets remain pending explicit visual approval; the four review thumbnails below are review-only scratch artifacts.

## WordPress review-only thumbnail batch (2026-09-27)

- Location: `/Users/4155ivy/.hermes/cache/scratch/haridhamoh-wordpress-review-thumbnails/` (not a repository directory, not deployed).
- These are intentionally small review derivatives. Their downloaded source files remain in the same scratch directory only to support review provenance and are not copied to `public/` or other site content.
- `darshan-timing-review.jpg` — source `darshan-timing`; source URL: https://haridhamoh.org/wp-content/uploads/2025/02/Screenshot-2025-02-05-at-5.45.20%E2%80%AFPM.png; downloaded source 2562 × 860 px, 4889004 B (image/png); thumbnail 400 × 134 px, 18950 B; **pending Ankit visual approval**.
- `parampara-background-review.jpg` — source `parampara-background`; source URL: https://haridhamoh.org/wp-content/uploads/2024/10/parampara-bg-image.png; downloaded source 1600 × 851 px, 609565 B (image/png); thumbnail 400 × 213 px, 11120 B; **pending Ankit visual approval**.
- `inspirer-5-2-review.jpg` — source `inspirer-5-2`; source URL: https://haridhamoh.org/wp-content/uploads/2024/12/5-2.png; downloaded source 311 × 315 px, 169938 B (image/png); thumbnail 311 × 315 px, 28945 B; **pending Ankit visual approval**.
- `inspirer-6-2-review.jpg` — source `inspirer-6-2`; source URL: https://haridhamoh.org/wp-content/uploads/2024/12/6-2.png; downloaded source 311 × 314 px, 170273 B (image/png); thumbnail 311 × 314 px, 29150 B; **pending Ankit visual approval**.