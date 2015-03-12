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
  $('.contact-name').val(contact.name)
  $('.contact-title').val(contact.title)
  $('.contact-email').val(contact.email)
  $('.contact-phone').val(contact.phone)
  $('.contact-twitterid').val(contact.twitterId)
})

$(document).on('click','#edit-button',function() {
	var name=$('.contact-name').val()
	var title=$('.contact-title').val()
	var email=$('.contact-email').val()
	var phone=$('.contact-phone').val()
	var twitterId=$('.contact-twitterid').val()

	$.put(
     'http://contacts.tinyapollo.com/contacts/'+ +'?key='+_apiKey+
		'&name='+name+
		'&title='+title+
		'&email='+email+
		'&phone='+phone+
		'&twitterId'+twitterId,

      function(result) {
		  if(result.status=="error"){
			alert("message: "+result.message+" contact: "+result.contact)	 
		  }else{
			alert("edit success!")
		  }
      }
  )
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
