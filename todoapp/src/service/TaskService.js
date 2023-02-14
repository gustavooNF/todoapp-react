import axios from 'axios';

const TASK_API_BASE_URL = "http://localhost:8080/to-do-app";


class TaskService {

    getTask(){
        return axios.get(TASK_API_BASE_URL + '/all-registers');
    }

    createTask(task){
        return axios.post(TASK_API_BASE_URL + '/save-task', task);
    }

    getTaskById(taskId){
        console.log("taskId", taskId)
        return axios.get(TASK_API_BASE_URL + '/by-id-registers/' + taskId);
    }

    updateTask(task){
        console.log("taskId", task)
        return axios.post(TASK_API_BASE_URL + '/update-task',  task);
    }

    deleteTask(taskId){
        console.log("taskId", taskId)
        return axios.post(TASK_API_BASE_URL + '/delete-task', taskId);
    }

}

export default new TaskService()