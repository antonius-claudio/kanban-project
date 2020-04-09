<template>
    <div class="column">
        <div class="title">
            <h5>{{ category }}</h5>
        </div>
        
        <div class="newForm">
            <div class="btnFormTask"  v-on:click=`showForm${category}`>
                <i class="material-icons small">add</i>Add new task
            </div>
            {{getTasksByCategory}}
            <div v-for="task in getTasksByCategory" :key="task.id" class="card { 'own' : checkSame(task.UserId,UserId) }">
                <div class="upper">
                    {{ task.title }}
                </div>
                <div class="bottom">
                    <div class="left-bottom">
                        <div class="date">
                            <i class="material-icons tiny icon-date">date_range</i><span>{{ task.createdAt.slice(0,10) }}</span>
                        </div>
                        <div class="author">
                            <i class="material-icons tiny icon-author">person</i><span>{{ task.User.name }}</span>
                        </div>
                    </div>
                    {{UserId}}
                    {{task.UserId}}
                    <div class="right-bottom" v-if="task.UserId === UserId">
                        <div class="icon-action">
                            <i class="material-icons tiny icon-edit">edit</i>
                        </div>
                        <div class="icon-action">
                            <i class="material-icons tiny icon-delete" v-on:click="deleteTask(task.id)">delete</i>
                        </div>
                        <div class="icon-action">
                            <i class="material-icons tiny icon-reorder">swap_horiz</i>
                        </div>
                    </div>
                </div>
            </div>

            <!--<TaskItem v-for="task in getTasksByCategory" :key="task.id" 
            :task="task"
            :UserId="UserId"></TaskItem>-->

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
// import TaskItem from './TaskItem';
export default {
    name: 'TaskList',
    props: ['category', 'tasks', 'UserId'],
    components: {
        // TaskItem
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
        console.log(this.getTasksByCategory)
        console.log('masuk takslist')
    },
};
</script>