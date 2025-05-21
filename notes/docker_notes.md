# DEBUGOWANIE MYSQL CONTAINER

### Wejście do kontenera

```
docker exec -it mysql-db mysql -u root -p
# wpisz hasło: root
```

```
SHOW DATABASES;
USE db_projekt-sem4-agh;
SHOW TABLES;
```
### Logi
```
docker logs mysql-db
```

# USUWANIE VOLUME

```
docker compose down -v

```

```
docker volume rm projekt_mysql-data

```