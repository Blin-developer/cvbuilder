'use client';
import { useState } from 'react';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Gjuha amtare'];

export default function LanguagesForm({ items, helpers }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="form-card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>🌐 Gjuhët</h2>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="card-body">
          {items.map((l, idx) => (
            <div key={l.id} className="list-item-inline">
              <input
                placeholder="Gjuha (p.sh. Anglisht)"
                value={l.name}
                onChange={(e) => helpers.update(l.id, 'name', e.target.value)}
              />
              <select value={l.level} onChange={(e) => helpers.update(l.id, 'level', e.target.value)}>
                {LEVELS.map((lv) => <option key={lv}>{lv}</option>)}
              </select>
              <button className="danger" onClick={() => helpers.remove(l.id)}>🗑</button>
            </div>
          ))}
          <button className="btn btn-primary" onClick={helpers.add}>+ Shto gjuhë</button>
        </div>
      )}
    </section>
  );
}