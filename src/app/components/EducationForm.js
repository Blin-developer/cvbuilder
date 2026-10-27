'use client';
import { useState } from 'react';

export default function EducationForm({ items, helpers }) {
  const [open, setOpen] = useState(true);

  return (
    <section className="form-card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>🎓 Arsimi dhe trajnimet</h2>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="card-body">
          {items.map((ed, idx) => (
            <div key={ed.id} className="list-item">
              <div className="list-item-header">
                <strong>#{idx + 1} {ed.school || 'Institucion i re'}</strong>
                <button className="danger" onClick={() => helpers.remove(ed.id)}>🗑</button>
              </div>
              <div className="form-row">
                <Input label="Shkolla / Universiteti" value={ed.school} onChange={(v) => helpers.update(ed.id, 'school', v)} />
                <Input label="Diploma" value={ed.degree} onChange={(v) => helpers.update(ed.id, 'degree', v)} />
              </div>
              <Input label="Fusha e studimit" value={ed.field} onChange={(v) => helpers.update(ed.id, 'field', v)} />
              <Input label="Qyteti / Shteti" value={ed.location} onChange={(v) => helpers.update(ed.id, 'location', v)} />
              <div className="form-row">
                <Input label="Data e fillimit" type="month" value={ed.startDate} onChange={(v) => helpers.update(ed.id, 'startDate', v)} />
                <Input label="Data e përfundimit" type="month" value={ed.endDate} onChange={(v) => helpers.update(ed.id, 'endDate', v)} />
              </div>
              <Input label="Nota mesatare (opsionale)" value={ed.grade} onChange={(v) => helpers.update(ed.id, 'grade', v)} />
              <Textarea label="Përshkrimi i studimeve" value={ed.description} onChange={(v) => helpers.update(ed.id, 'description', v)} />
            </div>
          ))}
          <button className="btn btn-primary" onClick={helpers.add}>+ Shto arsim</button>
        </div>
      )}
    </section>
  );
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
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