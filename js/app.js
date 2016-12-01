/*
  Please add all Javascript code to this file.
*/

var titleArray1 = [];
var titleArray2 = [];
var titleArray3 = [];

var descriptionArray1 = [];
var descriptionArray2 = [];
var descriptionArray3 = [];

var urlArray1 = [];
var urlArray2 = [];
var urlArray3 = [];




$.get("https://newsapi.org/v1/articles?apiKey=3a1ec88d5993470780d7e9650eefa06a&source=cnn&sortBy=top",
    function(results) {
        for (var i = 0; i < results.articles.length; i++) {

            $("#main1 .articleContent h3").each(function(i) {
                var title = results.articles[i].title;
                $(this).text(title);
                titleArray1.push(title);

            })

            $("#main1 .articleContent h6").each(function(i) {
                var description = results.articles[i].description;
                $(this).text(description);
                descriptionArray1.push(description);

            })

            $("#main1 .article img").each(function(i) {
                $(this).attr('src', results.articles[i].urlToImage);

            })

            var url = results.articles[i].url;
            urlArray1.push(url);
        }

        }).fail(function() {
            alert('There is an error loading the feed. Please check back later.'); // error msg
});

$.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json",
    function(results) {

        //results.data.feed.forEach(function(result){


            $("#main2 .articleContent h3").each(function(i) {
                var title = results.data.feed[i].content.title;
                $(this).text(title);
                titleArray2.push(title);
            });

            $("#main2 .articleContent h6").each(function(i) {
                var description = results.data.feed[i].content.description;
                $(this).text(description);
                descriptionArray2.push(description);
            });

            $("#main2 .article img").each(function(i) {
                $(this).attr('src', results.data.feed[i].content.media.images[i].url);

            });

            $("#main2 .impressions").each(function(i) {
                score = results.data.feed[i].diggs.count;
                $(this).text(score);

            });

        for (var i = 0; i < results.data.feed.length; i++) {
            var url = results.data.feed[i].content.url;
            urlArray2.push(url);
        }

    }).fail(function() {
    alert('There is an error loading the feed. Please check back later.'); // error msg
});


    $.get("https://content.guardianapis.com/search?api-key=b5fc69ef-e3cf-4c47-a9e1-3160f85bd235&show-fields=headline,body,thumbnail,score",
        function (r) {
            for (var i = 0; i < r.response.results.length; i++) {

                $("#main3 .articleContent h3").each(function (i) {
                    var title = r.response.results[i].webTitle;
                    $(this).text(title);
                    titleArray3.push(title);

                })

                $("#main3 .articleContent h6").each(function (i) {
                    $(this).text(r.response.results[i].sectionName);

                })

                $("#main3 .article img").each(function (i) {
                    $(this).attr('src', r.response.results[i].fields.thumbnail);

                })




                var body = r.response.results[i].fields.body;
                var htmlDescription = $.trim(body).substring(0, 300);
                var description = htmlDescription.replace(/<\/?[^>]+(>|$)/g, "");
                descriptionArray3.push(description);

                var url = r.response.results[i].webUrl;
                urlArray3.push(url);

            }

        }).fail(function() {
        alert('There is an error loading the feed. Please check back later.'); // error msg
    });



$("li#source1").click(function(){
    $("#main1").css("visibility", "visible");
    $("#main2").css("visibility", "hidden");
    $("#main3").css("visibility", "hidden");
});

$("li#source2").click(function(){
    $("#main2").css("visibility", "visible");
    $("#main1").css("visibility", "hidden");
    $("#main3").css("visibility", "hidden");
});

$("li#source3").click(function(){
    $("#main3").css("visibility", "visible");
    $("#main2").css("visibility", "hidden");
    $("#main1").css("visibility", "hidden");
});


$("#main1 .articleContent h3").each(function (i){
    $(this).click(function(){
        $("#popUp").attr("class", "show");
        $("#popUp h1").text(titleArray1[i]);
        $("#popUp .container p").text(descriptionArray1[i]);
        $("#popUp .container a").attr("href", urlArray1[i]);
    });
});

$("#main2 .articleContent h3").each(function (i){
    $(this).click(function(){

        $("#popUp").attr("class", "loader show");

        setTimeout(function(){

            $("#popUp").attr("class", "loader hidden");
            $("#popUp").attr("class", "show");


        },500);





        $("#popUp h1").text(titleArray2[i]);
        $("#popUp .container p").text(descriptionArray2[i]);
        $("#popUp .container a").attr("href", urlArray2[i]);
    });
    });

$("#main3 .articleContent h3").each(function (i){
    $(this).click(function(){
        $("#popUp").attr("class", "show");
        $("#popUp h1").text(titleArray3[i]);
        $("#popUp .container p").text(descriptionArray3[i]);
        $("#popUp .container a").attr("href", urlArray3[i]);
    });
});


$(".closePopUp").click(function(){
    $("#popUp").attr("class", "hidden");

});