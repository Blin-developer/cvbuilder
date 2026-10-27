'use client';
import { useState } from 'react';

export default function ExperienceForm({ items, helpers }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="form-card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>💼 Përvoja e punës</h2>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="card-body">
          {items.map((exp, idx) => (
            <div key={exp.id} className="list-item">
              <div className="list-item-header">
                <strong>#{idx + 1} {exp.position || 'Pozitë e re'}</strong>
                <div className="list-item-actions">
                  <button onClick={() => helpers.move(exp.id, -1)} disabled={idx === 0}>↑</button>
                  <button onClick={() => helpers.move(exp.id, 1)} disabled={idx === items.length - 1}>↓</button>
                  <button className="danger" onClick={() => helpers.remove(exp.id)}>🗑</button>
                </div>
              </div>
              <div className="form-row">
                <Input label="Pozita" value={exp.position} onChange={(v) => helpers.update(exp.id, 'position', v)} />
                <Input label="Kompania" value={exp.company} onChange={(v) => helpers.update(exp.id, 'company', v)} />
              </div>
              <Input label="Qyteti / Shteti" value={exp.location} onChange={(v) => helpers.update(exp.id, 'location', v)} />
              <div className="form-row">
                <Input label="Data e fillimit" type="month" value={exp.startDate} onChange={(v) => helpers.update(exp.id, 'startDate', v)} />
                <Input label="Data e përfundimit" type="month" value={exp.endDate} onChange={(v) => helpers.update(exp.id, 'endDate', v)} disabled={exp.current} />
              </div>
              <label className="checkbox">
                <input type="checkbox" checked={exp.current} onChange={(e) => helpers.update(exp.id, 'current', e.target.checked)} />
                Punoj ende këtu
              </label>
              <Textarea label="Përshkrimi i përgjegjësive" value={exp.description} onChange={(v) => helpers.update(exp.id, 'description', v)} />
              <Textarea label="Arritjet kryesore" value={exp.achievements} onChange={(v) => helpers.update(exp.id, 'achievements', v)} />
              <Input label="Teknologjitë / Mjetet" value={exp.technologies} onChange={(v) => helpers.update(exp.id, 'technologies', v)} />
            </div>
          ))}
          <button className="btn btn-primary" onClick={helpers.add}>+ Shto përvojë</button>
        </div>
      )}
    </section>
  );
}

function Input({ label, value, onChange, type = 'text', disabled }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
    </div>
  );
}
function Textarea({ label, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}