'use client';
import { useState } from 'react';

export default function AdditionalSections({ data, listHelpers, setExtraInfo }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="form-card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>➕ Seksione shtesë</h2>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div className="card-body">
          <MiniList title="Certifikata" items={data.certificates} helpers={listHelpers('certificates', { name: '', issuer: '', date: '' })} fields={['name', 'issuer', 'date']} />
          <MiniList title="Projekte personale" items={data.projects} helpers={listHelpers('projects', { name: '', description: '', link: '' })} fields={['name', 'description', 'link']} />
          <MiniList title="Vullnetarizëm" items={data.volunteer} helpers={listHelpers('volunteer', { organization: '', role: '', description: '' })} fields={['organization', 'role', 'description']} />
          <MiniList title="Interesa dhe hobi" items={data.interests} helpers={listHelpers('interests', { name: '' })} fields={['name']} />
          <MiniList title="Referenca" items={data.references} helpers={listHelpers('references', { name: '', contact: '', relation: '' })} fields={['name', 'contact', 'relation']} />

          <div className="form-group">
            <label>Informacion shtesë</label>
            <textarea rows={3} value={data.extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
          </div>
        </div>
      )}
    </section>
  );
}

function MiniList({ title, items, helpers, fields }) {
  return (
    <div className="mini-list">
      <h4>{title}</h4>
      {items.map((it) => (
        <div key={it.id} className="mini-item">
          {fields.map((f) => (
            <input
              key={f}
              placeholder={f}
              value={it[f]}
              onChange={(e) => helpers.update(it.id, f, e.target.value)}
            />
          ))}
          <button className="danger" onClick={() => helpers.remove(it.id)}>🗑</button>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={helpers.add}>+ Shto</button>
    </div>
  );
}