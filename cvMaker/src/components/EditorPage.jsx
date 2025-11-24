import React, { useEffect, useState } from 'react'
import TemplateRenderer from './TemplateRenderer'

const DEFAULT_CV = {
  meta: { template: 'template-1', name: '' },
  profile: { email: '', phone: '', contacts: [] },
  sections: [
    { id: 'sec-1', type: 'summary', title: 'Summary', style: 'paragraph', content: [{ type: 'paragraph', text: '' }] }
  ]
}

function uniqueId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export default function EditorPage() {
  const [cv, setCv] = useState(() => {
    try {
      const saved = localStorage.getItem('cv-maker-data')
      return saved ? JSON.parse(saved) : DEFAULT_CV
    } catch (e) {
      return DEFAULT_CV
    }
  })

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('cv-maker-data', JSON.stringify(cv))
    }, 500)
    return () => clearTimeout(t)
  }, [cv])

  function updateMeta(patch) {
    setCv(s => ({ ...s, meta: { ...s.meta, ...patch } }))
  }

  function updateProfile(patch) {
    setCv(s => ({ ...s, profile: { ...s.profile, ...patch } }))
  }

  function addSection(type = 'custom') {
    const sec = { id: uniqueId('sec'), type, title: 'New Section', style: 'paragraph', content: [{ type: 'paragraph', text: '' }] }
    setCv(s => ({ ...s, sections: [...s.sections, sec] }))
  }

  function removeSection(id) {
    setCv(s => ({ ...s, sections: s.sections.filter(x => x.id !== id) }))
  }

  function moveSectionUp(index) {
    if (index <= 0) return
    setCv(s => {
      const copy = [...s.sections]
      const [item] = copy.splice(index, 1)
      copy.splice(index - 1, 0, item)
      return { ...s, sections: copy }
    })
  }

  function moveSectionDown(index) {
    setCv(s => {
      const copy = [...s.sections]
      if (index >= copy.length - 1) return s
      const [item] = copy.splice(index, 1)
      copy.splice(index + 1, 0, item)
      return { ...s, sections: copy }
    })
  }

  function updateSection(id, patch) {
    setCv(s => ({ ...s, sections: s.sections.map(sec => (sec.id === id ? { ...sec, ...patch } : sec)) }))
  }

  function updateSectionContent(id, content) {
    setCv(s => ({ ...s, sections: s.sections.map(sec => (sec.id === id ? { ...sec, content } : sec)) }))
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cv.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="editor-root" style={{ display: 'flex', gap: 20, padding: 20 }}>
      <div className="sidebar" style={{ width: 360 }}>
        <h2>CV Editor</h2>
        <div>
          <label>Name</label>
          <input value={cv.meta.name} onChange={e => updateMeta({ name: e.target.value })} />
        </div>
        <div>
          <label>Email</label>
          <input value={cv.profile.email} onChange={e => updateProfile({ email: e.target.value })} />
        </div>
        <div>
          <label>Phone</label>
          <input value={cv.profile.phone} onChange={e => updateProfile({ phone: e.target.value })} />
        </div>

        <hr />
        <h3>Sections</h3>
        <div>
          {cv.sections.map((sec, i) => (
            <div key={sec.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
              <input value={sec.title} onChange={e => updateSection(sec.id, { title: e.target.value })} />
              <div style={{ marginTop: 6 }}>
                <button onClick={() => moveSectionUp(i)} disabled={i === 0}>Up</button>
                <button onClick={() => moveSectionDown(i)} disabled={i === cv.sections.length - 1}>Down</button>
                <button onClick={() => removeSection(sec.id)}>Delete</button>
              </div>
              <div style={{ marginTop: 6 }}>
                <label>Style</label>
                <select value={sec.style} onChange={e => updateSection(sec.id, { style: e.target.value })}>
                  <option value="paragraph">Paragraph</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
              <div style={{ marginTop: 6 }}>
                <label>Content</label>
                <textarea rows={3} value={sec.content[0].text} onChange={e => updateSectionContent(sec.id, [{ type: 'paragraph', text: e.target.value }])} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => addSection('custom')}>Add Section</button>
        </div>
        <hr />
        <div>
          <button onClick={exportJSON}>Export JSON</button>
        </div>
      </div>

      <div className="preview" style={{ flex: 1 }}>
        <h2>Preview</h2>
        <TemplateRenderer cv={cv} />
      </div>
    </div>
  )
}
