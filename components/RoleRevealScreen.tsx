'use client'

import { motion } from 'framer-motion'
import type { Member } from '@/lib/data'
import BackButton from './BackButton'

interface Props {
  member: Member
  onContinue: () => void
  onBack: () => void
}

export default function RoleRevealScreen({ member, onContinue, onBack }: Props) {
  return (
    <motion.div
      key="role"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative flex min-h-dvh flex-col items-center justify-center px-4"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[40%] w-[60%] -translate-x-1/2 rounded-full bg-accent opacity-[0.04] blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mb-6"
        >
          <BackButton onClick={onBack} />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-center text-sm text-dim"
        >
          Olá, <span className="font-semibold text-cream">{member.name}</span>
        </motion.p>

        {/* Role card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="overflow-hidden rounded-3xl border border-cream/5 bg-surface shadow-xl glow-accent"
        >
          {/* Cargo header */}
          <div className="bg-gradient-to-br from-accent-dim to-accent px-6 py-6 text-center">
            <p className="mb-1 text-xs font-mono uppercase tracking-wider text-background/60">
              Seu cargo
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold italic text-background">
              {member.cargo}
            </h2>
            {member.cargoDescription && (
              <p className="mt-2 text-xs text-background/50 leading-relaxed">
                {member.cargoDescription}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="px-6 py-6">
            <p className="mb-2 text-xs font-mono uppercase tracking-wider text-dim">
              Suas instruções
            </p>
            <p className="text-sm leading-relaxed text-cream-dim">
              {member.instructions}
            </p>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 rounded-2xl border border-sage/10 bg-sage/5 px-5 py-3.5 text-center"
        >
          <p className="text-xs leading-relaxed text-sage">
            <span className="font-semibold">Importante:</span> Não mostre esta
            tela para os outros membros do grupo. Cada pessoa tem instruções
            específicas.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={onContinue}
          className="mt-6 w-full rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-background shadow-lg shadow-accent/10 transition-all active:scale-[0.98] hover:bg-accent-hover"
        >
          Ver Questões
        </motion.button>
      </div>
    </motion.div>
  )
}
