# OpenAGI

---

A node-based AI workflow system for configuring and running AI Agents using LLMs. The **AI Workflow System** is a node-based workflow where users can create and connect **User Input Nodes, Model Nodes, and Response Nodes** to configure and run an AI Agent powered by a **Large Language Model (LLM)**.

## Project Screenshot

![Project Screenshot](https://res.cloudinary.com/rohanscloud/image/upload/v1739439182/Screenshot_2025-02-13_145107_kfz9j0.png)
![Project Screenshot](https://res.cloudinary.com/rohanscloud/image/upload/v1739439182/Screenshot_2025-02-13_145127_yzdtk3.png)


## Features

- **Dynamic Node Creation** - Users can create and connect multiple nodes dynamically.
- **Caching Model Configurations** - Stores model configurations on deployment for continuous conversations.
- **Undeploying Workflows** - Cleans up model configurations and context data when undeployed.
- **Context-Based Chat Feature** - Supports follow-up questions with conversation history limits.

## Key Components

- **User Input Node** - Captures user prompts.
- **Model Node** - Configures LLM parameters like model name, API key, temperature, etc.
- **Response Node** - Displays AI-generated responses.
- **Workflow Context** - Centralized state management for data consistency.

## Interaction Flow

1. Users input a prompt via the **User Input Node**.
2. The prompt flows to the **Model Node**, applying LLM configurations.
3. Processed data moves to the **Response Node**, displaying AI-generated responses.
4. The **Workflow Context** manages state transitions and context-based interactions.

##  Run Locally

### Prerequisites
- Node.js >= 16.x
- npm 

### Steps
```bash
# Clone the repository
git clone https://https://github.com/theRohan7/Planet-AI.git

# Install dependencies
npm install

# Start the development server
npm run dev  # or yarn dev
```

## 📚 Documentation

Refer to the [Documentation](https://docs.google.com/document/d/1-gR92Gt37kg-eNns8W3UCDXwK2A7g-XuNusC9JPDgds/edit?usp=sharing) for High-Level and Low-Level Design (HLD & LLD)of AI Workflow Node-Based System

Refer to the [Documentation](https://docs.google.com/document/d/1g-qiFcCyIoYH9e2M_rKmqlslG8_7lZIZsEc0VY4fj50/edit?usp=sharing) for Code Architecture Overview and Approach.

## 🔗 Hosted Links

- **Live Demo:** [https://planet-ai-six.vercel.app/](https://planet-ai-six.vercel.app/)

### Feel free to reach out to me for any questions or feedback.

### Thank you for your time and effort.

## Best regards,

Rohan Sahu

LinkedIn: [https://www.linkedin.com/in/rohansahu7/]

Email: [mailto:therohansahu7@gmail.com]

Portfolio: [https://portfolio-five-alpha-31.vercel.app/]


---

Happy Coding! 🚀

