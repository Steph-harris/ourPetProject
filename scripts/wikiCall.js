$(document).ready(function(){
  //(gets breed data from specific pet petfinder object and sets the wiki call as part of the success function)
  $(".breed").on("click", function(e) {
    e.preventDefault();
    var title = $("#clickMe").val()

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

        $('#wikiInfo').html($(i).find('p'));
      }
    });
  });
});
