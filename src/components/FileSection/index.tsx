import React from 'react'

interface ComponentProps {
  id: string,
  label: string,
  onChange: any
}

const Index: React.FC<ComponentProps> = ({ id, label, onChange }) => {
  return (
    <div className="mb-2 flex justify-between">
      <label htmlFor={id} className="form-label text-sm">{label}</label>
      <input 
        type="file" 
        className="w-1/2 h-8 px-3 rounded-lg my-2 text-sm"
        id="imageInput"
        onChange={onChange}
        required
      />
    </div>
  )
}

export default Index