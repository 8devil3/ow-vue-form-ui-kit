<template>
    <button
        :type="props.type"
        :disabled="props.disabled"
        :class="[commonClasses, props.outline ? stateClasses.buttons.outline[props.mainColor] : stateClasses.buttons.solid[props.mainColor], stateClasses.buttons.shapes[props.shape], props.outline ? props.textColorOutline : props.textColor]"
    >
        <i v-if="props.icon" :class="commonIconClasses"></i>
        {{ props.text }}
    </button>
</template>

<script setup>
import stateClasses from './stateClasses.json';

const props = defineProps({
    shape: {
        type: String,
        default: 'squared'
    },
    outline: {
        type: Boolean,
        default: false
    },
    mainColor: {
        type: String,
        default: 'primary'
    },
    type: {
        type: String,
        default: 'button',
    },
    text: {
        type: String,
        default: null,
    },
    textColor: {
        type: String,
        default: 'text-white'
    },
    textColorOutline: {
        type: String,
        default: 'text-gray-700 dark:text-white'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
});

const commonClasses = "inline-flex items-center justify-center text-center text-xs md:text-sm whitespace-nowrap px-2 py-1 md:px-3 md:py-1.5 disabled:opacity-50 focus:ring-0 focus:outline focus:outline-2 focus:outline-offset-1 transition shadow-md hover:brightness-110 active:brightness-125 font-semibold";

const commonIconClasses = `${props.icon} ${props.text ? 'mr-1 md:mr-1.5' : null} text-xs md:text-sm`

</script>
