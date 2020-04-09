<template>
    <div v-bind:class="{ own: check, 'card': true}" >
        {{check}}
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
            <div class="right-bottom" v-if="check">
                <div class="icon-action">
                    <i class="material-icons tiny icon-edit">edit</i>
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
    methods: {
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