
export const STORY = {
  startNodeId: "boot",
  zoneName: "ZONE I: NEURAL COMPLEX",
  nodes: {
    boot: {
      title: "You are connected.",
      body: "The facility renders only what you attend to. Attention is the switch. Memory is the wiring. The system is waiting for your baseline.",
      choices: [
        { label: "Run Baseline Calibration", to: "baseline" },
        { label: "Enter the Neural Complex", to: "hall" }
      ]
    },
    baseline: {
      title: "Calibration Chamber",
      body: "A door of matte glass hums with quiet voltage. The log reads: CALIBRATE BEFORE EXPLORATION. The simulation is not forgiving without a baseline.",
      choices: [
        { label: "Begin Baseline Quiz", action: "BEGIN_BASELINE_QUIZ" },
        { label: "Step back into the hall", to: "hall" }
      ]
    },
    hall: {
      title: "The Hall of Routing",
      body: "A corridor branches like an axon. Some doors respond instantly. Others ignore you—as if your brain never noticed them.",
      choices: [
        { label: "Investigate the Thalamic Hub", to: "thalamus" },
        { label: "Search for Memory Access (Hippocampus)", to: "hippocampus_gate" }
      ]
    },
    thalamus: {
      title: "Thalamic Hub",
      body: "Signals arrive here before they become experience. A console asks: ROUTE SENSATION OR ROUTE ACTION?",
      choices: [
        { label: "Route sensation (perception first)", to: "perception_room" },
        { label: "Route action (response first)", to: "action_room" }
      ]
    },
    perception_room: {
      title: "Occipital Flicker",
      body: "The room’s edges blur. Visual fragments drift like broken frames. When you focus, the image stabilizes.",
      choices: [
        { label: "Continue deeper", to: "hall" }
      ]
    },
    action_room: {
      title: "Motor Preparation",
      body: "You feel the decision forming before you 'decide.' The system notes: CONTROLLED vs AUTOMATIC processing.",
      choices: [
        { label: "Continue deeper", to: "hall" }
      ]
    },
    hippocampus_gate: {
      title: "Memory Gate",
      body: "A lock shaped like a folded map. It will not open unless your baseline shows you can differentiate encoding from retrieval.",
      choices: [
        { label: "Run Baseline Calibration", action: "BEGIN_BASELINE_QUIZ" },
        { label: "Return to the hall", to: "hall" }
      ]
    }
  }
};

