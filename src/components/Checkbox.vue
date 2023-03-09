<template>
    <label :for="props.id" class="flex items-start gap-2 py-1 leading-none cursor-pointer w-fit">
        <input
            :id="props.id"
            type="checkbox"
            v-model="proxyChecked"
            :value="props.value"
            :name="props.name"
            class="w-4 h-4 bg-transparent border-2 rounded-sm appearance-none cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-offset-transparent"
            :class="stateClasses.radios.mainColors[props.mainColor]"
        />
        <span class="flex flex-col md:gap-1 gap-0.5">
            {{ props.label }}
            <span v-if="props.subLabel" class="text-xs md:text-sm text-label dark:text-labelDark">{{ props.subLabel }}</span>
        </span>
    </label>
</template>

<script setup>
import { computed } from 'vue';
import stateClasses from './stateClasses.json';

const props = defineProps({
    value: {
        type: [String, Number],
        default: null
    },
    checked: {
        type: Array,
        default: null,
    },
    label: {
        type: String,
        default: null
    },
    subLabel: {
        type: String,
        default: null
    },
    id: {
        type: String,
        default: null
    },
    mainColor: {
        type: String,
        default: 'primary'
    },
    name: {
        type: String,
        default: null
    },
})

const emit = defineEmits(['update:checked']);

const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
    },
});
</script>
