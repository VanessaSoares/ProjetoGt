package com.gt.projeto.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.gt.projeto.domain.Pessoa;
import com.gt.projeto.repositories.PessoaRepository;

@Service
public class PessoasService {
	@Autowired
	private PessoaRepository repo; 	
	public Optional<Pessoa> buscar(Integer id) {
		Optional<Pessoa> obj = repo.findById(id);
		
		return obj;
	}
	
	public Pessoa salvarEditar(Pessoa obj) {
		return repo.save(obj);
	}
	public void delete(Integer id) {
		Optional<Pessoa> pessoa = repo.findById(id);
		if(!pessoa.isEmpty()) {
			repo.delete(pessoa.get());
		}
	}
	public List<Pessoa> findAll(){
		return repo.findAll();
	}
	public Page<Pessoa> findPage(Integer page, Integer linesPerPage, String orderBy, String direction ){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}
	
	public List<Pessoa> findByNomeContaining(String nome){
			return repo.findByNomeContaining(nome.toLowerCase());
		}
	
	public List<Pessoa> findByUf(int ufId){
		return repo.findByUf(ufId);
	}
}
