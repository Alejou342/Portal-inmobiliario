Este es un proyecto de [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Empezar  

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

Abrir la ruta [http://localhost:3000](http://localhost:3000) para ver la aplicación en un entorno local.
Abrir la ruta [https://www.pockirealstate.com](https://www.pockirealstate.com) para ver la aplicación en un dominio web.


## Vista principal de la aplicación (Formulario de Login)  

![alt text](/public/assets/readme/image.png)  

En este formulario se solicita al usuario sus credenciales de acceso, Correo y Contraseña (Esta última puede ser visible 
clickeando el ícono con forma de ojo), Podrá logearse a la aplicación cuando se validen las credenciales escritas al hacer 
click en el botón "Ingresar"  

![alt text](/public/assets/readme/image-1.png)  

La vista principal muestra las secciones importantes, a continuación se detalla un poco de cada una:  
    1. Panel *Central*: Su utilidad es mostrar el contenido de la sección actualmente activa  
    2. Panel *Superior Derecho*: Su utilidad es mostrar un contador de Leads registrados mes a mes  
    3. Panel *Inferior Derecho*: Su utilidad es mostrar herramientas adicionales para llevar el control de la aplicación  
    4. Panel *Lateral*: Su utilidad es registrar las secciones posibles según los permisos de cada usuario  

## Panel de Administrador

![alt text](/public/assets/readme/image-2.png)

Los permisos otorgados para el administrador del portal en el *Panel Central* son los siguientes:   
    1. Permite **visualizar** al dar click en cualquier elemento de la tabla  
    2. Permite la **edición** de cualquier inmueble al clickear en el ícono de lapiz de cualquier elemento de la tabla  
    3. Permite la **eliminación** de inmuebles al clickear el ícono de la papelera de cualquier elemento de la tabla (Solicita confirmación vía modal)  
    4. Permite **filtrar** por una propiedad, cualquier elemento de la tabla  
    5. Permite **realizar** la paginación con los controladores laterales ubicados en la parte inferior de la tabla  

![alt text](/public/assets/readme/image-3.png)   

Los permisos otorgados para el administrador del portal en el *Panel Superior derecho* son los siguientes:  
    1. Permite **visualizar** la sumatoria total de Leads generados en el mes actual por todas las inmobiliarias  

![alt text](/public/assets/readme/image-4.png)  

Los permisos otorgados para el administrador del portal en el *Panel Inferior derecho* son los siguientes:  
    1. Permite **abrir un modal** para observar una tabla con los inmuebles que han sido eliminados  

![alt text](/public/assets/readme/image-5.png)  

Los permisos otorgados para el administrador del portal en el *Panel Lateral* son los siguientes:  
    1. **Propiedades Residenciales**: Permite la visualización en tablas de todas las (Casas, Fincas, Proyectos y Apartamentos)  
    2. **Propiedades Comerciales**: Permite la visualización en tablas de todas las (Lotes, Bodegas, Consultorios, Oficinas, Locales)  
    3. **Leads Residenciales**: Permite la visualización de todos los Leads Residenciales generados en el mes actual de todas las inmobiliarias  
    4. **Leads Comerciales**: Permite la visualización de todos los Leads Comerciales generados en el mes actual de todas las inmobiliarias   
    5. **Inmobiliarias**: Permite ver la información de todas las inmobiliarias asociadas a Pocki  
    6. **Huella**: Permite ver la información de el ingreso al portal de los usuarios de Pocki Inmobiliario  
    7. **Sección inferior**: Permite ver la información del usuario Logeado y permite el Logout en el ícono de salida  

## Panel de Usuario  

![alt text](/public/assets/readme/image-6.png)  

Los permisos otorgados para el Usuario del portal en el *Panel Central* son los siguientes:  
    1. Permite **visualizar** al dar click en cualquier elemento de la tabla  
    2. Permite **editar** cualquier inmueble al clickear en el ícono de lapiz de cualquier elemento de la tabla  
    3. Permite **eliminar** inmuebles al clickear el ícono de la papelera de cualquier elemento de la tabla (Solicita confirmación vía modal)  
    4. Permite **filtrar** por una propiedad, cualquier elemento de la tabla  
    5. Permite **realizar** la paginación con los controladores laterales ubicados en la parte inferior de la tabla  

![alt text](/public/assets/readme/image-7.png)  

Los permisos otorgados para el Usuario del portal en el *Panel Superior derecho* son los siguientes:  
    1. Permite **visualizar** la sumatoria total de Leads generados en el mes actual por la inmobiliaria actual  
    2. Permite **visualizar** el límite establecido para Leads del mes actual  

![alt text](/public/assets/readme/image-8.png)  

Los permisos otorgados para el Usuario del portal en el *Panel Inferior derecho* son los siguientes:   
    1. El ícono de papelera permite **abrir** un modal para observar una tabla con los inmuebles que han sido eliminados  
    2. El ícono de alerta permite **abrir** un modal para llenar un formulario donde se puede establecer el límite de Leads del mes (Solo es posible hacer esta modificación los días 1 y 2 de cada mes)  

![alt text](/public/assets/readme/image-9.png)  

Los permisos otorgados para el Usuario del portal en el *Panel Lateral* son los siguientes:  
    1. **Propiedades Residenciales**: Permite la visualización en tablas de mis propiedades residenciales (Casas, Fincas, Proyectos y Apartamentos)  
    2. **Propiedades Comerciales**: Permite la visualización en tablas de mis propiedades comerciales (Lotes, Bodegas, Consultorios, Oficinas, Locales)  
    3. **Leads Residenciales**: Permite la visualización de todos los Leads Residenciales generados en el mes actual de mi inmobiliaria  
    4. **Leads Comerciales**: Permite la visualización de todos los Leads Comerciales generados en el mes actual de mi inmobiliaria  
    5. **Añadir Propiedad**: Permite abrir los formularios (Comercial y Residencial) para crear propiedades nuevas  
    6. **Huella**: Permite ver la información de el ingreso al portal de los usuarios de Pocki Inmobiliario  
    7. **Sección inferior**: Permite ver la información del usuario Logeado y permite el Logout en el ícono de salida  

# Funcionalidades Extra  

## Crear | Editar Inmueble  

![alt text](/public/assets/readme/image-11.png)  

Funcionalidad disponible para el Rol de **Usuario**:  
    1. Formulario donde se tienen listas desplegables, campos de entrada manual y selección de imágenes para completar la información de un inmueble  
    2. Al completar toda la información se puede guardar los cambios para guardar o actualizar la información en la base de datos  
    3. Cuando se está editando una propiedad el formulario inicia con la información existente, cuando se está creando el formulario inicia vacío  

## Visualizar Inmueble  

![alt text](/public/assets/readme/image-12.png)  

Funcionalidad disponible para el Rol de **Usuario y Administrador**:  
    1. Permite **ver** más información del inmueble  
    2. Permite **ver** la imagen registrada del inmueble  
    3. Permite la **navegación** web al sitio donde se aloja el inmueble  

## Eliminar Inmueble 

![alt text](/public/assets/readme/image-13.png)  

Funcionalidad disponible para el Rol de **Usuario y Administrador**:  
    1. **Botón Cancelar**: Cierra el modal y no elimina ningún elemento  
    2. **Botón Confirmar**: Cierra el modal y elimina el elemento en cuestión  