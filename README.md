# Toast.js

## Options

| Name         | Type                                                             | Description                                |
|:-------------|:-----------------------------------------------------------------|:-------------------------------------------|
| `position`   | `String`: `top-right`, `top-left`, `bottom-right`, `bottom-left` | Tosst position                             |
| `text`       | `String<any>`                                                    | Message to show                            |
| `dataset`    | `Object`                                                         | Dataset to pass on toast element           |
| `canClose`   | `Number`                                                         | Enable toast closing                       |
| `autoClose`  | `Boolean` or `Number`                                            | Timer in ms or `false`                     |
| `sucessText` | `String`                                                         | Text for success button                    |
| `onClick`    | `Function`                                                       | Function triggered on click on toast       |
| `onClose`    | `Function`                                                       | Function triggered no toast close          |
| `onSuccess`  | `Function`                                                       | Function triggered no success button click |
