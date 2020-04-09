<template>
    <div class="column">
        <div class="title">
            <h5>{{ category }}</h5>
        </div>
        
        <TaskItem v-for="task in getTasksByCategory" :key="task.id" 
        :task="task"
        :UserId="UserId"
        @itemRemove="removeItem"></TaskItem>
        
        <div class="newForm">
            <div class="btnFormTask"  v-on:click="showForm">
                <i class="material-icons small">add</i>Add new task
            </div>
            <div v-if="seenForm">
                <form v-on:submit.prevent="createTask">
                    <div class="row">
                        <div class="input-field">
                            <input placeholder="Task" type="text" v-model="newTask">
                            <label >Task</label>
                        </div>
                        <div class="input-field col s6">
                            <button type="submit" class="btn">Create</button>
                        </div>
                        <div class="input-field col s6">
                            <button class="btn" type="reset">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import TaskItem from './TaskItem';
import { url } from '../utils.js';
export default {
    name: 'TaskList',
    data(){
        return {
            newTask: '',
            seenForm: false
        }
    },
    props: ['category', 'tasks', 'UserId'],
    components: {
        TaskItem
    },
    computed: {
        getTasksByCategory: function(){
            let temp = [];
            this.tasks.forEach(i => {
                i.category === this.category ? temp.push(i) : '';
            })
            return temp;
        }
    },
    created() {
    },
    methods: {
        createTask: function() {
            axios({
                url: url + `/tasks`,
                method: 'POST',
                data: {
                    title: this.newTask,
                    category: this.category
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                this.newTask = '';
                this.seenForm = !this.seenForm
                Swal.fire(
                'Success!',
                'You have create new task!',
                'success'
                );
                this.$emit('itemFromNewTask', response.data);
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                    showClass: {
                        popup: 'animated fadeInDown faster'
                    },
                    hideClass: {
                        popup: 'animated fadeOutUp faster'
                    }
                });
            });
        },
        removeItem: function(payload){
            this.$emit('itemRemove', payload);
        },
        showForm: function(){
            this.seenForm = !this.seenForm
        }
    },
};
</script>