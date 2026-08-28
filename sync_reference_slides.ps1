$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path -LiteralPath $PSScriptRoot).Path
$sourceRoot = (Resolve-Path -LiteralPath (Join-Path $projectRoot "..\src")).Path
$destinationRoot = Join-Path $projectRoot "assets\reference\slides"

if (-not $destinationRoot.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "The reference-slide destination escaped the project root."
}

$firstFifteen = @(
  "ChatGPT Image 2026年8月26日 17_34_17 (1).png",
  "ChatGPT Image 2026年8月26日 17_34_18 (2).png",
  "ChatGPT Image 2026年8月26日 17_33_50.png",
  "ChatGPT Image 2026年8月26日 17_34_20 (4).png",
  "ChatGPT Image 2026年8月26日 17_34_20 (5).png",
  "ChatGPT Image 2026年8月26日 17_35_00 (1).png",
  "ChatGPT Image 2026年8月26日 17_35_01 (2).png",
  "ChatGPT Image 2026年8月26日 17_35_03 (3).png",
  "ChatGPT Image 2026年8月26日 17_35_04 (4).png",
  "ChatGPT Image 2026年8月26日 17_35_05 (5).png",
  "ChatGPT Image 2026年8月26日 17_35_05 (6).png",
  "ChatGPT Image 2026年8月26日 17_35_07 (7).png",
  "ChatGPT Image 2026年8月26日 17_35_07 (8).png",
  "ChatGPT Image 2026年8月26日 17_35_08 (9).png",
  "ChatGPT Image 2026年8月26日 17_35_09 (10).png"
)

New-Item -ItemType Directory -Force -Path $destinationRoot | Out-Null

for ($page = 1; $page -le 43; $page += 1) {
  $sourceName = if ($page -le 15) {
    $firstFifteen[$page - 1]
  } else {
    "page-$page.png"
  }

  $sourcePath = Join-Path $sourceRoot $sourceName
  $destinationPath = Join-Path $destinationRoot ("slide-{0:D2}.png" -f $page)

  if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
    throw "Missing source slide: $sourcePath"
  }

  Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Force
}

$referenceSlides = Get-ChildItem -LiteralPath $destinationRoot -Filter "slide-*.png" -File
if ($referenceSlides.Count -ne 43) {
  throw "Expected 43 reference slides, found $($referenceSlides.Count)."
}

Write-Output "Synchronized 43 reference slides from $sourceRoot"
