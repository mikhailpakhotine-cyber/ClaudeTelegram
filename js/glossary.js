// Glossary functionality for Philosophy of Atomic Heart

let glossaryTerms = [];
let currentCategory = 'all';

// Load glossary data
fetch('../data/glossary.json')
    .then(response => response.json())
    .then(data => {
        glossaryTerms = data.terms;
        renderGlossary();
    })
    .catch(error => {
        console.error('Error loading glossary:', error);
        glossaryTerms = getDefaultGlossary();
        renderGlossary();
    });

// Search functionality
document.getElementById('search-box').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    renderGlossary(searchTerm);
});

// Category filter functionality
document.querySelectorAll('.tag-filter').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.tag-filter').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        renderGlossary();
    });
});

function renderGlossary(searchTerm = '') {
    const container = document.getElementById('glossary-grid');
    const noResults = document.getElementById('no-results');

    let filteredTerms = glossaryTerms;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredTerms = filteredTerms.filter(term => term.category === currentCategory);
    }

    // Filter by search term
    if (searchTerm) {
        filteredTerms = filteredTerms.filter(term =>
            term.term.toLowerCase().includes(searchTerm) ||
            term.definition.toLowerCase().includes(searchTerm) ||
            term.relevance.toLowerCase().includes(searchTerm)
        );
    }

    // Display results or no results message
    if (filteredTerms.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        container.style.display = 'grid';
        noResults.style.display = 'none';

        container.innerHTML = filteredTerms.map(term => createTermHTML(term)).join('');
    }

    // Handle hash navigation
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }
}

function createTermHTML(term) {
    const relatedHTML = term.related && term.related.length > 0
        ? `<div class="related-terms">
            <h4>Related Concepts:</h4>
            <div class="related-links">
                ${term.related.map(rel => `<a href="#${slugify(rel)}" class="related-link">${rel}</a>`).join('')}
            </div>
           </div>`
        : '';

    return `
        <div class="glossary-term" id="${slugify(term.term)}">
            <h3>${term.term}</h3>
            <span class="term-category">${formatCategory(term.category)}</span>
            <div class="term-definition">${term.definition}</div>
            <div class="term-relevance">
                <h4>Relevance to Atomic Heart</h4>
                <p>${term.relevance}</p>
            </div>
            ${relatedHTML}
        </div>
    `;
}

function formatCategory(category) {
    const categories = {
        'ai-consciousness': 'AI Consciousness',
        'transhumanism': 'Transhumanism',
        'scientism': 'Soviet Scientism',
        'general': 'General Philosophy'
    };
    return categories[category] || category;
}

function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function getDefaultGlossary() {
    return [
        {
            term: "Consciousness",
            category: "ai-consciousness",
            definition: "The state of being aware of and able to think about one's own existence, sensations, thoughts, and surroundings. Consciousness includes both awareness and subjective experience.",
            relevance: "Central to evaluating whether Atomic Heart's AI entities are truly conscious or merely simulating consciousness through sophisticated programming.",
            related: ["Qualia", "Hard Problem of Consciousness", "Phenomenal Consciousness"]
        },
        {
            term: "Qualia",
            category: "ai-consciousness",
            definition: "The subjective, qualitative aspects of conscious experience—what it's like to experience something (like the redness of red, or the pain of a headache).",
            relevance: "Key to asking whether robots in Atomic Heart have genuine subjective experiences, or whether they process information without any accompanying 'feel' to their operations.",
            related: ["Consciousness", "Hard Problem of Consciousness"]
        },
        {
            term: "Functionalism",
            category: "ai-consciousness",
            definition: "The theory that mental states are defined by their functional roles—what they do and how they relate to inputs, outputs, and other mental states—rather than by their physical makeup.",
            relevance: "If functionalism is true, Atomic Heart's AIs could be genuinely conscious as long as they implement the right functional organization, regardless of being silicon-based rather than carbon-based.",
            related: ["Multiple Realizability", "Chinese Room", "Substrate Independence"]
        },
        {
            term: "Chinese Room",
            category: "ai-consciousness",
            definition: "John Searle's thought experiment arguing that a system can manipulate symbols according to rules (like translating Chinese) without understanding their meaning, suggesting that computational processing alone doesn't generate understanding or consciousness.",
            relevance: "Challenges the assumption that Atomic Heart's sophisticated AI behaviors necessarily indicate genuine consciousness or understanding.",
            related: ["Functionalism", "Strong AI", "Intentionality"]
        },
        {
            term: "Hard Problem of Consciousness",
            category: "ai-consciousness",
            definition: "The problem of explaining why and how physical processes in the brain give rise to subjective experience—why there is 'something it is like' to be conscious.",
            relevance: "The fundamental challenge in determining whether Atomic Heart's AIs are conscious: even if we understand their information processing, why would that processing be accompanied by subjective experience?",
            related: ["Consciousness", "Qualia", "Explanatory Gap"]
        },
        {
            term: "Transhumanism",
            category: "transhumanism",
            definition: "The intellectual and cultural movement supporting the use of science and technology to enhance human mental and physical characteristics and capacities, potentially leading to a 'posthuman' condition.",
            relevance: "The core philosophy behind Atomic Heart's human enhancement technologies—the belief that we should use technology to transcend our biological limitations.",
            related: ["Posthuman", "Enhancement", "Bioconservatism"]
        },
        {
            term: "Posthuman",
            category: "transhumanism",
            definition: "A hypothetical future being whose basic capacities so radically exceed those of present humans as to be no longer unambiguously human by current standards.",
            relevance: "The potential end state of enhancement in Atomic Heart—beings who have been so radically modified that they transcend the category of 'human.'",
            related: ["Transhumanism", "Species Boundary", "Human Essence"]
        },
        {
            term: "Bioconservatism",
            category: "transhumanism",
            definition: "The position that opposes the use of technology to modify human nature, often emphasizing the value of our natural biological state and warning against the hubris of enhancement.",
            relevance: "Represents the philosophical opposition to Atomic Heart's enhancement technologies, questioning whether technological 'progress' actually improves human life.",
            related: ["Transhumanism", "Giftedness", "Human Nature"]
        },
        {
            term: "Personal Identity",
            category: "transhumanism",
            definition: "The philosophical question of what makes a person the same individual over time, despite physical and psychological changes.",
            relevance: "Critical for evaluating enhancement in Atomic Heart: if someone's biology is extensively modified, are they still the same person? What constitutes continuity of identity?",
            related: ["Ship of Theseus", "Psychological Continuity", "Numerical Identity"]
        },
        {
            term: "Ship of Theseus",
            category: "transhumanism",
            definition: "An ancient paradox: if a ship's parts are gradually replaced until none of the original parts remain, is it still the same ship? Applied to persons: if we gradually replace biological parts with synthetic ones, when (if ever) does someone become a different person?",
            relevance: "Directly applicable to Atomic Heart's gradual human enhancement—at what point does enhancement become replacement of the person?",
            related: ["Personal Identity", "Numerical Identity", "Essentialism"]
        },
        {
            term: "Scientism",
            category: "scientism",
            definition: "The belief that science and the scientific method are the best or only way to render truth about the world and reality, and that scientific knowledge is the most authoritative form of knowledge.",
            relevance: "The ideological foundation of Atomic Heart's alternate Soviet Union—the faith that scientific knowledge and methods can solve all problems, including social and political ones.",
            related: ["Positivism", "Dialectical Materialism", "Empiricism"]
        },
        {
            term: "Dialectical Materialism",
            category: "scientism",
            definition: "The Marxist philosophical framework combining Hegelian dialectics with materialism, holding that reality is material and governed by laws of dialectical development.",
            relevance: "The official philosophy of Atomic Heart's Soviet Union, providing the theoretical justification for scientific planning and technological utopianism.",
            related: ["Scientism", "Historical Materialism", "Marxism"]
        },
        {
            term: "Positivism",
            category: "scientism",
            definition: "The philosophical view that valid knowledge is based on sense experience and can be advanced only through observation and experiment, typically emphasizing the unity of scientific method.",
            relevance: "Underlies Atomic Heart's Soviet approach to knowledge—the belief that all legitimate questions can be answered through scientific investigation.",
            related: ["Scientism", "Empiricism", "Logical Positivism"]
        },
        {
            term: "Utopianism",
            category: "scientism",
            definition: "The belief in or pursuit of an ideal society, often through rational planning and social engineering.",
            relevance: "The goal driving Atomic Heart's technological society—the belief that scientific and technological progress can create a perfect social order.",
            related: ["Scientism", "Progress", "Technocracy"]
        },
        {
            term: "Emergence",
            category: "ai-consciousness",
            definition: "The phenomenon where complex systems exhibit properties and behaviors that their individual components do not possess—'the whole is greater than the sum of its parts.'",
            relevance: "Potentially explains how consciousness could arise in Atomic Heart's complex AI systems—as an emergent property of sufficient computational complexity and integration.",
            related: ["Consciousness", "Complexity", "Systems Theory"]
        },
        {
            term: "Substrate Independence",
            category: "ai-consciousness",
            definition: "The hypothesis that consciousness and mental states don't depend on being implemented in biological neurons, but could be realized in any substrate with the right functional organization.",
            relevance: "If true, consciousness in Atomic Heart could be realized in silicon-based systems just as genuinely as in biological brains.",
            related: ["Functionalism", "Multiple Realizability", "Mind Uploading"]
        }
    ];
}
