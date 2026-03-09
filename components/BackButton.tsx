'use client'

interface Props {
  onClick: () => void
  label?: string
}

export default function BackButton({ onClick, label = 'Voltar' }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-dim transition-colors active:text-accent hover:text-cream"
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
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      {label}
    </button>
  )
}
