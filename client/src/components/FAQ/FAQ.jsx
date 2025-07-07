import React, { useState } from 'react';
import './FAQ.scss';

const faqs = [
  {
    question: "How do I hire a freelancer?",
    answer: "Simply post a project with your requirements and budget. You'll start receiving proposals from qualified freelancers within minutes.",
  },
  {
    question: "Is it free to create an account?",
    answer: "Yes, creating an account and posting a project is completely free. You only pay when you hire and work with a freelancer.",
  },
 
  {
    question: "Can I communicate with freelancers before hiring?",
    answer: "Absolutely! You can chat with freelancers, ask questions, and review their past work before making a hiring decision.",
  },
 
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-text">
        <h2>Frequently Asked Questions</h2>
        <p>
          Here you’ll find answers to the most commonly asked questions about our services. If you have any other queries, feel free to reach out to our support team for assistance.
        </p>
      </div>
      <div className="faq-items">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <strong>{faq.question}</strong>
              <span>{activeIndex === index ? '▾' : '▸'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
