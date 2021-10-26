const plugin = (hook, vm) => {
	
  function(hook, vm) {
    hook.doneEach(function() {
      const options = {
	actions: {editor: false, source: true, compiled: false} 
      }
      document.querySelectorAll(".vegalite_embed").forEach(item => {
      try {
        vegaEmbed(item, JSON.parse(item.innerHTML), options);
      } catch(e) { 
        vegaEmbed(item, item.innerHTML, options);
      }
    });
  });
}
	
export default plugin;
