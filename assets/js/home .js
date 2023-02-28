
$(".create-contact").click(function(){
    $("form").css("display","block");
})
$(".add-c").click(function(){
     $("form").css("display","none");
})
$(".contacts").click(function(e){
    //  console.log($(e.currentTarget,".details").innerText);
    // var i=e.currentTarget;
    // console.log( $(".details",i).textContent);
    // let a = $(e.currentTarget)
    // console.log(a)
    //    $(e.currentTarget ,".details").addClass("lock");
    $(".details").css("visibility","visible");

})



