export interface ComercialInfoProps {
    props: {
        NombreC: string,
        ImagenC: string,
        EstadoC: string,
        AreaC: string,
        CiudadC: string,
        BarrioC: string,
        Ano_ConstruccionC: string,
        Tipo_ServicioC: string,
        PrecioC: number
        EnlaceC: string,
    }
}

export interface UserInfoProps {
    props: {
        handleLogout: any,
        user: {
            Nombre_Inmobiliaria: string,
            Personaencargada: string,
            Correo_Inmobiliaria: string,
            Celular: string
        }
    }
}

export interface TraceTableProps {
    Correo: string
    Fechaingreso: string
    Personaencargada: string
}

export interface TableResidencialProps {
    ID_Residencial: string
    CodigoInmobiliaria: string
    Tipo_ServicioR: string
    EstadoR: string
    PrecioR: number
    NombreR: string
}

export interface ComponentProps {
    ID_Inmobiliaria: string
    Nombre_Inmobiliaria: string
    Celular: string
    Personaencargada: string
}

export interface TableInmobiliaryProps {
    ID_Inmobiliaria: string
    Nombre_Inmobiliaria: string
    Celular: string
    Personaencargada: string
}

export interface TableHeaderProps {
    columns: string[]
}

export interface TableFooterProps {
    param: string[],        // --> Revisar esto
    text: string,
    page: number,
    setPage: any,
    number: number
}

export interface TableComercialProps {
    CodigoInmobiliaria: string
    ID_Comercial: string
    Tipo_ServicioC: string
    NombreC: string
    PrecioC: number
    EstadoC: string
}

export interface SideHeaderProps {
    to: string
}

export interface Answer {
    ID_Inmobiliaria: number;
    Nombre_Inmobiliaria: string;
    Correo_Inmobiliaria: string;
    Telefono_Inmobiliaria: string | null;
    Ubicacion_Inmobiliaria: string | null;
    Estado: number;
    Fecharegistro: string;
    Numeroidentificacion: string | null;
    Representante: string;
    Tipoidentificacion: string | null;
    Municipio: string;
    Departamento: string;
    Telefonorepresen: string | null;
    Celular: string;
    Correofacturacion: string | null;
    Personaencargada: string;
    Cargo: string | null;
    Telefonocargo: string;
    cantidadLeads: number;
    rol: string;
    Contraseña2: string | null;
    Contraseña3: string | null;
    reserva: string | null;
    Contraseña4: string | null;
  }
  
  interface ApiResponse {
    answer: Answer[];
    token: string;
  }
  
export interface SearchSectionProps {
    search: string,
    setSearch: any,
    setPage: any,
    type?: string,
    placeholder?: string
}

export interface ResidencialContentProps {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    id: number
}

export interface PasswordSectionProps {
    id: string,
    placeholder: string,
    label: string,
    onChange: any
    value: any
}

export interface ObservationFormProps {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    id: number
    letter: string
    type: string
}

export interface LoginSectionProps {
    id: string,
    placeholder: string,
    label: string,
    onChange: any,
    value: string
    type: string,
    minValue?: number,
    maxValue?: number
    className?: {
        input?: string,
        label?: string
    },
}

export interface LoaderProps {
    active: boolean
}

export interface TrashTableTypes {
    CodigoInmobiliaria: string
    Personaencargada: string
    Enlace: string
    Tipo: string
}

export interface LinkSectionProps {
    route: string,
    link: string,
    title: string
}

export interface LimitLeadsProps {
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export interface LeadRTableTypes {
    CodigoInmobiliaria: string
    NombreR: string
    Nombrecliente: string
    Numerocliente: string
    Fechalead: string
    Observacion: string
    revisado: number
    Idlead: number
}

export interface LeadCTableTypes {
    CodigoInmobiliaria: string
    NombreC: string
    Nombrecliente: string
    Numerocliente: string
    Fechalead: string
    Observacion: string
    revisado: number
    Idlead: number
}

export interface FormSelectProps {
    list: string[], 
    onChange: any, 
    id: string, 
    value: string, 
    label: string, 
    className?: {
        select?: string
    } 
}

export interface FormSectionProps {
    type: string, 
    id: string,
    placeholder: string
    label: string,
    onChange: any,
    value: string | number
}

export interface FileSectionProps {
    id: string,
    label: string,
    onChange: any
}

export interface ComercialContentProps {
    setState: React.Dispatch<React.SetStateAction<boolean>>
    id: number
}

export interface CardSectionProps {
    route: string,
    value: string,
    title: string,
}

export interface ButtonProps {
    children: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type: 'button' | 'submit' | 'reset' | undefined,
    className: string,
}

export interface AlertIconProps {
    icon: string,
    isHover: boolean,
    setIsHover: any,
    setOpenModal: any,
    text: string,
    className: {
        i: string,
        p: string
    }
}

export interface ResidencialIdProps {
    params: {
        id: number;
    };
};

export interface ComercialIdProps {
    params: {
        id: number;
    };
}

export interface ModalGeneralProps {
    children: JSX.Element,
    state: boolean,
    setState: any,
    className?: string
}

export interface ResidencialInfoProps {
    props: {
        ImagenR: string,
        NombreR: string,
        EstadoR: string,
        Area_ConstruidaR: string,
        CiudadR: string,
        BarrioR: string,
        HabitacionR: string,
        BanosR: string,
        ParqueaderosR: string,
        Ano_ConstruccionR: string,
        Tipo_ServicioR: string,
        PrecioR: number,
        EnlaceR: string,
    }
}

export interface ItemContextType {
    item: number,
    setItem: React.Dispatch<React.SetStateAction<number>>
    sessionInfo: any
}

export interface ItemContextProps {
    children: JSX.Element
}

export interface FormDataPropsC {
    Idinmobiliaria: number
    Tipocomercial: string
    CodigoInmobiliaria: string
    Tiposervicio: string
    Estado: string
    Nombre: string
    Ciudad: string
    Barrio: string
    Areaconstruida: number
    Anoconstruccion: number
    Enlace: string
    Precio: number
    Arealote: number
    Imagen: string
}

export interface UseComercialProps {
    alert: string
    loaderActive: boolean
    formData: FormDataPropsC
    setAlert: React.Dispatch<React.SetStateAction<string>>
    setFormData: React.Dispatch<React.SetStateAction<FormDataPropsC>>
    uploadImage: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>)  => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FormEditDataPropsC {
    Tipocomercial: string
    CodigoInmobiliaria: string
    Tiposervicio: string
    Estado: string
    Nombre: string
    Ciudad: string
    Barrio: string
    Areaconstruida: number
    Anoconstruccion: number
    Enlace: string
    Precio: number
    Arealote: number
    Imagen: string
}

export interface UseEditComercialProps {
    alert: string
    formData: FormEditDataPropsC
    setAlert: React.Dispatch<React.SetStateAction<string>>,
    setFormData: React.Dispatch<React.SetStateAction<FormEditDataPropsC>>
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    uploadImage: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface FormEditDataPropsR {
    Tiporesidencia: string
    CodigoInmobiliaria: string
    Tiposervicio: string
    Estado: string
    Nombre: string
    Areaconstruida: number
    Habitaciones: number
    Baños: number
    Parqueaderos: number
    Ciudad: string
    Barrio: string
    Unidadcerrada: string
    Anoconstruccion: number
    Enlace: string
    Precio: number
    Arealote: number
    Imagen: string
}

export interface UseEditResidencialProps {
    alert: string
    setAlert: React.Dispatch<React.SetStateAction<string>>
    formData:  FormEditDataPropsR
    setFormData: React.Dispatch<React.SetStateAction<FormEditDataPropsR>>
    uploadImage: () => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface UseObservationProps {
    setState: any
    id: number
    letter: string
    type: string
}

export interface FormDataPropsR {
    Idinmobiliaria: number
    Tiporesidencia: string
    CodigoInmobiliaria: string
    Tiposervicio: string
    Estado: string
    Nombre: string
    Areaconstruida: number
    Habitaciones: number
    Baños: number
    Parqueaderos: number
    Ciudad: string
    Barrio: string
    Unidadcerrada: string
    Anoconstruccion: number
    Enlace: string
    Precio: number
    Arealote: number
    Imagen: string
}

export interface UseResidencialProps {
    alert: string
    loaderActive: boolean
    formData: FormDataPropsR
    setAlert: React.Dispatch<React.SetStateAction<string>>
    setFormData: React.Dispatch<React.SetStateAction<FormDataPropsR>>
    uploadImage: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>)  => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InmobiliariaData {
    ID_Inmobiliaria: number;
    Nombre_Inmobiliaria: string;
    Correo_Inmobiliaria: string;
    Telefono_Inmobiliaria: string | null;
    Ubicacion_Inmobiliaria: string | null;
    Estado: number;
    Fecharegistro: string;
    Numeroidentificacion: string | null;
    Representante: string;
    Tipoidentificacion: string | null;
    Municipio: string;
    Departamento: string;
    Telefonorepresen: string | null;
    Celular: string;
    Correofacturacion: string | null;
    Personaencargada: string;
    Cargo: string | null;
    Telefonocargo: string;
    cantidadLeads: number;
    rol: string;
    Contraseña2: string | null;
    Contraseña3: string | null;
    reserva: string | null;
    Contraseña4: string | null;
  }

export interface LoginApiResponse {
    answer: InmobiliariaData[];
    token: string;
}

export interface FormData {
    Correo: string
    Contraseña: string
}

export interface WordKeysTable {
    [key: string]: string[]
}

export interface User {
    ID_Inmobiliaria: number,
    Nombre_Inmobiliaria: string,
    Correo_Inmobiliaria: string,
    Telefono_Inmobiliaria: string,
    Ubicacion_Inmobiliaria: string,
    Estado: number,
    Fecharegistro: string,
    Numeroidentificacion: string,
    Representante: string,
    Tipoidentificacion: string,
    Municipio: string,
    Departamento: string,
    Telefonorepresen: string,
    Celular: string,
    Correofacturacion: string,
    Personaencargada: string,
    Cargo: string,
    Telefonocargo: string,
    cantidadLeads: number,
    rol: string,
    Contraseña2: string,
    Contraseña3: string,
    reserva: string,
    Contraseña4: string
}

export interface WordKeysProperties {
    [key: string]: string[]
}