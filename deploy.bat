@echo off
echo ====================================
echo   Vehicle Management App Deployment
echo ====================================
echo.

echo Building production version...
call npm run build

echo.
echo ✅ Build complete!
echo.
echo 🚀 Ready to deploy! Choose your option:
echo.
echo 1. EASIEST: Netlify Drop
echo    - Go to: https://netlify.com/drop
echo    - Drag the 'build' folder onto the page
echo    - Done!
echo.
echo 2. Your build folder is ready at:
echo    %cd%\build
echo.
echo 3. Or run one of these commands:
echo    vercel --prod
echo    surge (from build directory)
echo    npm run deploy (for GitHub Pages)
echo.
echo 📖 Full instructions in DEPLOYMENT.md
echo.
pause