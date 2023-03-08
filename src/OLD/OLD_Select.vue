<template>
    <div class="relative" :class="{'pt-4' : props.shape === 'linear'}">
        <label
            v-if="props.shape === 'linear'"
            :for="props.id"
            class="absolute left-0 text-sm transition-transform origin-top-left md:text-base leading-none"
            :class="[data.labelclasses, {'text-opacity-50' : props.disabled}]"
        >
            {{ props.label }} 

            <span v-show="props.required" class="text-danger">*</span>
        </label>

        <label
            v-else-if="props.shape !== 'linear' && props.label"
            :for="props.id"
            class="text-xs md:text-sm leading-none text-label dark:text-labelDark"
            :class="[data.labelclasses, {'text-opacity-50' : props.disabled}, {'pl-3 md:pl-4' : props.shape === 'pill'}]"
        >
            {{ props.label }} 

            <span v-show="props.required" class="text-danger">*</span>
        </label>
        
        <div class="relative" :class="props.shape === 'linear' ? 'h-6 md:h-[29px]' : 'h-8 md:h-[38px]'">
            <select
                :id="props.id"
                :name="props.name"
                :autocomplete="props.autocomplete"
                :disabled="props.disabled"
                :required="props.required"
                :autofocus="props.autofocus"
                v-model="data.selectedValue"
                :value="props.modelValue"
                ref="select"
                @change="labelClasses($event.target.value), emits('update:model-value', $event.target.value)"
                class="w-full z-10 absolute inset-0 appearance-none text-sm bg-transparent md:text-base focus:ring-2 focus:outline-none focus-visible:outline-none placeholder:text-placeholder disabled:placeholder-opacity-50 disabled:border-opacity-50 leading-none text-opacity-50 cursor-pointer pr-6 md:pr-8"
                :class="[stateClasses.inputs.shapes[props.shape], stateClasses.inputs.mainColors[props.mainColor], stateClasses.inputs.focusColors[props.focusColor]]"
                :aria-label="props.label"
                :aria-placeholder="props.defaultOption"
                :aria-required="props.required"
            >
                <option default selected disabled
                    class=" hover:bg-primary dark:hover:bg-primaryDark"
                    :class="stateClasses.inputs.listColors[props.listColor]"
                >
                    {{ props.defaultOption }}
                </option>

                <option
                    v-for="option in props.options"
                    :value="option"
                    class="hover:bg-primary dark:hover:bg-primaryDark"
                    :class="stateClasses.inputs.listColors[props.listColor]"
                >
                    {{ option }}
                </option>
            </select>

            <i
                class="text-xs md:text-sm absolute top-1/2 -translate-y-1/2 fa-solid fa-chevron-down text-primary dark:text-primaryDark"
                :class="[props.shape === 'linear' ? 'right-2' : 'right-4', {'text-opacity-50' : props.disabled}]"
            ></i>
        </div>

        <span v-if="props.errorMsg" class="mt-1 text-xs md:text-sm font-normal text-left text-danger" :class="{'px-3 md:px-4' : props.shape === 'pill'}">
            {{ props.errorMsg }}
        </span>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import stateClasses from '../components/stateClasses.json';

const props = defineProps({
    modelValue: [String, Number],
    shape: {
        type: String,
        default: 'linear'
    },
    label: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    mainColor: {
        type: String,
        default: 'neutral1'
    },
    focusColor: {
        type: String,
        default: 'primary'
    },
    listColor: {
        type: String,
        default: 'neutral2'
    },
    defaultOption: {
        type: String,
        default: null,
    },
    options: {
        type: Array,
        default: null,
    },
    id: {
        type: String,
        default: null
    },
    autocomplete: {
        type: String,
        default: 'on'
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: null
    },
    required: {
        type: Boolean,
        default: false
    },
    errorMsg: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
})

const emits = defineEmits(['update:model-value']);

const data = reactive({
    labelclasses: 'top-5 md:top-4 text-placeholder',
    selectedValue: props.modelValue ? props.modelValue : props.defaultOption
})

const select = ref(null);

const labelClasses = (event) => {
    if(event === null || event === '' || data.selectedValue === null){
        data.labelclasses = 'top-5 md:top-4 text-placeholder'
    } else {
        data.labelclasses = 'scale-75 -translate-y-4 top-5 md:top-4 text-label dark:text-labelDark'
    }
}

onMounted(() => {
    labelClasses();

    if (select.value.hasAttribute('autofocus')) {
        select.value.focus();
    }
});

</script>

<style scoped>
select {
    background: none;
}
</style>
 