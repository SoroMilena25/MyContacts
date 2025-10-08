# MyContacts

Une API REST pour gérer les utilisateurs et leurs contacts.  
Technologies : Node.js, Express, MongoDB, Mongoose, JWT pour l’authentification.

## Installation

1. Cloner le dépôt :  
```bash
git clone <URL_DE_VOTRE_REPO>
cd <NOM_DU_REPO>

2. Installer les dépendances :  
npm install

3. Installer MongoDB et s'assurer qu'il est en cours d'exécution.

## Configuration

Créer un fichier .env à la racine du projet avec les variables suivantes :
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nom_de_la_db
JWT_SECRET=VOTRE_SECRET_JWT

## Lancement

1. Lancer le serveur en mode développement avec Nodemon : npm run dev
2. Lancer le client http://localhost:3000/ : npm run start

## Endpoints

1. User
| Méthode | Endpoint           | Description                 | Body / Params            |
| ------- | ------------------ | --------------------------- | ------------------------ |
| POST    | `/api/users`       | Créer un nouvel utilisateur | `{ email, mdp, pseudo }` |
| POST    | `/api/users/login` | Connexion utilisateur       | `{ email, mdp }`         |


2. Contact
| Méthode | Endpoint                      | Description                         | Sécurité | Body / Params |
| ------- | ----------------------------- | ----------------------------------- | -------- | ------------- |
| POST    | `/api/contacts`               | Créer un contact                    | JWT      | Contact JSON  |
| GET     | `/api/contacts`               | Récupérer tous les contacts         | JWT      | -             |
| GET     | `/api/contacts/:id`           | Récupérer un contact par ID         | JWT      | id en path    |
| PATCH   | `/api/contacts/:id`           | Mettre à jour un contact            | JWT      | Contact JSON  |
| DELETE  | `/api/contacts/:id`           | Supprimer un contact                | JWT      | id en path    |
| GET     | `/api/contacts/user`          | Contacts du user connecté           | JWT      | -             |
| GET     | `/api/contacts/user/:user_id` | Contacts d’un utilisateur par ID    | JWT      | user_id path  |

## Swagger

http://localhost:8080/api-docs/#/


