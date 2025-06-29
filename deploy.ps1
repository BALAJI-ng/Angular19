# PowerShell script for deploying Angular app to Azure
param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$AppName,
    
    [Parameter(Mandatory=$false)]
    [string]$Environment = "dev",
    
    [Parameter(Mandatory=$true)]
    [string]$ContainerRegistryName,
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [string]$ImageTag = "latest"
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "Starting deployment of Angular app to Azure..." -ForegroundColor Green

# Login to Azure (if not already logged in)
try {
    $context = Get-AzContext
    if (-not $context) {
        Write-Host "Please log in to Azure..." -ForegroundColor Yellow
        Connect-AzAccount
    }
} catch {
    Write-Host "Please log in to Azure..." -ForegroundColor Yellow
    Connect-AzAccount
}

# Create or update resource group
Write-Host "Creating/updating resource group: $ResourceGroupName" -ForegroundColor Cyan
try {
    $rg = Get-AzResourceGroup -Name $ResourceGroupName -ErrorAction SilentlyContinue
    if (-not $rg) {
        New-AzResourceGroup -Name $ResourceGroupName -Location $Location
        Write-Host "Resource group created successfully" -ForegroundColor Green
    } else {
        Write-Host "Resource group already exists" -ForegroundColor Yellow
    }
} catch {
    Write-Error "Failed to create resource group: $_"
    exit 1
}

# Build Docker image locally (optional)
Write-Host "Building Docker image..." -ForegroundColor Cyan
$imageName = "$ContainerRegistryName.azurecr.io/angular-frontend:$ImageTag"

try {
    docker build -t $imageName .
    Write-Host "Docker image built successfully" -ForegroundColor Green
} catch {
    Write-Error "Failed to build Docker image: $_"
    exit 1
}

# Login to Azure Container Registry
Write-Host "Logging in to Azure Container Registry..." -ForegroundColor Cyan
try {
    az acr login --name $ContainerRegistryName
    Write-Host "ACR login successful" -ForegroundColor Green
} catch {
    Write-Error "Failed to login to ACR: $_"
    exit 1
}

# Push Docker image to ACR
Write-Host "Pushing Docker image to ACR..." -ForegroundColor Cyan
try {
    docker push $imageName
    Write-Host "Docker image pushed successfully" -ForegroundColor Green
} catch {
    Write-Error "Failed to push Docker image: $_"
    exit 1
}

# Deploy ARM template
Write-Host "Deploying ARM template..." -ForegroundColor Cyan
$templateFile = "infrastructure/azure-resources.json"
$deploymentName = "angular-app-deployment-$(Get-Date -Format 'yyyyMMddHHmmss')"

try {
    $deployment = New-AzResourceGroupDeployment `
        -ResourceGroupName $ResourceGroupName `
        -TemplateFile $templateFile `
        -Name $deploymentName `
        -appName $AppName `
        -environment $Environment `
        -location $Location `
        -containerRegistryName $ContainerRegistryName `
        -dockerImageName "angular-frontend:$ImageTag" `
        -Verbose

    Write-Host "ARM template deployed successfully" -ForegroundColor Green
    Write-Host "Web App URL: $($deployment.Outputs.webAppUrl.Value)" -ForegroundColor Cyan
} catch {
    Write-Error "Failed to deploy ARM template: $_"
    exit 1
}

# Restart web app to ensure new image is loaded
Write-Host "Restarting web app..." -ForegroundColor Cyan
$webAppName = "$AppName-$Environment"
try {
    Restart-AzWebApp -ResourceGroupName $ResourceGroupName -Name $webAppName
    Write-Host "Web app restarted successfully" -ForegroundColor Green
} catch {
    Write-Warning "Failed to restart web app, but deployment may still be successful"
}

# Health check
Write-Host "Performing health check..." -ForegroundColor Cyan
$webAppUrl = "https://$webAppName.azurewebsites.net"
$maxRetries = 5
$retryCount = 0

do {
    try {
        $response = Invoke-WebRequest -Uri $webAppUrl -UseBasicParsing -TimeoutSec 30
        if ($response.StatusCode -eq 200) {
            Write-Host "Health check passed! Application is running at: $webAppUrl" -ForegroundColor Green
            break
        }
    } catch {
        $retryCount++
        if ($retryCount -lt $maxRetries) {
            Write-Host "Health check failed, retrying in 30 seconds... (Attempt $retryCount/$maxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 30
        } else {
            Write-Warning "Health check failed after $maxRetries attempts. Please check the application manually at: $webAppUrl"
        }
    }
} while ($retryCount -lt $maxRetries)

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Application URL: $webAppUrl" -ForegroundColor Cyan
