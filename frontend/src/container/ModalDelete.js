import React, { Component } from 'react'
import axios from 'axios'
import API_DOMAIN from '../config/api'
import { fetchPeople } from '../redux/actions/pessoasActions'
import { connect } from 'react-redux'


class ModalDelete extends Component {
  constructor() {
    super()
    this.modalButton = React.createRef();
  }
  deletePessoa = () =>  {
      axios.delete(`${API_DOMAIN}/pessoas/${this.props.pessoaId}`)
      .then((resp) => {
          this.modalButton.current.click();
          this.props.dispatch(fetchPeople());
      })
      .catch(resp => {
          console.log(resp)
      });
  }
  handleChange(event) {
    this.setState({ id: event.target.value });
  };
  render() {
    const data = this.props.data
    return (
      <div className='container text-left'>
        <button ref={this.modalButton} type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#modalDelete">Remover</button>
        <div id = "modalDelete" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Remover</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-left">
                <p>Certeza que deseja excluir ?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" onClick={() => { this.deletePessoa()}}>Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(ModalDelete);