import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalEditar from './ModalEditar'
import ModalDelete from './ModalDelete'
import { peopleSuccess } from '../redux/actions/pessoasActions'
import { ufSuccess } from '../redux/actions/estadosActions'
import axios from 'axios'
import API_DOMAIN from '../config/api'
import moment from 'moment'


const URL = "https://servicodados.ibge.gov.br";

class TablePeople extends Component {
    constructor() {
        super()

    }
    componentWillMount() {
        axios.get(`${API_DOMAIN}/pessoas`)
            .then((resp) => {
                this.props.dispatch(peopleSuccess(resp.data));
            })
            .catch(resp => {
                console.log(resp);
            });
        this.buscarUf();
    }
    buscarUf() {
        axios.get(URL + "/api/v1/localidades/estados")
            .then((resp) => {
                this.props.dispatch(ufSuccess(resp.data));
            })
            .catch(resp => {
                console.log(resp);
            });
    }
    buscarPessoas(e) {
        axios.get(`${API_DOMAIN}/pessoas/findByNome`, {
            params: {
                q: e.target.value
            }
        })
        .then((resp) => {
            this.props.dispatch(peopleSuccess(resp.data));
        })
        .catch(resp => {
            console.log(resp)
        });
    }
    nomeUfPorId(id) {
        if(this.props.uf.length > 0)
            return this.props.uf.find((element) => { return element.id === id}).nome;
        else
            return '-';
    }

    formatDate(date) {
        if (date) return moment(date).format("DD/MM/YYYY");
        else return '-';
    }
    render() {

        return (
            <div className='container'>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">Pessoas</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Pesquisar" onChange={this.buscarPessoas.bind(this)} aria-label="Search" />
                    </form>
                </nav>
                <table className="table table-hover ">
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">UF</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.peoples.map((data, index) => {
                            return (
                                <tr key={data.id}>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.nome}</td>
                                    <td>{this.formatDate(data.dtnasc)}</td>
                                    <td>{this.nomeUfPorId(data.uf)}</td>
                                    <td >
                                        <div className='d-flex justify-content-center'>
                                            <ModalEditar pessoa={data}></ModalEditar>
                                            <ModalDelete pessoaId={data.id}></ModalDelete>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        data: state.peoples,
        uf: state.ufs.ufs
    };
}

export default connect(mapStateToProps)(TablePeople);