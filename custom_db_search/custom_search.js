const searchValue = ()=> $(".userSearch").val();

$(document).ready(function () {
    $(".searchSubmit").click(console.log(searchValue()));
});
