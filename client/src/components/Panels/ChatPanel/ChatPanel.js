import React from 'react';

import styles from './ChatPanel.module.css';
import ChatSection from '../../Chat/ChatSection';

const ChatPanel = () => {
  // from chatGPT prompts
  const staticChats = [
    'Why is the sky blue?',
    `The sky appears blue due to a phenomenon called Rayleigh scattering. The Earth's atmosphere is composed of various molecules and tiny particles, such as nitrogen and oxygen molecules, as well as dust and water droplets. When sunlight reaches the Earth's atmosphere, it contains a wide range of colors, including all the colors of the visible spectrum: red, orange, yellow, green, blue, indigo, and violet. Imagine flipping a coin. In classical computing, it can either be heads (0) or tails (1), but in quantum computing, a qubit can be in a state that is both heads and tails simultaneously. It's like the qubit is spinning and can be both up and down at once.`,
    'Explain quantum computing in simple terms',
    'Quantum computing is a new and exciting field that uses the principles of quantum mechanics to perform calculations. In classical computing, we use bits to represent information, which can be either a 0 or a 1. But in quantum computing, we use quantum bits, or qubits, which can represent both 0 and 1 at the same time. This is due to a property called superposition.',
    'Got any creative ideas for a 10 year old’s birthday?',
    "Of course! Here are some creative ideas for a 10-year-old's birthday party: Science Party: Organize a science-themed party where the kids can participate in fun experiments and demonstrations. You can hire a science entertainer or set up different stations with hands-on activities like making slime, volcano eruptions, or creating simple chemical reactions.",
  ];
  return (
    <div className={styles.chatPanel}>
      {staticChats.map((msg, index) => (
        <ChatSection key={index} index={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatPanel;