'use client'

import { useState } from 'react'
import { groups, questions } from '@/lib/data'

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState('')

  if (!unlocked) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="w-full max-w-xs text-center">
          <h1 className="mb-6 text-lg font-bold text-cream">
            Painel do Apresentador
          </h1>
          <input
            type="password"
            placeholder="PIN de acesso"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && pin === '2026') setUnlocked(true)
            }}
            className="mb-3 w-full rounded-xl border border-edge bg-surface px-4 py-3 text-center text-sm text-cream outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            onClick={() => pin === '2026' && setUnlocked(true)}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background"
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  const totalMembers = groups.reduce((s, g) => s + g.members.length, 0)
  const totalImpostors = groups.reduce(
    (s, g) => s + g.members.filter((m) => m.role === 'impostor').length,
    0,
  )

  return (
    <div className="min-h-dvh bg-background px-4 pb-10 pt-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-1 text-xl font-bold text-cream">
          Painel do Apresentador
        </h1>
        <p className="mb-8 text-sm text-dim">
          {totalMembers} participantes &middot; {totalImpostors} impostores
          &middot; {groups.length} grupos
        </p>

        {/* Groups */}
        <div className="space-y-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden rounded-2xl border border-edge bg-surface"
            >
              <div className="border-b border-edge px-5 py-3">
                <h2 className="text-sm font-bold text-cream">
                  {group.theme}
                </h2>
                <p className="text-xs text-dim">
                  {group.members.length} membros &middot;{' '}
                  {group.members.filter((m) => m.role === 'impostor').length}{' '}
                  impostor(es)
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-edge bg-elevated text-dim">
                      <th className="px-5 py-2 font-medium">Nome</th>
                      <th className="px-5 py-2 font-medium">Cargo</th>
                      <th className="px-5 py-2 font-medium">Papel</th>
                      <th className="px-5 py-2 font-medium">CWB</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-edge">
                    {group.members.map((m) => (
                      <tr
                        key={m.id}
                        className={
                          m.role === 'impostor' ? 'bg-red-950/20' : ''
                        }
                      >
                        <td className="px-5 py-2.5 font-medium text-cream">
                          {m.name}
                        </td>
                        <td className="px-5 py-2.5 text-cream-dim">
                          {m.cargo}
                        </td>
                        <td className="px-5 py-2.5">
                          {m.role === 'impostor' ? (
                            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-red-400">
                              impostor
                            </span>
                          ) : (
                            <span className="rounded-full bg-sage/20 px-2 py-0.5 text-[10px] font-bold uppercase text-sage">
                              normal
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-2.5 text-cream-dim">
                          {m.cwbLabel ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Questions */}
        <h2 className="mb-4 mt-10 text-lg font-bold text-cream">Questões</h2>
        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q.id}
              className="rounded-xl border border-edge bg-surface p-4"
            >
              <span className="mr-2 text-xs font-bold text-accent">
                Q{q.id}
              </span>
              <span className="text-sm text-cream-dim">{q.text}</span>
            </div>
          ))}
        </div>

        {/* CWB Legend */}
        <h2 className="mb-4 mt-10 text-lg font-bold text-cream">
          Legenda CWB
        </h2>
        <div className="overflow-hidden rounded-2xl border border-edge bg-surface">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-edge bg-elevated text-dim">
                <th className="px-5 py-2 font-medium">Cargo Fake</th>
                <th className="px-5 py-2 font-medium">CWB Real</th>
                <th className="px-5 py-2 font-medium">Base Teórica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge text-cream-dim">
              <tr>
                <td className="px-5 py-2.5">Facilitador</td>
                <td className="px-5 py-2.5 font-medium text-accent">O Dominador</td>
                <td className="px-5 py-2.5">Agressão Pessoal (Robinson &amp; Bennett)</td>
              </tr>
              <tr>
                <td className="px-5 py-2.5">Consultor Técnico</td>
                <td className="px-5 py-2.5 font-medium text-accent">O Desinformador</td>
                <td className="px-5 py-2.5">Sabotagem (Spector et al.)</td>
              </tr>
              <tr>
                <td className="px-5 py-2.5">Apoio Logístico</td>
                <td className="px-5 py-2.5 font-medium text-accent">O Free Rider</td>
                <td className="px-5 py-2.5">Retraimento (Spector et al.)</td>
              </tr>
              <tr>
                <td className="px-5 py-2.5">Mediador</td>
                <td className="px-5 py-2.5 font-medium text-accent">O Fofoqueiro</td>
                <td className="px-5 py-2.5">Desvio Político (Robinson &amp; Bennett)</td>
              </tr>
              <tr>
                <td className="px-5 py-2.5">Especialista</td>
                <td className="px-5 py-2.5 font-medium text-accent">O Sabotador Passivo</td>
                <td className="px-5 py-2.5">Desvio de Produção (Robinson &amp; Bennett)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
