import React, { Component } from 'react'
import axios from 'axios'
import API_DOMAIN from '../config/api'
import {connect} from 'react-redux'
import {fetchPeople} from '../redux/actions/pessoasActions'

URL = "https://servicodados.ibge.gov.br"

class ModalEditar extends Component {
    constructor() {
        super();
        this.modalButton = React.createRef();
        this.state = {
            open: false,
            nome: "",
            cpf: "",
            dtnasc: "",
            peso: null,
            uf: "",
            ufs:[]
        }
    }

    componentDidMount() {
        this.setState(this.props.pessoa);
    }
    EditarPessoa() {
        axios.put(`${API_DOMAIN}/pessoas/${this.props.pessoa.id}`,
            {
                id: this.props.pessoa.id,
                nome: this.state.nome,
                cpf: this.state.cpf,
                dtnasc: this.state.dtnasc,
                peso: this.state.peso,
                uf: this.state.uf
            })
            .then(() => {
                this.modalButton.current.click();
                this.props.dispatch(fetchPeople());
            })
            .catch((err) => {
                console.log(err)
            })
        this.setState({ open: false });
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };
   
    render() {
        return (
            <div className='container text-right'>
                <button ref={this.modalButton} className="btn btn-outline-primary" data-toggle="modal" data-target="#modalAtualizar">Editar</button>
                <div class="modal fade" id="modalAtualizar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <input name="nome" class="form-control" id="inputEmail4" placeholder="Nome" value={this.state.nome}
                                                onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <input name="cpf" class="form-control" id="inputAddress" placeholder="CPF" value={this.state.cpf}
                                                onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <input type="date" name="dtnasc" class="form-control" id="inputAddress2" placeholder="Data de Nascimento" value={this.state.dtnasc}
                                                onChange={this.handleChange.bind(this)} />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <input name="peso" class="form-control" id="Peso(Kg)" value={this.state.peso}
                                                onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div class="form-group col-md-4">
                                            <select name="uf" id="uf" class="form-control" value={this.state.uf} onChange={this.handleChange.bind(this)}>
                                            {this.props.ufs.map((uf) => {         
                                                    return (
                                                    <option value={uf.id}>{uf.nome}</option>   
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div class="form-group col-md-2">
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: '10px' }}>
                                        <button onClick={() => this.EditarPessoa()} type="button" class="btn btn-primary">Salvar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ufs: state.ufs.ufs
    };
}

export default connect(mapStateToProps)(ModalEditar);
