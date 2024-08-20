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

**Diccionario:** Se puede mejorar la estructura del diccionario, haciéndolo más sencillo de usar y evitando el exceso de concatenación.

**Componentes:** Hay componentes creados por Kirimase que contienen mucho código y varios componentes y funciones dentro de una misma carpeta. Se pueden refactorizar para hacer el código más legible. Asimismo, se crearon componentes que son poco flexibles y que podrían beneficiarse de patrones de diseño como la creación de componentes por composición. Un ejemplo de esto es la tabla en la que se muestran los usuarios; en una aplicación pequeña no causa tanto problema, pero para algo escalable sería mejor aplicar estas mejoras. 

**Traducción:** La pagina no esta traducida al 100%

**Formularios:** los formularios muestran un margen de mejora se podrian aplicar regex y mensajes de ayuda un poco mas precisos 

**Links:** customizar links para mantener la elección del idioma de la pagina.
