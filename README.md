## Available Scripts

In the project directory, you can run:

### `yarn start`

public/index.html

<div id="key1"></div>
<div id="key2"></div>
<script>
  var layout = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']]

var numpadLayout = [
['1', '2', '3'],
['4', '5', '6'],
['7', '8', '9'],
['⌫', '0', '✓']
]

function onChange(value) {
console.log('onChange', value);
}

    window.addEventListener('DOMContentLoaded', () => {
    window.renderKeyBoard({layout, id: 'key1', autoFocusBtn: 'q'});
    window.renderKeyBoard({layout: numpadLayout, id: 'key2', onChange });

});
</script>
