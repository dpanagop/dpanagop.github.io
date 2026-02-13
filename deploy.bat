@echo off
echo Starting deployment to dpanagop.github.io...
echo.

:: Check if git is available
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Git is not installed or not in your PATH.
    echo Please install Git for Windows and try again.
    pause
    exit /b 1
)

:: Initialize git if not already initialized
if not exist .git (
    echo Initializing git repository...
    git init
    git branch -M main
)

:: Configure remote (update if connection already exists)
git remote remove origin >nul 2>nul
git remote add origin https://github.com/dpanagop/dpanagop.github.io.git

:: Add all files
echo Adding files...
git add .

:: Commit
echo Committing changes...
git commit -m "Deploy: Fresh agentic portfolio site"

:: Force push
echo Pushing to GitHub (you may be prompted for credentials)...
git push -f origin main

echo.
echo Deployment complete!
pause
