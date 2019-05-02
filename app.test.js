
'use strict';

const request = require('supertest');
const app = require('./app');

function checkSearchData(res)
{

    const jContent = res.body;

    if(typeof jContent !== 'object'){
	throw new Error('not an object');
    }

    if(jContent[0]['email'] !== 'panagiota.konstantinou@durham.ac.uk'){
	console.log(jContent);
	throw new Error('email should be panagiota.konstantinou@durham.ac.uk');
    }


    if(jContent[0]['Dname'] !== 'Coco'){
		
	throw new Error('Dname should be Coco');
    }
	
}

// thanks to Nico Tejera at https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
// returns something like "access_token=concertina&username=bobthebuilder"
function serialise(obj){
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

describe('Test the showDogs service', () => {
    test('GET /showDogs succeeds', () => {
        return request(app)
	    .get('/showDogs')
	    .expect(200);
    });

    test('GET /showDogs returns JSON', () => {
        return request(app)
	    .get('/showDogs')
	    .expect('Content-type', /json/);
    });
	//---------------------------------------------
/*
    test('GET /showDogs includes curly', () => {
        return request(app)
	    .get('/showDogs')
	    .expect(/Curly/);
    });
	
	*/
	    test('GET /volunteers succeeds', () => {
        return request(app)
	    .get('/volunteers')
	    .expect(200);
    });

    test('GET /volunteers returns JSON', () => {
        return request(app)
	    .get('/volunteers')
	    .expect('Content-type', /json/);
    });
	//---------------------------------------------
	  test('GET /owners succeeds', () => {
        return request(app)
	    .get('/owners')
	    .expect(200);
    });

    test('GET /owners returns JSON', () => {
        return request(app)
	    .get('/owners')
	    .expect('Content-type', /json/);
    });
	//---------------------------------------------
	
	test('GET /search/Maria succeeds', () => {
        return request(app)
	    .get('/search/Maria')
	    .expect(200);
    });
	
	test('GET /search/Testing succeeds', () => {
        return request(app)
	    .get('/search/Testing')
	    .expect(404);
    });

    test('GET /search/Maria returns JSON', () => {
        return request(app)
	    .get('/search/Maria')
	    .expect('Content-type', /json/);
    });

    test('GET /search/Maria includes name details', () => {
        return request(app)
	    .get('/search/Maria')
	    .expect(checkSearchData);
});
	//---------------------------------------------

	
  test('POST /addOwners1 cannot replicate', () => {
	const params = { 
			data2: '[{"nameO":"Test Test","idO":"SarEBHaO8AcC1TGNwclWjHxXWlJ3","emailO":"test@gmail.com"}]'};
        return request(app)
	    .post('/addOwners1')
	    .send(serialise(params))
	    .expect(200);
});

test('POST /addVol doent works', () => {
	// create a randomly named potato type

	const params = {daysV: ['Monday'],
		access_token: ''};
	// add it to the list
	return request(app)
	.post('/addVol')
	.send(serialise(params)).expect(404);
});
	

});
