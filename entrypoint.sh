#!/bin/bash
cat /app/db.crt;
ls -la;
node ./node_modules/typeorm/cli.js --dataSource=dist/database/data-source.js migration:run;
node dist/src/main.js;
