'use client';
import { useState } from 'react';

const LEVELS = ['Fillestar', 'Mesatar', 'I avancuar', 'Ekspert'];

export default function SkillsForm({ items, helpers }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="form-card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>⚡ Aftësitë</h2>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="card-body">
          {items.map((s, idx) => (
            <div key={s.id} className="list-item-inline">
              <input
                placeholder="Aftësia (p.sh. JavaScript)"
                value={s.name}
                onChange={(e) => helpers.update(s.id, 'name', e.target.value)}
              />
              <select value={s.level} onChange={(e) => helpers.update(s.id, 'level', e.target.value)}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <button onClick={() => helpers.move(s.id, -1)} disabled={idx === 0}>↑</button>
              <button onClick={() => helpers.move(s.id, 1)} disabled={idx === items.length - 1}>↓</button>
              <button className="danger" onClick={() => helpers.remove(s.id)}>🗑</button>
            </div>
          ))}
          <button className="btn btn-primary" onClick={helpers.add}>+ Shto aftësi</button>
        </div>
      )}
    </section>
  );
}