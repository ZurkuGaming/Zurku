var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Zurku1',
  description: 'Zurku1',
  script: 'C:\\Users\\Zurku\\OneDrive\\Desktop\\ㅤ\\ZURKU\\Zurku\\index.js',
  logOnRestart: true,
  logpath: 'C:\\path\\to\\your\\logs\\directory'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.on('start', function(){
  console.log('Zurku1 started!');
});

// Listen for any errors
svc.on('error', function(err){
  console.log('An error occurred: ', err);
});

svc.install();