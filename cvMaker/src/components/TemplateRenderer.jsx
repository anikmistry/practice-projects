import React from 'react'

export default function TemplateRenderer({ cv }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 16, maxWidth: 800, background: '#fff' }}>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>{cv.meta.name || 'Full Name'}</h1>
        <div style={{ color: '#666' }}>{cv.profile.email} {cv.profile.phone}</div>
      </header>

      {cv.sections.map(sec => (
        <section key={sec.id} style={{ marginBottom: 12 }}>
          <h3 style={{ margin: '6px 0' }}>{sec.title}</h3>
          {sec.style === 'bold' ? (
            <div style={{ fontWeight: 700 }}>{sec.content.map((c, i) => <div key={i}>{c.text}</div>)}</div>
          ) : (
            <div>{sec.content.map((c, i) => <p key={i} style={{ margin: '6px 0' }}>{c.text}</p>)}</div>
          )}
        </section>
      ))}

    </div>
  )
}
