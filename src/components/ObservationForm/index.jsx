import React from 'react'
import axios from 'axios'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import FormSelect from '@/components/FormSelect'

const Index = ({ setState, id, letter, type }) => {

    const availableStatus = ['Pendiente', 'Atendido', 'Descartado']
    const [text, setText] = React.useState(null)
    const [status, setStatus] = React.useState('Pendiente')
    const [loaderActive, setLoaderActive] = React.useState(false)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleChangeList = (e) => {
        setStatus(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoaderActive(true)
        try {
            Promise.all([
                axios.put(`${process.env.BACK_LINK}/api/observacion${letter}/${id}`, { observacion: text }),
                axios.put(`${process.env.BACK_LINK}/api/${type}/updateRevisado/${id}`, { newStatus: availableStatus.indexOf(status) })
            ])
            .then(() => setLoaderActive(false), location.reload())
            .catch(() => setLoaderActive(false), location.reload())
            setState(false)
        } catch(error) {
            console.error(error)
            setState(false)
        }
    }

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
        />
        <textarea
        name="observation"
        id="observation"
        value={text}
        onChange={handleChange}
        cols="30"
        rows="3"
        className='m-2 p-2'
        ></textarea>
        <Button type="submit" className="bg-primary text-auxiliar flex justify-center">
            Aceptar
        </Button>
    </form>
  )
}

export default Index