!function(){var t=function(t){return document.querySelector(t)},e=null;t("[data-start]").addEventListener("click",(function(){console.log("clickStart"),t("[data-start]").setAttribute("disabled",!0),t("[data-stop]").removeAttribute("disabled"),e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t("[data-stop]").addEventListener("click",(function(){console.log("clickStop"),t("[data-stop]").setAttribute("disabled",!0),t("[data-start]").removeAttribute("disabled"),clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.ac4aac92.js.map
