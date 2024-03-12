import React from 'react'
import { FormSelectProps } from '@/interfaces'

const Index: React.FC<FormSelectProps> = ({ list, onChange, id, value, label, className }) => {

    return (
        <div className="select-form flex justify-between">
            <label htmlFor={id} className="form-label text-sm">{label}</label>
            <select id={id} className={ className?.select || "w-1/2 h-8 px-3 rounded-lg border text-sm mb-2"} aria-label="Default select example" onChange={onChange} value={value} required>
                <option value="">{""}</option>
                {list?.map((rol: string, i: number) => <option key={i} value={rol}> {rol} </option>)}
            </select>
        </div>
    )
}

export default Index