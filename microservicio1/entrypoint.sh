#!/bin/sh

# Esperar a que PostgreSQL este listo
/wait-for-it.sh 172.31.21.115:5432 --timeout=60 --strict -- echo "PostgreSQL listo"

# Aplicar migraciones
python manage.py makemigrations
python manage.py migrate --fake

# Ejecutar servidor (este sera el proceso principal)
exec python manage.py runserver 0.0.0.0:8000
