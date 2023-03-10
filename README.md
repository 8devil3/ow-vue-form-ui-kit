# OrangeVue Form UI kit
A completely free simple UI form components for Vue 3 based entirely on Tailwind CSS. It includes:
- Input
- Button
- Dropdown
- Radio
- Checkbox

## Features
- Light/dark mode
- Three styles for inputs and dropdows: linear, rounded and pill
- Four styles for buttons: linear, rounded, pill and outline (with or without icons)
- Components are styled and set with props

## Demo
[Demo](https://www.tailwindtoolset.app)

## Requirements
Vue 3.x, Font Awesome, Tailwind CSS 3.x and Tailwind CSS Form Plugin (see [Acknowledgements](#acknowledgements))

## Installation
```bash
npm i ow-vue-form-ui-kit`
```

## Usage
After installation, import the component in your `.vue` file:
```vue
<template>
<div>
    <Input
        type="tel"
        v-model="data.inputValue"
        label="City"
        id="fb-link1"
        shape="linear"
        placeholder="This is a placeholder"
        errorMsg="This is an error message"
        :charsCounter="10"
        icon="fa-solid fa-check"
    />

    <Button
        text="Rounded"
        shape="rounded"
        mainColor="secondary"
    />

    <Select
        label="City"
        v-model="data.dropdownValue"
        :options="cities"
        defaultOption="Select city"
        shape="rounded"
        errorMsg="This is an error message"
    />
    
    <Radio
        v-for="city, id in cities"
        :label="city"
        :id="'city-' + id"
        name="city"
        v-model:checked="data.radioValue"
        :value="city"
        subLabel="Text under label"
    />

    <Checkbox
        v-for="city, id in cities"
        :label="city" :id="'city-2-' + id"
        name="city"
        v-model:checked="data.checkboxValues"
        :value="city"
        subLabel="Text under label"
    />
</div>
</template>

<script setup>
import { reactive } from 'vue';
import { Input, Checkbox } from 'ow-vue-form-ui-kit';

const data = reactive({
    inputValue: 'Milano',
    dropdownValue: 'Milano',
    radioValue: 'Torino',
    checkboxValues: ['Torino', 'Firenze'],
});

const cities = ['Milano', 'Roma', 'Firenze', 'Torino', 'Bologna'];
</script>
```



## Props Reference

### Inputs
| Props | Type | Default | Values | Description |
| :---- | :--- | :------ | :----- | :---------- |
| `shape`  | `String` | `linear` | `linear, rounded, pill` | Input shape. |
| `type` | `String` | `linear` | `text, url, email, password, tel, search` | Input type. |
| `label` | `String` | `null` | Any string | Input label content. |
| `name` | `String` | `linear` | Any string | Input name attribute. |
| `mainColor` | `String` | `neutral1` | One of the twelve predefined colors | Input border in normal state. |
| `focusColor` | `String` | `primary` | One of the twelve predefined colors | Input border and background in focus state. |
| `placeholder` | `String` | `null` | Any string | Content of input placeholder. If shape="linear", placeholder will not display; the label is used instead. |
| `id` | `String` | `linear` | Any string | Input id attribute. |
| `min, max, step` | `Number` | `0, 100, 1` | Any number | Used in inpup type="number" to define min, max and step value acceptable.|
| `autocomplete` | `String` | `on` | `on, off` | Input autocomplete attribute, turn it on or off. |
| `autofocus` | `Boolean` | `false` | `true, false` | Input autofocus attribute, turn it on or off. |
| `icon` | `String` | `null` | Font Awesome classes | Specify family and icon, i.e.: `fa-solid fa-check` |
| `iconColor` | `String` | `text-success` | Any Tailwind CSS class | Could be one of predefined colors or any text-* Tailwind class, even in the form `text-[#ff0000]` |
| `required` | `Boolean` | `false` | `true, false` | Input required attribute. |
| `errorMsg` | `String` | `null` | Any string | An error message to display. |
| `disabled` | `Boolean` | `linear` | `true, false` | Input disabled attribute. |
| `charsCounter` | `Number` | `null` | Any integer | Enable the chars input count (spaces included) and it turns red when input length is grater than the set value` |
| `pattern` | `String` | `null` | JavaScript regular expression | Input pattern attribute. |

### Buttons
| Props | Type | Default | Values | Description |
| :---- | :--- | :------ | :----- | :---------- |
| `shape` | `String` | `squared` | `squared, rounded, pill` | Button shape. |
| `outline` | `Boolean` | ` false` | `true, false` | Set button with just border and pale background.` |
| `mainColor` | ` String` | ` primary` | One of the twelve predefined colors | Button color.` |
| `type` | `String` | `button` | `button, submit, reset` | Button type attribute. |
| `text` | ` String` | ` null` | Any string | Button text content. |
| `textColor` | ` String` | `text-white` | Any Tailwind CSS class | Could be one of predefined colors or any text-* Tailwind class, even in the form `text-[#ff0000]` |
| `textColorOutline` | `String` | text-gray-700 dark:text-white` | `Any Tailwind CSS class` | `Could be one of predefined colors or any text-* Tailwind class, even in the form `text-[#ff0000]` |
| `disabled` | `Boolean` | `false` | `true, false` | Button disabled attribute. |
| `icon` | `String` | `null` | Font Awesome classes | Specify family and icon, i.e.: fa-solid fa-check |

### Dropdowns
| Props | Type | Default | Values | Description |
| :---- | :--- | :------ | :----- | :---------- |
| `shape` | `String` | `linear` | `linear, rounded, pill` | Dropdown shape. |
| `options` | `Array` | `[]` | An array of strings or numbers | An array of strings or numbers; arrays of objects will not work. |
| `label` | `String` | `null` | Any string | Dropdown label content. |
| `name` | `String` | `linear` | Any string | Dropdown name attribute. |
| `mainColor` | `String` | `neutral1` | One of the twelve predefined colors | Dropdown border in normal state. |
| `focusColor` | `String` | `primary` | One of the twelve predefined colors | Dropdown border and background in focus state. |
| `listColor` | `String` | `neutral2` | One of the twelve predefined colors | Dropdown list background color. |
| `defaultOption` | `String` | `null` | Any string` | `Content of dropdown default option that is the one when no value is selected. |
| `id` | `String` | `linear` | Any string | Dropdown id attribute. |
| `errorMsg` | `String` | `null` | Any string | An error message to display. |
| `disabled` | `Boolean` | `linear` | `true, false` | `Dropdown disabled attribute. |

### Radios and checkboxes
| Props | Type | Default | Values | Description |
| :---- | :--- | :------ | :----- | :---------- |
| `value` | `String, Number` | `null` | Any string, any number | Input radio or checkbox value. |
| `checked` |
| `(for checkboxes)` | `Array` | `null` | An array of strings or numbers | To be used in the form `v-model:checked="["a", "b", "c"]"` to determine the checked value; can be an array of strings or numbers; arrays of objects will not work. |
| `checked` |
| `(for radios)` | `String, Number` | `null` | Any string, any number | To be used in the form v-model:checked="data.myValue" to determine the checked value. |
| `subLabel` | `String` | `null` | Any string | Text displayed under the label. |
| `id` | `String` | `null` | Any string | Input `id` attribute. |
| `mainColor` | `String` | `primary` | One of the twelve predefined colors | Element color in all states. |
| `name` | `String` | `null` | Any string | Input name attribute.


## Default color Reference
### Light mode
| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| primary | ![#ff6600](https://via.placeholder.com/10/ff6600?text=+) #ff6600 |
| secondary | ![#6366f1](https://via.placeholder.com/10/6366f1?text=+) #6366f1 |
| tertiary | ![#06b6d4](https://via.placeholder.com/10/06b6d4?text=+) #06b6d4 |
| quaternary | ![#ec4899](https://via.placeholder.com/10/ec4899?text=+) #ec4899 |
| neutral1 | ![#6b7280](https://via.placeholder.com/10/6b7280?text=+) #6b7280 |
| neutral2 | ![#cbd5e1](https://via.placeholder.com/10/cbd5e1?text=+) #cbd5e1 |
| label | ![#94a3b8](https://via.placeholder.com/10/94a3b8?text=+) #94a3b8 |
| placeholder | ![#94a3b8](https://via.placeholder.com/10/94a3b8?text=+) #94a3b8 |
| info | ![#3b82f6](https://via.placeholder.com/10/3b82f6?text=+) #3b82f6 |
| success | ![#22c55e](https://via.placeholder.com/10/22c55e?text=+) #22c55e |
| warning | ![#f59e0b](https://via.placeholder.com/10/f59e0b?text=+) #f59e0b |
| danger | ![#ef4444](https://via.placeholder.com/10/ef4444?text=+) #ef4444 |

### Dark mode
| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| primaryDark | ![#ea580c](https://via.placeholder.com/10/ea580c?text=+) #ea580c |
| secondaryDark | ![#4f46e5](https://via.placeholder.com/10/4f46e5?text=+) #4f46e5 |
| tertiaryDark | ![#0891b2](https://via.placeholder.com/10/0891b2?text=+) #0891b2 |
| quaternaryDark | ![#be185d](https://via.placeholder.com/10/be185d?text=+) #be185d |
| neutral1Dark | ![#737373](https://via.placeholder.com/10/737373?text=+) #737373 |
| neutral2Dark | ![#1e293b](https://via.placeholder.com/10/1e293b?text=+) #1e293b |
| labelDark | ![#94a3b8](https://via.placeholder.com/10/94a3b8?text=+) #94a3b8 |
| placeholderDark | ![#9ca3af](https://via.placeholder.com/10/9ca3af?text=+) #9ca3af |
| infoDark | ![#2563eb](https://via.placeholder.com/10/2563eb?text=+) #2563eb |
| successDark | ![#047857](https://via.placeholder.com/10/047857?text=+) #047857 |
| warningDark | ![#d97706](https://via.placeholder.com/10/d97706?text=+) #d97706 |
| dangerDark | ![#b91c1c](https://via.placeholder.com/10/b91c1c?text=+) #b91c1c |


## Acknowledgements
- [Install Vue 3](https://vuejs.org/guide/quick-start.html)
- [Install Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Tailwind CSS Form Plugin](https://github.com/tailwindlabs/tailwindcss-forms)
- [Tailwind CSS dark mode](https://tailwindcss.com/docs/dark-mode)
- [Font Awesome](https://fontawesome.com/docs/web/setup/get-started)
## Author
- [OrangeWeb](https://www.orangeweb.biz)

