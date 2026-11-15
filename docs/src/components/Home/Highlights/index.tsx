import { translate } from '@docusaurus/Translate';
import Translate from '@docusaurus/Translate';
import { IconApi, IconDesktop, IconLayers, IconPen, IconThemes } from '@site/src/components/Home/icons';
import clsx from 'clsx';
import React from 'react';

import sectionStyles from '../section.module.css';
import styles from './styles.module.css';

type HighlightItem = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent: 'teal' | 'cyan' | 'blue';
};

const items: HighlightItem[] = [
  {
    Icon: IconPen,
    title: translate({ message: 'Blogs that rank', id: 'home.highlight.writing.title' }),
    description: translate({
      message: 'Personal or team blogs with Markdown, SSR SEO, sitemap, and OG — ready to publish, not assemble.',
      id: 'home.highlight.writing.desc',
    }),
    accent: 'teal',
  },
  {
    Icon: IconLayers,
    title: translate({ message: 'Docs & changelogs', id: 'home.highlight.themes.title' }),
    description: translate({
      message: 'Ship documentation and release notes from a real CMS — structured content, not a static-only stack.',
      id: 'home.highlight.themes.desc',
    }),
    accent: 'cyan',
  },
  {
    Icon: IconThemes,
    title: translate({ message: 'Marketing sites', id: 'home.highlight.plugins.title' }),
    description: translate({
      message: 'Pages, media, and swappable Next.js themes — product and company sites you can actually own.',
      id: 'home.highlight.plugins.desc',
    }),
    accent: 'blue',
  },
  {
    Icon: IconDesktop,
    title: translate({ message: 'Local-first writing', id: 'home.highlight.desktop.title' }),
    description: translate({
      message: 'Desktop app with local SQLite — write offline, sync to a remote API when you are ready.',
      id: 'home.highlight.desktop.desc',
    }),
    accent: 'teal',
  },
  {
    Icon: IconApi,
    title: translate({ message: 'Headless React apps', id: 'home.highlight.multidevice.title' }),
    description: translate({
      message: 'REST APIs, keys, and webhooks — feed any React client while Admin stays the source of truth.',
      id: 'home.highlight.multidevice.desc',
    }),
    accent: 'cyan',
  },
];

export default function Highlights() {
  return (
    <section className={sectionStyles.section} aria-labelledby="home-highlights-heading">
      <div className={sectionStyles.inner}>
        <header className={sectionStyles.header}>
          <p className={sectionStyles.eyebrow}>
            <Translate id="home.highlights.eyebrow">What you can ship</Translate>
          </p>
          <h2 id="home-highlights-heading" className={clsx(sectionStyles.heading, sectionStyles.fadeUp)}>
            <Translate id="home.highlights.title">Built for real publishing outcomes</Translate>
          </h2>
          <p className={clsx(sectionStyles.subheading, sectionStyles.fadeUpDelay)}>
            <Translate id="home.highlights.subtitle">
              From a focused blog to a headless content app — pick the surface you need, keep the same core.
            </Translate>
          </p>
        </header>
        <div className={styles.grid}>
          {items.map((item, index) => (
            <article
              key={item.title}
              className={styles.item}
              data-accent={item.accent}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span className={styles.iconWrap} aria-hidden>
                <item.Icon className={styles.icon} />
              </span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
