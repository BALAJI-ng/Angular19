# PowerShell script for running Jest tests with real-time browser viewing
# This script runs Jest in watch mode and automatically opens/refreshes the browser

Write-Host "🚀 Starting Jest Browser Watch Mode" -ForegroundColor Green
Write-Host "📋 This will:" -ForegroundColor Yellow
Write-Host "   • Run Jest tests in watch mode" -ForegroundColor White
Write-Host "   • Generate HTML reports automatically" -ForegroundColor White
Write-Host "   • Open browser at http://localhost:8080/jest-report.html" -ForegroundColor White
Write-Host "   • Auto-refresh when tests change" -ForegroundColor White
Write-Host ""

# Create test-results directory if it doesn't exist
if (!(Test-Path "test-results")) {
    New-Item -ItemType Directory -Path "test-results" -Force
    Write-Host "📁 Created test-results directory" -ForegroundColor Cyan
}

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
        $listener.Start()
        $listener.Stop()
        return $false
    } catch {
        return $true
    }
}

# Check if port 8080 is available
if (Test-Port -Port 8080) {
    Write-Host "⚠️  Port 8080 is in use. Trying to use port 8081..." -ForegroundColor Yellow
    $port = 8081
} else {
    $port = 8080
}

Write-Host "🌐 Browser will open at: http://localhost:$port/jest-report.html" -ForegroundColor Green
Write-Host "⏱️  Starting in 3 seconds..." -ForegroundColor Yellow

Start-Sleep -Seconds 3

# Start Jest in watch mode and live-server concurrently
try {
    Write-Host "🎯 Launching Jest Watch + Live Server..." -ForegroundColor Magenta
    
    # Run the concurrent command
    npm run test:watch:browser
    
} catch {
    Write-Host "❌ Error starting Jest browser watch: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Jest Browser Watch completed!" -ForegroundColor Green
