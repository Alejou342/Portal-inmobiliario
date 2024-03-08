import React from 'react'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import useLimits from '@/hooks/useLimits'
import LoginSection from '@/components/LoginSection'

const Index = ({ setState }) => {

    const { value, loaderActive, leads, handleChange, handleSubmit } = useLimits(setState)

  return (
    <form className="form-limits" onSubmit={handleSubmit}>
        <Loader active={loaderActive} />
        <LoginSection 
            type="number"
            id="lead-limit"
            className={{label: 'flex justify-center', input: 'w-1/3 my-2'}}
            placeholder="Ej: 10"
            label="Límite mensual de leads"
            onChange={handleChange}
            value={value}
            minValue={leads.length}
            maxValue={500}
        />
        <Button type="submit" className="bg-primary text-auxiliar flex justify-center">
            Actualizar
        </Button>
    </form>
  )
}

export default Index