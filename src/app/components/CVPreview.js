'use client';

export default function CVPreview({ data }) {
  const { personal, experiences, educations, skills, languages, certificates, projects, volunteer, interests, references, extraInfo, template, theme } = data;

  const styleVars = {
    '--primary': theme.primaryColor,
    '--accent': theme.accentColor,
    '--sidebar-bg': theme.sidebarBg,
    '--font': theme.fontFamily,
    '--font-size': theme.fontSize,
  };

  const fullName = `${personal.firstName} ${personal.lastName}`.trim();

  // Funksion ndihmës për formatimin e datave (YYYY-MM -> Muaj YYYY)
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('-')) {
      const [year, month] = dateStr.split('-');
      const months = ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'];
      return `${months[parseInt(month) - 1]} ${year}`;
    }
    return dateStr;
  };

  // Komponent për Timeline
  const TimelineItem = ({ title, subtitle, date, description }) => (
    <div className="timeline-item">
      <div className="timeline-dot" />
      <div className="timeline-content">
        <div className="timeline-date">{date}</div>
        <div className="timeline-title">{title}</div>
        <div className="timeline-subtitle">{subtitle}</div>
        {description && <p className="timeline-desc">{description}</p>}
      </div>
    </div>
  );

  return (
    <div id="cv-print-area" className={`cv-preview cv-${template}`} style={styleVars}>
      
      {/* ================= EUROPASS TEMPLATE ================= */}
      {template === 'europass' && (
        <div className="cv-europass">
          <aside className="cv-sidebar">
            {personal.photo && <img src={personal.photo} alt="Foto" className="cv-photo" />}
            
            <div className="cv-sidebar-section">
              <h3>Kontakt</h3>
              <ul>
                {personal.email && <li>✉ {personal.email}</li>}
                {personal.phone && <li>📞 {personal.phone}</li>}
                {personal.city && <li>📍 {personal.city}</li>}
                {personal.address && <li>🏠 {personal.address}</li>}
                {personal.postalCode && <li>📮 {personal.postalCode}</li>}
                {personal.country && <li>🌍 {personal.country}</li>}
              </ul>
            </div>

            {(personal.birthDate || personal.nationality || personal.gender) && (
              <div className="cv-sidebar-section">
                <h3>Të dhëna personale</h3>
                <ul>
                  {personal.birthDate && <li>🎂 {personal.birthDate}</li>}
                  {personal.nationality && <li>🪪 {personal.nationality}</li>}
                  {personal.gender && <li>⚧ {personal.gender}</li>}
                </ul>
              </div>
            )}

            {(personal.linkedin || personal.github || personal.website) && (
              <div className="cv-sidebar-section">
                <h3>Rrjetet Sociale</h3>
                <ul>
                  {personal.linkedin && <li>🔗 {personal.linkedin}</li>}
                  {personal.github && <li>💻 {personal.github}</li>}
                  {personal.website && <li>🌐 {personal.website}</li>}
                </ul>
              </div>
            )}

            {skills.length > 0 && (
              <div className="cv-sidebar-section">
                <h3>Aftësitë</h3>
                <ul>{skills.map((s) => <li key={s.id}>• {s.name} — {s.level}</li>)}</ul>
              </div>
            )}

            {languages.length > 0 && (
              <div className="cv-sidebar-section">
                <h3>Gjuhët</h3>
                <ul>{languages.map((l) => <li key={l.id}>• {l.name} — {l.level}</li>)}</ul>
              </div>
            )}
          </aside>

          <main className="cv-main">
            <div className="cv-header">
              {personal.profession && <div className="cv-profession">{personal.profession}</div>}
              <div className="cv-name">{fullName || 'Emri Mbiemri'}</div>
            </div>

            {personal.about && (
              <section className="cv-section">
                <h3 className="cv-section-title">Rreth meje</h3>
                <p className="cv-text">{personal.about}</p>
              </section>
            )}

            {experiences.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Përvoja e punës</h3>
                <div className="timeline">
                  {experiences.map((exp) => (
                    <TimelineItem
                      key={exp.id}
                      title={exp.position}
                      subtitle={exp.company + (exp.location ? ` · ${exp.location}` : '')}
                      date={`${formatDate(exp.startDate)} — ${exp.current ? 'Tani' : formatDate(exp.endDate) || '—'}`}
                      description={
                        (exp.description || '') +
                        (exp.achievements ? '\n' + exp.achievements : '') +
                        (exp.technologies ? '\nTeknologjitë: ' + exp.technologies : '')
                      }
                    />
                  ))}
                </div>
              </section>
            )}

            {educations.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Arsimi</h3>
                <div className="timeline">
                  {educations.map((ed) => (
                    <TimelineItem
                      key={ed.id}
                      title={ed.degree || ed.school}
                      subtitle={ed.school + (ed.field ? ` — ${ed.field}` : '') + (ed.grade ? ` (Nota: ${ed.grade})` : '')}
                      date={`${formatDate(ed.startDate)} — ${ed.current ? 'Vazhdon' : formatDate(ed.endDate) || '—'}`}
                      description={ed.description}
                    />
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Projekte</h3>
                <ul>{projects.map((p) => <li key={p.id}><strong>{p.name}</strong> — {p.description}</li>)}</ul>
              </section>
            )}

            {certificates.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Certifikata</h3>
                <ul>{certificates.map((c) => <li key={c.id}>{c.name} — {c.issuer} ({c.date})</li>)}</ul>
              </section>
            )}

            {volunteer.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Vullnetarizëm</h3>
                <ul>{volunteer.map((v) => <li key={v.id}><strong>{v.role}</strong> @ {v.organization} — {v.description}</li>)}</ul>
              </section>
            )}

            {interests.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Interesa</h3>
                <p>{interests.map((i) => i.name).filter(Boolean).join(', ')}</p>
              </section>
            )}

            {references.length > 0 && (
              <section className="cv-section">
                <h3 className="cv-section-title">Referenca</h3>
                <ul>{references.map((r) => <li key={r.id}>{r.name} — {r.relation} — {r.contact}</li>)}</ul>
              </section>
            )}

            {extraInfo && (
              <section className="cv-section">
                <h3 className="cv-section-title">Informacion shtesë</h3>
                <p className="cv-text">{extraInfo}</p>
              </section>
            )}
          </main>
        </div>
      )}

      {/* ================= MODERN TEMPLATE ================= */}
      {template === 'modern' && (
        <div className="cv-modern">
          <header className="cv-modern-header">
            {personal.photo && <img src={personal.photo} alt="Foto" />}
            <div>
              <h1>{fullName || 'Emri Mbiemri'}</h1>
              <h2>{personal.profession}</h2>
              <p>{personal.email} · {personal.phone} · {personal.city}</p>
            </div>
          </header>
          
          {personal.about && <section><h3>Rreth meje</h3><p className="cv-text">{personal.about}</p></section>}
          
          {experiences.length > 0 && (
            <section>
              <h3>Përvoja</h3>
              {experiences.map((e) => (
                <div key={e.id} className="modern-item">
                  <strong>{e.position}</strong> @ {e.company}
                  <div style={{fontSize: '0.8rem', color: 'var(--muted)'}}>
                    {formatDate(e.startDate)} — {e.current ? 'Tani' : formatDate(e.endDate)}
                  </div>
                  <p className="cv-text">{e.description}</p>
                </div>
              ))}
            </section>
          )}

          {educations.length > 0 && (
            <section>
              <h3>Arsimi</h3>
              {educations.map((ed) => (
                <div key={ed.id} className="modern-item">
                  <strong>{ed.degree}</strong> — {ed.school}
                  <div style={{fontSize: '0.8rem', color: 'var(--muted)'}}>
                    {formatDate(ed.startDate)} — {ed.current ? 'Vazhdon' : formatDate(ed.endDate)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h3>Aftësi</h3>
              <div className="modern-skills">
                {skills.map((s) => <span key={s.id} className="skill-tag">{s.name}</span>)}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h3>Gjuhët</h3>
              <ul>{languages.map((l) => <li key={l.id}>{l.name} — {l.level}</li>)}</ul>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h3>Projekte</h3>
              <ul>{projects.map((p) => <li key={p.id}><strong>{p.name}</strong> — {p.description}</li>)}</ul>
            </section>
          )}
        </div>
      )}

      {/* ================= CREATIVE TEMPLATE ================= */}
      {template === 'creative' && (
        <div className="cv-creative">
          <div className="creative-header">
            <div>
              <h1>{fullName || 'Emri Mbiemri'}</h1>
              <h2>{personal.profession}</h2>
            </div>
            {personal.photo && <img src={personal.photo} alt="Foto" />}
          </div>
          <div className="creative-grid">
            <div>
              {personal.about && <section><h3>Rreth meje</h3><p className="cv-text">{personal.about}</p></section>}
              
              {experiences.length > 0 && (
                <section>
                  <h3>Përvoja</h3>
                  {experiences.map((e) => (
                    <div key={e.id} className="creative-item">
                      <strong>{e.position}</strong> — {e.company}
                      <div style={{fontSize: '0.8rem', color: 'var(--muted)'}}>
                        {formatDate(e.startDate)} — {e.current ? 'Tani' : formatDate(e.endDate)}
                      </div>
                      <p className="cv-text">{e.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {educations.length > 0 && (
                <section>
                  <h3>Arsimi</h3>
                  {educations.map((ed) => (
                    <div key={ed.id} className="creative-item">
                      <strong>{ed.degree}</strong> — {ed.school}
                    </div>
                  ))}
                </section>
              )}
            </div>
            <div>
              {skills.length > 0 && (
                <section><h3>Aftësi</h3><ul>{skills.map((s) => <li key={s.id}>{s.name}</li>)}</ul></section>
              )}
              {languages.length > 0 && (
                <section><h3>Gjuhë</h3><ul>{languages.map((l) => <li key={l.id}>{l.name} — {l.level}</li>)}</ul></section>
              )}
              {interests.length > 0 && (
                <section><h3>Interesa</h3><ul>{interests.map((i) => <li key={i.id}>{i.name}</li>)}</ul></section>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}