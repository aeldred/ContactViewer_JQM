var _apiKey='grumpy';
var _contacts = {};
var _contactId = null;

console.log("Loading");
$(document).on("pagebeforeshow","#home-page", function(){
  var contactList = $('#contact-list');
  contactList.html('');

  $.get(
    'http://contacts.tinyapollo.com/contacts?key='+_apiKey,
      function(result) {
        _contacts = {};
        //console.log("there are "+ result.contacts.length + " contacts");
          for (i in result.contacts) {
              var contact = result.contacts[i];
              _contacts[contact._id] = contact;
              contactList.append('<li><a href="#details-page" ' +
                'data-contact-id="' +
                contact._id + '">' +
                contact.name + '</a></li>')
          }
          contactList.listview('refresh');
      }
  )
});

$(document).on('click', '#contact-list a', function() {
  //jquery binds $(this) to origin of event in DOM
  //(i.e. the link that was clicked)
  var link = $(this);

  //access the data-contact-id defined in the link
  _contactId = link.data('contact-id');
  console.log('contact id is ' + _contactId);
  return true;
})

$(document).on('pagebeforeshow','#details-page',function() {
  var contact = _contacts[_contactId]
  $('.contact-name').text(contact.name)
  $('.contact-title').text(contact.title)
  $('.contact-email').text(contact.email)
  $('.contact-phone').text(contact.phone)
  $('.contact-twitterid').text(contact.twitterId)
})

$(document).on('pagebeforeshow','#edit-page',function() {
  var contact = _contacts[_contactId]
  $('#edit-name').val(contact.name)
  $('#edit-title').val(contact.title)
  $('#edit-email').val(contact.email)
  $('#edit-phone').val(contact.phone)
  $('#edit-twitterid').val(contact.twitterId)
})

$(document).on('click','#edit-button',function() {
	var name= $('#edit-name').val()
	var title= $('#edit-title').val()
	var email= $('#edit-email').val()
	var phone= $('#edit-phone').val()
	var twitterId= $('#edit-twitterid').val()

	var	contact= {
		email: email,
		name: name,
		phone: phone,
		title: title,
		twitterId: twitterId
	}

	$.ajax({
		url:'http://contacts.tinyapollo.com/contacts/'+_contactId+'?key='+_apiKey,
		data:contact,
		type:"PUT",
		//contentType: "application/json",
		dataType: "json",
		success: 
			function(result) 
				{
					if(result.status=='success'){
						alert('Edit success!')
					}else if(result.status =='error'){
						alert('Edit failed')	
					}
				}
			})
})

$(document).on('click','#new-button',function() {
	var name=$('#new-name').val()
	var title=$('#new-title').val()
	var email=$('#new-email').val()
	var phone=$('#new-phone').val()
	var twitterId=$('#new-twitterId').val()

	$.post(
     'http://contacts.tinyapollo.com/contacts?key='+_apiKey+
		'&name='+name+
		'&title='+title+
		'&email='+email+
		'&phone='+phone+
		'&twitterId'+twitterId,

      function(result) {
		  if(result.status=="error"){
			alert("message: "+result.message+" contact: "+result.contact)	 
		  }else{
			alert("insert success!")
		  }
      }
  )
})

$(document).on('click',"#DeleteContact",function() {
  console.log("INdelete")
	var contact = _contacts[_contactId]
    console.log(contact)
	$.ajax({
		url:'http://contacts.tinyapollo.com/contacts/'+_contactId+'?key='+_apiKey,
		data:contact,
		type:"Delete",
		//contentType: "application/json",
		dataType: "json",
		success: 
			function(result) 
				{
					if(result.status=='success'){
                    console.log("s")
						alert('Delete success!')
					}else if(result.status =='error'){
						console.log("f")
                        alert('Delete failed')	
                        
					}
				}
			})
            
})


