package com.gt.projeto.resources;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gt.projeto.domain.Pessoa;
import com.gt.projeto.services.PessoasService;

@RestController
@RequestMapping(value="/pessoas") 
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PessoaResource {
	@Autowired
	private PessoasService services;
	
	@RequestMapping(value = "/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		
		Optional<Pessoa> obj = services.buscar(id);
	
		return ResponseEntity.ok().body(obj);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Pessoa> insert(@RequestBody Pessoa obj) {
		return ResponseEntity.ok(services.salvarEditar(obj));
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Pessoa> update(@RequestBody Pessoa obj ){
		return ResponseEntity.ok(services.salvarEditar(obj));
	}
	@RequestMapping(value = "/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Integer id ){
		services.delete(id);
		return ResponseEntity.noContent().build();
		
	}
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Pessoa>> findAll(){
		List<Pessoa> lista = services.findAll();
		return ResponseEntity.ok().body(lista);
	}

	@RequestMapping(value="/findByNome",method=RequestMethod.GET)
		public ResponseEntity<List<Pessoa>> findByNomeContaining(@RequestParam String q){
			List<Pessoa> lista = services.findByNomeContaining(q);
			return ResponseEntity.ok().body(lista);
		}
	
	@RequestMapping(value ="/byUf/{ufId}", method=RequestMethod.GET)
	public ResponseEntity<List<Pessoa>> findByUf (@PathVariable int ufId){
		return ResponseEntity.ok(services.findByUf(ufId));
	}
}
