# PowerShell script for deploying Angular app to Azure Container Apps
param(
    [Parameter(Mandatory = $true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory = $true)]
    [string]$AppName,
    
    [Parameter(Mandatory = $false)]
    [string]$Environment = "dev",
    
    [Parameter(Mandatory = $true)]
    [string]$ContainerRegistryName,
    
    [Parameter(Mandatory = $false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory = $false)]
    [string]$ImageTag = "latest",
    
    [Parameter(Mandatory = $false)]
    [string]$ContainerAppEnvironment = "$AppName-env"
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "Starting deployment of Angular app to Azure Container Apps..." -ForegroundColor Green

# Check if Azure CLI is installed
try {
    az --version | Out-Null
    Write-Host "Azure CLI found" -ForegroundColor Green
}
catch {
    Write-Error "Azure CLI is not installed. Please install it from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
}

# Check if Container Apps extension is installed
try {
    az extension show --name containerapp | Out-Null
    Write-Host "Container Apps extension found" -ForegroundColor Green
}
catch {
    Write-Host "Installing Container Apps extension..." -ForegroundColor Yellow
    az extension add --name containerapp
}

# Login to Azure (if not already logged in)
try {
    $context = az account show 2>$null | ConvertFrom-Json
    if (-not $context) {
        Write-Host "Please log in to Azure..." -ForegroundColor Yellow
        az login
    }
    else {
        Write-Host "Already logged in to Azure as: $($context.user.name)" -ForegroundColor Green
    }
}
catch {
    Write-Host "Please log in to Azure..." -ForegroundColor Yellow
    az login
}

# Create or update resource group
Write-Host "Creating/updating resource group: $ResourceGroupName" -ForegroundColor Cyan
try {
    $rg = az group show --name $ResourceGroupName 2>$null | ConvertFrom-Json
    if (-not $rg) {
        az group create --name $ResourceGroupName --location $Location
        Write-Host "Resource group created successfully" -ForegroundColor Green
    }
    else {
        Write-Host "Resource group already exists" -ForegroundColor Yellow
    }
}
catch {
    Write-Error "Failed to create resource group: $_"
    exit 1
}

# Create Azure Container Registry if it doesn't exist
Write-Host "Creating/updating Azure Container Registry: $ContainerRegistryName" -ForegroundColor Cyan
try {
    $acr = az acr show --name $ContainerRegistryName --resource-group $ResourceGroupName 2>$null | ConvertFrom-Json
    if (-not $acr) {
        az acr create --name $ContainerRegistryName --resource-group $ResourceGroupName --sku Basic --admin-enabled true
        Write-Host "Azure Container Registry created successfully" -ForegroundColor Green
    }
    else {
        Write-Host "Azure Container Registry already exists" -ForegroundColor Yellow
    }
}
catch {
    Write-Error "Failed to create Azure Container Registry: $_"
    exit 1
}

# Build Docker image locally (optional)
Write-Host "Building Docker image..." -ForegroundColor Cyan
$imageName = "$ContainerRegistryName.azurecr.io/angular-frontend:$ImageTag"

try {
    docker build -t $imageName .
    Write-Host "Docker image built successfully" -ForegroundColor Green
}
catch {
    Write-Error "Failed to build Docker image: $_"
    exit 1
}

# Login to Azure Container Registry
Write-Host "Logging in to Azure Container Registry..." -ForegroundColor Cyan
try {
    az acr login --name $ContainerRegistryName
    Write-Host "ACR login successful" -ForegroundColor Green
}
catch {
    Write-Error "Failed to login to ACR: $_"
    exit 1
}

# Push Docker image to ACR
Write-Host "Pushing Docker image to ACR..." -ForegroundColor Cyan
try {
    docker push $imageName
    Write-Host "Docker image pushed successfully" -ForegroundColor Green
}
catch {
    Write-Error "Failed to push Docker image: $_"
    exit 1
}

# Create Container Apps Environment
Write-Host "Creating Container Apps Environment..." -ForegroundColor Cyan
try {
    $containerEnv = az containerapp env show --name $ContainerAppEnvironment --resource-group $ResourceGroupName 2>$null | ConvertFrom-Json
    if (-not $containerEnv) {
        az containerapp env create --name $ContainerAppEnvironment --resource-group $ResourceGroupName --location $Location
        Write-Host "Container Apps Environment created successfully" -ForegroundColor Green
    }
    else {
        Write-Host "Container Apps Environment already exists" -ForegroundColor Yellow
    }
}
catch {
    Write-Error "Failed to create Container Apps Environment: $_"
    exit 1
}

# Create or update Container App
Write-Host "Deploying Container App..." -ForegroundColor Cyan
$containerAppName = "$AppName-$Environment"
$fullImageName = "$ContainerRegistryName.azurecr.io/angular-frontend:$ImageTag"

try {
    $containerApp = az containerapp show --name $containerAppName --resource-group $ResourceGroupName 2>$null | ConvertFrom-Json
    if (-not $containerApp) {
        # Create new container app
        az containerapp create `
            --name $containerAppName `
            --resource-group $ResourceGroupName `
            --environment $ContainerAppEnvironment `
            --image $fullImageName `
            --registry-server "$ContainerRegistryName.azurecr.io" `
            --registry-username $ContainerRegistryName `
            --registry-password (az acr credential show --name $ContainerRegistryName --query passwords[0].value -o tsv) `
            --target-port 80 `
            --ingress external `
            --cpu 0.5 `
            --memory 1Gi `
            --min-replicas 1 `
            --max-replicas 3
        Write-Host "Container App created successfully" -ForegroundColor Green
    }
    else {
        # Update existing container app
        az containerapp update `
            --name $containerAppName `
            --resource-group $ResourceGroupName `
            --image $fullImageName `
            --registry-password (az acr credential show --name $ContainerRegistryName --query passwords[0].value -o tsv)
        Write-Host "Container App updated successfully" -ForegroundColor Green
    }
    
    # Get the application URL
    $appUrl = az containerapp show --name $containerAppName --resource-group $ResourceGroupName --query properties.configuration.ingress.fqdn -o tsv
    Write-Host "Container App deployed successfully!" -ForegroundColor Green
    Write-Host "Application URL: https://$appUrl" -ForegroundColor Cyan
}
catch {
    Write-Error "Failed to deploy Container App: $_"
    exit 1
}

# Health check
Write-Host "Performing health check..." -ForegroundColor Cyan
$appUrl = az containerapp show --name $containerAppName --resource-group $ResourceGroupName --query properties.configuration.ingress.fqdn -o tsv
$healthCheckUrl = "https://$appUrl"
$maxRetries = 5
$retryCount = 0

do {
    try {
        $response = Invoke-WebRequest -Uri $healthCheckUrl -UseBasicParsing -TimeoutSec 30
        if ($response.StatusCode -eq 200) {
            Write-Host "Health check passed! Application is running successfully." -ForegroundColor Green
            break
        }
    }
    catch {
        $retryCount++
        if ($retryCount -lt $maxRetries) {
            Write-Host "Health check failed, retrying in 30 seconds... (Attempt $retryCount/$maxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 30
        }
        else {
            Write-Warning "Health check failed after $maxRetries attempts. Please check the application manually."
        }
    }
} while ($retryCount -lt $maxRetries)

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Application URL: https://$appUrl" -ForegroundColor Cyan
Write-Host "Azure Container Registry: $ContainerRegistryName.azurecr.io" -ForegroundColor Cyan
Write-Host "Container App: $containerAppName" -ForegroundColor Cyan
