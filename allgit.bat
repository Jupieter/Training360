F:
cd F:\GIT\Training360
git status
git add .
set /p UserInput=What is the commit-message?
%UserInput%
git commit -m "%UserInput%"
git push
git status
