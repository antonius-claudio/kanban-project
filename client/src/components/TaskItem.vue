<template>
    <div v-bind:class="{ own: check, 'card': true}" >
        <div class="upper">
            <div v-if="isEdit===false">
                {{ task.title }}
            </div>
            <div v-else>
                <form v-on:submit.prevent="update">
                    <div class="row">
                        <div class="input-field">
                            <input placeholder="Task" type="text" v-model="inputUpdateTask">
                        </div>
                        <div class="input-field col s6">
                            <button type="submit" class="btn">update</button>
                        </div>
                        <div class="input-field col s6">
                            <span class="btn" v-on:click="cancelUpdate">cancel</span>
                        </div>
                    </div>
                </form>
            </div>
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
            <div class="right-bottom" v-if="check">
                <div class="icon-action">
                    <i class="material-icons tiny icon-edit" v-on:click="editTask">edit</i>
                </div>
                <div class="icon-action">
                    <i class="material-icons tiny icon-delete" v-on:click="deleteTask">delete</i>
                </div>
                <div class="icon-action">
                    <i class="material-icons tiny icon-reorder">swap_horiz</i>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { url } from '../utils.js';
export default {
    name: 'TaskItem',
    props: ['task', 'UserId'],
    computed: {
        check: function(){
            return this.task.UserId === Number(this.UserId) ? true : false ;
        }
    },
    data() {
        return {
            isEdit: false,
            inputUpdateTask: ''
        }
    },
    methods: {
        update: function() {
            axios({
                url: url + `/tasks/${this.task.id}`,
                method: 'PUT',
                data: {
                    title: this.inputUpdateTask,
                    category: this.task.category
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                console.log('updateee', response.data);
                this.inputUpdateTask = '';
                this.isEdit = !this.isEdit;
                this.$emit('itemUpdatedTask', response.data);
                Swal.fire(
                'Success!',
                'You have updated task!',
                'success'
                );
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
                })
            });
        },
        cancelUpdate: function () {
            this.inputUpdateTask = '';
            this.isEdit = !this.isEdit;
        },
        editTask: function () {
            this.inputUpdateTask = this.task.title;
            this.isEdit = !this.isEdit;
        },
        deleteTask: function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if (result.value) {
                    axios({
                        url: url + `/tasks/${this.task.id}`,
                        method: 'DELETE',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    .then((response) => {
                        this.$emit('itemRemove', this.task.id);
                        Swal.fire(
                            'Deleted!',
                            `${response.data.message}`,
                            'success'
                        )
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
                        })
                    })
                }
            })
            // .then((result) => {
            //     if (result.value) {
            //         return axios({
            //             url: url + `/tasks/${id}`,
            //             method: 'DELETE',
            //             headers: {
            //                 access_token: localStorage.getItem('access_token')
            //             }
            //         })
            //     }
            // })
            // .then((response) => {
            //     let temp = null;
            //     this.tasks.forEach((i, index) => {
            //         if(i.id === id) {
            //             temp = index;
            //         }
            //     });
            //     this.tasks.splice(temp, 1);
            //     Swal.fire(
            //         'Deleted!',
            //         `${response.data.message}`,
            //         'success'
            //     )
            // })
            // .catch((err) => {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: err.response.data.message,
            //         showClass: {
            //           popup: 'animated fadeInDown faster'
            //         },
            //         hideClass: {
            //           popup: 'animated fadeOutUp faster'
            //         }
            //     })
            // })
        }
    }
}
</script>