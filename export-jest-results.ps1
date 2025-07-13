# Jest Test Results Export Script
# Usage: .\export-jest-results.ps1

param(
    [string]$OutputPath = ".",
    [switch]$OpenResults,
    [switch]$Verbose
)

Write-Host "🧪 Angular 19 Jest Test Results Export" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Run Jest tests and capture results
Write-Host "⏳ Running Jest tests..." -ForegroundColor Yellow
$jestOutput = & npm test 2>&1

# Extract key metrics
if ($jestOutput -match "Test Suites: (\d+) passed, (\d+) total") {
    $passedSuites = $matches[1]
    $totalSuites = $matches[2]
} else {
    $passedSuites = "Unknown"
    $totalSuites = "Unknown"
}

if ($jestOutput -match "Tests:\s+(\d+) passed, (\d+) total") {
    $passedTests = $matches[1]
    $totalTests = $matches[2]
} else {
    $passedTests = "Unknown"
    $totalTests = "Unknown"
}

if ($jestOutput -match "Time:\s+([\d.]+)s") {
    $executionTime = $matches[1] + "s"
} else {
    $executionTime = "Unknown"
}

# Calculate success rate
if ($totalSuites -ne "Unknown" -and $totalSuites -ne "0") {
    $successRate = [math]::Round(($passedSuites / $totalSuites) * 100, 2)
} else {
    $successRate = 0
}

# Generate timestamp
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"

# Create summary object
$summary = @{
    timestamp = $timestamp
    totalTestSuites = [int]$totalSuites
    passedTestSuites = [int]$passedSuites
    failedTestSuites = [int]$totalSuites - [int]$passedSuites
    totalTests = [int]$totalTests
    passedTests = [int]$passedTests
    failedTests = [int]$totalTests - [int]$passedTests
    executionTime = $executionTime
    successRate = "$successRate%"
    status = if ($passedSuites -eq $totalSuites) { "ALL_PASSING" } else { "SOME_FAILING" }
}

# Export JSON
$jsonPath = Join-Path $OutputPath "jest-results-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
$summary | ConvertTo-Json -Depth 3 | Set-Content $jsonPath

# Export CSV summary
$csvPath = Join-Path $OutputPath "jest-summary-$(Get-Date -Format 'yyyyMMdd-HHmmss').csv"
$csvContent = @"
Metric,Value
Total Test Suites,$totalSuites
Passed Test Suites,$passedSuites
Failed Test Suites,$($totalSuites - $passedSuites)
Total Tests,$totalTests
Passed Tests,$passedTests
Failed Tests,$($totalTests - $passedTests)
Execution Time,$executionTime
Success Rate,$successRate%
Status,$($summary.status)
Timestamp,$timestamp
"@
$csvContent | Set-Content $csvPath

# Display results
Write-Host ""
Write-Host "📊 Test Results Summary" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host "✅ Test Suites: $passedSuites/$totalSuites passed" -ForegroundColor $(if ($passedSuites -eq $totalSuites) { "Green" } else { "Yellow" })
Write-Host "✅ Tests: $passedTests/$totalTests passed" -ForegroundColor $(if ($passedTests -eq $totalTests) { "Green" } else { "Yellow" })
Write-Host "⏱️  Execution Time: $executionTime" -ForegroundColor Cyan
Write-Host "📈 Success Rate: $successRate%" -ForegroundColor $(if ($successRate -eq 100) { "Green" } else { "Yellow" })
Write-Host "🎯 Status: $($summary.status)" -ForegroundColor $(if ($summary.status -eq "ALL_PASSING") { "Green" } else { "Red" })

Write-Host ""
Write-Host "📁 Exported Files:" -ForegroundColor Magenta
Write-Host "   JSON: $jsonPath" -ForegroundColor White
Write-Host "   CSV:  $csvPath" -ForegroundColor White

if ($OpenResults) {
    Write-Host ""
    Write-Host "🔍 Opening results..." -ForegroundColor Yellow
    Start-Process $jsonPath
}

if ($Verbose) {
    Write-Host ""
    Write-Host "🔍 Detailed Jest Output:" -ForegroundColor DarkGray
    Write-Host $jestOutput -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "✨ Export completed successfully!" -ForegroundColor Green
