<template>
    <div  class="card { 'own' : checkSame(task.UserId,UserId) }">
    
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
</template>

<script>
export default {
    name: 'TaskItem',
    props: ['task', 'UserId'],
    created() {
        console.log(this.task)
        console.log('masuk taksitem')
    },
}
</script>