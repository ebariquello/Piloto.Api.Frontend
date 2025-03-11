const fs = require('fs');
const exec = require('child_process').exec;

function createRevisionFile() {
  let jsonContent = {};
  let hash = '';
  let branch = '';
  exec(
    'git rev-parse --short HEAD',
    function (error: Error, build: Buffer, stderr: Buffer) {
      if (!error) {
        hash = build.toString().trim();
        exec(
          'git rev-parse --abbrev-ref HEAD',
          function (error2: Error, build2: Buffer, stderr2: Buffer) {
            if (!error2) {
              branch = build2.toString().trim();
              jsonContent = JSON.stringify({ hash, branch });

              fs.writeFileSync(
                'src/assets/json/git-version.json',
                jsonContent,
                {
                  encoding: 'utf8',
                }
              );
            }
          }
        );
      }
    }
  );
}

createRevisionFile();
