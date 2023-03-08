<template>
    <label :for="props.id" class="flex items-start gap-2 cursor-pointer leading-none w-fit py-1">
        <input
            :id="props.id"
            type="radio"
            v-model="proxyChecked"
            :value="props.value"
            :name="props.name"
            class="border-2 row-span-2 focus:outline-none focus-visible:outline-none appearance-none cursor-pointer bg-transparent focus:ring-offset-transparent"
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
        type: [String, Number],
        default: false,
    },
    label: {
        type: String,
        default: null
    },
    subLabel: {
        type: String,
        default: null
    },
    name: {
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
    required: {
        type: Boolean,
        default: false
    }
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
