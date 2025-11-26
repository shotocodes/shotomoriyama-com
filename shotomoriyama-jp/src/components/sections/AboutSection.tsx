// src/components/sections/AboutSection.tsx
'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/src/lib/constants/content';

export default function AboutSection() {
  const { about } = siteContent;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {about.title}
          </h2>
          <p className="text-text-secondary">{about.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-background-alt border-4 border-accent flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">SM</span>
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2">
              {about.name}
            </h3>
            <p className="text-text-secondary">{about.role}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg mx-auto">
            <div className="text-text-primary leading-relaxed whitespace-pre-line">
              {about.content}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
