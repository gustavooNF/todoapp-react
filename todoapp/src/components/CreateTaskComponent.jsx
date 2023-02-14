import React, { Component } from 'react'
import TaskService from '../service/TaskService'

class CreateTaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nameTask: '',
            descriptionTask: '',
            dateTask: '',
            hourTask:''
        }
        this.changeNameTaskHandler = this.changeNameTaskHandler.bind(this);
        this.changeDescriptionTaskHandler = this.changeDescriptionTaskHandler.bind(this);
        this.saveOrUpdateTask = this.saveOrUpdateTask.bind(this);
        document.body.style.backgroundColor = "#282c34";
    }

    componentDidMount() {

        if (this.state.id === '_add') {
            return
        } else {
            console.log("id:", this.state.id);
            TaskService.getTaskById(this.state.id).then((res) => {
                let task = res.data;
                this.setState({
                    nameTask: task.nameTask,
                    descriptionTask: task.descriptionTask,
                    dateTask: task.dateTask,
                    hourTask: task.hourTask
                });
            });
        }
    }

    saveOrUpdateTask = (e) => {
        e.preventDefault();
        let task = { nameTask: this.state.nameTask, descriptionTask: this.state.descriptionTask, dateTask: this.state.dateTask, hourTask: this.state.hourTask };        
    
        if (this.state.id === '_add') {
            TaskService.createTask(task).then(res => {
                this.props.history.push('/task');
            });
        } else {
            let updateTask = {idTask: this.state.id, nameTask: this.state.nameTask, descriptionTask: this.state.descriptionTask, dateTask: this.state.dateTask, hourTask: this.state.hourTask };
            TaskService.updateTask(updateTask).then(res => {
                this.props.history.push('/task');
            });
        }
    }

    changeNameTaskHandler = (event) => {
        this.setState({ nameTask: event.target.value });
    }

    changeDescriptionTaskHandler = (event) => {
        this.setState({ descriptionTask: event.target.value });
    }

    changeDateHandler = (event) => {
        this.setState({ dateTask: event.target.value });
    }

    changeTimeHandler = (event) => {
        this.setState({ hourTask: event.target.value });
    }


    cancel() {
        this.props.history.push('/task');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center style-title">Adicionar Tarefa</h3>
        } else {
            return <h3 className="text-center style-title">Atualizar Tarefa</h3>
        }
    }

    formatDate(e) {
        let input = e.target;
        if (e.keyCode < 47 || e.keyCode   > 57) {
            e.preventDefault()
        }
        var len = input.value.length;

        if (len !== 1 || len !== 3) {
            if (e.keyCode  === 47) {
                e.preventDefault();
            }
        }

        if (len === 2) {
            input.value += '/';
        }

        if (len === 5) {
            input.value += '/';
        }
    }

    time(e) {
        let input = e.target;
        if (e.keyCode  < 47 || e.keyCode   > 57) {
            e.preventDefault();
        }
        var len = input.value.length;

        if (len !== 1 || len !== 3) {
            if (e.keyCode  === 47) {
                e.preventDefault();
            }
        }

        if (len === 2) {
            input.value += ':';
        }

    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                    <br></br>
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <br></br>
                            {
                                this.getTitle()
                            }
                            {<div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Tarefa: </label>
                                        <input placeholder=" Nome da Tarefa" name="nameTask" className="form-control"
                                            value={this.state.nameTask} onChange={this.changeNameTaskHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Descrição: </label>
                                        <input placeholder="Descrição da Tarefa" name="descriptionTask" className="form-control"
                                            value={this.state.descriptionTask} onChange={this.changeDescriptionTaskHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Data: </label>
                                        <input placeholder="dd/mm/yyyy" name="dateTask" maxLength="10" className="form-control"
                                            value={this.state.dateTask} onChange={this.changeDateHandler} onKeyUp={this.formatDate} />
                                    </div>

                                    <div className="form-group">
                                        <label> Hora: </label>
                                        <input placeholder="HH:mm" name="dateTask" maxLength="5" className="form-control"
                                            value={this.state.hourTask} onChange={this.changeTimeHandler} onKeyUp={this.time} />
                                    </div>

                                    <button className="btn btn-info style-button-salvar" onClick={this.saveOrUpdateTask}>Salvar</button>
                                    <button className="btn btn-danger style-button-cancelar" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                                </form>
                            </div>}
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default CreateTaskComponent