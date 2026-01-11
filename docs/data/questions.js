// data/questions.js

// -----------------------------
// CHAPTER 3 BANKS (organized)
// -----------------------------

const CH3_BASELINE = [
  {
    id: "c3_b1",
    concept: "Neuron",
    prompt: "The basic building block of the nervous system responsible for transmitting information is called a:",
    options: ["Neurotransmitter", "Neuron", "Synapse", "Axon"],
    answerIndex: 1,
    hint: "Think: cell, not chemical."
  },
  {
    id: "c3_b2",
    concept: "Dendrite",
    prompt: "Which part of the neuron receives incoming signals from other neurons?",
    options: ["Axon", "Terminal button", "Dendrite", "Myelin sheath"],
    answerIndex: 2,
    hint: "Dendrites = input branches."
  },
  {
    id: "c3_b3",
    concept: "Axon",
    prompt: "Signals traveling away from the neuron's cell body move down the:",
    options: ["Dendrite", "Synapse", "Axon", "Receptor"],
    answerIndex: 2,
    hint: "Axons send."
  },
  {
    id: "c3_b4",
    concept: "Myelin Sheath",
    prompt: "What structure increases the speed of neural transmission?",
    options: ["Dendrite", "Myelin sheath", "Cell body", "Synapse"],
    answerIndex: 1,
    hint: "Fatty insulation speeds the signal."
  },
  {
    id: "c3_b5",
    concept: "Action Potential",
    prompt: "An action potential is best described as:",
    options: [
      "Chemical release into the synapse",
      "Electrical impulse traveling down the axon",
      "Neurotransmitter binding to a receptor",
      "A hormone traveling through the bloodstream"
    ],
    answerIndex: 1,
    hint: "Electrical event along the neuron."
  }
];

const CH3_APPLICATION = [
  {
    id: "c3_a1",
    concept: "Synapse",
    prompt: "Where does chemical communication between neurons occur?",
    options: ["Axon", "Cell body", "Synapse", "Myelin sheath"],
    answerIndex: 2,
    hint: "The junction/gap between neurons."
  },
  {
    id: "c3_a2",
    concept: "Neurotransmitters",
    prompt: "Neurotransmitters are best defined as:",
    options: [
      "Electrical impulses traveling down neurons",
      "Hormones released into the blood",
      "Chemical messengers between neurons",
      "Brain structures that control behavior"
    ],
    answerIndex: 2,
    hint: "Chemical messengers in synaptic transmission."
  },
  {
    id: "c3_a3",
    concept: "Excitatory vs Inhibitory",
    prompt: "An inhibitory signal has what effect on the postsynaptic neuron?",
    options: [
      "Increases likelihood of firing",
      "Decreases likelihood of firing",
      "Stops all brain activity permanently",
      "Creates myelin around the axon"
    ],
    answerIndex: 1,
    hint: "Inhibitory signals reduce firing probability."
  },
  {
    id: "c3_a4",
    concept: "Acetylcholine",
    prompt: "Which neurotransmitter is most associated with muscle movement and learning?",
    options: ["Dopamine", "Serotonin", "Acetylcholine", "GABA"],
    answerIndex: 2,
    hint: "Muscle activation + learning."
  },
  {
    id: "c3_a5",
    concept: "Dopamine",
    prompt: "Dopamine plays a key role in:",
    options: [
      "Reward and motivation",
      "Balance and coordination",
      "Blood sugar regulation",
      "Visual processing"
    ],
    answerIndex: 0,
    hint: "Reward prediction and reinforcement."
  },
  {
    id: "c3_a6",
    concept: "Serotonin",
    prompt: "Serotonin is most strongly associated with regulation of:",
    options: ["Mood and sleep", "Hearing", "Reflex withdrawal", "Spinal cord growth"],
    answerIndex: 0,
    hint: "Mood + sleep are classic associations."
  },
  {
    id: "c3_a7",
    concept: "Epinephrine",
    prompt: "Which chemical is most associated with the body's acute stress response (fight-or-flight), increasing arousal?",
    options: ["Epinephrine", "GABA", "Acetylcholine", "Endorphins"],
    answerIndex: 0,
    hint: "Also called adrenaline."
  }
];

const CH3_SYSTEMS = [
  {
    id: "c3_s1",
    concept: "Central Nervous System",
    prompt: "Which structures make up the central nervous system (CNS)?",
    options: [
      "Brain and spinal cord",
      "Brain and peripheral nerves",
      "Spinal cord and glands",
      "Nerves and muscles"
    ],
    answerIndex: 0,
    hint: "CNS = core command system."
  },
  {
    id: "c3_s2",
    concept: "Peripheral Nervous System",
    prompt: "The peripheral nervous system (PNS) primarily:",
    options: [
      "Contains the brain’s lobes",
      "Connects the CNS to the body",
      "Stores long-term memories",
      "Controls only the digestive system"
    ],
    answerIndex: 1,
    hint: "Think: communication lines outside the CNS."
  },
  {
    id: "c3_s3",
    concept: "Somatic Nervous System",
    prompt: "Which division of the PNS controls voluntary movement of skeletal muscles?",
    options: [
      "Somatic nervous system",
      "Autonomic nervous system",
      "Sympathetic nervous system",
      "Parasympathetic nervous system"
    ],
    answerIndex: 0,
    hint: "Somatic = voluntary movement."
  },
  {
    id: "c3_s4",
    concept: "Autonomic Nervous System",
    prompt: "Which division of the PNS controls involuntary functions like heart rate and digestion?",
    options: [
      "Somatic nervous system",
      "Autonomic nervous system",
      "Central nervous system",
      "Corpus callosum"
    ],
    answerIndex: 1,
    hint: "Autonomic = automatic body functions."
  },
  {
    id: "c3_s5",
    concept: "Sympathetic Nervous System",
    prompt: "Which system prepares the body for fight-or-flight?",
    options: [
      "Parasympathetic nervous system",
      "Somatic nervous system",
      "Sympathetic nervous system",
      "Endocrine system"
    ],
    answerIndex: 2,
    hint: "Fight-or-flight."
  },
  {
    id: "c3_s6",
    concept: "Parasympathetic Nervous System",
    prompt: "Which system returns the body to a calm baseline after stress (rest-and-digest)?",
    options: [
      "Sympathetic nervous system",
      "Parasympathetic nervous system",
      "Somatic nervous system",
      "Central nervous system"
    ],
    answerIndex: 1,
    hint: "Rest-and-digest."
  },
  {
    id: "c3_s7",
    concept: "Endocrine System",
    prompt: "The endocrine system primarily communicates using:",
    options: [
      "Electrical impulses",
      "Chemical signals (hormones) through the bloodstream",
      "Synapses between neurons only",
      "Myelin insulation"
    ],
    answerIndex: 1,
    hint: "Hormones travel in blood."
  }
];

const CH3_PREDICTION = [
  {
    id: "c3_p1",
    concept: "Amygdala",
    prompt: "Damage to the amygdala would most likely impair:",
    options: [
      "Fear/threat processing",
      "Vision",
      "Balance",
      "Language comprehension"
    ],
    answerIndex: 0,
    hint: "Emotion + threat alarm."
  },
  {
    id: "c3_p2",
    concept: "Hippocampus",
    prompt: "Damage to the hippocampus would most directly impair:",
    options: [
      "Forming new long-term memories",
      "Balance and coordination",
      "Basic breathing reflexes",
      "Primary visual processing"
    ],
    answerIndex: 0,
    hint: "Memory consolidation."
  },
  {
    id: "c3_p3",
    concept: "Thalamus",
    prompt: "A disruption in the thalamus would most likely affect:",
    options: [
      "Routing sensory information to the cortex",
      "Producing hormones in the bloodstream",
      "Converting oxygen to carbon dioxide",
      "Maintaining skeletal muscle tone only"
    ],
    answerIndex: 0,
    hint: "Thalamus = sensory relay hub."
  },
  {
    id: "c3_p4",
    concept: "Cerebellum",
    prompt: "Which function is most associated with the cerebellum?",
    options: [
      "Fine motor coordination and balance",
      "Speech production",
      "Fear processing",
      "Visual perception"
    ],
    answerIndex: 0,
    hint: "Coordination + timing."
  },
  {
    id: "c3_p5",
    concept: "Occipital Lobe",
    prompt: "Damage to the occipital lobe would most directly affect:",
    options: ["Vision", "Hearing", "Decision-making", "Balance"],
    answerIndex: 0,
    hint: "Primary visual cortex."
  },
  {
    id: "c3_p6",
    concept: "Frontal Lobe",
    prompt: "Which function is most associated with the frontal lobe?",
    options: [
      "Executive control and decision-making",
      "Primary vision",
      "Balance",
      "Basic autonomic reflexes"
    ],
    answerIndex: 0,
    hint: "Planning + inhibition + decisions."
  },
  {
    id: "c3_p7",
    concept: "EEG",
    prompt: "Which method measures electrical activity on the scalp?",
    options: ["fMRI", "EEG", "CT", "PET"],
    answerIndex: 1,
    hint: "Electroencephalograph."
  },
  {
    id: "c3_p8",
    concept: "fMRI",
    prompt: "fMRI is primarily used to measure:",
    options: [
      "Blood-oxygen changes associated with neural activity",
      "Direct electrical spikes on the scalp",
      "Neuron myelination thickness",
      "Hormone levels in blood"
    ],
    answerIndex: 0,
    hint: "Blood-oxygen-level dependent (BOLD) signal."
  }
];

// -----------------------------
// Exported sets used by the game
// -----------------------------

export const QUESTION_BANKS = {
  ch3: {
    baseline: CH3_BASELINE,
    application: CH3_APPLICATION,
    systems: CH3_SYSTEMS,
    prediction: CH3_PREDICTION
  }
};

// The game already expects QUESTION_SETS.baseline and QUESTION_SETS.final.
// We’ll treat baseline as (baseline + application) and final as (systems + prediction).
export const QUESTION_SETS = {
  baseline: [...CH3_BASELINE, ...CH3_APPLICATION],
  final: [...CH3_SYSTEMS, ...CH3_PREDICTION]
};
