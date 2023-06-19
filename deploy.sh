#!/usr/bin/env bash

echo "## Build ##"
npm run build

echo "## Copy ##"
scp -i /Users/hamidalinia/.ssh/ssh/key -r ./build/* root@185.110.190.242:/var/nodeeweb/public/theme/


