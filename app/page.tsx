'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from '@/components/WelcomeScreen'
import SelectGroupScreen from '@/components/SelectGroupScreen'
import SelectNameScreen from '@/components/SelectNameScreen'
import RoleRevealScreen from '@/components/RoleRevealScreen'
import QuestionsScreen from '@/components/QuestionsScreen'
import { getMemberById, getGroupByMember, type Member, type Group } from '@/lib/data'

type Screen = 'welcome' | 'group' | 'name' | 'role' | 'questions'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [member, setMember] = useState<Member | null>(null)

  // Restore session
  useEffect(() => {
    try {
      const savedId = sessionStorage.getItem('cwb-member-id')
      const savedScreen = sessionStorage.getItem('cwb-screen') as Screen | null
      if (savedId) {
        const m = getMemberById(savedId)
        if (m) {
          const g = getGroupByMember(savedId)
          setMember(m)
          setSelectedGroup(g ?? null)
          setScreen(savedScreen === 'questions' ? 'questions' : 'role')
        }
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [])

  function persist(memberId: string, s: Screen) {
    try {
      sessionStorage.setItem('cwb-member-id', memberId)
      sessionStorage.setItem('cwb-screen', s)
    } catch {
      // ignore
    }
  }

  function handleSelectGroup(group: Group) {
    setSelectedGroup(group)
    setScreen('name')
  }

  function handleSelectMember(m: Member) {
    setMember(m)
    persist(m.id, 'role')
    setScreen('role')
  }

  function handleGoToQuestions() {
    if (member) persist(member.id, 'questions')
    setScreen('questions')
  }

  function handleBackToRole() {
    if (member) persist(member.id, 'role')
    setScreen('role')
  }

  function handleReset() {
    setMember(null)
    setSelectedGroup(null)
    try {
      sessionStorage.removeItem('cwb-member-id')
      sessionStorage.removeItem('cwb-screen')
    } catch {
      // ignore
    }
  }

  return (
    <main className="min-h-dvh bg-background">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <WelcomeScreen onStart={() => setScreen('group')} />
        )}
        {screen === 'group' && (
          <SelectGroupScreen
            onSelect={handleSelectGroup}
            onBack={() => setScreen('welcome')}
          />
        )}
        {screen === 'name' && selectedGroup && (
          <SelectNameScreen
            group={selectedGroup}
            onSelect={handleSelectMember}
            onBack={() => setScreen('group')}
          />
        )}
        {screen === 'role' && member && (
          <RoleRevealScreen
            member={member}
            onContinue={handleGoToQuestions}
            onBack={() => {
              handleReset()
              setScreen('group')
            }}
          />
        )}
        {screen === 'questions' && member && (
          <QuestionsScreen member={member} onBack={handleBackToRole} />
        )}
      </AnimatePresence>
    </main>
  )
}
