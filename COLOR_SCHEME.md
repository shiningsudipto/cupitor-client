# Cupitor Color Scheme Guide

This document explains how to change the application's color scheme easily.

## 🎨 Current Color Scheme

The application uses **three main colors** that can be easily customized:

| Color         | Hex Code  | Usage                                          | OKLCH Value            |
| ------------- | --------- | ---------------------------------------------- | ---------------------- |
| **Primary**   | `#21f3be` | Main brand color, buttons, links, focus states | `oklch(0.85 0.15 166)` |
| **Secondary** | `#af9aff` | Supporting elements, alternate buttons, badges | `oklch(0.72 0.15 285)` |
| **Accent**    | `#ff9356` | Highlights, call-to-action elements, warnings  | `oklch(0.75 0.15 45)`  |
| **Text**      | `#000`    | Primary text color                             | `oklch(0 0 0)`         |

### Color Descriptions:

- **Primary (#21f3be)**: Bright mint/turquoise - Fresh, modern, energetic
- **Secondary (#af9aff)**: Purple/lavender - Creative, sophisticated
- **Accent (#ff9356)**: Orange/coral - Warm, attention-grabbing

## 📝 How to Change Colors

All colors are defined in a **single file**: `app/globals.css`

### Step 1: Open the Color Configuration File

```
app/globals.css
```

### Step 2: Locate the Color Variables (Lines 46-105)

Look for the `:root` section which contains comments like:

```css
:root {
  /* Custom Color Scheme - Easy to change! */
  /* Primary: #21f3be (Mint/Turquoise) */
  /* Secondary: #af9aff (Purple/Lavender) */
  /* Accent: #ff9356 (Orange/Coral) */
  /* Text: #000 (Black) */
```

### Step 3: Update the OKLCH Values

#### For Primary Color:

Replace these lines:

```css
/* Primary: #21f3be - Bright mint/turquoise */
--primary: oklch(0.85 0.15 166); /* #21f3be */
--primary-foreground: oklch(0 0 0); /* Black text on primary */
```

#### For Secondary Color:

Replace these lines:

```css
/* Secondary: #af9aff - Purple/Lavender */
--secondary: oklch(0.72 0.15 285); /* #af9aff */
--secondary-foreground: oklch(0 0 0); /* Black text on secondary */
```

#### For Accent Color:

Replace these lines:

```css
/* Accent: #ff9356 - Orange/Coral */
--accent: oklch(0.75 0.15 45); /* #ff9356 */
--accent-foreground: oklch(0 0 0); /* Black on accent */
```

### Step 4: Update Dark Mode (Optional)

If you're using dark mode, update the `.dark` section (lines 107-151) with adjusted brightness values.

## 🔧 Converting HEX to OKLCH

Use an online converter like:

- [OKLCH Color Picker & Converter](https://oklch.com/)
- [Coloraide Converter](https://facelessuser.github.io/coloraide/colors/)

### OKLCH Format Explained:

```css
oklch(L C H)
```

- **L** (Lightness): 0 (black) to 1 (white)
- **C** (Chroma): 0 (gray) to ~0.4 (vibrant)
- **H** (Hue): 0 to 360 degrees

Example conversions:

- `#21f3be` → `oklch(0.85 0.15 166)` - Turquoise
- `#af9aff` → `oklch(0.72 0.15 285)` - Purple
- `#ff9356` → `oklch(0.75 0.15 45)` - Orange

## 📍 Where Colors Are Used

### Primary Color (`--primary`)

- Main buttons
- Links and navigation highlights
- Focus rings
- Progress bars
- Chart data (chart-1)
- Sidebar active states

### Secondary Color (`--secondary`)

- Secondary buttons
- Alternate UI elements
- Badges and tags
- Chart data (chart-2)
- Sidebar accents

### Accent Color (`--accent`)

- Call-to-action buttons
- Important highlights
- Warning messages (non-destructive)
- Chart data (chart-3)
- Special badges

## 🎯 Quick Change Example

**To change from mint to blue:**

1. Choose your blue (e.g., `#3b82f6` - a nice blue)
2. Convert to OKLCH: `oklch(0.62 0.21 263)`
3. Update in `globals.css`:

```css
/* Primary: #3b82f6 - Blue */
--primary: oklch(0.62 0.21 263);
```

**That's it!** All UI elements using the primary color will update automatically.

## ⚠️ Important Notes

1. **Foreground Colors**: Make sure text on colored backgrounds has sufficient contrast

   - Use black (`oklch(0 0 0)`) on light colors
   - Use white (`oklch(1 0 0)`) on dark colors

2. **Consistency**: Update all three instances of each color:

   - Light mode (`:root`)
   - Dark mode (`.dark`)
   - Charts (`--chart-1`, `--chart-2`, `--chart-3`)

3. **Testing**: After changing colors:
   - Test light and dark modes
   - Check button contrasts
   - Verify badge readability
   - Test focus states

## 🌈 Color Scheme Presets

Here are some ready-to-use color schemes:

### Ocean Theme

```css
--primary: oklch(0.62 0.21 263); /* Blue #3b82f6 */
--secondary: oklch(0.65 0.15 220); /* Cyan #22d3ee */
--accent: oklch(0.75 0.18 85); /* Yellow #fbbf24 */
```

### Sunset Theme

```css
--primary: oklch(0.72 0.22 30); /* Coral #ff6b6b */
--secondary: oklch(0.75 0.18 45); /* Orange #ff9356 */
--accent: oklch(0.82 0.18 95); /* Gold #ffd93d */
```

### Forest Theme

```css
--primary: oklch(0.65 0.18 150); /* Green #10b981 */
--secondary: oklch(0.75 0.15 130); /* Mint #6ee7b7 */
--accent: oklch(0.7 0.2 85); /* Lime #84cc16 */
```

### Grape Theme (Current)

```css
--primary: oklch(0.85 0.15 166); /* Mint #21f3be */
--secondary: oklch(0.72 0.15 285); /* Purple #af9aff */
--accent: oklch(0.75 0.15 45); /* Orange #ff9356 */
```

## 📚 Additional Resources

- [Understanding OKLCH](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Tailwind CSS v4 Theming](https://tailwindcss.com/docs/customizing-colors)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Remember**: All color changes should be made in `app/globals.css` only. The entire application will automatically reflect your changes! 🎨
