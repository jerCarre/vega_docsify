function plugin(hook, vm) {	

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
    const options = {
	actions: {editor: false, source: true, compiled: false} 
    }
    document.querySelectorAll(".vegalite_embed").forEach(item => {
      try {
        vegaEmbed(item, JSON.parse(item.innerHTML), options);
      } catch(e) { 
        vegaEmbed(item, item.innerHTML, options);
      }
    })
  })

}

if (!window.$docsify) {
    window.$docsify = {}
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin)
