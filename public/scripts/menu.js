$ = document;
let donut = $.querySelector(".donut");
let menu =  $.querySelector(".sub-menu");
donut.addEventListener('click',() => {
    donut.classList.toggle('open');
    menu.classList.toggle('oper');
})