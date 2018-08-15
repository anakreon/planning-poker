const Rsync = require('rsync');
const serverSettings = require('./src/environments/serversettings');
 
const rsync = new Rsync()
  .shell('ssh')
  .flags('az')
  .set('delete')
  .source('./dist/planning-poker/')
  .exclude('.htaccess')
  .destination(serverSettings.destination);
 
rsync.execute(function(error, code, cmd) {});
