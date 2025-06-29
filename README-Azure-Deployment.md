# Azure DevOps Multi-Stage Pipeline Setup Guide

## Prerequisites

Before setting up the Azure DevOps pipeline, ensure you have:

1. **Azure DevOps Organization**: Create one at https://dev.azure.com
2. **Azure Subscription**: Active Azure subscription
3. **Azure Container Registry**: For storing Docker images
4. **Git Repository**: Your code repository in Azure DevOps

## Setup Instructions

### 1. Create Azure Resources

```bash
# Login to Azure
az login

# Create resource group
az group create --name "angular-app-rg" --location "East US"

# Create Azure Container Registry
az acr create --name "yourangularacr" --resource-group "angular-app-rg" --sku "Basic" --admin-enabled true

# Create App Service Plan (Linux)
az appservice plan create --name "angular-app-plan" --resource-group "angular-app-rg" --is-linux --sku B1

# Create Web Apps for different environments
az webapp create --name "your-angular-app-dev" --resource-group "angular-app-rg" --plan "angular-app-plan" --deployment-container-image-name "yourangularacr.azurecr.io/angular-frontend:latest"
az webapp create --name "your-angular-app-prod" --resource-group "angular-app-rg" --plan "angular-app-plan" --deployment-container-image-name "yourangularacr.azurecr.io/angular-frontend:latest"
```

### 2. Configure Azure DevOps Service Connections

1. Go to Project Settings > Service connections
2. Create new service connection:
   - **Azure Resource Manager**: For Azure deployments
   - **Docker Registry**: For Container Registry access

### 3. Update Pipeline Variables

In `azure-pipelines.yml`, update these variables:

```yaml
variables:
  containerRegistry: 'yourangularacr.azurecr.io'  # Your ACR name
  azureSubscription: 'your-azure-subscription'    # Service connection name
  webAppName: 'your-angular-app'                  # Base web app name
  resourceGroupName: 'angular-app-rg'             # Resource group name
```

### 4. Create Pipeline in Azure DevOps

1. Go to Pipelines > New Pipeline
2. Select your repository
3. Choose "Existing Azure Pipelines YAML file"
4. Select `azure-pipelines.yml`
5. Save and run

### 5. Configure Environments

1. Go to Pipelines > Environments
2. Create environments:
   - **Development**: Auto-deploy from develop branch
   - **Production**: Manual approval required

### 6. Set up Branch Policies

1. Go to Repos > Branches
2. Set branch policies for `main`:
   - Require pull request reviews
   - Require successful build validation
   - Automatically include reviewers

## Pipeline Stages

### Stage 1: Build and Test
- Install Node.js dependencies
- Run linting and tests
- Build Angular application
- Publish artifacts

### Stage 2: Docker
- Build Docker image
- Security scan with Trivy
- Push to Azure Container Registry

### Stage 3: Deploy Development
- Triggers on `develop` branch
- Automatic deployment
- Health check validation

### Stage 4: Deploy Production
- Triggers on `main` branch
- Manual approval gate
- Blue-green deployment
- Comprehensive health checks

## Environment-Specific Configurations

### Development Environment
```yaml
- stage: Deploy_Dev
  condition: eq(variables['Build.SourceBranch'], 'refs/heads/develop')
```

### Production Environment
```yaml
- stage: Deploy_Prod
  condition: eq(variables['Build.SourceBranch'], 'refs/heads/main')
```

## Security Best Practices

1. **Service Connections**: Use managed identity when possible
2. **Secrets**: Store sensitive data in Azure Key Vault
3. **Container Scanning**: Integrated Trivy security scanning
4. **HTTPS Only**: All web apps configured for HTTPS only
5. **Network Security**: Configure firewall rules as needed

## Monitoring and Logging

1. **Application Insights**: Add for monitoring
2. **Log Analytics**: Centralized logging
3. **Alerts**: Set up for deployment failures
4. **Health Checks**: Automated endpoint monitoring

## Local Development and Testing

Use the provided PowerShell script for local deployment:

```powershell
./deploy.ps1 -ResourceGroupName "angular-app-rg" -AppName "your-angular-app" -ContainerRegistryName "yourangularacr"
```

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check Node.js version compatibility
2. **Docker Issues**: Verify Dockerfile and build context
3. **Deployment Failures**: Check service connection permissions
4. **Health Check Failures**: Verify application startup time

### Debug Steps:

1. Check Azure DevOps build logs
2. Verify Azure Web App logs
3. Test Docker image locally
4. Validate Azure resource configurations

## Additional Features

### Feature Flags
Add feature flag support using Azure App Configuration:

```typescript
// Add to environment files
export const environment = {
  production: true,
  appConfiguration: 'your-app-config-endpoint'
};
```

### Blue-Green Deployment
Configure deployment slots for zero-downtime deployments:

```yaml
- task: AzureWebAppContainer@1
  inputs:
    deployToSlotOrASE: true
    slotName: 'staging'
```

### Auto-scaling
Configure auto-scaling rules:

```json
{
  "autoscaleSettings": {
    "enabled": true,
    "profiles": [{
      "rules": [{
        "scaleAction": {
          "direction": "Increase",
          "type": "ChangeCount",
          "value": "1"
        }
      }]
    }]
  }
}
```

## Cost Optimization

1. Use **B1 Basic** tier for development
2. Configure **auto-shutdown** for dev environments
3. Implement **resource tagging** for cost tracking
4. Use **reserved instances** for production

## Next Steps

1. Set up monitoring dashboards
2. Configure backup strategies
3. Implement disaster recovery
4. Add performance testing to pipeline
5. Set up multi-region deployment
