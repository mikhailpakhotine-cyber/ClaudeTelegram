# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Philosophy of Atomic Heart** - A static website project exploring philosophical themes in the game Atomic Heart through interactive storytelling and multimedia presentations. Despite the repository name "ClaudeTelegram", this is an educational humanities project focused on AI consciousness, transhumanism, and Soviet scientism.

**Tech Stack**: HTML, CSS, JavaScript, P5.js (for interactive timeline visualization)

**Target Audience**: Academic researchers

**Deployment**: GitHub Pages

## Project Structure

```
/
├── index.html              # Homepage
├── css/
│   └── style.css          # Main stylesheet with responsive design
├── js/
│   ├── main.js            # Core JavaScript (navigation, animations)
│   ├── timeline.js        # P5.js interactive timeline
│   └── glossary.js        # Glossary search functionality
├── pages/
│   ├── philosophy.html          # Philosophy hub page
│   ├── ai-consciousness.html    # AI consciousness theme page
│   ├── transhumanism.html       # Transhumanism theme page
│   ├── soviet-scientism.html    # Soviet scientism theme page
│   ├── timeline.html            # Interactive timeline with P5.js
│   ├── essays.html              # Academic essays
│   ├── gallery.html             # Visual gallery
│   ├── interviews.html          # Interview content
│   └── glossary.html            # Searchable glossary
├── data/
│   ├── timeline.json      # Timeline events data
│   └── glossary.json      # Glossary terms data
└── images/                # Image assets
```

## Development Commands

```bash
# Serve locally (requires Python 3)
npm run serve
# Or directly:
python3 -m http.server 8000
# Then visit: http://localhost:8000

# Deploy to GitHub Pages
# Just push to the main branch - GitHub Pages will serve from root
git add .
git commit -m "Update content"
git push origin main
```

## Architecture

### Core Components

1. **Static HTML Pages**: All pages are static HTML for optimal GitHub Pages compatibility
2. **Responsive CSS**: Mobile-first design with CSS Grid and Flexbox
3. **P5.js Timeline**: Interactive narrative timeline (`timeline.html` + `timeline.js`)
   - Horizontal scrollable timeline with clickable event nodes
   - Filtering by philosophical theme
   - Dynamic event details display
4. **Glossary Search**: Vanilla JavaScript search functionality (`glossary.html` + `glossary.js`)
   - Real-time search filtering
   - Category-based filtering
   - Cross-referenced terms
5. **Data-Driven Content**: JSON files in `/data` directory for easy content updates

### Navigation Structure

- **Home** → Overview and theme cards
- **Philosophy** → Hub linking to three sub-themes:
  - AI Consciousness
  - Transhumanism
  - Soviet Scientism
- **Timeline** → Interactive P5.js visualization
- **Essays** → Three long-form academic essays
- **Gallery** → Visual content with philosophical annotations
- **Interviews** → Q&A format discussions
- **Glossary** → Searchable philosophical terms

### Key Design Patterns

- **Consistent Layout**: All pages use the same header/footer structure
- **Theme Colors**: Defined in CSS variables for consistency
  - Primary: `#1a1a2e` (dark blue)
  - Secondary: `#16213e` (navy)
  - Accent: `#e94560` (red)
- **Mobile Navigation**: Hamburger menu for responsive design
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## Content Management

### Adding Timeline Events

Edit `/data/timeline.json`:
```json
{
  "title": "Event Name",
  "year": "Year",
  "theme": "ai-consciousness|transhumanism|scientism",
  "description": "Brief description",
  "philosophy": "Philosophical significance",
  "relatedConcepts": ["Term 1", "Term 2"]
}
```

### Adding Glossary Terms

Edit `/data/glossary.json`:
```json
{
  "term": "Term Name",
  "category": "ai-consciousness|transhumanism|scientism|general",
  "definition": "Definition text",
  "relevance": "Relevance to Atomic Heart",
  "related": ["Related Term 1", "Related Term 2"]
}
```

## GitHub Pages Deployment

1. Ensure repository settings have GitHub Pages enabled (Settings → Pages)
2. Set source to "Deploy from branch" → main branch → root directory
3. Push changes to main branch
4. Site will be available at: `https://[username].github.io/ClaudeTelegram/`

## Important Notes

- All internal links use relative paths for GitHub Pages compatibility
- P5.js loaded from CDN (no build step required)
- No backend or database - purely static content
- Images are placeholders (emoji icons) - can be replaced with actual images in `/images` directory
- The site works offline after initial load (except for P5.js CDN)
