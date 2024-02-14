import React from 'react'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import useComercial from '@/hooks/useComercial'
import FormSelect from '@/components/FormSelect'
import FormSection from '@/components/FormSection'

const Index = () => {

    const { alert, formData, handleInputChange, uploadImage, handleSubmit, loaderActive } = useComercial()

    return (
        <form onSubmit={handleSubmit} className='my-4'>
            <Loader active={loaderActive} />
            <FormSelect 
                id="Tipocomercial"
                label="Selecciona tipo de inmueble"
                value={formData.Tipocomercial}
                list={["Lote", "Consultorio", "Bodega", "Oficina", "Local"]} 
                onChange={handleInputChange}
            />
            <FormSelect 
                id="Tiposervicio"
                label="Selecciona tipo de servicio"
                value={formData.Tiposervicio}
                list={["Comprar", "Arrendar"]} 
                onChange={handleInputChange}
            />
            <FormSelect 
                id="Estado"
                label="Estado de la propiedad"
                value={formData.Estado}
                list={["Disponible", "No disponible"]} 
                onChange={handleInputChange}
            />
            <FormSection 
                type="text"
                id="CodigoInmobiliaria"
                placeholder="Numero de 7 dígitos"
                label="Código"
                onChange={handleInputChange}
                value={formData.CodigoInmobiliaria}
            />
            <FormSection 
                type="text"
                id="Nombre"
                placeholder="Ej: Bodega gigante en la Estrella"
                label="Nombre de la propiedad"
                onChange={handleInputChange}
                value={formData.Nombre}
            />
            <FormSelect 
                id="Ciudad"
                label="Selecciona el municipio"
                value={formData.Ciudad}
                list={["Medellín", "La Estrella", "Sabaneta", "Envigado", "Itagüí", "Bello", "Caldas", "Otros"]} 
                onChange={handleInputChange}
            />
            {formData.Ciudad == "Medellín" && <FormSelect 
                id="Barrio"
                label="Selecciona el barrio"
                value={formData.Barrio}
                list={["Belén", "Laureles", "Poblado", "Centro"]} 
                onChange={handleInputChange}
            />}
            <FormSection 
                type="text"
                id="Areaconstruida"
                placeholder="Ej: 40"
                label={formData.Tipocomercial !== "Lote" ? "Area construída m²" : "Area del Lote m²"}
                onChange={handleInputChange}
                value={formData.Areaconstruida}
            />
            {formData.Tipocomercial !== "Lote" && <FormSection 
                type="text"
                id="Anoconstruccion"
                placeholder="Ej: 2018"
                label="Año de construcción"
                onChange={handleInputChange}
                value={formData.Anoconstruccion}
            />}
            <FormSection 
                type="text"
                id="Enlace"
                placeholder="Ej: https://wasi.co/inmueble#"
                label="Enlace de la propiedad"
                onChange={handleInputChange}
                value={formData.Enlace}
            />
            <FormSection 
                type="text"
                id="Precio"
                placeholder="Ej: 400000000"
                label={`${formData.Tiposervicio === "Arrendar" ? "Canon de arrendamiento (COP)" : "Precio del inmueble (COP)" }`}
                onChange={handleInputChange}
                value={formData.Precio}
            />
            <div className="flex flex-col justify-center my-3 items-center gap-3">
                <label className="text-sm"> Sube una imagen del inmueble </label>
                <input type="file" id="Imagen" accept="image/*" onChange={uploadImage} />
            </div>
            {alert && 
                <p className={`${alert == "Imagen subida exitosamente." ? "text-green-400" : "text-red-500"} text-center text-xs my-4`}>
                    {alert}
                </p>
            }
            <Button type="submit" className="hover:bg-slate-300 bg-secondary mt-6 flex justify-center"> Publicar </Button>
        </form>
    )
}

export default Index