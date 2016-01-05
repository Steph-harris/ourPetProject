$(document).ready(function(){ 
  //(gets breed data from breed select box and sets the wiki call as part of the success function)
  $(".breedSearch").on("click", function(e) {
    e.preventDefault();
    var title = $("#selectBreed").val()

    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        format: "json",
        action: "parse",
        page: title,
        prop:"text",
        section:0,
      },
      dataType: 'jsonp',
      headers: {
        'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
      },
      success: function (data) {
        var markup = data.parse.text["*"];
        var i = $('<div></div>').html(markup);
        
        // remove links 
        i.find('a').each(function() { 
          $(this).replaceWith($(this).html()); 
        });
        
        // remove references
        i.find('sup').remove();
        
        //remove cite error
        i.find('.mw-ext-cite-error').remove();

        $('#wikiInfo').addClass("col-xs-12").html($(i).find('p'));
        //If there isn't a direct matching Wiki response, show nothing
        $('#wikiInfo:contains(refer to)').html("").find('p');
        $('#wikiInfo:contains(Redirect)').html("").find('p');

      }
    });
  });
});
