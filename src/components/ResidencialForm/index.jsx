import React from 'react'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import FormSelect from '@/components/FormSelect'
import FormSection from '@/components/FormSection'
import useResidencial from '@/hooks/useResidencial'

const Index = () => {

    const { alert, formData, uploadImage, handleInputChange, handleSubmit, loaderActive } = useResidencial()

    return (
        <form onSubmit={handleSubmit} className="form-residencial my-4 h-[72vh]">
            <Loader active={loaderActive} />    
            <FormSelect 
                id="Tiporesidencia"
                label="Selecciona tipo de inmueble"
                value={formData.Tiporesidencia}
                list={["Casa","Apartamento", "Finca"]} 
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
                placeholder="Ej: Bonita casa en Laureles"
                label="Nombre de la propiedad"
                onChange={handleInputChange}
                value={formData.Nombre}
            />
            <FormSection 
                type="text"
                id="Areaconstruida"
                placeholder="Ej: 40"
                label="Area construída m²"
                onChange={handleInputChange}
                value={formData.Areaconstruida}
            />
            <FormSection 
                type="text"
                id="Habitaciones"
                placeholder="Ej: 4"
                label="Número de habitaciones"
                onChange={handleInputChange}
                value={formData.Habitaciones}
            />
            <FormSection 
                type="text"
                id="Baños"
                placeholder="Ej: 2"
                label="Número de baños"
                onChange={handleInputChange}
                value={formData.Baños}
            />
            <FormSection 
                type="text"
                id="Parqueaderos"
                placeholder="Ej: 1"
                label="Número de parqueaderos"
                onChange={handleInputChange}
                value={formData.Parqueaderos}
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
            {formData.Tiporesidencia !== "Finca" && <FormSelect 
                id="Unidadcerrada"
                label="¿Unidad cerrada?"
                value={formData.Unidadcerrada}
                list={["Si", "No"]} 
                onChange={handleInputChange}
            />}
            <FormSection 
                type="text"
                id="Anoconstruccion"
                placeholder="Ej: 2018"
                label="Año de construcción"
                onChange={handleInputChange}
                value={formData.Anoconstruccion}
            />
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
            {formData.Tiporesidencia == "Finca" && <FormSection 
                type="text"
                id="Arealote"
                placeholder="Ej: 85"
                label="Area del lote m²"
                onChange={handleInputChange}
                value={formData.Arealote}
            />}
            <div className="flex flex-col my-3 justify-center items-center gap-3">
                <label className="text-sm"> Sube una imagen del inmueble </label>
                <input type="file" id="Imagen" accept="image/*" onChange={uploadImage} />
            </div>
            {alert && <p className={`${alert == "Imagen subida exitosamente." ? "text-green-400" : "text-red-500"} text-center text-xs my-4`}>{alert}</p>}
            <Button type="submit" className="hover:bg-slate-300 mt-8 bg-secondary flex justify-center"> Publicar </Button>
        </form>
    )
}

export default Index