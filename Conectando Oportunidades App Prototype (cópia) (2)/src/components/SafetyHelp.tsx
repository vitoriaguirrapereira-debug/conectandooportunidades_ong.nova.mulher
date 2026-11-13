import { useEffect, useRef, useState } from "react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function SafetyHelp({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onClose, open])

  if (!open) return null

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("180")
      setCopied(true)
    } catch {
      window.prompt("Copie o número abaixo:", "180")
    }
  }

  return (
    <div
      className="safety-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="safety-title"
    >
      <button
        className="safety-modal__backdrop"
        type="button"
        aria-label="Fechar ajuda e segurança"
        onClick={onClose}
      />
      <section className="safety-modal__panel">
        <div className="safety-modal__top">
          <div>
            <span>Ajuda imediata e confidencial</span>
            <h2 id="safety-title">Você não está sozinha</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
        <p>
          Se estiver em risco, escolha uma das opções abaixo. O Ligue 180 é
          gratuito, anônimo e funciona 24 horas em todo o Brasil.
        </p>
        <div className="safety-modal__actions">
          <a className="safety-call-primary" href="tel:180">
            Ligar Agora para 180
            <small>Central de Atendimento à Mulher</small>
          </a>
          <a className="safety-call-emergency" href="tel:190">
            Emergência Policial — Ligar 190
          </a>
          <div className="safety-copy">
            <strong>180</strong>
            <button type="button" onClick={copyNumber}>
              {copied ? "Número copiado" : "Copiar número 180"}
            </button>
          </div>
          <button
            className="safety-quick-exit"
            type="button"
            onClick={() => window.location.replace("https://www.google.com")}
          >
            Saída Rápida (Fechar com Segurança)
          </button>
        </div>
      </section>
    </div>
  )
}
