'use client'

import { motion } from 'framer-motion'

interface Props {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: Props) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative flex min-h-dvh flex-col items-center justify-center px-6"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-accent opacity-[0.04] blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[60%] w-[40%] rounded-full bg-sage opacity-[0.03] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm text-center"
      >
        {/* Logo mark */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-cream/5 bg-surface/60 backdrop-blur-xl">
          <svg
            className="h-10 w-10 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
        </div>

        {/* Badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-mono text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Harven Agribusiness School
        </div>

        {/* Title */}
        <h1 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-bold italic text-cream">
          Cultura e Desempenho Organizacional
        </h1>
        <p className="mb-10 text-base leading-relaxed text-cream-dim">
          Atividade em grupo. Cada membro receberá um cargo com instruções
          específicas para contribuir na discussão.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-background shadow-lg shadow-accent/10 transition-all active:scale-[0.98] hover:bg-accent-hover"
        >
          Começar
        </button>
      </motion.div>
    </motion.div>
  )
}
