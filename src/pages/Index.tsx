import React, { useState, useEffect, useRef } from 'react';
import { Bell, HelpCircle, Search, Upload, FileText, Brain, Zap, Eye, BookOpen, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Enhanced Data Model: The Engine's Fuel
const concepts = [
  { id: 'c1', name: 'Special Relativity', type: 'Theory', description: 'Einstein\'s theory describing space-time as relative to the observer\'s frame of reference.' },
  { id: 'c2', name: 'Albert Einstein', type: 'Person', description: 'German theoretical physicist who developed the theory of relativity.' },
  { id: 'c3', name: 'Speed of Light', type: 'Theory', description: 'The constant speed at which light travels in a vacuum, approximately 299,792,458 m/s.' },
  { id: 'c4', name: 'Time Dilation', type: 'Theory', description: 'The slowing of time as observed by one reference frame compared to another.' },
  { id: 'c5', name: 'Mass-Energy Equivalence', type: 'Theory', description: 'The principle that mass and energy are interchangeable, expressed as E=mc².' },
  { id: 'c6', name: 'Isaac Newton', type: 'Person', description: 'English mathematician and physicist who formulated the laws of motion and universal gravitation.' },
  { id: 'c7', name: 'Universal Gravitation', type: 'Theory', description: 'Newton\'s law describing the gravitational attraction between masses.' },
  { id: 'c8', name: 'Laws of Motion', type: 'Theory', description: 'Three fundamental laws describing the relationship between forces and motion.' },
  { id: 'c9', name: 'Calculus', type: 'Theory', description: 'Mathematical framework for analyzing continuous change and motion.' },
  { id: 'c10', name: 'Classical Mechanics', type: 'Theory', description: 'Newtonian framework describing the motion of macroscopic objects.' },
  { id: 'c11', name: 'Thomas Kuhn', type: 'Person', description: 'American philosopher of science who introduced the concept of paradigm shifts.' },
  { id: 'c12', name: 'Paradigm Shifts', type: 'Theory', description: 'Revolutionary changes in scientific worldviews and methodologies.' },
  { id: 'c13', name: 'Normal Science', type: 'Theory', description: 'Research conducted within established scientific paradigms.' },
  { id: 'c14', name: 'Scientific Revolutions', type: 'Event', description: 'Periods of upheaval in scientific thought when paradigms change.' },
  { id: 'c15', name: 'René Descartes', type: 'Person', description: 'French philosopher who developed methodical doubt and mind-body dualism.' },
  { id: 'c16', name: 'Cogito Ergo Sum', type: 'Theory', description: 'Descartes\' foundational principle: "I think, therefore I am."' },
  { id: 'c17', name: 'Mind-Body Dualism', type: 'Theory', description: 'The view that mind and matter are distinct substances.' },
  { id: 'c18', name: 'Methodical Doubt', type: 'Theory', description: 'Systematic skepticism used to establish certain knowledge.' },
  { id: 'c19', name: 'Werner Heisenberg', type: 'Person', description: 'German physicist who formulated the uncertainty principle.' },
  { id: 'c20', name: 'Uncertainty Principle', type: 'Theory', description: 'Fundamental limit to simultaneously knowing certain pairs of properties.' },
  { id: 'c21', name: 'Wave-Particle Duality', type: 'Theory', description: 'Quantum objects exhibit both wave and particle properties.' },
  { id: 'c22', name: 'Quantum Mechanics', type: 'Theory', description: 'Theory describing the behavior of matter and energy at atomic scales.' },
  { id: 'c23', name: 'Charles Darwin', type: 'Person', description: 'English naturalist who proposed the theory of evolution by natural selection.' },
  { id: 'c24', name: 'Natural Selection', type: 'Theory', description: 'Mechanism of evolution where favorable traits increase survival and reproduction.' },
  { id: 'c25', name: 'Evolution', type: 'Theory', description: 'The change in heritable traits of populations over successive generations.' },
  { id: 'c26', name: 'Common Descent', type: 'Theory', description: 'All species descended from common ancestors through evolutionary processes.' },
  { id: 'c27', name: 'James Watson', type: 'Person', description: 'American molecular biologist who co-discovered the structure of DNA.' },
  { id: 'c28', name: 'DNA Structure', type: 'Theory', description: 'The double helix structure of deoxyribonucleic acid.' },
  { id: 'c29', name: 'Genetic Code', type: 'Theory', description: 'The set of rules by which genetic information is translated into proteins.' },
  { id: 'c30', name: 'Molecular Biology', type: 'Theory', description: 'Study of biology at the molecular level, particularly proteins and nucleic acids.' },
  { id: 'c31', name: 'Douglas Hofstadter', type: 'Person', description: 'American cognitive scientist who explored consciousness and self-reference.' },
  { id: 'c32', name: 'Strange Loops', type: 'Theory', description: 'Self-referential systems that create hierarchical paradoxes.' },
  { id: 'c33', name: 'Self-Reference', type: 'Theory', description: 'Systems or statements that refer to themselves.' },
  { id: 'c34', name: 'Emergent Consciousness', type: 'Theory', description: 'Consciousness arising from complex interactions of simpler components.' },
  { id: 'c35', name: 'Martin Heidegger', type: 'Person', description: 'German philosopher who explored the nature of Being and human existence.' },
  { id: 'c36', name: 'Dasein', type: 'Theory', description: 'Heidegger\'s term for human existence as "being-in-the-world."' },
  { id: 'c37', name: 'Being-in-the-World', type: 'Theory', description: 'Human existence as fundamentally engaged with and embedded in the world.' },
  { id: 'c38', name: 'Temporality', type: 'Theory', description: 'The fundamental structure of human existence through past, present, and future.' },
  { id: 'c39', name: 'David Chalmers', type: 'Person', description: 'Australian philosopher who formulated the hard problem of consciousness.' },
  { id: 'c40', name: 'Hard Problem of Consciousness', type: 'Theory', description: 'The difficulty of explaining why subjective experience exists at all.' }
];

const mockDocuments = [
  {
    id: 'd1',
    title: "On the Electrodynamics of Moving Bodies",
    author: "A. Einstein",
    date: "1905",
    type: "Research Paper",
    summary: "Introduction of special relativity theory, revolutionizing our understanding of space and time.",
    content: `This paper introduces the Special Relativity theory, fundamentally altering our conception of space and time. The principle of relativity states that the laws of physics are identical in all inertial reference frames. This work demonstrates that the Speed of Light in vacuum is constant for all observers, regardless of their motion or the motion of the light source.

The implications are profound: Time Dilation occurs when objects move at high velocities relative to an observer. Length contraction becomes apparent as objects approach the speed of light. The famous Mass-Energy Equivalence E=mc² emerges naturally from these principles.

These concepts challenge our intuitive understanding of reality, suggesting that space and time are not absolute but relative to the observer's frame of reference. The work laid the foundation for modern physics and our understanding of the universe at both cosmic and quantum scales.

The mathematical framework presented here would later influence countless scientific discoveries and technological innovations, from particle accelerators to GPS satellites.`,
    relatedDocs: ['d2', 'd3', 'd5'],
    conceptsInDoc: [
      { conceptId: 'c1', prominence: 1.0 },
      { conceptId: 'c2', prominence: 0.9 },
      { conceptId: 'c3', prominence: 0.8 },
      { conceptId: 'c4', prominence: 0.7 },
      { conceptId: 'c5', prominence: 0.8 }
    ],
    generatedInsights: [
      "Einstein's relativistic framework directly contradicts Newton's absolute space-time assumptions, challenging Classical Mechanics.",
      "The constancy of light speed suggests a fundamental limit to information transfer in the universe."
    ]
  },
  {
    id: 'd2',
    title: "Principia Mathematica",
    author: "Isaac Newton",
    date: "1687",
    type: "Foundational Text",
    summary: "Mathematical principles of natural philosophy, establishing the laws of motion and universal gravitation.",
    content: `This foundational work establishes the mathematical framework for Classical Mechanics. The three Laws of Motion form the cornerstone of physics: objects at rest remain at rest unless acted upon by a force; force equals mass times acceleration; for every action there is an equal and opposite reaction.

Universal Gravitation reveals that every particle attracts every other particle with a force proportional to their masses and inversely proportional to the square of the distance between them. This elegant principle explains both terrestrial phenomena and celestial mechanics.

The mathematical tools developed here—differential and integral Calculus—provide the language for describing continuous change and motion. These methods would become essential for all subsequent scientific advancement.

The work demonstrates that the same physical laws governing falling apples also govern planetary orbits, unifying terrestrial and celestial mechanics under a single theoretical framework.`,
    relatedDocs: ['d1', 'd4', 'd6'],
    conceptsInDoc: [
      { conceptId: 'c6', prominence: 1.0 },
      { conceptId: 'c8', prominence: 0.9 },
      { conceptId: 'c7', prominence: 0.8 },
      { conceptId: 'c9', prominence: 0.7 },
      { conceptId: 'c10', prominence: 0.9 }
    ],
    generatedInsights: [
      "Newton's deterministic universe suggests predictability, yet Quantum Mechanics introduces fundamental uncertainty.",
      "The mathematical tools Newton created became the foundation for describing all natural phenomena."
    ]
  },
  {
    id: 'd3',
    title: "The Structure of Scientific Revolutions",
    author: "Thomas Kuhn",
    date: "1962",
    type: "Philosophy of Science",
    summary: "Analysis of how scientific paradigms shift, introducing the concept of revolutionary science.",
    content: `This work fundamentally changed how we understand scientific progress. Rather than steady accumulation of knowledge, science advances through Paradigm Shifts—revolutionary periods where entire worldviews are replaced.

Normal Science operates within established paradigms, solving puzzles according to accepted rules. Anomalies accumulate when observations don't fit the current paradigm. Crisis emerges when these anomalies become too numerous or significant to ignore.

Scientific Revolutions occur when a new paradigm emerges that better explains the anomalies. The shift is not merely logical but involves a conversion experience, as scientists must abandon familiar concepts and adopt new ways of seeing the world.

Examples include the shift from Ptolemaic to Copernican astronomy, from Newtonian to Einsteinian physics, and from miasma theory to germ theory in medicine. These transitions involve incommensurable worldviews that cannot be directly compared.`,
    relatedDocs: ['d1', 'd2', 'd7', 'd8'],
    conceptsInDoc: [
      { conceptId: 'c11', prominence: 1.0 },
      { conceptId: 'c12', prominence: 0.9 },
      { conceptId: 'c13', prominence: 0.8 },
      { conceptId: 'c14', prominence: 0.8 }
    ],
    generatedInsights: [
      "Kuhn's paradigm theory suggests that scientific truth is contextual rather than absolute.",
      "The resistance to Paradigm Shifts reveals the psychological and social dimensions of scientific knowledge."
    ]
  },
  {
    id: 'd4',
    title: "Meditations on First Philosophy",
    author: "René Descartes",
    date: "1641",
    type: "Philosophy",
    summary: "Systematic doubt leading to the foundation of knowledge in the certainty of the thinking self.",
    content: `Through Methodical Doubt, this work seeks to establish certain knowledge. By doubting everything that can be doubted—sensory experience, mathematical truths, even the external world—we arrive at one indubitable fact: Cogito Ergo Sum.

This cogito provides the foundation for rebuilding knowledge. The thinking self becomes the starting point for establishing the existence of God through ontological and causal arguments, and through God's goodness, the reliability of clear and distinct perceptions.

The Mind-Body Dualism emerges as a central doctrine: mind and matter are distinct substances with different essential properties. Mind is thinking, unextended substance; matter is extended, non-thinking substance.

This framework establishes the mathematical description of nature as fundamental, since mathematical properties are clear and distinct, while sensory qualities are subjective and unreliable. The mechanistic worldview emerges from this philosophical foundation.`,
    relatedDocs: ['d2', 'd5', 'd9'],
    conceptsInDoc: [
      { conceptId: 'c15', prominence: 1.0 },
      { conceptId: 'c16', prominence: 0.9 },
      { conceptId: 'c17', prominence: 0.8 },
      { conceptId: 'c18', prominence: 0.7 }
    ],
    generatedInsights: [
      "Cartesian Mind-Body Dualism creates the Hard Problem of Consciousness: how does immaterial mind interact with material body?",
      "The emphasis on mathematical description of nature laid groundwork for scientific revolution."
    ]
  },
  {
    id: 'd5',
    title: "Quantum Theory Cannot Be Consistently Interpreted",
    author: "W. Heisenberg",
    date: "1958",
    type: "Research Paper",
    summary: "Exploration of the interpretational challenges in quantum mechanics and the uncertainty principle.",
    content: `Quantum Mechanics presents fundamental challenges to classical notions of reality. The Uncertainty Principle reveals that certain pairs of physical properties cannot be simultaneously measured with arbitrary precision. This is not merely a limitation of measurement but a fundamental feature of nature.

The Wave-Particle Duality demonstrates that quantum objects exhibit properties of both waves and particles, depending on the experimental setup. The act of measurement itself affects the system being measured, introducing an irreducible observer effect.

Multiple interpretations attempt to make sense of quantum phenomena: Copenhagen interpretation emphasizes the role of measurement; many-worlds interpretation suggests all possibilities occur in parallel universes; hidden variable theories propose underlying deterministic mechanisms.

The measurement problem asks: when and how does the quantum superposition collapse into definite states? This question touches on fundamental issues about the nature of reality, consciousness, and the role of observation in physics.`,
    relatedDocs: ['d1', 'd4', 'd10'],
    conceptsInDoc: [
      { conceptId: 'c19', prominence: 1.0 },
      { conceptId: 'c20', prominence: 0.9 },
      { conceptId: 'c21', prominence: 0.8 },
      { conceptId: 'c22', prominence: 0.9 }
    ],
    generatedInsights: [
      "Quantum Mechanics suggests reality is fundamentally probabilistic, challenging deterministic worldviews.",
      "The measurement problem indicates that consciousness might play a fundamental role in physical reality."
    ]
  },
  {
    id: 'd6',
    title: "The Origin of Species",
    author: "Charles Darwin",
    date: "1859",
    type: "Scientific Theory",
    summary: "Theory of evolution by natural selection, explaining the diversity and development of life.",
    content: `This work presents compelling evidence for Evolution through Natural Selection. Variation exists within populations; more offspring are produced than can survive; those with favorable variations are more likely to survive and reproduce.

The struggle for existence creates selective pressure that gradually modifies species over generations. Favorable characteristics become more common while disadvantageous traits disappear. This process, given sufficient time, can account for the complexity and diversity of life.

Evidence comes from multiple sources: geographic distribution of species, embryological similarities, vestigial organs, and the fossil record. The branching tree of life shows Common Descent from earlier forms.

The theory challenges the idea of fixed species and design in nature, suggesting instead that complexity can emerge from simple processes operating over vast timescales. This naturalistic explanation of life's diversity had profound implications for understanding humanity's place in nature.`,
    relatedDocs: ['d7', 'd11', 'd12'],
    conceptsInDoc: [
      { conceptId: 'c23', prominence: 1.0 },
      { conceptId: 'c24', prominence: 0.9 },
      { conceptId: 'c25', prominence: 0.9 },
      { conceptId: 'c26', prominence: 0.7 }
    ],
    generatedInsights: [
      "Darwin's mechanism shows how complexity can emerge without intelligent design, challenging teleological thinking.",
      "The continuity between humans and other species raises profound questions about consciousness and moral status."
    ]
  },
  {
    id: 'd7',
    title: "The Double Helix",
    author: "James Watson",
    date: "1968",
    type: "Scientific Memoir",
    summary: "Personal account of discovering the structure of DNA and its implications for genetics.",
    content: `This memoir provides an insider's view of one of the most important discoveries in biology. The race to determine DNA Structure involved multiple research teams using X-ray crystallography, chemical analysis, and model building.

The key insight was recognizing DNA as a double helix with complementary base pairing: adenine with thymine, guanine with cytosine. This structure immediately suggested a mechanism for replication, as each strand could serve as a template for creating its complement.

The discovery revealed how genetic information is stored and transmitted. The sequence of bases along the DNA molecule constitutes a Genetic Code that determines the sequence of amino acids in proteins. This provides the molecular basis for inheritance and Evolution.

The implications extend far beyond academic biology: understanding DNA Structure enabled genetic engineering, medical diagnostics, forensic analysis, and biotechnology. The Molecular Biology revolution stems directly from this structural insight.`,
    relatedDocs: ['d6', 'd11', 'd13'],
    conceptsInDoc: [
      { conceptId: 'c27', prominence: 1.0 },
      { conceptId: 'c28', prominence: 0.9 },
      { conceptId: 'c29', prominence: 0.8 },
      { conceptId: 'c30', prominence: 0.8 },
      { conceptId: 'c25', prominence: 0.6 }
    ],
    generatedInsights: [
      "The digital nature of genetic information suggests deep connections between biology and information theory.",
      "Understanding DNA Structure opened possibilities for deliberately modifying life itself."
    ]
  },
  {
    id: 'd8',
    title: "Gödel, Escher, Bach: An Eternal Golden Braid",
    author: "Douglas Hofstadter",
    date: "1979",
    type: "Interdisciplinary Study",
    summary: "Exploration of consciousness, self-reference, and strange loops through mathematics, art, and music.",
    content: `This work explores the deep connections between mathematics, art, music, and consciousness through the concept of Strange Loops. Gödel's incompleteness theorems reveal fundamental limitations in formal systems: any consistent system complex enough to describe arithmetic cannot be both complete and consistent.

Escher's visual paradoxes and Bach's musical canons demonstrate similar Self-Reference structures in art. The book argues that consciousness itself emerges from strange loops in the brain's information processing, creating the illusion of a unified self from distributed neural activity.

Recursive structures appear throughout: DNA codes for proteins that interpret DNA, brains create models of brains, symbols refer to their own meaning. These tangled hierarchies suggest that Self-Reference is fundamental to complex systems.

The work proposes that intelligence and Emergent Consciousness are emergent properties arising from the interaction of simple rules in complex systems. This mechanistic view of mind challenges dualistic conceptions while celebrating the richness of conscious experience.`,
    relatedDocs: ['d4', 'd5', 'd14'],
    conceptsInDoc: [
      { conceptId: 'c31', prominence: 1.0 },
      { conceptId: 'c32', prominence: 0.9 },
      { conceptId: 'c33', prominence: 0.8 },
      { conceptId: 'c34', prominence: 0.8 }
    ],
    generatedInsights: [
      "Gödel's theorems suggest that complete self-knowledge might be logically impossible for any conscious system.",
      "The parallel between mathematical incompleteness and consciousness hints at fundamental limits to understanding ourselves."
    ]
  },
  {
    id: 'd9',
    title: "Being and Time",
    author: "Martin Heidegger",
    date: "1927",
    type: "Philosophy",
    summary: "Fundamental analysis of human existence and the meaning of Being through temporal structures.",
    content: `This work attempts to revive the question of Being that has been forgotten in Western philosophy. Human existence (Dasein) is characterized by its unique relationship to Being: we are the beings for whom Being is a question.

Temporality provides the key to understanding human existence. We are thrown into a world not of our choosing (throwness), yet we project ourselves toward future possibilities (projection), while taking responsibility for our past (fallenness). This temporal structure defines authentic existence.

The analysis reveals that traditional philosophy has covered over the primordial meaning of Being by treating entities as present-at-hand objects. But human Being-in-the-World is more fundamental than subject-object distinctions. We are always already engaged with tools and others in meaningful contexts.

Anxiety reveals the groundlessness of existence and opens the possibility of authentic self-ownership. Being-toward-death individualizes each person and creates urgency about how to live. Authenticity involves owning one's existence rather than losing oneself in the anonymous "they-self."`,
    relatedDocs: ['d4', 'd10', 'd15'],
    conceptsInDoc: [
      { conceptId: 'c35', prominence: 1.0 },
      { conceptId: 'c36', prominence: 0.9 },
      { conceptId: 'c37', prominence: 0.8 },
      { conceptId: 'c38', prominence: 0.8 }
    ],
    generatedInsights: [
      "Heidegger's temporal analysis challenges both Cartesian Mind-Body Dualism and scientific naturalism.",
      "The priority of Being over beings suggests that existence precedes essence, influencing existentialism."
    ]
  },
  {
    id: 'd10',
    title: "The Conscious Mind",
    author: "David Chalmers",
    date: "1996",
    type: "Philosophy of Mind",
    summary: "Analysis of the hard problem of consciousness and property dualism in cognitive science.",
    content: `This work articulates the Hard Problem of Consciousness: explaining why there is subjective, first-person experience at all. Easy problems of consciousness involve explaining cognitive functions like attention, memory, and behavioral responses. The hard problem asks why these functions are accompanied by inner experience.

Functional and computational approaches to mind can explain cognitive abilities but cannot account for qualitative experience (qualia). There seems to be an explanatory gap between neural processes and subjective experience that cannot be bridged by physical description alone.

The work argues for property dualism: consciousness involves irreducible mental properties that are fundamental features of reality, like mass or charge. These psychophysical laws govern the relationship between physical processes and conscious experience.

This position rejects both materialist reductionism and substance dualism, proposing instead that conscious properties are non-reducible aspects of the natural world. Information integration might provide the key to understanding how consciousness arises from complex systems.`,
    relatedDocs: ['d4', 'd5', 'd8', 'd9'],
    conceptsInDoc: [
      { conceptId: 'c39', prominence: 1.0 },
      { conceptId: 'c40', prominence: 0.9 },
      { conceptId: 'c17', prominence: 0.6 },
      { conceptId: 'c34', prominence: 0.7 }
    ],
    generatedInsights: [
      "The Hard Problem of Consciousness suggests that consciousness might require expanding our scientific worldview beyond physicalism.",
      "Information integration theories hint at connections between consciousness and computation."
    ]
  },
  {
    id: 'd11',
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    date: "1976",
    type: "Popular Science",
    summary: "Gene-centered view of evolution and the concept of memes as cultural replicators.",
    content: `This work revolutionized thinking about Evolution by shifting focus from organisms to genes as the primary units of selection. Genes are replicators that build survival machines (organisms) to ensure their own propagation through generations.

The concept of the "selfish gene" doesn't imply conscious selfishness but rather that genes act as if they prioritize their own replication. This perspective explains altruistic behavior: organisms sacrifice for relatives who share their genes, ensuring gene survival even at individual cost.

The book introduces "memes" as cultural replicators analogous to genes. Ideas, behaviors, and cultural practices spread through populations, mutating and evolving according to their ability to replicate in human minds. This provides a framework for understanding cultural Evolution.

The gene's-eye view offers powerful insights into animal behavior, social cooperation, and the evolution of complex traits. It demonstrates how apparent design in nature emerges from the blind process of Natural Selection acting on replicating entities.`,
    relatedDocs: ['d6', 'd7'],
    conceptsInDoc: [
      { conceptId: 'c25', prominence: 0.9 },
      { conceptId: 'c24', prominence: 0.8 },
      { conceptId: 'c29', prominence: 0.6 }
    ],
    generatedInsights: [
      "The gene-centered view bridges molecular biology and evolutionary theory.",
      "Memes suggest that cultural evolution follows similar principles to biological evolution."
    ]
  },
  {
    id: 'd12',
    title: "The Fabric of the Cosmos",
    author: "Brian Greene",
    date: "2004",
    type: "Popular Science",
    summary: "Exploration of space, time, and the fundamental nature of reality through modern physics.",
    content: `This work presents cutting-edge physics concepts about the nature of space and time. Building on Special Relativity and general relativity, it explores how quantum mechanics and cosmology reshape our understanding of reality's fabric.

The book examines whether time is fundamental or emergent, the possibility of parallel universes, and the holographic principle suggesting reality might be two-dimensional information projected into three dimensions. These concepts challenge basic assumptions about existence.

String theory proposes that fundamental particles are vibrating strings in higher-dimensional space. This framework attempts to unify Quantum Mechanics with gravity, potentially revealing the deepest laws governing the universe's structure.

The exploration reveals how modern physics suggests reality is far stranger than everyday experience indicates. Space and time may be approximations, the universe may have multiple dimensions, and our cosmic horizon may be just one of countless others.`,
    relatedDocs: ['d1', 'd5'],
    conceptsInDoc: [
      { conceptId: 'c1', prominence: 0.7 },
      { conceptId: 'c22', prominence: 0.8 },
      { conceptId: 'c3', prominence: 0.6 }
    ],
    generatedInsights: [
      "String theory represents the ultimate unification of physical forces.",
      "The holographic principle suggests reality's dimensionality is more complex than it appears."
    ]
  },
  {
    id: 'd13',
    title: "The Information",
    author: "James Gleick",
    date: "2011",
    type: "Science History",
    summary: "History and impact of information theory from Claude Shannon to the digital age.",
    content: `This comprehensive history traces the development of information theory and its profound impact on science and society. Beginning with Claude Shannon's mathematical theory of communication, it shows how information became recognized as a fundamental quantity like energy or matter.

The book explores how the concept of information revolutionized biology, revealing that DNA Structure encodes digital information in living systems. This insight transformed understanding of heredity, Evolution, and the relationship between information and life itself.

Information theory also illuminated connections between physics and computation. The work examines how information processing relates to thermodynamics, entropy, and the physical limits of computation, suggesting deep relationships between information and physical reality.

The digital revolution emerges as the practical manifestation of information theory. From telegraph to internet, the book traces how information technologies reshaped human communication, knowledge storage, and social organization on a global scale.`,
    relatedDocs: ['d7', 'd8'],
    conceptsInDoc: [
      { conceptId: 'c28', prominence: 0.7 },
      { conceptId: 'c29', prominence: 0.8 },
      { conceptId: 'c25', prominence: 0.6 }
    ],
    generatedInsights: [
      "Information theory reveals deep connections between biology, physics, and computation.",
      "The digital age represents the practical realization of Shannon's theoretical insights."
    ]
  },
  {
    id: 'd14',
    title: "I Am a Strange Loop",
    author: "Douglas Hofstadter",
    date: "2007",
    type: "Philosophy of Mind",
    summary: "Deeper exploration of consciousness as self-referential pattern rather than physical substance.",
    content: `This work extends the exploration of consciousness begun in "Gödel, Escher, Bach," focusing specifically on the Strange Loops that constitute the self. Consciousness emerges not from physical substrate but from self-referential patterns of sufficient complexity and depth.

The "I" is not a thing but a process—a pattern that has the curious property of being able to perceive and think about itself. This Self-Reference creates a feedback loop that generates the illusion of a unified, experiencing subject from distributed neural processes.

The book argues against both dualism and reductive materialism, proposing instead that consciousness is a real but emergent phenomenon. Like a melody that emerges from but is not reducible to individual notes, consciousness emerges from but transcends its neural substrate.

This perspective has profound implications for personal identity, empathy, and the possibility of artificial consciousness. If consciousness is pattern rather than substance, then theoretically any sufficiently complex self-referential system could be conscious, regardless of its physical implementation.`,
    relatedDocs: ['d8', 'd10'],
    conceptsInDoc: [
      { conceptId: 'c31', prominence: 1.0 },
      { conceptId: 'c32', prominence: 0.9 },
      { conceptId: 'c33', prominence: 0.8 },
      { conceptId: 'c34', prominence: 0.9 }
    ],
    generatedInsights: [
      "Strange Loops suggest consciousness could theoretically arise in any sufficiently complex system.",
      "The pattern-based view of consciousness challenges traditional notions of personal identity."
    ]
  },
  {
    id: 'd15',
    title: "What Is Called Thinking?",
    author: "Martin Heidegger",
    date: "1954",
    type: "Philosophy",
    summary: "Investigation into the nature of thinking and its relationship to Being in the modern age.",
    content: `This work investigates what genuine thinking means in an age dominated by technological calculation. Heidegger distinguishes between calculative thinking, which manipulates and controls, and meditative thinking, which opens us to Being and lets things show themselves as they are.

The title's ambiguity is intentional: it asks both "What calls us to think?" and "What do we call thinking?" Genuine thinking is not a human faculty but a response to Being's call. We do not think; rather, thinking thinks through us when we are properly attuned to Being.

The analysis reveals how modern technology shapes thinking toward calculation and control, potentially cutting us off from more fundamental forms of thinking. This "technological revealing" makes everything appear as resources to be optimized rather than beings to be contemplated.

The work suggests that learning to think authentically requires stepping back from the assumptions of the technological age and cultivating a more receptive, meditative relationship to Being. This involves patience, humility, and openness to what lies beyond human control.`,
    relatedDocs: ['d9'],
    conceptsInDoc: [
      { conceptId: 'c35', prominence: 1.0 },
      { conceptId: 'c36', prominence: 0.7 },
      { conceptId: 'c38', prominence: 0.6 }
    ],
    generatedInsights: [
      "Heidegger's distinction between calculative and meditative thinking critiques modern technological society.",
      "Authentic thinking requires receptivity to Being rather than the will to control and manipulate."
    ]
  }
];

const CHALDEAS = () => {
  // Global State Variables
  const [selectedDocumentId, setSelectedDocumentId] = useState('d1');
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const [currentView, setCurrentView] = useState('reader');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [graphScale, setGraphScale] = useState(1);
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [createdEndpoints, setCreatedEndpoints] = useState([]);
  const [showEndpointModal, setShowEndpointModal] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const graphRef = useRef(null);
  const searchRef = useRef(null);

  // Mock endpoints data
  const mockEndpoints = [
    { id: 'ep1', name: 'Einstein_Birth_Year', value: '1879', type: 'number', documentId: 'd1' },
    { id: 'ep2', name: 'Light_Speed_Constant', value: '299,792,458', type: 'number', documentId: 'd1' },
    { id: 'ep3', name: 'Relativity_Publication', value: '1905', type: 'date', documentId: 'd1' },
    { id: 'ep4', name: 'Newton_Laws_Count', value: '3', type: 'number', documentId: 'd2' },
  ];

  // Initialize with fade-in animation
  useEffect(() => {
    document.body.classList.add('dark');
    
    // Animate title reveal
    const titleElement = document.querySelector('.text-reveal');
    if (titleElement) {
      const spans = titleElement.querySelectorAll('span');
      spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, []);

  // Core Controller Function: updateUI()
  useEffect(() => {
    updateUI();
  }, [selectedDocumentId, selectedConceptId, currentView]);

  // Master renderer - called whenever state changes
  const updateUI = () => {
    if (currentView === 'constellation' && graphRef.current) {
      renderConstellation();
    }
  };

  // Handler Functions
  const selectDocument = (docId) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedDocumentId(docId);
      setSelectedConceptId(null);
      setIsLoading(false);
    }, 300);
  };

  const selectConcept = (conceptId) => {
    setSelectedConceptId(conceptId);
  };

  const setView = (viewName) => {
    setCurrentView(viewName);
  };

  // Global Search Implementation
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const docResults = mockDocuments.filter(doc =>
      doc.title.toLowerCase().includes(query) ||
      doc.author.toLowerCase().includes(query)
    ).map(doc => ({ ...doc, type: 'document' }));

    const conceptResults = concepts.filter(concept =>
      concept.name.toLowerCase().includes(query) ||
      concept.description.toLowerCase().includes(query)
    ).map(concept => ({ ...concept, type: 'concept' }));

    setSearchResults([...docResults.slice(0, 5), ...conceptResults.slice(0, 5)]);
    setShowSearchDropdown(true);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current document
  const selectedDocument = mockDocuments.find(doc => doc.id === selectedDocumentId);
  const selectedConcept = concepts.find(concept => concept.id === selectedConceptId);

  // Enhanced content highlighting with clickable concepts AND data points
  const getHighlightedContent = (content) => {
    if (!selectedDocument) return content;
    
    let highlightedContent = content;
    
    // Highlight concepts based on conceptsInDoc
    selectedDocument.conceptsInDoc.forEach(({ conceptId }) => {
      const concept = concepts.find(c => c.id === conceptId);
      if (concept) {
        const regex = new RegExp(`\\b${concept.name}\\b`, 'gi');
        const isSelected = selectedConceptId === conceptId;
        const highlightClass = isSelected 
          ? 'concept-highlight concept-selected' 
          : 'concept-highlight';
        
        highlightedContent = highlightedContent.replace(
          regex, 
          `<span class="${highlightClass}" data-concept-id="${conceptId}">${concept.name}</span>`
        );
      }
    });
    
    // Detect and highlight data points (numbers, dates, etc.)
    const dataPointPatterns = [
      { pattern: /\b\d{4}\b/g, type: 'year' }, // Years like 1905, 1687
      { pattern: /\b\d+,\d+,\d+\b/g, type: 'number' }, // Large numbers with commas
      { pattern: /\b\d+\.\d+\b/g, type: 'decimal' }, // Decimals
      { pattern: /\b\d+\b/g, type: 'number' }, // Simple numbers
      { pattern: /E=mc²/g, type: 'formula' }, // Famous formulas
    ];
    
    dataPointPatterns.forEach(({ pattern, type }) => {
      highlightedContent = highlightedContent.replace(pattern, (match) => {
        return `<span class="data-point" data-value="${match}" data-type="${type}">${match}</span>`;
      });
    });
    
    return highlightedContent;
  };

  // Handle concept clicks in content + data point interactions
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.classList.contains('concept-highlight')) {
        const conceptId = event.target.getAttribute('data-concept-id');
        selectConcept(conceptId);
      }
      
      if (event.target.classList.contains('data-point')) {
        const value = event.target.getAttribute('data-value');
        const type = event.target.getAttribute('data-type');
        setSelectedDataPoint({ value, type });
        setShowEndpointModal(true);
      }
    };

    const handleMouseOver = (event) => {
      if (event.target.classList.contains('data-point')) {
        const value = event.target.getAttribute('data-value');
        const type = event.target.getAttribute('data-type');
        const rect = event.target.getBoundingClientRect();
        setHoveredDataPoint({ 
          value, 
          type, 
          x: rect.left + rect.width / 2, 
          y: rect.top - 10 
        });
      }
    };

    const handleMouseOut = (event) => {
      if (event.target.classList.contains('data-point')) {
        setHoveredDataPoint(null);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Enhanced Constellation Visualization
  const renderConstellation = () => {
    const container = graphRef.current;
    if (!container || !selectedDocument) return;

    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '400');
    svg.style.background = 'transparent';
    
    const nodes = [
      { 
        id: selectedDocument.id, 
        title: selectedDocument.title, 
        type: 'central',
        x: 300, 
        y: 200,
        radius: 20,
        hasSelectedConcept: selectedConceptId && selectedDocument.conceptsInDoc.some(c => c.conceptId === selectedConceptId)
      }
    ];

    // Add related documents as nodes
    selectedDocument.relatedDocs.forEach((docId, index) => {
      const doc = mockDocuments.find(d => d.id === docId);
      if (doc) {
        const angle = (index * 2 * Math.PI) / selectedDocument.relatedDocs.length;
        const distance = 120;
        const hasSelectedConcept = selectedConceptId && doc.conceptsInDoc?.some(c => c.conceptId === selectedConceptId);
        
        nodes.push({
          id: doc.id,
          title: doc.title,
          type: 'related',
          x: 300 + Math.cos(angle) * distance,
          y: 200 + Math.sin(angle) * distance,
          radius: 12,
          hasSelectedConcept
        });
      }
    });

    // Create defs for gradients and glows
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'coloredBlur');
    
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'coloredBlur');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Draw links
    selectedDocument.relatedDocs.forEach(docId => {
      const sourceNode = nodes.find(n => n.id === selectedDocument.id);
      const targetNode = nodes.find(n => n.id === docId);
      
      if (sourceNode && targetNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sourceNode.x.toString());
        line.setAttribute('y1', sourceNode.y.toString());
        line.setAttribute('x2', targetNode.x.toString());
        line.setAttribute('y2', targetNode.y.toString());
        line.setAttribute('stroke', '#00F5D4');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.6');
        line.style.filter = 'url(#glow)';
        
        svg.appendChild(line);
      }
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      // Add secondary aura for concept highlighting
      if (node.hasSelectedConcept) {
        const aura = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        aura.setAttribute('cx', node.x.toString());
        aura.setAttribute('cy', node.y.toString());
        aura.setAttribute('r', (node.radius + 8).toString());
        aura.setAttribute('fill', 'none');
        aura.setAttribute('stroke', '#9B5DE5');
        aura.setAttribute('stroke-width', '3');
        aura.setAttribute('opacity', '0.7');
        aura.style.filter = 'url(#glow)';
        svg.appendChild(aura);
      }

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', node.radius.toString());
      circle.setAttribute('fill', node.type === 'central' ? '#00F5D4' : '#9B5DE5');
      circle.setAttribute('stroke', '#E0E0E0');
      circle.setAttribute('stroke-width', '2');
      circle.style.filter = 'url(#glow)';
      circle.style.cursor = 'pointer';
      circle.style.animationDelay = `${index * 0.2}s`;
      circle.classList.add('fade-in-up');

      circle.addEventListener('click', () => {
        selectDocument(node.id);
      });

      svg.appendChild(circle);

      // Add labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y - node.radius - 10).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#E0E0E0');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-family', 'Inter, sans-serif');
      text.textContent = node.title.length > 30 ? node.title.substring(0, 30) + '...' : node.title;
      text.style.pointerEvents = 'none';
      text.classList.add('fade-in-up');
      text.style.animationDelay = `${index * 0.2 + 0.1}s`;

      svg.appendChild(text);
    });

    container.appendChild(svg);
  };

  // Enhanced constellation with better interactivity
  const handleGraphZoom = (direction) => {
    const newScale = direction === 'in' ? Math.min(graphScale * 1.2, 3) : Math.max(graphScale / 1.2, 0.5);
    setGraphScale(newScale);
    if (graphRef.current) {
      const svg = graphRef.current.querySelector('svg');
      if (svg) {
        svg.style.transform = `scale(${newScale})`;
      }
    }
  };

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.conceptsInDoc?.some(c => {
      const concept = concepts.find(concept => concept.id === c.conceptId);
      return concept && concept.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="glass-panel m-4 p-4 fade-in-up">
        <div className="flex items-center justify-between">
          {/* Left - Project Title */}
          <div className="text-reveal">
            <h1 className="font-heading text-2xl font-bold text-cosmic-primary mb-1 tracking-wide">
              {['P','R','O','J','E','C','T',' ','C','H','A','L','D','E','A','S'].map((char, i) => (
                <span key={i} className="inline-block">{char}</span>
              ))}
            </h1>
            <p className="text-cosmic-muted text-sm font-body">
              Conceptual Heuristic and Linkage-Driven Engine for Analytical Synthesis
            </p>
          </div>

          {/* Center - Enhanced Search Bar */}
          <div className="flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-muted w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents, concepts, or entities..."
                className="pl-10 glass-panel border-0 chaldeas-glow-hover text-cosmic-primary placeholder:text-cosmic-muted"
              />
              
              {/* Search Results Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-panel border border-chaldeas-glow/30 rounded-lg max-h-80 overflow-y-auto z-50">
                  <div className="p-2">
                    {searchResults.filter(r => r.type === 'document').length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 px-2 py-1 text-xs text-cosmic-muted font-medium">
                          <FileText className="w-3 h-3" />
                          Documents
                        </div>
                        {searchResults.filter(r => r.type === 'document').map((doc) => (
                          <div
                            key={doc.id}
                            className="px-3 py-2 hover:bg-cosmic-panel rounded cursor-pointer transition-colors"
                            onClick={() => {
                              selectDocument(doc.id);
                              setShowSearchDropdown(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="text-sm text-cosmic-primary font-medium">{doc.title}</div>
                            <div className="text-xs text-cosmic-muted">{doc.author}, {doc.date}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.filter(r => r.type === 'concept').length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 px-2 py-1 text-xs text-cosmic-muted font-medium">
                          <BrainCircuit className="w-3 h-3" />
                          Concepts
                        </div>
                        {searchResults.filter(r => r.type === 'concept').map((concept) => (
                          <div
                            key={concept.id}
                            className="px-3 py-2 hover:bg-cosmic-panel rounded cursor-pointer transition-colors"
                            onClick={() => {
                              selectConcept(concept.id);
                              setShowSearchDropdown(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="text-sm text-cosmic-primary font-medium">{concept.name}</div>
                            <div className="text-xs text-cosmic-muted">{concept.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="chaldeas-glow-hover">
              <Bell className="w-5 h-5 text-cosmic-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="chaldeas-glow-hover">
              <HelpCircle className="w-5 h-5 text-cosmic-primary" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chaldeas-glow to-chaldeas-insight"></div>
          </div>
        </div>
      </header>

      {/* Main Content - Three Column Layout */}
      <div className="flex gap-4 mx-4 mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
        
        {/* Column 1 - Document Explorer */}
        <div className="w-1/3">
          <div className="glass-panel p-4 h-[calc(100vh-200px)] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-cosmic-primary flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Corpus
              </h2>
              <Button size="sm" className="bg-chaldeas-glow hover:bg-chaldeas-glow/80 text-cosmic-edge">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
            
            <div className="space-y-3 overflow-y-auto h-full pr-2">
              {filteredDocuments.map((doc) => (
                <Card 
                  key={doc.id}
                  className={`cursor-pointer transition-all duration-300 border-0 bg-cosmic-panel backdrop-blur-sm
                    ${selectedDocumentId === doc.id 
                      ? 'border-l-4 border-l-chaldeas-glow chaldeas-glow' 
                      : 'hover:border-l-4 hover:border-l-chaldeas-glow/50'
                    }`}
                  onClick={() => selectDocument(doc.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-cosmic-primary line-clamp-2">
                      {doc.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-cosmic-muted">
                      {doc.author}, {doc.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-cosmic-muted line-clamp-2 mb-2">
                      {doc.summary}
                    </p>
                    <Badge variant="outline" className="text-xs border-chaldeas-glow/30 text-chaldeas-glow">
                      {doc.type}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 - Document Viewer / Constellation / Armillary */}
        <div className="w-2/5">
          <div className="glass-panel p-4 h-[calc(100vh-200px)]">
            <Tabs value={currentView} onValueChange={setView}>
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-cosmic-panel">
                <TabsTrigger value="reader" className="data-[state=active]:bg-chaldeas-glow data-[state=active]:text-cosmic-edge">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Reader
                </TabsTrigger>
                <TabsTrigger value="constellation" className="data-[state=active]:bg-chaldeas-glow data-[state=active]:text-cosmic-edge">
                  <Eye className="w-4 h-4 mr-2" />
                  Constellation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reader" className="h-[calc(100%-60px)] overflow-hidden">
                <div className={`h-full overflow-y-auto pr-2 ${isLoading ? 'aurora-pulse' : ''}`}>
                  <h1 className="font-heading text-xl font-bold text-cosmic-primary mb-2">
                    {selectedDocument.title}
                  </h1>
                  <p className="text-cosmic-muted text-sm mb-4">
                    By {selectedDocument.author} ({selectedDocument.date})
                  </p>
                  <div 
                    className="font-body text-cosmic-primary leading-relaxed space-y-4 pb-4"
                    dangerouslySetInnerHTML={{ 
                      __html: getHighlightedContent(selectedDocument.content)
                        .split('\n\n')
                        .map(paragraph => `<p>${paragraph}</p>`)
                        .join('')
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="constellation" className="h-[calc(100%-60px)]">
                <div className="h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-cosmic-muted">
                      Document Network • {selectedDocument.relatedDocs.length} connections
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-7 border-chaldeas-glow/30 text-chaldeas-glow hover:bg-chaldeas-glow/10">
                        Reset View
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 border-chaldeas-glow/30 text-chaldeas-glow hover:bg-chaldeas-glow/10">
                        Expand Network
                      </Button>
                    </div>
                  </div>
                  <div ref={graphRef} className="w-full h-[calc(100%-40px)] border border-cosmic-panel/50 rounded-lg bg-cosmic-edge/20"></div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Column 3 - Synthesis & Insights */}
        <div className="w-1/4">
          <div className="glass-panel p-4 h-[calc(100vh-200px)] overflow-y-auto">
            <h2 className="font-heading text-lg font-semibold text-cosmic-primary flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5" />
              Synthesis Engine
            </h2>

            {/* Selected Concept Display */}
            {selectedConcept && (
              <div className="mb-6 p-3 glass-panel border border-chaldeas-insight/50 bg-gradient-to-br from-chaldeas-insight/20 to-chaldeas-insight/10">
                <h3 className="font-medium text-cosmic-primary mb-1 text-sm">Selected Concept</h3>
                <div className="text-chaldeas-insight font-semibold text-lg">{selectedConcept.name}</div>
                <div className="text-xs text-cosmic-muted mt-1">{selectedConcept.description}</div>
                <Badge variant="outline" className="text-xs border-chaldeas-insight/30 text-chaldeas-insight mt-2">
                  {selectedConcept.type}
                </Badge>
              </div>
            )}

            {/* Created Endpoints Section */}
            <div className="mb-6">
              <h3 className="font-medium text-cosmic-primary mb-2 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Live Endpoints ({mockEndpoints.filter(ep => ep.documentId === selectedDocumentId).length})
              </h3>
              <div className="space-y-2">
                {mockEndpoints.filter(ep => ep.documentId === selectedDocumentId).map((endpoint) => (
                  <Card 
                    key={endpoint.id}
                    className="border-0 bg-gradient-to-br from-chaldeas-glow/20 to-chaldeas-glow/10 backdrop-blur-sm border border-chaldeas-glow/30"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-cosmic-primary">{endpoint.name}</div>
                        <Badge variant="outline" className="text-xs border-chaldeas-glow/30 text-chaldeas-glow">
                          {endpoint.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-cosmic-muted mb-2">
                        Value: <span className="text-chaldeas-glow font-mono">{endpoint.value}</span>
                      </div>
                      <div className="text-xs text-cosmic-muted mb-2">
                        API: <span className="text-chaldeas-glow font-mono">GET /api/data/{endpoint.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-chaldeas-glow hover:bg-chaldeas-glow/80 text-cosmic-edge text-xs h-6">
                          Copy URL
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-6 border-chaldeas-glow/30 text-chaldeas-glow hover:bg-chaldeas-glow/10">
                          Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {mockEndpoints.filter(ep => ep.documentId === selectedDocumentId).length === 0 && (
                  <div className="text-center py-4 text-cosmic-muted text-sm">
                    No endpoints created yet. Click on data points in the document to create live endpoints.
                  </div>
                )}
              </div>
            </div>

            {/* Linked Documents */}
            <div className="mb-6">
              <h3 className="font-medium text-cosmic-primary mb-2 text-sm">Linked Documents</h3>
              <div className="space-y-2">
                {selectedDocument.relatedDocs.map(docId => {
                  const doc = mockDocuments.find(d => d.id === docId);
                  const hasSelectedConcept = selectedConceptId && doc.conceptsInDoc?.some(c => c.conceptId === selectedConceptId);
                  
                  return doc ? (
                    <Button
                      key={doc.id}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start text-left text-xs h-auto p-2 chaldeas-glow-hover ${
                        hasSelectedConcept ? 'border border-chaldeas-insight/50 bg-chaldeas-insight/10' : ''
                      }`}
                      onClick={() => selectDocument(doc.id)}
                    >
                      <div>
                        <div className="font-medium text-cosmic-primary">{doc.title}</div>
                        <div className="text-cosmic-muted">{doc.author}</div>
                        {hasSelectedConcept && (
                          <div className="text-xs text-chaldeas-insight mt-1">
                            Contains: {selectedConcept.name}
                          </div>
                        )}
                      </div>
                    </Button>
                  ) : null;
                })}
              </div>
            </div>

            {/* Key Concepts */}
            <div className="mb-6">
              <h3 className="font-medium text-cosmic-primary mb-2 text-sm">Key Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDocument.conceptsInDoc?.map((conceptInDoc, index) => {
                  const concept = concepts.find(c => c.id === conceptInDoc.conceptId);
                  if (!concept) return null;
                  
                  const isSelected = selectedConceptId === concept.id;
                  const typeColors = {
                    'Theory': 'border-chaldeas-glow/30 text-chaldeas-glow',
                    'Person': 'border-chaldeas-insight/30 text-chaldeas-insight',
                    'Event': 'border-chaldeas-warning/30 text-chaldeas-warning',
                    'Place': 'border-orange-400/30 text-orange-400'
                  };
                  
                  return (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className={`text-xs cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-chaldeas-insight/20 border-chaldeas-insight text-chaldeas-insight font-semibold'
                          : typeColors[concept.type] || 'border-chaldeas-glow/30 text-chaldeas-glow'
                      } hover:bg-opacity-20`}
                      onClick={() => selectConcept(concept.id)}
                    >
                      {concept.name}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Generated Insights */}
            <div>
              <h3 className="font-medium text-cosmic-primary mb-3 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Generated Insights
              </h3>
              <div className="space-y-3">
                {selectedDocument.generatedInsights?.map((insight, index) => (
                  <Card 
                    key={index}
                    className="border-0 bg-gradient-to-br from-chaldeas-insight/20 to-chaldeas-insight/10 backdrop-blur-sm border border-chaldeas-insight/30"
                  >
                    <CardContent className="p-3">
                      <p className="text-xs text-cosmic-primary mb-2 leading-relaxed">
                        {insight}
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-chaldeas-insight hover:bg-chaldeas-insight/80 text-white text-xs h-7"
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>

      {/* Data Point Tooltip */}
      {hoveredDataPoint && (
        <div 
          className="fixed z-50 glass-panel border border-chaldeas-glow/50 px-3 py-2 pointer-events-none"
          style={{ 
            left: hoveredDataPoint.x - 75, 
            top: hoveredDataPoint.y - 70,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-xs text-cosmic-primary font-medium mb-1">
            Data Point: {hoveredDataPoint.value}
          </div>
          <div className="text-xs text-cosmic-muted mb-2">
            Type: {hoveredDataPoint.type}
          </div>
          <div className="text-xs text-chaldeas-glow">
            Click to create live endpoint
          </div>
        </div>
      )}

      {/* Endpoint Creation Modal */}
      {showEndpointModal && selectedDataPoint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-edge/80 backdrop-blur-sm">
          <div className="glass-panel border border-chaldeas-glow/50 p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-heading font-semibold text-cosmic-primary mb-4">
              Create Live Endpoint
            </h3>
            
            <div className="mb-4">
              <label className="text-sm text-cosmic-muted mb-2 block">Data Value</label>
              <div className="glass-panel p-3 border border-chaldeas-glow/30">
                <span className="text-chaldeas-glow font-mono">{selectedDataPoint.value}</span>
                <span className="text-cosmic-muted ml-2">({selectedDataPoint.type})</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-cosmic-muted mb-2 block">Endpoint Name</label>
              <Input
                placeholder="e.g., Q3_Revenue, Einstein_Birth_Year"
                className="glass-panel border-chaldeas-glow/30 text-cosmic-primary"
                defaultValue={`${selectedDocument.title.replace(/\s+/g, '_')}_${selectedDataPoint.value}`}
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-cosmic-muted mb-2 block">Generated API Endpoint</label>
              <div className="glass-panel p-3 border border-chaldeas-glow/30 font-mono text-xs text-chaldeas-glow">
                GET /api/data/{selectedDocument.title.replace(/\s+/g, '_')}_{selectedDataPoint.value}
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-chaldeas-glow hover:bg-chaldeas-glow/80 text-cosmic-edge"
                onClick={() => {
                  // Mock endpoint creation
                  setCreatedEndpoints(prev => [...prev, {
                    id: `ep_${Date.now()}`,
                    name: `${selectedDocument.title.replace(/\s+/g, '_')}_${selectedDataPoint.value}`,
                    value: selectedDataPoint.value,
                    type: selectedDataPoint.type,
                    documentId: selectedDocumentId
                  }]);
                  setShowEndpointModal(false);
                  setSelectedDataPoint(null);
                }}
              >
                Create Endpoint
              </Button>
              <Button 
                variant="outline" 
                className="border-cosmic-muted text-cosmic-muted hover:bg-cosmic-panel"
                onClick={() => {
                  setShowEndpointModal(false);
                  setSelectedDataPoint(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS for data points and interactions */}
      <style>{`
        .data-point {
          background: linear-gradient(135deg, rgba(0, 245, 212, 0.2), rgba(0, 245, 212, 0.1));
          border: 1px solid rgba(0, 245, 212, 0.3);
          border-radius: 4px;
          padding: 1px 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .data-point:hover {
          background: linear-gradient(135deg, rgba(0, 245, 212, 0.3), rgba(0, 245, 212, 0.2));
          border-color: rgba(0, 245, 212, 0.5);
          box-shadow: 0 0 8px rgba(0, 245, 212, 0.3);
          transform: translateY(-1px);
        }
        
        .concept-highlight {
          color: #9B5DE5;
          cursor: pointer;
          text-decoration: underline;
          text-decoration-color: #9B5DE5;
          text-underline-offset: 2px;
          transition: all 0.2s ease;
        }
        
        .concept-highlight:hover {
          color: #00F5D4;
          text-decoration-color: #00F5D4;
          text-shadow: 0 0 5px rgba(0, 245, 212, 0.5);
        }
        
        .concept-selected {
          color: #00F5D4 !important;
          text-decoration-color: #00F5D4 !important;
          text-shadow: 0 0 8px rgba(0, 245, 212, 0.7);
          font-weight: 600;
        }
      `}</style>
    </div>
      </div>
    </div>
  );
};

export default CHALDEAS;