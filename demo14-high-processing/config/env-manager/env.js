// APP_NAME="process-data"
// CLUSTER_NAME="curso-serverless"
// PROJECT_NAME="curso-serverless01"
// REGION="us-east-1"
// LOG_GROUP_NAME="/ecs/$PROJECT_NAME"

// ECS_ROLE_NAME="ecsTaskExecutionRole"
// ECS_ROLE_ARN="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"

// CUSTOM_POLICY_NAME="$APP_NAME"-policy
// CUSTOM_POLICY_ARN="arn:aws:iam::043542657444:policy/process-data-policy"

// ECR_URI_DOCKER="043542657444.dkr.ecr.us-east-1.amazonaws.com/process-data"
// SSM_ENV_PATH="/prod/$PROJECT_NAME"

// TASK_DEFINITION_ARN="arn:aws:ecs:us-east-1:043542657444:task-definition/process-data:1"

// VPC_ID="vpc-59399624"

// SECURITY_GROUP_NAME="$PROJECT_NAME"

// GROUP_ID="sg-06b329c57aa8a175a"

const clusterName = "curso-serverless"
const projectName = "curso-serverless01"

const variables = {
    ECS_TASK_DEFINITION = {
        value: "process-data:1",
        type: "String"
    },
    ECS_CLUSTER_NAME = {
        value: "curso-serverless",
        type: "String"
    },
    ECS_TASK_LAUNCH_TYPE = {
        value: "FARGATE",
        type: "String"
    },
    ECS_TASK_COUNT = {
        value: "1",
        type: "String"
    },
    ECS_TASK_PLATFORM_VERSION = {
        value: "LATEST",
        type: "String"
    },
    ECS_TASK_CONTAINER_NAME = {
        value: "process-data",
        type: "String"
    },
    ECS_TASK_CONTAINER_FILE_ENV_NAME = {
        value: "SURVEY_FILE",
        type: "String"
    },
    ECS_TASK_SUBNET = {
        value: ""
    }
}