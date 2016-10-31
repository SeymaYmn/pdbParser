var protein = [];

$(document).ready(function() {
	$('#pdb-button').click(function() {
		url = 'https://files.rcsb.org/download/' + $('#pdb-id').val() + '.pdb';
		$('#content').text('Loading from ' + url + ' ...');		
		$.get( url, function( data ) {
		  dataParse(data);
		});
	});
})

function dataParse(data){
    document.getElementById("content").innerHTML = "";
	var lines = data.split('\n');
	    for(var line = 0; line < lines.length; line++){
			if(lines[line].substring(0, 4) == "ATOM"){
				if(protein.length == 0){
					protein.push(parser(lines[line]));
				}
				else if(protein[protein.length-1][0].resSeqNum == parseInt(lines[line].substring(22, 26))){
					protein[protein.length-1][0].atoms.push(atomParser(lines[line]));
				}
				else{
					protein.push(parser(lines[line]));
				}
			}
			if(lines[line].substring(0, 3) == "TER"){
				break;
			}
	    }
	    document.getElementById("content").innerHTML = JSON.stringify(protein,undefined,protein.length);				
}

function parser(line){
	var residue = [];
	var resName = line.substring(17, 20);
	var resSeqNum = parseInt(line.substring(22, 26));
	var atoms = atomParser(line);
	residue.push({
		resName:resName, 
		resSeqNum:resSeqNum, 
		atoms:atoms
	});
	return residue;
}

function atomParser(line){
	var atoms = [];
	var atomName = line.substring(12, 16)
	var x = parseFloat(line.substring(30, 38));
	var y = parseFloat(line.substring(38, 46));
	var z = parseFloat(line.substring(46, 54));
	atoms.push({atomName: atomName, x: x, y: y, z: z});
	return atoms;
}