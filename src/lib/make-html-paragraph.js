import React from 'react'

const styles = {
  margin: 0,
  marginBottom: '16px',
}

const makeHTMLParagraph = (text, i) => {
  const cleanedText = text.replace(`<a `, `<a target="_blank" rel="noopener noreferrer"`)
  return <p key={i} className={styles} dangerouslySetInnerHTML={{ __html: cleanedText }} />
}

export default makeHTMLParagraph
