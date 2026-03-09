'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions, getGroupByMember, type Member } from '@/lib/data'
import BackButton from './BackButton'

interface Props {
  member: Member
  onBack: () => void
}

export default function QuestionsScreen({ member, onBack }: Props) {
  const [showRole, setShowRole] = useState(false)
  const group = getGroupByMember(member.id)
  const groupQuestions = group
    ? questions.filter((q) => group.questionIds.includes(q.id))
    : questions.slice(0, 5)

  return (
    <motion.div
      key="questions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-dvh px-4 pb-10 pt-8"
    >
      <div className="mx-auto max-w-sm">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6 flex items-center justify-between"
        >
          <BackButton onClick={onBack} label="Cargo" />

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
              {member.cargo}
            </span>
            <button
              onClick={() => setShowRole(!showRole)}
              className="rounded-full bg-elevated p-2 text-dim transition-colors active:bg-edge active:text-cream"
              aria-label="Ver instruções"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Collapsible role instructions */}
        <AnimatePresence>
          {showRole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="glass-panel rounded-2xl px-5 py-4">
                <p className="text-xs leading-relaxed text-cream-dim">
                  {member.instructions}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-5 text-lg font-bold text-cream"
        >
          Questões da Atividade
        </motion.h2>

        {/* Question cards */}
        <div className="space-y-4">
          {groupQuestions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
              className="glass-panel rounded-2xl p-5"
            >
              <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">
                {q.id}
              </div>
              <p className="text-sm leading-relaxed text-cream-dim">
                {q.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-center text-xs text-dim"
        >
          Discutam as questões em grupo seguindo as instruções do seu cargo.
        </motion.p>
      </div>
    </motion.div>
  )
}
