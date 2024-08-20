### Parkour Devs

# Prueba Técnica - Parkour Devs

Este proyecto es una prueba técnica que implementa autenticacíon con authJs manejo de base de datos con prisma, envio de correos con resend, se utilizo kirimase como builder y la aplicación esta creada sobre nextjs

## Instalación

Sigue los siguientes pasos para levantar el proyecto en tu entorno local.

1.   **Clona este repositorio:**

~~~
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
~~~

2. **Configura las variables de entorno**

Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno:
   
   ~~~
   DATABASE_URL=your_postgress_uri
   NEXTAUTH_SECRET=your_super_secret_key_here
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   ~~~
**Nota** cada una de estas variables es importante para correr el proyecto

3. **Instala las dependencias**

Ejecuta el siguiente comando para instalar las dependencias del proyecto

~~~
npm install --force
~~~
**Nota** Es necesario usar "--force" para resolver un conflicto de dependencias.

4. **Genera el cliente prisma**

~~~
npm run db:generate
~~~
5. **Corre las migraciones de la base de datos**

~~~
npm run db:migrate
~~~
6. **Corre el proyecto**
~~~
npm run dev
~~~   
   
## breve explicación de la creación del proyecto 

Utilicé Kirimase para generar la estructura base del proyecto, creando la vista de workers junto con sus controladores y el modelo de Prisma. Para la autenticación, elegí JWT por su facilidad de configuración. La internacionalización de la página se implementó con Next.js, encapsulando el contenido en una carpeta [lang] para asegurar que el locale esté disponible en páginas y layouts.

Para manejar la traducción en componentes y esquemas de Zod, utilicé el Context API y creé funciones que aplican el diccionario correspondiente. Me adherí a la estructura de Kirimase para mantener la homogeneidad del proyecto. Utilicé las rutas anidadas de Next.js para mostrar múltiples páginas dentro de un mismo layout.

## puntos de mejora 

**Diccionario** se puede mejorar la estructura del diccionario haciendo que su uso sea mas senccillo y evitar el exeso de concatenación.

**Componentes** hay componentes creados por kirimase que traen mucho codigo y traen varios componentes y funciones dentro de una misma carpeta se puede refactorizar para hacer el codigo mas legible, asi mismo se crearon componentes los cuales son pocos flexibles y se podrian ver beneficiados de patrones de diseño como compound patterns ejemplo de esto es la tabla en la cual se muestran los usuarios en una aplicación pequeña no da tanto problema pero para algo escalable lo mejor seria aplicar estas mejoras.

**Traducción** la pagina no esta traducida al 100%

**Formularios** las respuestas de los formularios asi mismo como sus respuestas muestran un margen de mejora se podrian aplicar regex y mensajes de ayuda un poco mas preciso 
