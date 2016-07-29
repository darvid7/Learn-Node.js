/**
 * Created by David on 29/07/2016.
 */
// NOTE CONSOLE.LOGS OUTPUTTED TO JVM IN BROWSER, NOT IN TERMINAL
// alert(1);    // can be used to test file is linked
console.log("main.js linked");
// when document is ready
// when html element of class del_user clicked
// do deleteUser
$(document).ready(function(){
    console.log("rdy");
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
    console.log('clicked to delete a user');

    //alert(1);
    var confirmation = confirm("Are you sure?");
    if(confirmation){
        // ajax request
        $.ajax({
            type:"DELETE",
            url:"/users/delete/"+$(this).data('id')   // grab id via $(classname).data('id')
        }).done(function(response){
            // apparently this is just skipped so the page doesn't refresh
            // copy it and paste it below to remedy
            window.location.replace('/');   // redirect to home page
        })
        window.location.replace('/');   // redirect to home page

    } else {
        return false;
    }
}
// in index.ejs class ="del_user"

// adding this to the ejs we can get the id of each user
// data-id="<% user._id %>
