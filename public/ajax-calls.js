$(document).ready(function(){
	console.log('hello ajax calls! doc is ready!');


// ajax works with put and delete: 
	$('.delete-btn').click(function(e){    // delete btn 
		e.preventDefault();
		console.log('You want to delete me ? :(', $(this).attr('href'));
		
		var url = $(this).attr('href');    // this refers to the delete btn
		$.ajax({		              //  it is a jQuery function;
			url: url,                 // $(this).attr('href'),
			method: 'DELETE'		// this is call for finding the url route with method DELETE,
		}).done(function(res){
			//console.log('success:......', res );
			window.location = '/' + url.split('/')[1];  // string to array function. 
			// window.location is how you redirect on the front end!
		}).fail(function(err){
			console.log('fail: .....', err);           // If done promise doesn't get anything.! => nothing get send back then the ajax fails and err will log. 
		});
	});


// examples of ajax works as put 
// this is an event listener : find the element with the ID edit tag, and listen its submit event
	$('#edit-reservation').submit(function(e){
		e.preventDefault();
		console.log('About to submit a PUT  req');

		$.ajax({
			url: $(this).attr('action'),  //this is the element for the edit-tag, getting what's in the action.
			method: 'PUT',				 // what type of route it is looking for. 
			data: $(this).serialize()   //  take the data from the form and make it encoded to store, so body-parser. (this is the req.body)! 
		}).done(function(res){			//  after the controller tags put finish and sends back a res.
			console.log(res);
			window.location = '/reservations';  // this redirects the page to this page!
			//console.log('success', res); 
		}).fail(function(err){			// If done promise doesn't get anything.! => nothing get send back then the ajax fails and err will log. 
			console.log('error', err);
		});

	});

});


