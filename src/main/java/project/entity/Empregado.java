package project.entity;

import javax.persistence.*;

@Entity
@Table(name="empregado")
public class Empregado {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String nome;
  private String cargo;
  private long salario;

  public Empregado(){
  }

  public Empregado(String nome, String cargo, long salario) {
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }

  public long getId(){
    return id;  
  }
  
  public String getNome() {
    return nome;
  }

  public String getCargo() {
    return cargo;
  }

  public long getSalario() {
    return salario;
  }
    
    public String toString(){
        return "Empregado - " + "Cรณdigo= " + id + ", Nome= " + nome + " Cargo= " + cargo +" Salรกrio= " + salario; 
    }
}