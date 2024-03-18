/* 
  Hook que permite manejar el contenido a renderizar en el componente Main de la aplicación
    * views: Es un arreglo que contiene los componentes que se utilizan en las diferentes vistas de la aplicación
    * rol: Variable que contiene la información de los permisos que el usuario tiene dentro de la aplicación
    * item: Contiene la información proveniente del contexto del contenido a renderizar
*/

import React from 'react'
import Cookies from 'js-cookie'
import { useItem } from '@/context'
import Form from '@/containers/Form'
import LeadRTable from '@/components/LeadRTable'
import LeadCTable from '@/components/LeadCTable'
import TraceTable from '@/components/TraceTable'
import TableComercial from '@/components/TableComercial'
import TableInmobiliary from '@/components/TableInmobiliary'
import TableResidencial from '@/components/TableResidencial'

const useMain = () => {

    const [rol, setRol] = React.useState()
    const { item } = useItem()

    const views = [
        { key: 'Residencial', component: <TableResidencial key="Residencial" />},
        { key: 'Comercial', component: <TableComercial key="Comercial" />},
        { key: 'LeadR', component: <LeadRTable key="LeadR" />},
        { key: 'LeadC', component: <LeadCTable key="LeadC" />},
        { key: 'Form', component: rol == 'admin' ?  <TableInmobiliary key="Inmobiliary" /> : <Form key="Form" />},
        { key: 'Trace', component: <TraceTable /> },
    ]
    
    React.useEffect(() => {
      try {
        const sessionInfo = JSON.parse(Cookies.get('SessionInfo') || '{}')
        if (sessionInfo) {
          setRol(sessionInfo?.answer[0]?.rol)
        }
      } catch (error) {
        console.error(error)
      }
    }, [])

  return { views, item, rol }
}

export default useMain