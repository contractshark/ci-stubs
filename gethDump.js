
/*
This is a script to dump out the 4byte identifier for the last N transactions, 
along with some other stats about recent transactions. 
execute with 
$./build/bin/geth js dumper.js > dump.json
@author mhswende
*/
function dump(NUMBLOCKS){
	l_num = eth.getBlock("latest").number;

	ids  ={};
	var numtxs = 0;
	var numcalls = 0;
	var numblocks = 0;
	var numcreates = 0;
	var errcalls =0
	var startblock = l_num-NUMBLOCKS;
	var endblock = l_num;
	var num_uniq =0;


	for(var i = startblock ; i <= endblock;  i++){
		numblocks ++;
		var txs = eth.getBlock( i ).transactions;
		for(var ti =0 ; ti < txs.length ; ti++){

			var tx = eth.getTransaction(txs[ti]);
			numtxs +=1;

			if( tx.to == null){
				numcreates +=1;
				continue;
			}

			if(tx.input.length <= 2){
				continue;
			}
			if(tx.input.length < 10){
				errcalls += 1;
				continue;
			}

			numcalls++;
			var id = tx.input.slice(0,10); 
			if (ids[id]) {
				ids[id]++;
			}
			else{
				num_uniq++;
				ids[id] = 1;	
			} 
		}
	}


	return {
		startblock : startblock, 
		endblock : endblock,
		num_blocks : numblocks,
		num_calls: numcalls,
		num_creates:numcreates,
		num_txs: numtxs, 
		num_errcalls : errcalls, 
		num_uniq : num_uniq,
		ids : ids,
	};
}
console.log(JSON.stringify(dump(1000000)));
