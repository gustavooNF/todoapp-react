import React, { Component } from 'react'
import TaskService from '../service/TaskService'

class ListTaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            task: []
        }
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        document.body.style.backgroundColor = "#282c34";
    }

    deleteTask(idTask) {
        TaskService.deleteTask(idTask).then(res => {
            this.setState({ task: this.state.task.filter(task => task.idTask !== idTask) });
            console.log("taskIdD", idTask)
        });
    }
    viewTask(id) {
        this.props.history.push(`/view-task/${id}`);
    }
    editTask(id) {
        this.props.history.push(`/add-task/${id}`);
    }

    componentDidMount() {
        TaskService.getTask().then((res) => {
            this.setState({ task: res.data });
        });
    }

    addTask() {
        this.props.history.push('/add-task/_add');
    }

    getTitle() {
        return <h3 className="text-center style-title">Minhas Tarefas</h3>

    }
    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <div className="card col-md-12">
                    <br></br>
                    {
                        this.getTitle()
                    }
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Tarefa </th>
                                <th> Descrição </th>
                                <th> Data </th>
                                <th> Ações </th>
                            </tr>
                        </thead>
                        {<tbody>
                            {
                                this.state.task.map(
                                    task =>
                                        <tr key={task.idTask}>
                                            <td> {task.nameTask} </td>
                                            <td> {task.descriptionTask}</td>
                                            <td> {task.dateTask}</td>
                                            <td>
                                                <button onClick={() => this.editTask(task.idTask)} className="btn btn-info style-button-atualizar">Atualizar </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteTask(task.idTask)} className="btn btn-danger style-button-excluir">Excluir</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>}
                    </table>
                    <br></br>
                    <div className="align-button">
                        <button className="btn btn-info style-button-cadastrar" onClick={this.addTask}> Incluir</button>
                    </div>
                    <br></br>
                </div>

            </div>

        )
    }

}

export default ListTaskComponent;