# instalar
npm i serverless

# inicializar
sls

# sempre fazer deploy antes de tudo para verificar se esta com ambiente ok
sls deploy

# invocar na AWS
sls invoke -f hello

# invocar local
sls invoke local -f hello --log

# configurar dashboard
sls

# logs
sls logs -f hello -t

# remover
sls remove