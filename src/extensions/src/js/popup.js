const $ = window.jsrender;
console.log($.templates);
const template = $.templates(`<div>asdasd</div>`);

const htmlOutput = template.render([]);

$("#pills-settings").html(htmlOutput);
