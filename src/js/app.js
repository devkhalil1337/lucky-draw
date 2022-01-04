$('#startBtn').on('click', function(){
    $("#startMenu").toggleClass("showMenu");
});
$("body").click(function(e) {
    if ($(e.target).closest('.taskbar').length == 0)
    $("#startMenu").removeClass('showMenu');
});