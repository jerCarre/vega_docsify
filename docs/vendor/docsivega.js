function plugin(hook, vm) {	

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
