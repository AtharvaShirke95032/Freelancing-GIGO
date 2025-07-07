// Bento.jsx
import './Bento.scss';

const features = [
  {
    icon: "📈",
    title: "Scalability",
    description: "Whether you're a startup or a large business, scale your freelance team with ease as your project demands grow.",
  },
  {
    icon: "🔒",
    title: "Security",
    description: "All transactions are protected with our escrow system—your funds are only released when you're satisfied.",
  },
  {
    icon: "🤝",
    title: "Support",
    description: "Need help? Our dedicated support team is always available to assist both clients and freelancers.",
  },
  {
    icon: "🚀",
    title: "Fast Hiring Process",
    description:
      "Post a job, get quality proposals, and start your project—all within hours, not days.",
  },
  {
    icon: "📊",
    title: "Analytics",
    description:
      "Track freelancer performance, budget usage, and project timelines with powerful built-in analytics",
  },
];

const Bento = () => {
  return (
    <section className="bento-section">
      <h2>Features</h2>
      <div className="bento-grid">
        {features.map((feature, index) => (
          <div className="bento-card" key={index}>
            <div className="bento-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bento;
