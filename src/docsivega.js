(function () {

const install = function (hook) {
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
    }
  });
};	

window.$docsify.plugins = [].concat(install, $docsify.plugins);
	
})();
