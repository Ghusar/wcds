$(document).ready(function () {
    var array=['a'];
    var sendit = function(query){
        array.push(query);
        $('.meraoutput').empty();
        $.post("/data",
            {
                input:query
            },
            function(data){
            console.log(data.data);
            for(var x = 0;x<data.data.length;x++) {
                    $('.meraoutput').append('<div class="card blue-grey darken-1 oneclass">' +
                        '<div class="card-content white-text">' +
                        '<span class="card-title ">' + data.data[x].name + '</span>' +
                        '<p>I am a very simple card. I am good at containing small bits of information.' +
                        'I am convenient because I require little markup to use effectively.</p>' +
                        '</div>' +
                        '</div>');

            }
            });
    }

    $('#one').on('click','.card-title',function () {
       append($(this).text());
       sendit(($(this).text()));
    });

    $('.breadcrumb').on('click','a',function(){
        var abc=$('.breadcrumb').children().get();
        //console.log(abc);
        var gg=false;
        var notedown=0;
        for(x=0;x<abc.length;x++){
            if(gg){
                $(abc[x]).remove();
            }
            if($(abc[x]).is($(this))){
               gg=true;
               notedown=x;
               //console.log("bhag");
           }
        }
        array.splice(notedown+2);
        //console.log(array);
    });

    $("#searchfield").keyup(function(e){
        $('.input-field > ul').empty();
        var searchstring = $('#searchfield');
        if (e.keyCode == '13') {
            searchstring.blur();
        }
        else {
            console.log(searchstring.val());
            $.post("/search",
                {
                    input: searchstring.val()
                },
                function (data) {
                    var arr = data.data;
                    console.log(data);
                    for(var x = 0; x<arr.length;x++){
                        //console.log(array);
                        if(array.indexOf(arr[x])==-1){
                            $('.input-field  > ul').append('<li class="searchresult">'+arr[x]+'</li>');
                        }
                        else{
                            console.log("bhag ");
                        }
                    }

                });
        }
    });



    var append = function (query) {
        var searchstring = $('#searchfield');
        searchstring.blur();
        $('.breadcrumb').append('<a href="#" class="active">'+query+'</a>');
       // searchstring.val('');
    }
    $('.input-field  > ul').on('hover','.searchresult',function () {
        $('.input-field > input').val($(this).text());
    });

    $('.input-field > ul').on('click','.searchresult',function () {
        append($(this).text());
        sendit(($(this).text()));
        $('.input-field > ul').empty();
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

