// src/components/sections/PriceSection.tsx
'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/src/lib/constants/content';

export default function PriceSection() {
  const { price } = siteContent;

  return (
    <section id="price" className="py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-primary mb-6 tracking-wider">
            P R I C E
          </h2>
          <p className="text-lg text-text-secondary">{price.subtitle}</p>
        </motion.div>

        {/* Price Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {price.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background-alt p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-accent"
            >
              {/* Icon */}
              <div className="text-6xl mb-4">{plan.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-primary mb-2">
                {plan.title}
              </h3>

              {/* Subtitle */}
              <p className="text-text-secondary mb-4">{plan.subtitle}</p>

              {/* Price */}
              <div className="text-4xl font-bold text-accent mb-6">
                {plan.price}
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-text-secondary"
                  >
                    <span className="text-accent mr-2 text-lg">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Maintenance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto bg-gradient-to-r from-accent/10 to-primary/10 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">
            {price.maintenance.title}
          </h3>
          <div className="text-3xl font-bold text-accent text-center mb-6">
            {price.maintenance.price}
          </div>
          <ul className="space-y-2">
            {price.maintenance.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start text-sm text-text-secondary"
              >
                <span className="text-accent mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-text-muted mt-12 text-sm"
        >
          {price.note}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg text-lg"
          >
            お見積りのご相談
          </a>
        </motion.div>
      </div>
    </section>
  );
}
