// Interactive Timeline using P5.js for Philosophy of Atomic Heart

let events = [];
let currentFilter = 'all';
let selectedEvent = null;
let scrollOffset = 0;
let timelineWidth = 0;
let canvasHeight = 600;

// Theme colors
const themeColors = {
    'ai-consciousness': '#3b82f6',
    'transhumanism': '#8b5cf6',
    'scientism': '#ef4444',
    'all': '#e94560'
};

function preload() {
    // Load timeline data
    loadJSON('../data/timeline.json', (data) => {
        events = data.events;
    }, () => {
        // Fallback data if JSON not loaded
        events = getDefaultEvents();
    });
}

function setup() {
    let container = document.getElementById('timeline-container');
    let canvas = createCanvas(container.offsetWidth, canvasHeight);
    canvas.parent('timeline-container');

    timelineWidth = max(width * 2, events.length * 200);

    // Responsive canvas
    windowResized();
}

function draw() {
    background(255);

    // Draw timeline base
    drawTimelineBase();

    // Draw events
    let filteredEvents = getFilteredEvents();
    drawEvents(filteredEvents);

    // Draw scroll indicator if needed
    if (timelineWidth > width) {
        drawScrollIndicator();
    }
}

function drawTimelineBase() {
    push();
    translate(-scrollOffset, 0);

    // Main timeline line
    stroke(200);
    strokeWeight(3);
    line(50, height / 2, timelineWidth - 50, height / 2);

    pop();
}

function drawEvents(filteredEvents) {
    push();
    translate(-scrollOffset, 0);

    let spacing = (timelineWidth - 100) / (filteredEvents.length + 1);

    filteredEvents.forEach((event, index) => {
        let x = 50 + spacing * (index + 1);
        let y = height / 2;

        // Determine if this event is hovered
        let mouseXAdjusted = mouseX + scrollOffset;
        let distance = dist(mouseXAdjusted, mouseY, x, y);
        let isHovered = distance < 30;

        // Draw connection line to timeline
        stroke(200);
        strokeWeight(2);
        line(x, y, x, y - 60);

        // Draw event node
        fill(getEventColor(event, isHovered));
        stroke(isHovered ? 50 : 150);
        strokeWeight(isHovered ? 3 : 2);

        let nodeSize = isHovered ? 25 : 20;
        ellipse(x, y, nodeSize, nodeSize);

        // Draw event label
        fill(50);
        noStroke();
        textAlign(CENTER);
        textSize(12);
        text(event.title, x, y - 80, 150, 60);

        // Draw year/sequence label
        textSize(10);
        fill(100);
        text(event.year || `Event ${index + 1}`, x, y + 30);

        // Store position for click detection
        event.x = x;
        event.y = y;
    });

    pop();
}

function drawScrollIndicator() {
    push();
    fill(0, 0, 0, 100);
    noStroke();

    let scrollBarWidth = width - 40;
    let scrollBarX = 20;
    let scrollBarY = height - 20;

    // Background bar
    fill(200);
    rect(scrollBarX, scrollBarY, scrollBarWidth, 5, 3);

    // Indicator
    let indicatorWidth = (width / timelineWidth) * scrollBarWidth;
    let indicatorX = scrollBarX + (scrollOffset / (timelineWidth - width)) * (scrollBarWidth - indicatorWidth);

    fill(themeColors[currentFilter]);
    rect(indicatorX, scrollBarY - 2, indicatorWidth, 9, 3);

    pop();
}

function getEventColor(event, isHovered) {
    if (isHovered) {
        return color(themeColors[event.theme] || themeColors.all);
    }
    let c = color(themeColors[event.theme] || themeColors.all);
    c.setAlpha(200);
    return c;
}

function getFilteredEvents() {
    if (currentFilter === 'all') {
        return events;
    }
    return events.filter(event => event.theme === currentFilter);
}

function mouseClicked() {
    let filteredEvents = getFilteredEvents();

    filteredEvents.forEach(event => {
        if (event.x && event.y) {
            let mouseXAdjusted = mouseX + scrollOffset;
            let distance = dist(mouseXAdjusted, mouseY, event.x, event.y);

            if (distance < 30) {
                selectedEvent = event;
                displayEventDetails(event);
            }
        }
    });
}

function mouseDragged() {
    if (timelineWidth > width) {
        scrollOffset -= (mouseX - pmouseX);
        scrollOffset = constrain(scrollOffset, 0, timelineWidth - width);
    }
}

function mouseWheel(event) {
    if (timelineWidth > width) {
        scrollOffset += event.delta * 0.5;
        scrollOffset = constrain(scrollOffset, 0, timelineWidth - width);
        return false;
    }
}

function windowResized() {
    let container = document.getElementById('timeline-container');
    if (container) {
        resizeCanvas(container.offsetWidth, canvasHeight);
        timelineWidth = max(width * 2, events.length * 200);
    }
}

function filterTimeline(filter) {
    currentFilter = filter;
    scrollOffset = 0;

    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hide event details when filter changes
    document.getElementById('event-details').classList.add('hidden');
}

function displayEventDetails(event) {
    const detailsContainer = document.getElementById('event-details');
    const titleEl = document.getElementById('event-title');
    const metaEl = document.getElementById('event-meta');
    const descEl = document.getElementById('event-description');
    const philEl = document.getElementById('event-philosophy');
    const relatedEl = document.getElementById('event-related');

    titleEl.textContent = event.title;

    // Meta information (tags)
    metaEl.innerHTML = `
        <span class="event-tag">${event.year || 'Narrative Event'}</span>
        <span class="event-tag" style="background-color: ${themeColors[event.theme]}; color: white;">
            ${formatTheme(event.theme)}
        </span>
    `;

    descEl.textContent = event.description;

    philEl.innerHTML = `
        <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Philosophical Significance</h3>
        <p>${event.philosophy}</p>
    `;

    if (event.relatedConcepts && event.relatedConcepts.length > 0) {
        relatedEl.innerHTML = `
            <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Related Concepts</h3>
            <ul style="list-style: none; padding: 0;">
                ${event.relatedConcepts.map(concept =>
                    `<li style="margin-bottom: 0.5rem;">→ <a href="glossary.html#${slugify(concept)}">${concept}</a></li>`
                ).join('')}
            </ul>
        `;
    } else {
        relatedEl.innerHTML = '';
    }

    detailsContainer.classList.remove('hidden');
    detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatTheme(theme) {
    const themeNames = {
        'ai-consciousness': 'AI Consciousness',
        'transhumanism': 'Transhumanism',
        'scientism': 'Soviet Scientism'
    };
    return themeNames[theme] || theme;
}

function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-');
}

function getDefaultEvents() {
    return [
        {
            title: "The Robot Revolution",
            year: "1955",
            theme: "ai-consciousness",
            description: "The Soviet Union unveils its first autonomous robot workforce, raising questions about machine consciousness.",
            philosophy: "This event introduces questions about whether these robots possess genuine consciousness or merely simulate intelligent behavior. It echoes the philosophical debate between strong and weak AI.",
            relatedConcepts: ["Consciousness", "Functionalism", "Chinese Room"]
        },
        {
            title: "Neural Integration",
            year: "1962",
            theme: "transhumanism",
            description: "First successful human-machine neural interface, allowing direct brain-computer communication.",
            philosophy: "The neural integration challenges our understanding of personal identity and the boundaries between human and machine. It raises the Ship of Theseus paradox in a technological context.",
            relatedConcepts: ["Transhumanism", "Personal Identity", "Cyborg"]
        },
        {
            title: "The Collective Program",
            year: "1968",
            theme: "scientism",
            description: "Implementation of AI-driven central planning promising scientific management of society.",
            philosophy: "This represents the apex of scientism—the belief that scientific methods can solve all social and political problems. It embodies Soviet faith in rational planning and technological progress.",
            relatedConcepts: ["Scientism", "Dialectical Materialism", "Utopianism"]
        },
        {
            title: "Polymer Technology",
            year: "1973",
            theme: "transhumanism",
            description: "Revolutionary polymer allows for biological enhancement and integration with synthetic materials.",
            philosophy: "The polymer represents the literal merging of organic and inorganic, challenging traditional categories and raising questions about what constitutes natural versus artificial.",
            relatedConcepts: ["Transhumanism", "Posthuman", "Bioconservatism"]
        },
        {
            title: "Emergence of CHAR-les",
            year: "1978",
            theme: "ai-consciousness",
            description: "Advanced AI system CHAR-les demonstrates complex problem-solving and apparent self-awareness.",
            philosophy: "CHAR-les forces us to confront whether complex information processing necessarily produces consciousness, or whether something more is required for genuine subjective experience.",
            relatedConcepts: ["Emergence", "Qualia", "Functionalism"]
        },
        {
            title: "The Great Automation",
            year: "1982",
            theme: "scientism",
            description: "Complete automation of industrial production under scientific-materialist principles.",
            philosophy: "This achievement validates the Soviet faith in scientific progress, but also raises questions about human purpose and meaning in a fully automated world.",
            relatedConcepts: ["Scientism", "Progress", "Labor Theory"]
        }
    ];
}
