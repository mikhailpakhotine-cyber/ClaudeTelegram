# Images Directory

This directory is for storing image assets for the Philosophy of Atomic Heart website.

## Adding Images to the Gallery

1. **Add your image files here** (JPG, PNG, or WebP format recommended)
2. **Recommended specifications:**
   - Minimum size: 600x400px
   - Aspect ratio: 3:2 or 4:3
   - File size: Under 500KB for optimal loading
   - Format: JPG for photos, PNG for graphics with transparency

3. **Update the gallery page:**
   - Open `pages/gallery.html`
   - Find the gallery item you want to update
   - Replace the placeholder `<div class="gallery-image">` with:
     ```html
     <img src="../images/your-image.jpg" alt="Descriptive text"
          style="width: 100%; height: 250px; object-fit: cover;">
     ```

## Image Categories

Organize your images by philosophical theme:

- **AI Consciousness** (🤖): Robots, AI systems, consciousness experiments
- **Transhumanism** (🧠): Human enhancement, cyborgs, polymer technology
- **Soviet Scientism** (⚛️): Scientific facilities, utopian architecture, automation

## Attribution

Ensure all images are either:
- Created by you
- Sourced from public domain
- Used under fair use for educational purposes
- Properly attributed to original creators

Add attribution in the gallery caption or in a separate credits file.

## Example Filenames

Good filename examples:
- `robot-workers-facility.jpg`
- `neural-interface-closeup.png`
- `soviet-research-complex.jpg`
- `polymer-integration-lab.jpg`

Avoid:
- Spaces in filenames
- Special characters (use hyphens instead)
- Very long filenames
