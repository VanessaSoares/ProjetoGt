package com.gt.projeto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gt.projeto.domain.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
	public List<Pessoa> findByUf(int uf);
	@Query("select u from Pessoa u where u.nome like %?1%")
	public List<Pessoa> findByNomeContaining(@Param("nome")String nome);
}
