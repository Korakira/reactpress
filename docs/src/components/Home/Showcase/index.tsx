import Translate, { translate } from '@docusaurus/Translate';
import { SHOWCASE_SITES, SHOWCASE_SUBMIT_URL, type ShowcaseKind } from '@site/src/constants/showcase';
import clsx from 'clsx';
import React from 'react';

import sectionStyles from '../section.module.css';
import styles from './styles.module.css';

function kindBadge(kind: ShowcaseKind): string {
  switch (kind) {
    case 'dogfood':
      return translate({
        id: 'home.showcase.badge.dogfood',
        message: 'Official dogfood',
      });
    case 'theme-demo':
      return translate({
        id: 'home.showcase.badge.themeDemo',
        message: 'Theme demo',
      });
    default:
      return translate({
        id: 'home.showcase.badge.community',
        message: 'Community',
      });
  }
}

function siteCopy(id: string): { title: string; description: string } {
  switch (id) {
    case 'gaoredu':
      return {
        title: translate({
          id: 'home.showcase.gaoredu.title',
          message: 'gaoredu.com',
        }),
        description: translate({
          id: 'home.showcase.gaoredu.desc',
          message: 'Maintainer production site — content, theme, and SEO running on ReactPress day to day.',
        }),
      };
    case 'theme-starter':
      return {
        title: translate({
          id: 'home.showcase.themeStarter.title',
          message: 'Theme Starter',
        }),
        description: translate({
          id: 'home.showcase.themeStarter.desc',
          message: 'Official Next.js starter live — search, comments, knowledge base layout, and SSR SEO patterns.',
        }),
      };
    default:
      return { title: id, description: '' };
  }
}

export default function Showcase() {
  return (
    <section className={clsx(sectionStyles.section, sectionStyles.bandB)} aria-labelledby="home-showcase-heading">
      <div className={sectionStyles.inner}>
        <header className={sectionStyles.header}>
          <p className={sectionStyles.eyebrow}>
            <Translate id="home.showcase.eyebrow">Sites</Translate>
          </p>
          <h2 id="home-showcase-heading" className={clsx(sectionStyles.heading, sectionStyles.fadeUp)}>
            <Translate id="home.showcase.title">Sites powered by ReactPress</Translate>
          </h2>
          <p className={clsx(sectionStyles.subheading, sectionStyles.fadeUpDelay)}>
            <Translate id="home.showcase.subtitle">
              Official dogfood and theme demo today — community sites after a short review.
            </Translate>
          </p>
        </header>

        <div className={styles.grid}>
          {SHOWCASE_SITES.map((site, index) => {
            const copy = siteCopy(site.id);
            return (
              <a
                key={site.id}
                className={styles.card}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <p className={styles.badge}>{kindBadge(site.kind)}</p>
                <h3 className={styles.cardTitle}>{copy.title}</h3>
                <p className={styles.cardDesc}>{copy.description}</p>
                <span className={styles.host}>{site.name}</span>
              </a>
            );
          })}
        </div>

        <div className={styles.footer}>
          <a className={styles.submit} href={SHOWCASE_SUBMIT_URL} target="_blank" rel="noopener noreferrer">
            <Translate id="home.showcase.submit">Submit your site</Translate>
          </a>
          <p className={styles.hint}>
            <Translate id="home.showcase.submitHint">
              Open the GitHub issue with your URL, use case, and a one-line story. We review before listing.
            </Translate>
          </p>
        </div>
      </div>
    </section>
  );
}
