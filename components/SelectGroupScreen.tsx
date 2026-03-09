'use client'

import { motion } from 'framer-motion'
import { groups, type Group } from '@/lib/data'
import BackButton from './BackButton'

interface Props {
  onSelect: (group: Group) => void
  onBack: () => void
}

export default function SelectGroupScreen({ onSelect, onBack }: Props) {
  return (
    <motion.div
      key="group"
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
          <h2 className="mb-2 text-xl font-bold text-cream">
            Selecione seu grupo
          </h2>
          <p className="text-sm text-dim">
            Encontre o tema do seu grupo de trabalho
          </p>
        </motion.div>

        {/* Group cards */}
        <div className="space-y-3">
          {groups.map((group, i) => (
            <motion.button
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
              onClick={() => onSelect(group)}
              className="glass-panel flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all active:scale-[0.98] hover:border-accent/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-cream">
                  {group.theme}
                </p>
                <p className="text-xs text-dim">
                  {group.members.length} membros
                </p>
              </div>
              <svg
                className="ml-auto h-4 w-4 text-dim"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
