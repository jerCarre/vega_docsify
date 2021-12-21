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
        vegaEmbed(item, JSON.parse(item.textContent), config);
      } catch(e) { 
        vegaEmbed(item, item.textContent, config);
      }
    })
  })

}

if (!window.$docsify) {
    window.$docsify = {}
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin)
