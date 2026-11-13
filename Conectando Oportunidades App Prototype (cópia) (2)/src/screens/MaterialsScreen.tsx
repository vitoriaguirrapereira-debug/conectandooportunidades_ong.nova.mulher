import type { ScreenProps } from "../App"
import { guides } from "../data/opportunities"

export default function MaterialsScreen({ openGuide }: ScreenProps) {
  return (
    <div className="materials-screen page-surface">
      <header className="page-heading">
        <div>
          <span className="eyebrow">Ferramentas para o dia a dia</span>
          <h1>Guias Práticos de Apoio ao Negócio</h1>
          <p>
            Orientações objetivas para colocar em prática hoje e aprofundar com
            cursos gratuitos da curadoria.
          </p>
        </div>
      </header>
      <section className="guide-grid" data-tutorial="materials-featured">
        {guides.map((guide) => (
          <button
            key={guide.id}
            type="button"
            onClick={() => openGuide(guide.id)}
            style={{ "--guide-color": guide.color } as React.CSSProperties}
          >
            <span className="guide-grid__icon" aria-hidden="true">
              {guide.emoji}
            </span>
            <span className="eyebrow">{guide.category}</span>
            <strong>{guide.title}</strong>
            <p>{guide.introduction}</p>
            <small>{guide.time} de leitura · Abrir guia</small>
          </button>
        ))}
      </section>
    </div>
  )
}
