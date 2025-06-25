# Cloud-Based Admin Publication System

## Project Overview
A scalable cloud application enabling administrators to manage publications and perform CRUD operations through a microservices architecture.

## 📌 Team
| Member                        | Role                          |
|-------------------------------|-------------------------------|
| César Álvaro Miranda Gutiérrez | Computer Science Engineer     |
| Mirko Cliver Rodríguez Poveda  | Telecommunications Engineer    |

**Academic Year:** 2025  
**Faculty:** Technology and Science  

## 🏗️ System Architecture
```mermaid
graph TD
    A[Frontend - Next.js] --> B[Backend - NestJS]
    B --> C[Database - MongoDB]
    B --> D[Cache - Redis]
    E[Reverse Proxy - Nginx] --> A
    E --> B