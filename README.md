# Vega in docsify

[Docsify](https://docsify.js.org/) is a powerful and easy-to-use documentation site generator. You can quickly publish your documentation on github, ...

Some strange guys want to display diagrams inside documentation. [Vega/vegalite](https://vega.github.io/) can be a pleasant way to draw its.

![](http://vda-lab.github.io/assets/vega-lite.png)

[This documentation](https://jercarre.github.io/vega_docsify/) explains how to integrate vega/vegalite diagrams into your docsify documentation.

## How to configure

### Add your code

Add blocks of code in your markdown with `vega` or `vegalite` syntax property.

````markdown
```vega
your vega code
```

```vegalite
your vegalite code
```
````

You can write either json or url to external code :

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
 
### Configure index.html

In your docsify index.html your must add following code :

```html

  window.$docsify = {
  ...
  }

  // import vega
  // <script src="//cdn.jsdelivr.net/npm/vega@5"></script>
  // <script src="//cdn.jsdelivr.net/npm/vega-lite@5"></script>
  // <script src="//cdn.jsdelivr.net/npm/vega-embed@6"></script>
  // <script src="//cdn.jsdelivr.net/gh/jerCarre/vega_docsify@main/lib/docsivega.js"></script>  

```

## Demos

### External diagram

````markdown
```vega
https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json
```
```` 

```vega
https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json
```
### Internal code with external data

````markdown
```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 500,
  "height": 300,
  "data": {
    "url": "https://vega.github.io/vega-lite/data/us-10m.json",
    "format": {
      "type": "topojson",
      "feature": "counties"
    }
  },
  "transform": [{
    "lookup": "id",
    "from": {
      "data": {
        "url": "https://vega.github.io/vega-lite/data/unemployment.tsv"
      },
      "key": "id",
      "fields": ["rate"]
    }
  }],
  "projection": {
    "type": "albersUsa"
  },
  "mark": "geoshape",
  "encoding": {
    "color": {
      "field": "rate",
      "type": "quantitative"
    }
  }
}
```
````

```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 500,
  "height": 300,
  "data": {
    "url": "https://vega.github.io/vega-lite/data/us-10m.json",
    "format": {
      "type": "topojson",
      "feature": "counties"
    }
  },
  "transform": [{
    "lookup": "id",
    "from": {
      "data": {
        "url": "https://vega.github.io/vega-lite/data/unemployment.tsv"
      },
      "key": "id",
      "fields": ["rate"]
    }
  }],
  "projection": {
    "type": "albersUsa"
  },
  "mark": "geoshape",
  "encoding": {
    "color": {
      "field": "rate",
      "type": "quantitative"
    }
  }
}
```

### Internal code with controls

Code from [this vega example](https://vega.github.io/vega/examples/earthquakes/).

```vega
{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "An interactive globe depicting earthquake locations and magnitudes.",
  "padding": 10,
  "width": 500,
  "height": 500,
  "autosize": "none",

  "signals": [
    {
      "name": "quakeSize", "value": 6,
      "bind": {"input": "range", "min": 0, "max": 12}
    },
    {
      "name": "rotate0", "value": 90,
      "bind": {"input": "range", "min": -180, "max": 180}
    },
    {
      "name": "rotate1", "value": -5,
      "bind": {"input": "range", "min": -180, "max": 180}
    }
  ],

  "data": [
    {
      "name": "sphere",
      "values": [
        {"type": "Sphere"}
      ]
    },
    {
      "name": "world",
      "url": "https://vega.github.io/vega/data/world-110m.json",
      "format": {
        "type": "topojson",
        "feature": "countries"
      }
    },
    {
      "name": "earthquakes",
      "url": "https://vega.github.io/vega/data/earthquakes.json",
      "format": {
        "type": "json",
        "property": "features"
      }
    }
  ],

  "projections": [
    {
      "name": "projection",
      "scale": 225,
      "type": "orthographic",
      "translate": {"signal": "[width/2, height/2]"},
      "rotate": [{"signal": "rotate0"}, {"signal": "rotate1"}, 0]
    }
  ],

  "scales": [
    {
      "name": "size",
      "type": "sqrt",
      "domain": [0, 100],
      "range": [0, {"signal": "quakeSize"}]
    }
  ],

  "marks": [
    {
      "type": "shape",
      "from": {"data": "sphere"},
      "encode": {
        "update": {
          "fill": {"value": "aliceblue"},
          "stroke": {"value": "black"},
          "strokeWidth": {"value": 1.5}
        }
      },
      "transform": [
        {
          "type": "geoshape",
          "projection": "projection"
        }
      ]
    },
    {
      "type": "shape",
      "from": {"data": "world"},
      "encode": {
        "update": {
          "fill": {"value": "mintcream"},
          "stroke": {"value": "black"},
          "strokeWidth": {"value": 0.35}
        }
      },
      "transform": [
        {
          "type": "geoshape",
          "projection": "projection"
        }
      ]
    },
    {
      "type": "shape",
      "from": {"data": "earthquakes"},
      "encode": {
        "update": {
          "opacity": {"value": 0.25},
          "fill": {"value": "red"}
        }
      },
      "transform": [
        {
          "type": "geoshape",
          "projection": "projection",
          "pointRadius": {"expr": "scale('size', exp(datum.properties.mag))"}
        }
      ]
    }
  ]
}
```

### External data in Github gist

```vegalite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A simple pie chart with labels.",
  "data": {
    "url": "https://gist.githubusercontent.com/jerCarre/075bef8f4f1410657c58711f9a4bd021/raw/data.json"
  },  
  "encoding": {
    "theta": {"field": "value", "type": "quantitative", "stack": true},
    "color": {"field": "category", "type": "nominal", "legend": null}
  },
  "layer": [{
    "mark": {"type": "arc", "outerRadius": 80}
  }, {
    "mark": {"type": "text", "radius": 90},
    "encoding": {
      "text": {"field": "value", "type": "nominal"}
    }
  }]
}
```

```vegalite
{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Bump chart",
    "width": 500,
    "height": 300,
    "data": {
      "values": [
        {"pf": "fr", "commit": "a2043829", "date": "2021-11-12", "author": "@jcarre via ansible"  , "bdx": "2.21.13.3", "tls": "2.21.13.3"},
        {"pf": "fr", "commit": "ab11d552", "date": "2021-11-11", "author": "@jcarre via ansible"  , "bdx": "2.21.13.3", "tls": "2.21.12.1"},
        {"pf": "fr", "commit": "8683830c", "date": "2021-11-10", "author": "@jcarre via ansible"  , "bdx": "2.21.12.1", "tls": "2.21.12.1"},
        {"pf": "fr", "commit": "9bb5c178", "date": "2021-11-09", "author": "@jcarre via ansible"  , "bdx": "2.21.12.1", "tls": "2.21.12.1"},
        {"pf": "fr", "commit": "91b39482", "date": "2021-11-08", "author": "@alaforie via ansible", "bdx": "2.21.12.1", "tls": "2.21.12.1"},
        {"pf": "fr", "commit": "8ef6eefd", "date": "2021-11-04", "author": "@jcarre via ansible"  , "bdx": "2.21.12.1", "tls": "2.21.12.1"},
        {"pf": "fr", "commit": "b6ac4a5c", "date": "2021-11-03", "author": "@jcarre via ansible"  , "bdx": "2.21.12.1", "tls": "2.21.13.2"}
      ]
    },
    "mark": {
      "type": "line",
      "interpolate": "step-after",
      "point": true
    },
    "encoding": {
      "x": {"field": "date"},
      "y": {"field": "tls", "sort": "descending"}, 
      "order": {"field": "date"}
    }
  }
  ```
  
