import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import styles from './styles.module.css';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return reduced;
}

export default function HeroVideo() {
  const videoSrc = useBaseUrl('/video/ReactPress.mp4');
  const posterSrc = useBaseUrl('/video/ReactPress-poster.jpg');
  const labelId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const applyMute = useCallback((next: boolean) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = next;
    setMuted(next);
  }, []);

  const play = useCallback(
    async (preferUnmuted = true) => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      const tryPlay = async (withSound: boolean) => {
        applyMute(!withSound);
        await video.play();
        setPlaying(true);
        setStarted(true);
        userPausedRef.current = false;
      };

      try {
        await tryPlay(preferUnmuted);
      } catch {
        if (preferUnmuted) {
          try {
            // Browsers often block unmuted autoplay — keep film running, sound optional.
            await tryPlay(false);
            return;
          } catch {
            setPlaying(false);
            return;
          }
        }
        setPlaying(false);
      }
    },
    [applyMute]
  );

  const pause = useCallback((fromUser = false) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.pause();
    setPlaying(false);
    if (fromUser) {
      userPausedRef.current = true;
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (playing) {
      pause(true);
    } else {
      void play(true);
    }
  }, [pause, play, playing]);

  const toggleMute = useCallback(() => {
    applyMute(!muted);
  }, [applyMute, muted]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          if (!userPausedRef.current) {
            void play(true);
          }
        } else {
          pause(false);
        }
      },
      { threshold: [0, 0.45, 0.75] }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [pause, play, reducedMotion]);

  const playLabel = started
    ? translate({ message: 'Resume video', id: 'home.hero.video.resume' })
    : translate({ message: 'Play ReactPress film', id: 'home.hero.video.play' });

  return (
    <div ref={stageRef} className={styles.videoStage} role="region" aria-labelledby={labelId}>
      <p id={labelId} className={styles.srOnly}>
        <Translate id="home.hero.video.aria">ReactPress promotional film</Translate>
      </p>

      <div className={styles.mediaGlow} aria-hidden />

      <div className={styles.mediaFrame}>
        <div className={styles.videoViewport}>
          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            poster={posterSrc}
            playsInline
            loop
            muted={muted}
            preload="metadata"
            onPlay={() => {
              setPlaying(true);
              setStarted(true);
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <Translate id="home.hero.video.fallback">Your browser does not support embedded video.</Translate>
          </video>

          {!reducedMotion && !playing ? (
            <button
              type="button"
              className={clsx(styles.playOverlay, started && styles.playOverlayResume)}
              onClick={togglePlay}
              aria-label={playLabel}
            >
              <span className={styles.playButton} aria-hidden>
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          ) : null}
        </div>

        <div className={styles.videoChrome}>
          <p className={styles.videoLabel}>
            <Translate id="home.hero.video.label">Product film</Translate>
          </p>
          <div className={styles.videoActions}>
            <button
              type="button"
              className={styles.videoControl}
              onClick={togglePlay}
              aria-label={playing ? translate({ message: 'Pause video', id: 'home.hero.video.pause' }) : playLabel}
            >
              {playing ? (
                <Translate id="home.hero.video.pauseShort">Pause</Translate>
              ) : (
                <Translate id="home.hero.video.playShort">Play</Translate>
              )}
            </button>
            <button
              type="button"
              className={styles.videoControl}
              onClick={toggleMute}
              aria-label={
                muted
                  ? translate({ message: 'Unmute video', id: 'home.hero.video.unmute' })
                  : translate({ message: 'Mute video', id: 'home.hero.video.mute' })
              }
            >
              {muted ? (
                <Translate id="home.hero.video.unmuteShort">Unmute</Translate>
              ) : (
                <Translate id="home.hero.video.muteShort">Mute</Translate>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.videoMeta}>
        <p className={styles.videoMetaTitle}>
          <Translate id="home.hero.video.title">One CLI. Full publishing stack.</Translate>
        </p>
        <p className={styles.videoMetaCaption}>
          <Translate id="home.hero.video.caption">
            From init to Site, Admin, and API — open-source, self-hosted publishing without the ops tax.
          </Translate>
        </p>
      </div>
    </div>
  );
}
