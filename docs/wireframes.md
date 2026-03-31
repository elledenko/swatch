# Swatch — Wireframes

## 1. Landing Page / Upload (/)

```
+----------------------------------------------------------+
|  SWATCH                                    [Login]       |
+----------------------------------------------------------+
|                                                          |
|              Upload an image.                            |
|              Find your colors.                           |
|                                                          |
|         +-----------------------------+                  |
|         |                             |                  |
|         |    Drop an image here       |                  |
|         |    or click to browse       |                  |
|         |                             |                  |
|         +-----------------------------+                  |
|                                                          |
+----------------------------------------------------------+
```

Clean, centered. Upload zone is the hero. Bold headline. Joyful but not cluttered.

## 2. Palette Results (same page, after upload)

```
+----------------------------------------------------------+
|  SWATCH                           [Save Palette] [Login] |
+----------------------------------------------------------+
|                                                          |
|  +---------------+   YOUR PALETTE                        |
|  |               |                                       |
|  |  [uploaded    |   +------+ +------+ +------+ +------+ |
|  |   image       |   |      | |      | |      | |      | |
|  |   preview]    |   | #4A6 | | #8B2 | | #D4A | | #2C3 | |
|  |               |   |      | |      | |      | |      | |
|  +---------------+   +--+---+ +--+---+ +--+---+ +--+---+ |
|                        |        |        |        |      |
|  - - - - - - - - - - - - - - - - - - - - - - - - - - -  |
|                                                          |
|  COLOR 1: #4A6741                                        |
|  +-------------+-------------+-------------+            |
|  | Sherwin-     | Benjamin    | Behr         |            |
|  | Williams     | Moore       |              |            |
|  |              |             |              |            |
|  | SW 6469      | HC-122      | S-H-460      |            |
|  | Greenfield   | Tavern Green| Greener Grass|            |
|  +-------------+-------------+-------------+            |
|  | PPG          | Valspar     | Pantone      |            |
|  |              |             |              |            |
|  | PPG1130-7    | 5007-4C     | 18-0117 TCX  |            |
|  | Shady Knoll  | Lush Green  | Kale         |            |
|  +-------------+-------------+-------------+            |
|                                                          |
|  COLOR 2: #8B2500         ...                            |
|                                                          |
+----------------------------------------------------------+
```

Image thumbnail on the left, extracted color swatches across the top. Click/scroll any color to see its brand matches in a card grid below.

## 3. Login Page (/login)

```
+----------------------------------------------------------+
|  SWATCH                                                  |
+----------------------------------------------------------+
|                                                          |
|              Welcome back.                               |
|                                                          |
|         +-----------------------------+                  |
|         |  Email                      |                  |
|         +-----------------------------+                  |
|         |  Password                   |                  |
|         +-----------------------------+                  |
|         |        [Sign In]            |                  |
|         |                             |                  |
|         |  Don't have an account?     |                  |
|         |  Sign up                    |                  |
|         +-----------------------------+                  |
|                                                          |
+----------------------------------------------------------+
```

## 4. Dashboard / Saved Palettes (/dashboard)

```
+----------------------------------------------------------+
|  SWATCH                              [+ New] [Logout]    |
+----------------------------------------------------------+
|                                                          |
|  Your Palettes                                           |
|                                                          |
|  +------------------+  +------------------+              |
|  | +--+--+--+--+--+ |  | +--+--+--+--+--+ |              |
|  | |  |  |  |  |  | |  | |  |  |  |  |  | |              |
|  | +--+--+--+--+--+ |  | +--+--+--+--+--+ |              |
|  | Living Room       |  | Kitchen Reno     |              |
|  | Mar 31, 2026      |  | Mar 30, 2026     |              |
|  +------------------+  +------------------+              |
|                                                          |
+----------------------------------------------------------+
```

Grid of saved palette cards. Each card shows the color strip, palette name, date. Click to expand and see brand matches.
