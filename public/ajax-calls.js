$(document).ready(function(){
	console.log('hello ajax calls! doc is ready!');


// ajax works with put and delete: 
	$('.delete-btn').click(function(e){
		e.preventDefault();
		console.log('You want to delete me ? :(', $(this).attr('href'));
		var url = $(this).attr('href');

		$.ajax({		 //  it is a jQuery function;
			url: url,    // $(this).attr('href'),
			method: 'DELETE'
		}).done(function(res){
			//console.log('success:......', res );
			window.location = '/' + url.split('/')[1];
		}).fail(function(err){
			console.log('fail: .....', err);
		});
	});


// examples of ajax works as put 
	$('#edit-tag').submit(function(e){
		e.preventDefault();
		console.log('About to submit a PUT  req');

		$.ajax({
			url: $(this).attr('action'),
			method: 'PUT',
			data: $(this).serialize()   //  take the data from the form and make it encoded to store, so body-parser. 
		}).done(function(res){
			console.log('success', res);
		}).fail(function(err){
			console.log('error', err);
		});

	});

});




