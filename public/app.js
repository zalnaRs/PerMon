var socket = io();

var usageCpu = document.getElementById('usageCpu');
var freeMem = document.getElementById('freeMem');

var platform = document.getElementById('platform');
var totalMem = document.getElementById('totalMem');
var version = document.getElementById('version');
var arch = document.getElementById('arch');

socket.on('os-info', function (value) {
  var data = JSON.parse(value);

  var platformHtml;

  if (data.platform == 'win32') {
    platformHtml = `<img src="/Windows_logo.png" width="20"/> Windows`;
  } else if (data.platform == 'darwin') {
    platformHtml = `<img src="/MacOS_logo.png width="20"/> MacOS`;
  } else if (data.platform == 'linux') {
    platformHtml = `<img src"/Tux.png" width="20"/> Linux`;
  } else {
    platformHtml = 'Unknow';
  }

  platform.innerHTML = platformHtml;
  totalMem.innerHTML = data.totalMem;
  version.innerHTML = data.version;
  arch.innerHTML = data.arch;
});

socket.on('cpuUsageUpdate', function (value) {
  usageCpu.innerHTML = value;
});

socket.on('freeMemUpdate', function (value) {
  freeMem.innerHTML = value;
});
