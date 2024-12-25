# News Hub Project

## Description

News Hub is a modern platform that aggregates news from various sources and categorizes them for better accessibility. The project consists of a backend built with Laravel and a frontend developed using React.

---

## Prerequisites

Ensure you have the following installed:
- Docker
- Docker Compose

---

## Setup Instructions

### Backend Setup

Clone the project repository:
   ```bash
   git clone repository-url
   cd news-hub-backend


  cd to news-hub-backend

  run cp .env.example .env
```

make sure you have this keys on your .env

NEWS_API_KEY

NEWYORK_API_KEY

GUARDIN_API_KEY
 ```bash
run docker run --rm \
 -u "$(id -u):$(id -g)" \
 -v "$(pwd):/var/www/html" \
 -w /var/www/html \
 laravelsail/php84-composer:latest \
 composer install --ignore-platform-reqs
 ```

 ```bash
./vendor/bin/sail build

./vendor/bin/sail up

./vendor/bin/sail artisan migrate
```
then 
 ```bash
./vendor/bin/sail artisan scrape:news
```
 (this command fetches the data from three sources and stores it to the db)

### frontend

In an new terminal

 ```bash
cd news-hub-frontend

run

docker-compose build
docker-compose up
```

then visit `http:localhost:5173`

## Screenshots

### Project Overview

![Project Overview](images/Screenshot%20from%202024-12-25%2003-41-26.png)

### Preference Set

![Preference set](images/Screenshot%20from%202024-12-25%2003-41-40.png)

### Mobile Design

![Mobile design](images/Screenshot%20from%202024-12-25%2003-42-20.png)
