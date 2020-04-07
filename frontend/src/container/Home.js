import React, { Component } from 'react';
import ModalCadastro from  './ModalCadastro';
import Table from './TablePeople'
class Home extends Component {
   
    render() {
        return (
            <div className='container text-center'>
                <div className = 'row'>
                    <ModalCadastro textoBotao="Cadastrar"></ModalCadastro>
                    <Table></Table>
                </div>
            </div>
        )
    }

}
export default Home;