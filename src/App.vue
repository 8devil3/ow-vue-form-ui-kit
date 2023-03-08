<template>
    <button @click="toggleDarkMode()" class="bg-zinc-300 py-2 px-4 w-fit h-fit text-black">dark/light</button>
    <div class="max-w-4xl p-6 mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 gap-16 dark:bg-gray-900 dark:text-zinc-200">

        <!-- input -->
        <div class="space-y-6">
            <h2>Inputs</h2>
            <div>
                <h3>Linear</h3>
                <Input
                    type="text"
                    v-model="data.values"
                    label="Write your input"
                    id="fb-link1"
                    shape="linear"
                    placeholder="This is a placeholder"
                    errorMsg="This is an error message"
                    :charsCounter="10"
                    icon="fa-solid fa-check"
                />
            </div>

            <div>
                <h3>Rounded</h3>
                <Input
                    type="text"
                    v-model="data.values"
                    id="fb-link2"
                    shape="rounded"
                    placeholder="This is a placeholder"
                    label="This is a label"
                    :charsCounter="10"
                    icon="fa-solid fa-check"
                    errorMsg="This is an error message"
                />
            </div>

            <div>
                <h3>Pill</h3>
                <Input
                    type="text"
                    v-model="data.values"
                    label="This is a label"
                    id="fb-link3"
                    shape="pill"
                    placeholder="This is a placeholder"
                    errorMsg="This is an error message"
                    :charsCounter="10"
                    icon="fa-solid fa-check"
                />
            </div>
        </div>
        <!-- / -->

        <!-- button -->
        <div class="space-y-6">
            <h2>Buttons</h2>

            <div>
                <h3>Solid, just text</h3>
                <div class="space-x-4">
                    <Button text="Squared"/>
                    <Button text="Rounded" shape="rounded" mainColor="secondary"/>
                    <Button text="Pill" shape="pill"  mainColor="tertiary"/>
                </div>
            </div>

            <div>
                <h3>Solid, text with icon</h3>
                <div class="space-x-4">
                    <Button text="Squared" icon="fa-solid fa-check"/>
                    <Button text="Rounded" shape="rounded" icon="fa-solid fa-check" mainColor="secondary"/>
                    <Button text="Pill" shape="pill" icon="fa-solid fa-check"  mainColor="tertiary"/>
                </div>
            </div>

            <div>
                <h3>Solid, just icon</h3>
                <div class="space-x-4">
                    <Button icon="fa-solid fa-user"/>
                    <Button shape="rounded" icon="fa-solid fa-download" mainColor="secondary"/>
                    <Button shape="pill" icon="fa-solid fa-check" mainColor="tertiary"/>
                </div>
            </div>

            <div>
                <h3>Outline, just text</h3>
                <div class="space-x-4">
                    <Button text="Squared" outline/>
                    <Button text="Rounded" shape="rounded" outline mainColor="secondary"/>
                    <Button text="Pill" shape="pill" outline mainColor="tertiary"/>
                </div>
            </div>

            <div>
                <h3>Outline, text with icon</h3>
                <div class="space-x-4">
                    <Button text="Squared" icon="fa-solid fa-check" outline/>
                    <Button text="Rounded" shape="rounded" icon="fa-solid fa-check" outline mainColor="secondary"/>
                    <Button text="Pill" shape="pill" icon="fa-solid fa-check" outline mainColor="tertiary"/>
                </div>
            </div>

            <div>
                <h3>Outline, just icon</h3>
                <div class="space-x-4">
                    <Button icon="fa-solid fa-user" outline/>
                    <Button shape="rounded" icon="fa-solid fa-download" outline mainColor="secondary"/>
                    <Button shape="pill" icon="fa-solid fa-check" outline mainColor="tertiary"/>
                </div>
            </div>
        </div>
        <!-- / -->

        <!-- select -->
        <div class="space-y-6">
            <h2>Select</h2>

            <div>
                <h3>Shape</h3>
                <div class="space-y-6">
                    <SelectCustom label="City" v-model="data.values" :options="cities" defaultOption="Select city" errorMsg="This is an error message"/>
                    <SelectCustom label="City" v-model="data.values" :options="cities" defaultOption="Select city" shape="rounded" errorMsg="This is an error message"/>
                    <SelectCustom label="City" v-model="data.values" :options="cities" defaultOption="Select city" shape="pill" errorMsg="This is an error message"/>
                </div>
            </div>
        </div>
        <!-- / -->

        <!-- checkbox e radio -->
        <div class="space-y-4">
            <h2>Radios & checkboxes</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <h3>Radio</h3>
                    <Radio v-for="city, id in cities" :label="city" :id="'city-' + id" name="city" v-model:checked="data.radio" :value="city" subLabel="Text under label"/>
                </div>
    
                <div class="space-y-2">
                    <h3>Checkbox</h3>
                    <Checkbox v-for="city, id in cities" :label="city" :id="'city-2-' + id" v-model:checked="data.checkbox" :value="city" subLabel="Text under label"/>
                </div>
            </div>
        </div>
        <!-- / -->

        <!-- colori -->
        <div class="space-y-6">
            <h2>Colors</h2>
            <div class="grid grid-cols-4 gap-2">
                <Button text="Primary"/>
                <Button text="Secondary" mainColor="secondary"/>
                <Button text="Tertiary" mainColor="tertiary"/>
                <Button text="Quaternary" mainColor="quaternary"/>
                <Button text="Neutral 1" mainColor="neutral1"/>
                <Button text="Neutral 2" mainColor="neutral2" text-color="text-gray-700 dark:text-white"/>
                <Button text="Label" mainColor="label"/>
                <Button text="Placeholder" mainColor="placeholder"/>
                <Button text="Info" mainColor="info"/>
                <Button text="Success" mainColor="success"/>
                <Button text="Warning" mainColor="warning"/>
                <Button text="Danger" mainColor="danger"/>
            </div>
        </div>
        <!-- / -->
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import Input from './components/Input.vue';
import Button from './components/Button.vue';
import Radio from './components/Radio.vue';
import Checkbox from './components/Checkbox.vue';
import SelectCustom from './components/SelectCustom.vue';

const data = reactive({
    inputValue: null,
    values: 'Milano',
    radio: 'Firenze',
    checkbox: ['Torino', 'Firenze']
})

const cities = ['Milano', 'Roma', 'Firenze', 'Torino', 'Bologna']

onMounted(()=>{
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})

const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
}

</script>