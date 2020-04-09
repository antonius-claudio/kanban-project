<template>
    <div class="column">
        <div class="title">
            <h5>{{ category }}</h5>
        </div>
        
        <div class="newForm">
            <div class="btnFormTask"  v-on:click=`showForm${category}`>
                <i class="material-icons small">add</i>Add new task
            </div>
            <TaskItem v-for="task in getTasksByCategory" :key="task.id" 
            :getTasksByCategory="getTasksByCategory"
            :UserId="UserId"></TaskItem>
            <div v-if="">
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
                            <span class="btn" v-on:click="cancelTask">Cancel</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="clickme"  v-on:click="toggleDiv">
            <i class="material-icons small">add</i>clickme
        </div>
        <div v-if="showDiv">
            "Hello World showDivs: " {{showDiv}}
        </div>
        <div v-else>showDiv value is {{showDiv}}</div>
    </div>
</template>

<script>
import TaskItem from './TaskItem';
export default {
    name: 'TaskList',
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
    }
};
</script>