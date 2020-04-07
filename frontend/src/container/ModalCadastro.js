import React, { Component } from 'react'
import axios from 'axios'
import API_DOMAIN  from '../config/api'
import { fetchPeople } from '../redux/actions/pessoasActions'
import { connect } from 'react-redux'

const URL = "https://servicodados.ibge.gov.br"

class ModalCadastro extends Component {
    constructor() {
        super()
        this.modalButton = React.createRef();
        this.state = {
            nome: "",
            cpf: "",
            dtnasc: "",
            peso: null,
            uf: 11,
        }
    }

    handleSubmitSubscription() {
        axios.post(`${API_DOMAIN}/pessoas`,
            {
                nome: this.state.nome,
                cpf: this.state.cpf,
                dtnasc: this.state.dtnasc,
                peso: this.state.peso,
                uf: this.state.uf
            })
            .then(() => {
                this.setState({
                    nome: "",
                    cpf: "",
                    dtnasc: "",
                    peso: null,
                    uf: 11,
                });
                this.modalButton.current.click();
                this.props.dispatch(fetchPeople());
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleChange(event) {
        if (event.target.name === 'cpf')
            this.setState({[event.target.name]: this.cpfMask(event.target.value) });
        else
            this.setState({[event.target.name]: event.target.value });
    };

    buscarUF() {
        axios.get(URL + "/api/v1/localidades/estados")
            .then((response) => {
                this.setState({ ufs: response.data });
            })
    }
    componentWillMount() {
        this.buscarUF();
    }

    cpfMask(value) {
        return value
          .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
          .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
      }

    render() {
        return (
            <div className='container text-right cadastro'>
                <button type="button" ref={this.modalButton} class="btn btn-primary" data-toggle="modal" data-target="#modalCadastro">Cadastrar</button>
                <div class="modal fade" id="modalCadastro" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel">Cadastro</h5>
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
                                            <input type="number" name="peso" class="form-control" id="peso" placeholder = "Peso" value={this.state.peso}
                                                onChange={this.handleChange.bind(this)} />
                                        </div>
                                        <div class="form-group col-md-4">
                                            <select name= "uf" select id="uf" class="form-control" value={this.state.uf} onChange={this.handleChange.bind(this)}>
                                                {this.props.ufs.map((uf, index) => {    
                                                    return ( <option value={uf.id}>{uf.nome}</option> )
                                                })}
                                            </select>
                                        </div>
                                        <div class="form-group col-md-2">
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: '10px' }}>
                                        <button onClick={() => this.handleSubmitSubscription()} type="button" class="btn btn-primary">Cadastrar</button>
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


export default connect(mapStateToProps)(ModalCadastro);