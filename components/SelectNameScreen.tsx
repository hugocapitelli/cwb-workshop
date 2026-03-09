'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Group, Member } from '@/lib/data'
import BackButton from './BackButton'

interface Props {
  group: Group
  onSelect: (member: Member) => void
  onBack: () => void
}

export default function SelectNameScreen({ group, onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<Member | null>(null)

  return (
    <motion.div
      key="name"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-dvh px-4 pb-10 pt-12"
    >
      <div className="mx-auto max-w-sm">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="mb-8"
        >
          <BackButton onClick={onBack} />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-mono text-accent">
            {group.theme}
          </div>
          <h2 className="mb-2 text-xl font-bold text-cream">
            Selecione seu nome
          </h2>
          <p className="text-sm text-dim">
            Toque no seu nome para receber seu cargo
          </p>
        </motion.div>

        {/* Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-panel overflow-hidden rounded-2xl"
        >
          <div className="divide-y divide-cream/5">
            {group.members.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelected(member)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors active:bg-accent/5 hover:bg-cream/[0.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-elevated text-sm font-semibold text-cream-dim">
                  {member.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-cream">
                  {member.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full max-w-sm rounded-t-3xl border border-cream/5 bg-surface p-6 shadow-xl sm:m-4 sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
                  {selected.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-cream">
                  Você é {selected.name}?
                </h3>
                <p className="mt-1 text-sm text-dim">
                  Confirme para receber seu cargo e instruções
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 rounded-xl border border-edge px-4 py-3 text-sm font-semibold text-cream-dim transition-colors active:bg-elevated"
                >
                  Voltar
                </button>
                <button
                  onClick={() => onSelect(selected)}
                  className="flex-1 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/10 transition-all active:scale-[0.98]"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
