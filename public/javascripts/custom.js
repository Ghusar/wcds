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

    $('#searchIcon').click(function(){
        $('nav').animate({height:'20%',fontSize:'35px',paddingTop:'25px'},300);
        $('#searchIcon').hide(300);
        $('#one').show(300);
        $('#two').hide(300);

    });

    $('.input-field > i').click(function(){
        $('#one').hide(300);
        $('#two').show(300);
        $('#searchIcon').show(300);
        $('nav').animate({height:'30%',fontSize:'45px',paddingTop:'40px'},300);

    });
});