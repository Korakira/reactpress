import { translate } from '@docusaurus/Translate';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import React from 'react';

import sectionStyles from '../section.module.css';
import styles from './styles.module.css';

type Pillar = {
  title: string;
  tagline: string;
  description: string;
  accent: 'build' | 'manage' | 'extend' | 'ai';
};

const pillars: Pillar[] = [
  {
    title: translate({ message: 'Write', id: 'home.platform.build.title' }),
    tagline: translate({ message: 'Built-in Admin.', id: 'home.platform.build.tagline' }),
    description: translate({
      message: 'Posts, pages, and media in one calm editor — stay in flow, not in tooling.',
      id: 'home.platform.build.desc',
    }),
    accent: 'build',
  },
  {
    title: translate({ message: 'Manage', id: 'home.platform.manage.title' }),
    tagline: translate({ message: 'Headless + plugins.', id: 'home.platform.manage.tagline' }),
    description: translate({
      message: 'Extend Admin and API without forking — content stays self-hosted and under your control.',
      id: 'home.platform.manage.desc',
    }),
    accent: 'manage',
  },
  {
    title: translate({ message: 'Publish', id: 'home.platform.extend.title' }),
    tagline: translate({ message: 'Next.js themes on npm.', id: 'home.platform.extend.tagline' }),
    description: translate({
      message: 'Swap the look, keep the content — normal Next.js apps, not a locked platform runtime.',
      id: 'home.platform.extend.desc',
    }),
    accent: 'extend',
  },
  {
    title: translate({ message: 'AI', id: 'home.platform.ai.title' }),
    tagline: translate({ message: 'Your key. Your call.', id: 'home.platform.ai.tagline' }),
    description: translate({
      message: 'Draft with your own API key — AI assists, you approve before anything publishes.',
      id: 'home.platform.ai.desc',
    }),
    accent: 'ai',
  },
];

export default function Platform() {
  return (
    <section className={clsx(sectionStyles.section, sectionStyles.bandB)} aria-labelledby="home-platform-heading">
      <div className={sectionStyles.inner}>
        <header className={sectionStyles.header}>
          <p className={sectionStyles.eyebrow}>
            <Translate id="home.platform.eyebrow">What is ReactPress</Translate>
          </p>
          <h2 id="home-platform-heading" className={clsx(sectionStyles.heading, sectionStyles.fadeUp)}>
            <Translate id="home.platform.title">Write. Manage. Publish.</Translate>
          </h2>
          <p className={clsx(sectionStyles.subheading, sectionStyles.fadeUpDelay)}>
            <Translate id="home.platform.subtitle">
              One CLI starts CMS, Admin, theme, and plugins — a full publishing stack without stitching five tools
              together.
            </Translate>
          </p>
        </header>
        <div className={styles.grid}>
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={styles.card}
              data-accent={pillar.accent}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className={styles.step} aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.tagline}>{pillar.tagline}</p>
              <p className={styles.cardDesc}>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
