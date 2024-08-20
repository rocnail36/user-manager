### Getting startep 

# Prueba Técnica - Parkour Devs

Este proyecto es una prueba técnica que implementa autenticacíon con authJs manejo de base de datos con prisma, envio de correos con resend, se utilizo kirimase como builder y la aplicación esta creada sobre nextjs

## Instalación

Sigue los siguientes pasos para levantar el proyecto en tu entorno local.

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio


2. **Configura las variables de entorno**

   Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno:
   
      ```bash
     DATABASE_URL=your_postgress_uri
     NEXTAUTH_SECRET=your_super_secret_key_here
     NEXTAUTH_URL=http://localhost:3000
     RESEND_API_KEY=your_resend_api_key

**Nota** cada una de estas variables es importante para correr el proyecto

3. **Instala las dependencias**

  Ejecuta el siguiente comando para instalar las dependencias del proyecto

       ```bash
          npm install --force

**Nota** Es necesario usar "--force" para resolver un conflicto de dependencias.

4. **Genera el cliente prisma**

   ```bash
   npm run db:generate

5. **Corre las migraciones de la base de datos**

   ```bash
   npm run db:migrate

6. **Corre el proyecto**

   ```bash
   npm run dev
   
   
