$(document).ready(function () {
    $("button").click(function(){
        var searchstring = $('#searchfield');
        console.log(searchstring.val());
       $.post("/data",
            {
                input:searchstring.val()
            },
            function(data){
                console.log(data.data);
            });
    });
});