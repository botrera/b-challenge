# B-Challenge - API de Transacciones Fintech

API REST para gestionar transacciones entre usuarios de una fintech. Permite crear transacciones, aprobar/rechazar transacciones pendientes y consultar el historial de transacciones de un usuario.

## 🚀 Tecnologías

- **Node.js** 18.16
- **TypeScript**
- **Express.js**
- **PostgreSQL** 14
- **Sequelize** (ORM)
- **Yarn** (gestor de paquetes)

## 📋 Requisitos Previos

- Node.js 18.16 o superior
- Yarn instalado
- PostgreSQL 14 o superior (o Docker para usar docker-compose)

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone <repository-url>
cd b-challenge
```

2. Instalar dependencias:

```bash
yarn install
```

## ⚙️ Configuración

Crear archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
ENV=LOCAL
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/node_template
```

Para tests, crear `.env.test`:

```env
ENV=TEST
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/node_template_test
```

## 🏃 Ejecución

### Opción 1: Con Docker Compose (Recomendado)

```bash
yarn docker-compose
```

Esto levantará PostgreSQL y la aplicación Node.js automáticamente. Las migraciones y seeders se ejecutan automáticamente al iniciar.

### Opción 2: Manual

1. Levantar PostgreSQL:

```bash
docker-compose up -d postgres
```

2. Iniciar el servidor en modo desarrollo:

Para poder inicar en modo desarrollo es necesario tener una DB PostgreSQL corriendo.

```bash
yarn dev
```

El servidor estará disponible en `http://localhost:3000`

**Nota:** Las migraciones y seeders se ejecutan automáticamente al iniciar el servidor.
