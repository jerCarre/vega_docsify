function plugin(hook, vm) {

  let config = Object.assign({}, {
    actions: {editor: false, source: true, compiled: false} 
  }, vm.config.vegalite);

  hook.afterEach(function(html, next) {
    var htmlElement = document.createElement('div');
    htmlElement.innerHTML = html;
	  
    htmlElement.querySelectorAll('pre[data-lang=vega],pre[data-lang=vegalite],pre[data-lang=vega-lite]').forEach((element) => {
      var replacement = document.createElement('div');
      replacement.textContent = element.textContent;
      replacement.classList.add('vegalite_embed');
      element.parentNode.replaceChild(replacement, element);
    });

    next(htmlElement.innerHTML);
  });	
	
  hook.doneEach((hook) => {

    document.querySelectorAll(".vegalite_embed").forEach(item => {
      try {
	console.log(item.innerHTML)
        vegaEmbed(item, JSON.parse(item.innerHTML), config);
      } catch(e) { 
        vegaEmbed(item, item.innerHTML, config);
      }
    })
  })

}

if (!window.$docsify) {
    window.$docsify = {}
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin)
