echo "Switching to branch manster"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* /var/www/html

echo "Done!"