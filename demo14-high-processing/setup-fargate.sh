APP_NAME="process-data"
CLUSTER_NAME="curso-serverless"
PROJECT_NAME="curso-serverless01"
REGION="us-east-1"
LOG_GROUP_NAME="/ecs/$PROJECT_NAME"

ECS_ROLE_NAME="ecsTaskExecutionRole"
ECS_ROLE_ARN="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"

CUSTOM_POLICY_NAME="$APP_NAME"-policy
CUSTOM_POLICY_ARN="arn:aws:iam::043542657444:policy/process-data-policy"

ECR_URI_DOCKER="043542657444.dkr.ecr.us-east-1.amazonaws.com/process-data"
SSM_ENV_PATH="/prod/$PROJECT_NAME"

TASK_DEFINITION_ARN="arn:aws:ecs:us-east-1:043542657444:task-definition/process-data:1"

VPC_ID="vpc-59399624"

SECURITY_GROUP_NAME="$PROJECT_NAME"

GROUP_ID="sg-06b329c57aa8a175a"

aws iam create-role \
    --region $REGION \
    --role-name $ECS_ROLE_NAME \
    --assume-role-policy-document file://templates/task-execution-assume-role.json \
    | tee logs/1.iam-create-role.txt

# dar permissoes de executar chamadas ecs na role
aws iam attach-role-policy \
    --region $REGION \
    --role-name $ECS_ROLE_NAME \
    --policy-arn $ECS_ROLE_ARN

# permissao para acessar S3 e acessar variaveis de ambiente

# permissoes
# acessar o bucket de surveys
# fazer download de csv de surveys
# fazer upload de xlsx para surveys/reports
# ler variaveis de System Manager Parameter Store

aws iam create-policy \
    --policy-name $CUSTOM_POLICY_NAME \
    --policy-document file://templates/custom-access-policy.json \
    | tee logs/2.create-policy.txt

# adicionar policy acima na role principal
aws iam attach-role-policy \
    --region $REGION \
    --role-name $ECS_ROLE_NAME \
    --policy-arn $CUSTOM_POLICY_ARN

# criar cluster do Elastic Container Service (ECS)
aws ecs create-cluster \
    --cluster-name $CLUSTER_NAME \
    | tee logs/3.create-cluster.txt

# criar grupo de logs especifico para o cluster
aws logs create-log-group \
    --log-group-name $LOG_GROUP_NAME \
    | tee logs/4.logs-create-log-group.txt

# criar container registry
aws ecr create-repository \
    --repository-name $APP_NAME \
    --image-scanning-configuration scanOnPush=true \
    --region $REGION \
    | tee logs/5.create-docker-repo.txt

aws ecs register-task-definition \
    --cli-input-json file://templates/task-definition.json \
    | tee logs/6.register-task.txt

aws ecs list-task-definitions \
    | tee logs/7.tasks-definitions.txt

# security
aws ec2 describe-vpcs \
    | tee logs/8.describe-vpcs.txt

aws ec2 describe-subnets \
    --filters="Name=vpc-id,Values=$VPC_ID"
    --query "Subnets[*].SubnetId" \
    | tee logs/9.describe-subnets.txt

aws ec2 create-security-group \
    --group-name $SECURITY_GROUP_NAME \
    --description "grupo de acesso em ecs tasks" \
    | tee logs/10.create-security-group.txt

aws ec2 authorize-security-group-ingress \
    --group-id $GROUP_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region $REGION \
    | tee logs/11.authorize-sec-group.txt