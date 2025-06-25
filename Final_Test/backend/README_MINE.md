# crear el proyecto llamado backend en nodejs

# ingresar a la carpeta backend
cd backend

# Inicializa el proyecto Node.js
npm init -y

# Instala las dependencias principales
npm install express @prisma/client
npm install --save-dev prisma typescript ts-node @types/node @types/express nodemon

# Inicializa Prisma
npx prisma init --datasource-provider mongodb

# Crea estructura básica de TypeScript
npx tsc --init


# Esctructura del proyecto
backend/
│
├── prisma/                   # Carpeta Prisma (en raíz)
│   └── schema.prisma         # Esquema de la base de datos
│
├── src/
│   ├── core/
│   │   ├── config.ts
│   │   ├── database.ts
│   │   └── server.ts
│   │
│   ├── modules/
│   │   ├── managers/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── models/       # Modelos específicos del módulo
│   │   │   ├── routes.ts
│   │   │   ├── interfaces.ts
│   │   │   └── validations.ts
│   │   │
│   │   ├── users/
│   │   │   └── ...           # Misma estructura
│   │   │
│   │   ├── classes/
│   │   │   └── ...           # Misma estructura
│   │   │
│   │   └── shared/
│   │       ├── middlewares/
│   │       ├── utils/
│   │       └── errors/
│   │
│   ├── app.ts
│   └── index.ts
│
└── ...                       # Otros archivos de configuración


# intalar joi
npm install joi
## si estas usando typescript instalar lo tipos
npm install --save-dev @types/joi

## instalar dotenv
npm install dotenv

## Habilitar replica set en mongo
una ves que se tiene mongoDBCompass.
Abrir cmd como administrador y ejecutar el siguiente comando
taskkill /IM mongod.exe /F

Crear una carpeta para la base de datos:(cambiar la barra a inversa en cmd)
mkdir -p C:/data/db

iniciar mongo con el replica set 
mongod --dbpath "C:/data/db" --replSet rs0


Abrir otra nueva termina modo admin en power shell y otro.
Ingresar a la consola de mongo con el siguiente comando:
mongosh

Dentro de la consola de MongoDB en power shell, ejecutar:
rs.initiate()

Verificar que el replica set se haya creado correctamente:
rs.status()

Ingresar a MongoDBCompass y crear nueva conexion.
Poner en en el campo URI:
mongodb://localhost:27017/?replicaSet=rs0

y funciona correctamente.

colgar las coneccciones de mongoDB
net stop mongodb

volver a habilitar el mongoDB normal:
net start mongodb

## ingresando otro dia
Abrir cmd admin, netamente para mongodb.
Parar mongoDB
net stop mongodb

Iniciar mongoDB y replica set:
mongod --dbpath "C:/data/db" --replSet rs0

Luego de usar, volver a la normalidad
Ctrl + C
net start mongodb