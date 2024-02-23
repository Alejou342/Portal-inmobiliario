import React from 'react'
import axios from 'axios'
import Loader from '@/components/Loader'
import Button from '@/components/Button'

const Index = ({ setState, id, letter }) => {

    const [text, setText] = React.useState(null)
    const [loaderActive, setLoaderActive] = React.useState(false)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoaderActive(true)
        try {
            setState(false)
            axios.put(`${process.env.BACK_LINK}/api/observacion${letter}/${id}`, {observacion: text})
            .then(() => setLoaderActive(false), location.reload())
            .catch(() => setLoaderActive(false), location.reload())
        } catch(error) {
            console.error(error)
            setState(false)
        }
    }

  return (
    <form className="form-limits" onSubmit={handleSubmit}>
        <Loader active={loaderActive} />
        <h1 className='text-center text-primary font-bold'> AÑADE UNA OBSERVACIÓN </h1>
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