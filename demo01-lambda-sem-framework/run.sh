# 1o passo: criar arquivo de politicas de seguranca

# 2o passo: criar role de segurança na AWS
aws iam create-role \
    --role-name lambda-exemplo \
    --assume-role-policy-document file://politicas.json \
    | tee logs/role.log

# 3o passo: criar aruivo com conteudo e zipa-lo
zip function.zip index.js

aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role arn:aws:iam::043542657444:role/lambda-exemplo \
    | tee logs/lambda-create.log

# 4o passo: invoke lambda
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log

# 5o passo: atualizar, zipar
zip function.zip index.js

# 6o passo: atualizar lambda
aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log

# 7o passo: invokar e ver resultado
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec-update.log

# 8o passo: remover
aws lambda delete-function \
    --function-name hello-cli \

aws iam delete-role \
    --role-name lambda-exemplo