"use client"
import React from 'react'
import Button from '@/components/Button'
import useEditComercial from '@/hooks/useEditComercial'
import FormSelect from '@/components/FormSelect'
import FormSection from '@/components/FormSection'

const Index = () => {

    const { alert, formData, handleInputChange, uploadImage, handleSubmit } = useEditComercial()

    return (
        <form onSubmit={handleSubmit} className='my-4'>
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
            <FormSelect 
                id="Ciudad"
                label="Selecciona el municipio"
                value={formData.Ciudad}
                list={["Medellín", "La Estrella", "Sabaneta", "Envigado", "Itagüí", "Bello", "Caldas", "Otros"]} 
                onChange={handleInputChange}
            />
            <FormSection 
                type="text"
                id="Nombre"
                placeholder="Ej: Bodega gigante en la Estrella"
                label="Nombre de la propiedad"
                onChange={handleInputChange}
                value={formData.Nombre}
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
            {/* {formData.Tipocomercial == "Lote" && <FormSection 
                type="text"
                id="Arealote"
                placeholder="Ej: 85"
                label="Area del lote m²"
                onChange={handleInputChange}
                value={formData.Arealote}
            />} */}
            <div className="flex flex-col justify-center my-3 items-center gap-3">
                <label className="text-sm"> Sube una imagen del inmueble </label>
                <input type="file" id="Imagen" accept="image/*" onChange={uploadImage} />
            </div>
            {alert && 
                <p className={`${alert == "Imagen subida exitosamente." ? "text-green-500" : "text-red-500"} text-center text-xs my-4`}>
                    {alert}
                </p>
            }
            <Button type="submit" className="hover:bg-slate-300 bg-blue-400 my-3 flex justify-center"> Guardar cambios </Button>
        </form>
    )
}

export default Index