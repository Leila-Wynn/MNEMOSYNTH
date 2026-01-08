
export const QUESTION_SETS = {
  baseline: [
    {
      id: "b1",
      concept: "Nervous Systems",
      prompt: "You touch a hot surface and pull your hand away before you consciously process pain. Which system initiates the rapid response?",
      options: [
        "Somatic nervous system",
        "Autonomic nervous system",
        "Central nervous system",
        "Parasympathetic nervous system"
      ],
      answerIndex: 2,
      hint: "Think: spinal cord + brain = core processing."
    },
    {
      id: "b2",
      concept: "Neurons",
      prompt: "Signals traveling away from the cell body move down the ____.",
      options: ["Dendrite", "Axon", "Synapse", "Receptor"],
      answerIndex: 1,
      hint: "Dendrites receive; axons send."
    },
    {
      id: "b3",
      concept: "Neural Signaling",
      prompt: "An action potential is best described as:",
      options: [
        "Chemical release into the synapse",
        "Electrical impulse traveling down the axon",
        "A receptor binding neurotransmitters",
        "A memory being encoded"
      ],
      answerIndex: 1,
      hint: "Electrical event along the neuron."
    },
    {
      id: "b4",
      concept: "Brain Structures",
      prompt: "Which structure is most associated with fear and threat processing?",
      options: ["Hippocampus", "Amygdala", "Thalamus", "Cerebellum"],
      answerIndex: 1,
      hint: "Emotion + survival alarm."
    },
    {
      id: "b5",
      concept: "Neurotransmitters",
      prompt: "Which neurotransmitter is strongly tied to reward and motivation pathways?",
      options: ["Serotonin", "Dopamine", "GABA", "Acetylcholine"],
      answerIndex: 1,
      hint: "Reward prediction + reinforcement."
    }
  ],

  final: [
    {
      id: "f1",
      concept: "Memory Brain Areas",
      prompt: "Damage to the hippocampus would most directly impair:",
      options: [
        "Balance and fine motor control",
        "Forming new long-term memories",
        "Basic reflex withdrawal",
        "Visual processing"
      ],
      answerIndex: 1,
      hint: "Encoding consolidation."
    },
    {
      id: "f2",
      concept: "Autonomic Systems",
      prompt: "A racing heart and dilated pupils during danger is primarily driven by:",
      options: [
        "Parasympathetic nervous system",
        "Sympathetic nervous system",
        "Somatic nervous system",
        "Corpus callosum"
      ],
      answerIndex: 1,
      hint: "Fight-or-flight."
    },
    {
      id: "f3",
      concept: "Neurochemistry",
      prompt: "GABA is best associated with:",
      options: [
        "Increasing neural excitation",
        "Inhibiting neural activity",
        "Reward signaling",
        "Muscle coordination"
      ],
      answerIndex: 1,
      hint: "The brain’s primary inhibitory neurotransmitter."
    },
    {
      id: "f4",
      concept: "Cortical Lobes",
      prompt: "If someone has damage to the occipital lobe, what is most likely affected?",
      options: ["Vision", "Language production", "Hearing", "Balance"],
      answerIndex: 0,
      hint: "Primary visual cortex."
    },
    {
      id: "f5",
      concept: "Imaging Methods",
      prompt: "Which method measures electrical activity on the scalp?",
      options: ["fMRI", "EEG", "PET", "CT"],
      answerIndex: 1,
      hint: "Electroencephalograph."
    }
  ]
};
