#!/bash/bin

echo "transfer started..."
rsync -r --delete-after $TRAVIS_BUILD_DIR/dist deploy@104.248.18.71:dist
echo "content transfered"

ssh -t deploy@104.248.18.71 'cd dist/dist; sudo cp --parents ./bachelor-iot-web-app /var/www/html; rm -rf dist; exit'
