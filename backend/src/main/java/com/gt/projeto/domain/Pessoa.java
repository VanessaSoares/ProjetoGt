package com.gt.projeto.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import com.sun.istack.NotNull;

@Entity
public class Pessoa implements Serializable {
	private static final long serialVersionUID = 2L; 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id; 
	
	@NotNull
	@NotBlank
	private String nome, cpf;
	private Date datanasc;
	private double peso;
	@NotNull
	private int uf;
	
		
	public Pessoa(Integer id, String nome, String cpf, Date datanasc, double peso, int uf) {
		super();
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.datanasc = datanasc;
		this.peso = peso;
		this.uf = uf;
	}
	
	public Pessoa() { }
	
	public Integer getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDtnasc() {
		return datanasc;
	}

	public void setDtnasc(Date dtnasc) {
		this.datanasc = dtnasc;
	}

	public double getPeso() {
		return peso;
	}

	public void setPeso(double peso) {
		this.peso = peso;
	}

	public int getUf() {
		return uf;
	}

	public void setUf(int uf) {
		this.uf = uf;
	}
}
