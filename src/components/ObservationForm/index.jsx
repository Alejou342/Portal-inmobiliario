import React from 'react'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import FormSelect from '@/components/FormSelect'
import useObservation from '@/hooks/useObservation'

const Index = ({ setState, id, letter, type }) => {

    const { availableStatus, text, status, loaderActive, handleChange, handleChangeList, handleSubmit } = useObservation(setState, id, letter, type) 

  return (
    <form className="form-limits" onSubmit={handleSubmit}>
        <Loader active={loaderActive} />
        <h1 className='text-center text-primary font-bold'> AÑADE UNA OBSERVACIÓN </h1>
        <FormSelect
        list={availableStatus}
        id='status'
        value={status}
        onChange={handleChangeList}
        className={{select: "mx-auto my-4 border-2 rounded-lg border-primary"}}
        required
        />
        <textarea
        name="observation"
        id="observation"
        value={text}
        onChange={handleChange}
        cols="30"
        rows="3"
        className='m-2 p-2'
        required
        ></textarea>
        <Button type="submit" className="bg-primary text-auxiliar flex justify-center">
            Aceptar
        </Button>
    </form>
  )
}

export default Index