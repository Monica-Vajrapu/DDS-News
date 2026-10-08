import { Article } from '../types/news';

export const DEFAULT_CATEGORIES: string[] = [
  'DDS Expo AI',
  'Artificial Intelligence',
  'Cloud & DevOps',
  'Semiconductors',
  'Cybersecurity',
  'Startups & Tech'
];

export const IMAGE_PRESETS = [
  {
    label: 'DDS Expo AI Keynote',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption: 'DDS Expo AI Keynote stage and developer showcase'
  },
  {
    label: 'Autonomous AI Agents',
    url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Next-generation neural architecture & cognitive reasoning'
  },
  {
    label: 'Cloud & Modern Datacenter',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-density GPU cloud infrastructure and edge compute clusters'
  },
  {
    label: 'Silicon & AI Chips',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sub-2nm semiconductor wafers accelerating on-device inferencing'
  },
  {
    label: 'Cybersecurity & Quantum',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Post-quantum encryption shields enterprise enterprise workloads'
  },
  {
    label: 'Robotics & Automation',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Humanoid robotics system trained with multimodal vision agents'
  }
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'dds-expo-ai-flagship-1',
    title: 'DDS Expo AI 2026 Summit Unveils Next-Gen Autonomous Agents and Enterprise Architecture',
    summary: 'The DDS Expo AI flagship keynote brought together global tech pioneers to demonstrate sub-100ms multi-agent reasoning, self-healing code systems, and decentralized inferencing.',
    content: `The global technology landscape witnessed a major inflection point today at DDS Expo AI 2026. The summit kicked off with keynote revelations focusing on autonomous multi-agent workflows, unified foundation models, and scalable edge computing architectures.

Industry leaders demonstrated how next-generation agents move beyond simple conversational bots to fully autonomous task orchestration. These systems can analyze real-time streaming telemetry, orchestrate cross-platform pipelines, and generate validated production code in seconds.

"The goal of DDS Expo AI is to make bleeding-edge AI models practical, observable, and secure for modern engineering teams," noted the keynote dispatch. "We are seeing the transition from experimental prototypes into resilient enterprise engines that solve complex real-world workflows."

Engineering demonstrations also showcased sub-100ms reasoning benchmarks, hybrid on-device inferencing for privacy compliance, and open tooling standards that empower developers to integrate intelligent systems without vendor lock-in.`,
    category: 'DDS Expo AI',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Opening address at the DDS Expo AI 2026 Technology Pavilion.',
    author: 'DDS News Editorial Bureau',
    publishedAt: 'Just now',
    readTime: '3 min read',
    highlights: [
      'Sub-100ms cognitive reasoning latency demonstrated on live stage',
      'Autonomous multi-agent orchestration for enterprise workflows',
      'Unified open tooling architecture to eliminate vendor lock-in'
    ],
    isBreaking: true,
    isFeatured: true,
    views: 1420,
    likes: 86,
    comments: [
      {
        id: 'c1',
        author: 'Alex Chen',
        text: 'The sub-100ms latency demonstration was mind-blowing. Great breakdown!',
        date: '10m ago'
      }
    ]
  },
  {
    id: 'ai-agents-scaling-2',
    title: 'Multi-Modal Reasoning Engines Enter Production: How Teams Are Modernizing Workflows',
    summary: 'Software engineering organizations are adopting agentic code generation and visual reasoning models to accelerate feature deployment cycles by over 40%.',
    content: `Engineering leadership across top tech firms are accelerating their migration to multi-modal reasoning engines. Recent industry surveys reveal that over 65% of engineering organizations have deployed autonomous code verification assistants in staging environments.

By integrating multi-modal context—including architectural diagrams, database schemas, and performance benchmarks—developers are reporting a 40% reduction in debug cycles and faster deployment velocities.`,
    category: 'Artificial Intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Visualizing neural network node connections and multi-agent consensus.',
    author: 'Sarah Jenkins',
    publishedAt: '2 hours ago',
    readTime: '4 min read',
    highlights: [
      'Over 65% of surveyed engineering organizations deploying agentic systems',
      '40% reduction in debugging and regression resolution times'
    ],
    isBreaking: false,
    isFeatured: false,
    views: 890,
    likes: 42,
    comments: []
  },
  {
    id: 'cloud-gpu-clusters-3',
    title: 'Next-Gen Cloud Datacenters Deploy Liquid Cooling to Double AI Compute Efficiency',
    summary: 'Hyperscalers and specialized cloud providers are retrofitting server racks with direct-to-chip liquid cooling to manage 1000W+ accelerated processors.',
    content: `As artificial intelligence models scale in parameters, power and thermal management have become paramount engineering challenges. Cloud infrastructure operators are adopting advanced direct-to-chip liquid cooling loops that allow dense rack configurations exceeding 100 kW per enclosure.

These innovations deliver a 30% reduction in total facility energy draw while unlocking sustained peak clock frequencies for training and inferencing workloads.`,
    category: 'Cloud & DevOps',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'High-density server clusters equipped with closed-loop thermal heat sinks.',
    author: 'David Kumar',
    publishedAt: '4 hours ago',
    readTime: '5 min read',
    highlights: [
      'Direct-to-chip liquid cooling enables 100 kW+ power density per rack',
      'Energy efficiency gains lower operational footprint across cloud regions'
    ],
    isBreaking: false,
    isFeatured: false,
    views: 650,
    likes: 31,
    comments: []
  },
  {
    id: 'silicon-2nm-wafers-4',
    title: 'Semiconductor Foundries Tape Out First Commercial 2nm Process Nodes',
    summary: 'Foundries report breakthrough yield numbers for gate-all-around nanosheet transistors, setting the stage for faster on-device neural processing.',
    content: `The race for silicon miniaturization reached a crucial milestone with the first commercial tape-outs of 2nm process technology. The new transistor architecture replaces traditional FinFETs with Gate-All-Around (GAA) nanosheets, offering a 15% clock speed boost at equivalent power.

Mass production is slated to supply upcoming enterprise servers and flagship mobile neural processing units.`,
    category: 'Semiconductors',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Cleanroom technician inspecting high-purity silicon wafers under UV light.',
    author: 'Elena Rostova',
    publishedAt: '6 hours ago',
    readTime: '3 min read',
    highlights: [
      'Gate-All-Around nanosheets replace traditional FinFET transistors',
      '15% frequency improvement with up to 30% power savings'
    ],
    isBreaking: false,
    isFeatured: false,
    views: 520,
    likes: 27,
    comments: []
  }
];
