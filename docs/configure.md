# Docsify configuration

## Add your code

Add blocks of code in your markdown with `vega` or `vegalite` syntax indication.

````markdown
```vega
your vega code
```

```vegalite
your vegalite code
```
````

Your code can be json or url to external code :

````markdown
```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "800",
  "height": "600",
  "data": {
   ...
  }
}
```

```vega
https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json
```
````
 

## Configure index.html

In your docsify index.html your must add following code :

```html
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
```

```html
  markdown: {
    renderer: {
      code: function(code, lang) {
        if (lang == "vegalite" || lang == "vega") {
          return (
            '<div class="vegalite_embed">' + code + "</div>"
          );
        }
        return this.origin.code.apply(this, arguments);
      }
    }
  },
  plugins: [
    function(hook, vm) {
      hook.ready(function() {
        const options = {
          actions: {editor: false, source: false, compiled: false} 
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
  ]
```
