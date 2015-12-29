
 $(document).ready(function(){
        $("input[type='button']").click(function(){            
            var breedChosen = $("input[name='optradio']:checked").val();            
            if(breedChosen){
                alert("Breed chosen is - " + breedChosen);
                return(breedChosen);
              }           
        });        
    });

  

    
