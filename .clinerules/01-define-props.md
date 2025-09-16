# MCP Prompt – Vue 3 `defineProps` Code Structure Reference

When generating `defineProps` for Vue 3 `<script setup>` components in Nuxt 3 (TypeScript), follow this structure and rules:

## 1. Base Structure
Always wrap props inside:
```ts
const props = defineProps({
  /* ... */
})
```

### 2. Rules for Each Prop
type: Must specify Boolean, String, Number, Array, or Object.

default: Must have a default value.

validator: Required if prop accepts only specific string values.

### 3. Ordering Rules
Boolean props first, in alphabetical order.

String/Number props next, in alphabetical order.

Complex types (Array/Object) last.

### 4. Validator Usage
If a prop accepts only specific values, add a validator:
``` ts
validator: (value: string) => ['value1', 'value2'].includes(value),

```

### 5. Formatting Rules
Use two spaces for indentation.

Always put a trailing comma , after each prop.

Use camelCase for property keys.

### 6. Example Reference
```ts
const props = defineProps({
  text: { type: Boolean, default: false },
  bold: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  color: { type: String, default: '' },
  transform: {
    type: String,
    default: 'normal',
    validator: (value: string) => ['normal', 'uppercase', 'capitalize'].includes(value),
  },
  size: {
    type: String,
    default: 'base',
    validator: (value: string) => ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].includes(value),
  },
  dark: { type: Boolean, default: false },
  depressed: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  roundedFull: { type: Boolean, default: false },
  tile: { type: Boolean, default: false },
  href: { type: String, default: '' },
  target: {
    type: String,
    default: '',
    validator: (value: string) => ['', '_blank', '_parent', '_self', '_top'].includes(value),
  },
  to: { type: String, default: '' },
  nuxt: { type: Boolean, default: false },
})
```