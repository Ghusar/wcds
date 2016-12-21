$(document).ready(function () {
    var array=['a'];
    if($('.breadcrumb').children().length == 1) {
        $('.breadcrumb').hide();
        $('.breadcrumb > .close').hide();
    }

    var sendit = function(query){
        $('.breadcrumb').show();
        $('.breadcrumb > .close').show();
        array.push(query);
        $('.meraoutput').empty();
        $.post("/data",
            {
                input:query
            },
            function(data){
            console.log(data.data);
            for(var x = 0;x<data.data.length;x++) {
                    $('.meraoutput').append('<div class="card oneclass">' +
                        '<div class="card-content white-text">' +
                        '<span class="card-title ">' + data.data[x].name + '</span>' +
                        '<p class="card-text">I am a very simple card. I am good at containing small bits of information.' +
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
        sendit($(this).text());
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
        $('#searchIcon').hide(300);
        $('#one').show(300);
        $('#two').hide(300);

    });

    $('.modal-header > .close,.modal-footer > .close').click(function(){
        $('#one').hide(300);
        $('#two').show(300);
        $('#searchIcon').show(300);


    });
    $('.breadcrumb > .close').click(function () {
        $('.breadcrumb').hide();
        $('.breadcrumb > .close').hide();
        array = ['a'];
        $('.breadcrumb > a').remove();
        $('.meraoutput').empty();

    });

    $('.tabs > li').click(function () {
        var c = $('.steps').children().get();
        if($(this).data('no')=='1'){


            $(c[0]).css('display','inline-block');
            $(c[1]).css('display','inline-block');
            $(c[2]).hide();
            $(c[3]).hide();

        }
        else{
            $(c[2]).css('display','inline-block');
            $(c[3]).css('display','inline-block');
            $(c[1]).hide();
            $(c[0]).hide();
        }
    });

    $(window).scroll(function () {

       if($(document).scrollTop()>0){
           $('nav').animate({ backgroundColor: "black" }, 300,function () {
               
           });
       }
    });
});

