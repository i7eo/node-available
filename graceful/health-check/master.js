console.log('Master process started');

const Kardia = require('kardia'),
	cluster = require('cluster');

let kardia_instance = Kardia.start({ name: "master-worker-cluster-example", port: 12800 });

kardia_instance.set('master-started', true);

console.log('Master process (examples/cluster/master.js) just set "master-started" value in Kardia to true');

cluster.fork();