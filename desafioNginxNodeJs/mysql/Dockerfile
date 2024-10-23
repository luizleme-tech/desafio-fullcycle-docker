FROM mysql:5.7

# Copia o script SQL para configurar privilégios
COPY privileges.sql /docker-entrypoint-initdb.d/
COPY setup.sql /docker-entrypoint-initdb.d/

# Iniciar o MySQL com a configuração padrão
CMD ["mysqld", "--innodb-use-native-aio=0"]